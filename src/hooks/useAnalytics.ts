import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  event_name: string;
  page_url?: string;
  properties?: Record<string, any>;
}

interface SessionData {
  session_id: string;
  started_at: Date;
  page_count: number;
  entry_page: string;
}

export const useAnalytics = () => {
  const sessionRef = useRef<SessionData | null>(null);
  const pageStartTime = useRef<Date>(new Date());

  // Generate or get session ID
  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // Detect device type
  const getDeviceType = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }, []);

  // Get browser info
  const getBrowserInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    let browser = 'Unknown';
    
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';
    
    return browser;
  }, []);

  // Get OS info
  const getOSInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    let os = 'Unknown';
    
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    return os;
  }, []);

  // Track page view
  const trackPageView = useCallback(async (page_url?: string) => {
    try {
      const sessionId = getSessionId();
      const currentUrl = page_url || window.location.pathname;
      
      // Create or update session
      if (!sessionRef.current) {
        const sessionData: SessionData = {
          session_id: sessionId,
          started_at: new Date(),
          page_count: 1,
          entry_page: currentUrl
        };
        sessionRef.current = sessionData;

        // Insert new session
        await supabase.from('analytics_sessions').insert({
          session_id: sessionId,
          entry_page: currentUrl,
          referrer: document.referrer || null,
          device_type: getDeviceType(),
          browser: getBrowserInfo(),
          os: getOSInfo()
        });
      } else {
        // Update existing session
        sessionRef.current.page_count += 1;
        await supabase
          .from('analytics_sessions')
          .update({ 
            page_count: sessionRef.current.page_count,
            exit_page: currentUrl
          })
          .eq('session_id', sessionId);
      }

      // Track page view event
      await supabase.from('analytics_events').insert({
        event_type: 'page_view',
        event_name: 'Page View',
        page_url: currentUrl,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId,
        properties: {
          title: document.title,
          timestamp: new Date().toISOString()
        }
      });

      pageStartTime.current = new Date();
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [getSessionId, getDeviceType, getBrowserInfo, getOSInfo]);

  // Track custom event
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const sessionId = getSessionId();
      
      await supabase.from('analytics_events').insert({
        ...event,
        page_url: event.page_url || window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, [getSessionId]);

  // Track session end
  const trackSessionEnd = useCallback(async () => {
    try {
      if (sessionRef.current) {
        const sessionDuration = Math.floor((new Date().getTime() - sessionRef.current.started_at.getTime()) / 1000);
        const sessionId = getSessionId();
        
        await supabase
          .from('analytics_sessions')
          .update({
            ended_at: new Date().toISOString(),
            duration_seconds: sessionDuration,
            is_bounce: sessionRef.current.page_count === 1
          })
          .eq('session_id', sessionId);
      }
    } catch (error) {
      console.error('Error tracking session end:', error);
    }
  }, [getSessionId]);

  // Setup analytics on mount
  useEffect(() => {
    // Track initial page view
    trackPageView();

    // Track page unload
    const handleBeforeUnload = () => {
      trackSessionEnd();
    };

    // Track page visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackSessionEnd();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [trackPageView, trackSessionEnd]);

  return {
    trackPageView,
    trackEvent,
    trackSessionEnd
  };
};