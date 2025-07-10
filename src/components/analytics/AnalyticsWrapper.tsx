import React, { ReactNode } from 'react';
import { useSimpleAnalytics } from '@/hooks/useSimpleAnalytics';

interface AnalyticsWrapperProps {
  children: ReactNode;
}

export const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  // Initialize simple analytics tracking
  useSimpleAnalytics();

  return <>{children}</>;
};

export default AnalyticsWrapper;