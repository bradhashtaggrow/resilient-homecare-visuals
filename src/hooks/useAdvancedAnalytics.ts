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
      // Using ipapi.co for IP geolocation (free tier)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      const geoData: GeolocationData = {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        region: data.region || 'Unknown',
        latitude: data.latitude ? parseFloat(data.latitude) : undefined,
        longitude: data.longitude ? parseFloat(data.longitude) : undefined,
        timezone: data.timezone || 'Unknown',
        isp: data.org || 'Unknown'
      };
      
      geolocationRef.current = geoData;
      return geoData;
    } catch (error) {
      // Set fallback data to prevent repeated requests
      const fallbackData: GeolocationData = {
        country: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        timezone: 'Unknown',
        isp: 'Unknown'
      };
      
      geolocationRef.current = fallbackData;
      console.warn('Geolocation service unavailable, using fallback data');
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
      
      await supabase.from('analytics_events').insert({
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
          deviceInfo,
          geolocation: geoData as Record<string, any>,
          element_id: event.element_id,
          element_type: event.element_type,
          element_text: event.element_text,
          scroll_depth: event.scroll_depth,
          time_on_page: event.time_on_page,
          mouse_position: event.mouse_position,
          timestamp: new Date().toISOString(),
          url_hash: location.hash,
          url_search: location.search
        }
      });
    } catch (error) {
      console.error('Error tracking event:', error);
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

    // Update or create session
    try {
      const sessionId = getSessionId();
      const geoData = await getGeolocation();
      const deviceInfo = getDeviceInfo();

      const sessionData = {
        session_id: sessionId,
        entry_page: pageUrl,
        referrer: document.referrer || null,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        country: geoData.country,
        city: geoData.city
      };

      // Try to insert, if it fails (duplicate), update instead
      const { error } = await supabase.from('analytics_sessions').insert(sessionData);
      
      if (error && error.code === '23505') {
        // Session exists, update it
        await supabase
          .from('analytics_sessions')
          .update({ 
            page_count: 1, // Will be incremented by trigger
            exit_page: pageUrl 
          })
          .eq('session_id', sessionId);
      }
    } catch (error) {
      console.error('Error updating session:', error);
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
    trackPageView();

    // Track clicks on all interactive elements
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.onclick)) {
        trackClick(target, {
          mouse_position: { x: event.clientX, y: event.clientY }
        });
      }
    };

    // Track scroll depth
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollDepth = Math.round((scrolled / scrollHeight) * 100);
      trackScrollDepth(scrollDepth);
    };

    // Track time on page intervals
    const timeInterval = setInterval(trackTimeOnPage, 30000); // Every 30 seconds

    // Track before page unload
    const handleBeforeUnload = () => {
      trackTimeOnPage();
    };

    // Track visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackTimeOnPage();
      }
    };

    // Track mouse movement (sampled)
    let mouseMoveCount = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseMoveCount++;
      if (mouseMoveCount % 100 === 0) { // Sample every 100th movement
        trackEvent({
          event_type: 'interaction',
          event_name: 'Mouse Movement',
          mouse_position: { x: event.clientX, y: event.clientY },
          properties: {
            movement_count: mouseMoveCount
          }
        });
      }
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timeInterval);
    };
  }, [location.pathname, trackPageView, trackClick, trackScrollDepth, trackTimeOnPage, trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackClick,
    trackScrollDepth,
    trackTimeOnPage,
    trackFormInteraction
  };
};