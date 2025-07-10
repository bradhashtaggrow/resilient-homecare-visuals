import React, { ReactNode } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
  trackingId?: string;
  trackingProperties?: Record<string, any>;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ 
  children
}) => {
  return (
    <div>
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