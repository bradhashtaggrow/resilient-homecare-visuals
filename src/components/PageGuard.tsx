import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface PageGuardProps {
  children: React.ReactNode;
}

const PageGuard: React.FC<PageGuardProps> = ({ children }) => {
  const location = useLocation();
  const [isPageEnabled, setIsPageEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPageStatus = async () => {
      try {
        // Get the page name from the pathname
        let pageName = location.pathname.slice(1); // Remove leading slash
        if (pageName === '') pageName = 'home'; // Root path is 'home'
        
        // Skip check for admin routes and special pages
        if (pageName === 'admin' || pageName === 'login' || pageName === 'request-demo' || pageName === '404') {
          setIsPageEnabled(true);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('page_settings')
          .select('is_enabled')
          .eq('page_name', pageName)
          .single();

        if (error) {
          console.error('Error checking page status:', error);
          // If page doesn't exist in settings, allow access by default
          setIsPageEnabled(true);
        } else {
          setIsPageEnabled(data.is_enabled);
        }
      } catch (error) {
        console.error('Error in page guard:', error);
        setIsPageEnabled(true); // Default to enabled on error
      } finally {
        setLoading(false);
      }
    };

    checkPageStatus();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isPageEnabled === false) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PageGuard;