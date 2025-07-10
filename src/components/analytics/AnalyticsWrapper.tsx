import React, { ReactNode } from 'react';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  // Analytics temporarily disabled to prevent runtime errors
  return <>{children}</>;
};

export default AnalyticsWrapper;