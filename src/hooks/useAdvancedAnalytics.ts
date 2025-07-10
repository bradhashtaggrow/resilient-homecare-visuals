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
  const isInitializedRef = useRef<boolean>(false);
  const cleanupFunctionsRef = useRef<(() => void)[]>([]);

  // Get or create session ID with error handling
  const getSessionId = useCallback(() => {
    try {
      if (!sessionRef.current) {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('analytics_session_id', sessionId);
        }
        sessionRef.current = sessionId;
      }
      return sessionRef.current;
    } catch (error) {
      // Fallback if sessionStorage fails
      if (!sessionRef.current) {
        sessionRef.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      return sessionRef.current;
    }
  }, []);

  // Get geolocation data with proper error handling
  const getGeolocation = useCallback(async (): Promise<GeolocationData> => {
    if (geolocationRef.current) return geolocationRef.current;
    
    const fallbackData: GeolocationData = {
      country: 'Unknown',
      city: 'Unknown',
      region: 'Unknown',
      timezone: 'Unknown',
      isp: 'Unknown'
    };
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        const geoData: GeolocationData = {
          country: data.country_name || 'Unknown',
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          timezone: data.timezone || 'Unknown',
          isp: data.org || 'Unknown'
        };
        geolocationRef.current = geoData;
        return geoData;
      }
    } catch (error) {
      // Silent fail, use fallback
    }
    
    geolocationRef.current = fallbackData;
    return fallbackData;
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

  // Track any event with robust error handling
  const trackEvent = useCallback(async (event: TrackingEvent) => {
    // Don't track during initialization or if already cleaning up
    if (!isInitializedRef.current) return;
    
    try {
      const sessionId = getSessionId();
      const geoData = await getGeolocation();
      const deviceInfo = getDeviceInfo();
      
      const eventData = {
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
          element_id: event.element_id,
          element_type: event.element_type,
          element_text: event.element_text,
          scroll_depth: event.scroll_depth,
          time_on_page: event.time_on_page,
          mouse_position: event.mouse_position,
          timestamp: new Date().toISOString()
        }
      };

      // Use timeout to prevent hanging
      const insertPromise = supabase.from('analytics_events').insert(eventData);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 5000)
      );

      await Promise.race([insertPromise, timeoutPromise]);
    } catch (error) {
      // Silent fail - analytics should never break the app
      console.warn('Analytics event failed:', error);
    }
  }, [location.pathname, getSessionId, getGeolocation, getDeviceInfo]);

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

  // Set up analytics with proper initialization and cleanup
  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current) return;
    
    // Initialize after a small delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      try {
        isInitializedRef.current = true;
        
        // Track initial page view
        trackPageView().catch(() => {
          console.warn('Initial page view tracking failed');
        });

        // Set up event listeners with proper error handling
        const handleClick = (event: MouseEvent) => {
          try {
            const target = event.target as HTMLElement;
            if (target && (target.tagName === 'BUTTON' || target.tagName === 'A')) {
              trackClick(target, {
                mouse_position: { x: event.clientX, y: event.clientY }
              }).catch(() => {
                // Silent fail
              });
            }
          } catch (error) {
            console.warn('Click tracking failed:', error);
          }
        };

        const handleScroll = () => {
          try {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            if (scrollHeight > 0) {
              const scrollDepth = Math.round((scrolled / scrollHeight) * 100);
              trackScrollDepth(scrollDepth).catch(() => {
                // Silent fail
              });
            }
          } catch (error) {
            console.warn('Scroll tracking failed:', error);
          }
        };

        const handleBeforeUnload = () => {
          try {
            trackTimeOnPage().catch(() => {
              // Silent fail
            });
          } catch (error) {
            console.warn('Time tracking failed:', error);
          }
        };

        // Add event listeners
        document.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Store cleanup functions
        cleanupFunctionsRef.current = [
          () => document.removeEventListener('click', handleClick),
          () => window.removeEventListener('scroll', handleScroll),
          () => window.removeEventListener('beforeunload', handleBeforeUnload)
        ];
        
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
        isInitializedRef.current = false;
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      isInitializedRef.current = false;
      
      // Clean up all event listeners
      cleanupFunctionsRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Cleanup failed:', error);
        }
      });
      cleanupFunctionsRef.current = [];
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