import React, { useEffect } from 'react';
import { useAnalyticsTracking } from '@/hooks/useAnalyticsTracking';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  // Initialize analytics tracking for the entire app
  const { 
    trackPageView,
    trackCustomEvent,
    trackButtonClick,
    trackFormSubmission 
  } = useAnalyticsTracking();

  useEffect(() => {
    // Track initial app load
    trackCustomEvent('App Load', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      url: window.location.href
    });

    // Track visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackCustomEvent('Tab Focus', { timestamp: new Date().toISOString() });
      } else {
        trackCustomEvent('Tab Blur', { timestamp: new Date().toISOString() });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track window resize
    const handleResize = () => {
      trackCustomEvent('Window Resize', {
        width: window.innerWidth,
        height: window.innerHeight,
        timestamp: new Date().toISOString()
      });
    };

    window.addEventListener('resize', handleResize);

    // Track scroll depth milestones
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        trackCustomEvent('Scroll Depth', {
          depth: scrollPercent,
          timestamp: new Date().toISOString()
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Track outbound link clicks
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href) {
        const isExternal = target.hostname !== window.location.hostname;
        if (isExternal) {
          trackCustomEvent('External Link Click', {
            url: target.href,
            text: target.textContent?.trim(),
            timestamp: new Date().toISOString()
          });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Clean up event listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [trackCustomEvent]);

  // Provide tracking functions to child components via window object
  useEffect(() => {
    (window as any).analytics = {
      track: trackCustomEvent,
      trackButton: trackButtonClick,
      trackForm: trackFormSubmission,
      trackPage: trackPageView
    };

    return () => {
      delete (window as any).analytics;
    };
  }, [trackCustomEvent, trackButtonClick, trackFormSubmission, trackPageView]);

  return <>{children}</>;
};