import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useSimpleAnalytics = () => {
  const location = useLocation();
  const sessionRef = useRef<string | null>(null);
  const isTrackingRef = useRef<boolean>(false);

  // Get or create session ID
  const getSessionId = useCallback(() => {
    if (!sessionRef.current) {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        try {
          sessionStorage.setItem('analytics_session_id', sessionId);
        } catch (error) {
          console.warn('Session storage not available');
        }
      }
      sessionRef.current = sessionId;
    }
    return sessionRef.current;
  }, []);

  // Simple event tracking with error handling
  const trackEvent = useCallback(async (eventType: string, eventName: string, properties?: Record<string, any>) => {
    if (isTrackingRef.current) return; // Prevent multiple simultaneous requests
    
    try {
      isTrackingRef.current = true;
      const sessionId = getSessionId();
      
      const eventData = {
        event_type: eventType,
        event_name: eventName,
        page_url: location.pathname,
        session_id: sessionId,
        properties: {
          timestamp: new Date().toISOString(),
          ...properties
        }
      };

      // Use a simple timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 3000)
      );

      const insertPromise = supabase.from('analytics_events').insert(eventData);

      await Promise.race([insertPromise, timeoutPromise]);
    } catch (error) {
      // Silent fail - don't let analytics break the app
      console.warn('Analytics tracking failed:', error);
    } finally {
      isTrackingRef.current = false;
    }
  }, [location.pathname, getSessionId]);

  // Track page view
  const trackPageView = useCallback(async () => {
    await trackEvent('page_view', 'Page View', {
      title: document.title,
      referrer: document.referrer || null
    });
  }, [trackEvent]);

  // Set up minimal tracking
  useEffect(() => {
    // Track page view with delay to ensure DOM is ready
    const timer = setTimeout(() => {
      trackPageView().catch(() => {
        // Silent fail
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, trackPageView]);

  return {
    trackEvent,
    trackPageView
  };
};