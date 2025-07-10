import React, { ReactNode } from 'react';
import { useAdvancedAnalytics } from '@/hooks/useAdvancedAnalytics';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  // Initialize analytics tracking with proper error handling
  useAdvancedAnalytics();

  return <>{children}</>;
};

export default AnalyticsWrapper;