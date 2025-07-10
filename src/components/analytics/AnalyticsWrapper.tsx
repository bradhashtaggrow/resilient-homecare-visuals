import React, { ReactNode } from 'react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';

interface AnalyticsWrapperProps {
  children: ReactNode;
  trackingId?: string;
  trackingProperties?: Record<string, any>;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ 
  children, 
  trackingId, 
  trackingProperties 
}) => {
  const { trackEvent } = useAdvancedAnalytics();

  const handleClick = (event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;
    
    trackEvent({
      event_type: 'click',
      event_name: 'Element Click',
      element_id: trackingId || target.id,
      element_type: target.tagName.toLowerCase(),
      element_text: target.textContent?.trim() || '',
      properties: {
        ...trackingProperties,
        component: 'AnalyticsWrapper',
        timestamp: new Date().toISOString()
      }
    });
  };

  const handleMouseEnter = () => {
    if (trackingId) {
      trackEvent({
        event_type: 'hover',
        event_name: 'Element Hover',
        element_id: trackingId,
        properties: {
          ...trackingProperties,
          action: 'hover_start'
        }
      });
    }
  };

  const handleFocus = () => {
    if (trackingId) {
      trackEvent({
        event_type: 'focus',
        event_name: 'Element Focus',
        element_id: trackingId,
        properties: {
          ...trackingProperties,
          action: 'focus'
        }
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      data-analytics-id={trackingId}
    >
      {children}
    </div>
  );
};

// HOC for automatic tracking
export const withAnalytics = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  trackingConfig?: {
    trackingId?: string;
    trackingProperties?: Record<string, any>;
  }
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <AnalyticsWrapper {...trackingConfig}>
      <Component {...(props as P)} />
    </AnalyticsWrapper>
  ));
  
  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`;
  return WrappedComponent;
};