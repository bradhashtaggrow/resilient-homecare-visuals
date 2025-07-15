import React, { useEffect } from 'react';
import { optimizedQueries } from '@/utils/optimizedQueries';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  pageName: string;
}

export const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children, pageName }) => {
  useEffect(() => {
    // Mark page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      const markName = `${pageName}-loaded`;
      performance.mark(markName);
      
      // Report to console in development
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          const entries = performance.getEntriesByName(markName);
          if (entries.length > 0) {
            console.log(`📊 ${pageName} page loaded in:`, entries[0].startTime, 'ms');
          }
        }, 100);
      }
    }

    // Preload data for common next pages
    const preloadData = async () => {
      if (pageName === 'home') {
        // Preload common page data
        optimizedQueries.preloadCriticalData();
      }
    };

    const timer = setTimeout(preloadData, 2000); // Preload after 2 seconds
    return () => clearTimeout(timer);
  }, [pageName]);

  return <>{children}</>;
};

// Hook for performance monitoring
export const usePagePerformance = (pageName: string) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`⚡ ${pageName} component lifetime:`, Math.round(duration), 'ms');
        
        // Warn if component takes too long
        if (duration > 1000) {
          console.warn(`⚠️  ${pageName} component took ${Math.round(duration)}ms - consider optimization`);
        }
      }
    };
  }, [pageName]);
};