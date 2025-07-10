import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface GeolocationData {
  country?: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
}

interface TrackingEvent {
  event_type: string;
  event_name: string;
  page_url?: string;
  properties?: Record<string, any>;
  element_id?: string;
  element_type?: string;
  element_text?: string;
  scroll_depth?: number;
  time_on_page?: number;
  mouse_position?: { x: number; y: number };
}

export const useAdvancedAnalytics = () => {
  const location = useLocation();
  const sessionRef = useRef<string | null>(null);
  const pageStartTime = useRef<Date>(new Date());
  const scrollDepthRef = useRef<number>(0);
  const geolocationRef = useRef<GeolocationData | null>(null);

  // Get or create session ID
  const getSessionId = useCallback(() => {
    if (!sessionRef.current) {
      let sessionId = sessionStorage.getItem('analytics_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analytics_session_id', sessionId);
      }
      sessionRef.current = sessionId;
    }
    return sessionRef.current;
  }, []);

  // Get geolocation data from IP
  const getGeolocation = useCallback(async () => {
    if (geolocationRef.current) return geolocationRef.current;
    
    try {
      // Skip geolocation API calls to prevent errors
      const fallbackData: GeolocationData = {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown',
        isp: 'Unknown'
      };
      
      geolocationRef.current = fallbackData;
      return fallbackData;
    } catch (error) {
      const fallbackData: GeolocationData = {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown',
        isp: 'Unknown'
      };
      
      geolocationRef.current = fallbackData;
      return fallbackData;
    }
  }, []);

  // Enhanced device detection
  const getDeviceInfo = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    let deviceType = 'desktop';
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      deviceType = 'mobile';
    }

    let browser = 'Unknown';
    if (userAgent.includes('firefox')) browser = 'Firefox';
    else if (userAgent.includes('chrome')) browser = 'Chrome';
    else if (userAgent.includes('safari')) browser = 'Safari';
    else if (userAgent.includes('edge')) browser = 'Edge';
    else if (userAgent.includes('opera')) browser = 'Opera';

    let os = 'Unknown';
    if (userAgent.includes('windows')) os = 'Windows';
    else if (userAgent.includes('mac')) os = 'macOS';
    else if (userAgent.includes('linux')) os = 'Linux';
    else if (userAgent.includes('android')) os = 'Android';
    else if (userAgent.includes('ios')) os = 'iOS';

    return {
      deviceType,
      browser,
      os,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: screen.colorDepth,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine
    };
  }, []);

  // Track any event with enhanced data
  const trackEvent = useCallback(async (event: TrackingEvent) => {
    try {
      const sessionId = getSessionId();
      const geoData = await getGeolocation();
      const deviceInfo = getDeviceInfo();
      
      // Simplified database insert with error handling
      const { error } = await supabase.from('analytics_events').insert({
        event_type: event.event_type,
        event_name: event.event_name,
        page_url: event.page_url || location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: sessionId,
        country: geoData.country || null,
        city: geoData.city || null,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        properties: {
          ...event.properties,
          timestamp: new Date().toISOString()
        }
      });
      
      if (error) {
        console.warn('Analytics tracking failed:', error.message);
      }
    } catch (error) {
      // Silent fail to prevent app crashes
      console.warn('Analytics tracking error:', error);
    }
  }, [location, getSessionId, getGeolocation, getDeviceInfo]);

  // Track page view with enhanced data
  const trackPageView = useCallback(async (customUrl?: string) => {
    const pageUrl = customUrl || location.pathname;
    pageStartTime.current = new Date();
    scrollDepthRef.current = 0;

    await trackEvent({
      event_type: 'page_view',
      event_name: 'Page View',
      page_url: pageUrl,
      properties: {
        title: document.title,
        page_load_time: performance.now(),
        connection_type: (navigator as any).connection?.effectiveType || 'unknown'
      }
    });

    // Simplified session tracking
    try {
      const sessionId = getSessionId();
      const geoData = await getGeolocation();
      const deviceInfo = getDeviceInfo();

      // Check if session exists first
      const { data: existingSession } = await supabase
        .from('analytics_sessions')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (!existingSession) {
        // Only insert if session doesn't exist
        await supabase.from('analytics_sessions').insert({
          session_id: sessionId,
          entry_page: pageUrl,
          referrer: document.referrer || null,
          device_type: deviceInfo.deviceType,
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          country: geoData.country,
          city: geoData.city
        });
      }
    } catch (error) {
      // Silent fail to prevent crashes
      console.warn('Session tracking error:', error);
    }
  }, [location, trackEvent, getSessionId, getGeolocation, getDeviceInfo]);

  // Track button/link clicks
  const trackClick = useCallback(async (element: HTMLElement, customProperties?: Record<string, any>) => {
    const elementInfo = {
      element_id: element.id,
      element_type: element.tagName.toLowerCase(),
      element_text: element.textContent?.trim() || '',
      element_class: element.className,
      element_href: element.getAttribute('href'),
      element_value: element.getAttribute('value')
    };

    await trackEvent({
      event_type: 'click',
      event_name: 'Element Click',
      ...elementInfo,
      properties: {
        ...customProperties,
        ...elementInfo,
        mouse_position: { x: 0, y: 0 } // Will be set by actual click handler
      }
    });
  }, [trackEvent]);

  // Track scroll depth
  const trackScrollDepth = useCallback(async (depth: number) => {
    if (depth > scrollDepthRef.current) {
      scrollDepthRef.current = depth;
      
      // Track milestone scroll depths
      const milestones = [25, 50, 75, 100];
      const milestone = milestones.find(m => depth >= m && scrollDepthRef.current < m);
      
      if (milestone) {
        await trackEvent({
          event_type: 'scroll',
          event_name: `Scroll ${milestone}%`,
          scroll_depth: depth,
          time_on_page: Math.floor((Date.now() - pageStartTime.current.getTime()) / 1000)
        });
      }
    }
  }, [trackEvent]);

  // Track time on page
  const trackTimeOnPage = useCallback(async () => {
    const timeOnPage = Math.floor((Date.now() - pageStartTime.current.getTime()) / 1000);
    
    await trackEvent({
      event_type: 'engagement',
      event_name: 'Time on Page',
      time_on_page: timeOnPage,
      scroll_depth: scrollDepthRef.current
    });
  }, [trackEvent]);

  // Track form interactions
  const trackFormInteraction = useCallback(async (formElement: HTMLFormElement, action: 'focus' | 'submit' | 'abandon') => {
    const formData = new FormData(formElement);
    const formFields = Array.from(formData.keys());

    await trackEvent({
      event_type: 'form',
      event_name: `Form ${action}`,
      element_id: formElement.id,
      element_type: 'form',
      properties: {
        form_fields: formFields,
        form_action: formElement.action,
        form_method: formElement.method
      }
    });
  }, [trackEvent]);

  // Set up global event listeners
  useEffect(() => {
    // Track page view on route change
    try {
      trackPageView();
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }

    // Simplified click tracking
    const handleClick = (event: MouseEvent) => {
      try {
        const target = event.target as HTMLElement;
        if (target && (target.tagName === 'BUTTON' || target.tagName === 'A')) {
          trackClick(target, {
            mouse_position: { x: event.clientX, y: event.clientY }
          }).catch(e => console.warn('Click tracking failed:', e));
        }
      } catch (error) {
        console.warn('Click handler error:', error);
      }
    };

    // Simplified scroll tracking with throttling
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        try {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = window.scrollY;
          const scrollDepth = Math.round((scrolled / scrollHeight) * 100);
          trackScrollDepth(scrollDepth).catch(e => console.warn('Scroll tracking failed:', e));
        } catch (error) {
          console.warn('Scroll handler error:', error);
        }
      }, 250);
    };

    // Simplified cleanup tracking
    const handleBeforeUnload = () => {
      try {
        trackTimeOnPage().catch(e => console.warn('Time tracking failed:', e));
      } catch (error) {
        console.warn('Before unload error:', error);
      }
    };

    // Add essential event listeners only
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(scrollTimeout);
    };
  }, [location.pathname, trackPageView, trackClick, trackScrollDepth, trackTimeOnPage]);

  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackScrollDepth,
    trackTimeOnPage,
    trackFormInteraction
  };
};