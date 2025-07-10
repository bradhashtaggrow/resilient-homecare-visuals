import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';

export const useAnalyticsTracking = () => {
  const location = useLocation();
  const { trackPageView, trackEvent } = useAnalytics();

  // Track page views on route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  // Track custom events
  const trackCustomEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackEvent({
      event_type: 'custom',
      event_name: eventName,
      page_url: location.pathname,
      properties
    });
  }, [trackEvent, location.pathname]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, context?: string) => {
    trackCustomEvent('Button Click', {
      button_name: buttonName,
      context: context || location.pathname,
      timestamp: new Date().toISOString()
    });
  }, [trackCustomEvent, location.pathname]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    trackCustomEvent('Form Submission', {
      form_name: formName,
      form_data: formData,
      timestamp: new Date().toISOString()
    });
  }, [trackCustomEvent]);

  // Track lead generation
  const trackLeadGeneration = useCallback((leadType: string, leadData?: Record<string, any>) => {
    trackCustomEvent('Lead Generated', {
      lead_type: leadType,
      lead_data: leadData,
      timestamp: new Date().toISOString()
    });
  }, [trackCustomEvent]);

  // Track video interactions
  const trackVideoInteraction = useCallback((action: 'play' | 'pause' | 'complete', videoTitle?: string) => {
    trackCustomEvent('Video Interaction', {
      action,
      video_title: videoTitle,
      timestamp: new Date().toISOString()
    });
  }, [trackCustomEvent]);

  // Track downloads
  const trackDownload = useCallback((fileName: string, fileType?: string) => {
    trackCustomEvent('File Download', {
      file_name: fileName,
      file_type: fileType,
      timestamp: new Date().toISOString()
    });
  }, [trackCustomEvent]);

  return {
    trackPageView,
    trackCustomEvent,
    trackButtonClick,
    trackFormSubmission,
    trackLeadGeneration,
    trackVideoInteraction,
    trackDownload
  };
};