import React, { useEffect, useState, useCallback } from 'react';
import AdminAnimatedBackground from './admin/AdminAnimatedBackground';
import AdminLaptopVisualization from './admin/AdminLaptopVisualization';
import { useDemoScreens } from './admin/AdminDemoScreens';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import LeadCaptureModal from './LeadCaptureModal';

interface AdminDashboardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_video_url?: string;
  background_image_url?: string;
  content_data?: any;
}

const AdminDashboard = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [laptopOpen, setLaptopOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [content, setContent] = useState<AdminDashboardContent>({
    title: 'Take Full Control Your Business',
    description: 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.',
    button_text: 'Request Demo',
    button_url: '#'
  });
  const demoScreens = useDemoScreens();

  useEffect(() => {
    // Load admin dashboard content from database
    const loadAdminContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'admin_dashboard')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded admin dashboard content from database:', data);
          
          setContent({
            title: data.title || 'Take Full Control Your Business',
            subtitle: data.subtitle || '',
            description: data.description || 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.',
            button_text: data.button_text || 'Request Demo',
            button_url: data.button_url || '#',
            background_video_url: data.background_video_url,
            background_image_url: data.background_image_url,
            content_data: data.content_data
          });
        } else {
          console.log('No admin dashboard content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading admin dashboard content from database:', error);
      }
    };

    loadAdminContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('admin-dashboard-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.admin_dashboard'
      }, (payload) => {
        console.log('Real-time admin dashboard content change:', payload);
        loadAdminContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setLaptopOpen(true), 800);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
    const element = document.getElementById('admin-dashboard');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    if (laptopOpen) {
      const interval = setInterval(() => {
        setActiveDemo((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [laptopOpen]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 20px 48px hsl(210 100% 50% / 0.6),
      0 8px 24px rgba(0, 0, 0, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 12px rgba(0, 0, 0, 0.2)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, hsl(210 100% 60%) 0%, hsl(210 100% 50%) 30%, hsl(210 100% 37%) 100%)';
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 12px 32px hsl(210 100% 50% / 0.4),
      0 4px 16px rgba(0, 0, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 8px rgba(0, 0, 0, 0.1)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, hsl(210 100% 50%) 0%, hsl(210 100% 37%) 30%, hsl(210 100% 27%) 100%)';
  }, []);

  const handleButtonClick = () => {
    if (content.button_url && content.button_url !== '#') {
      window.open(content.button_url, '_blank');
    }
  };

  return (
    <section id="admin-dashboard" className="py-20 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-gray-900">
        <AdminAnimatedBackground />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Title with Mobile Optimization - Using reverse swoop */}
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1200 transform ${
          isVisible ? 'animate-swoop-in-reverse opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-white leading-none tracking-tight font-black text-shadow-white mb-6 sm:mb-8 hover:scale-105 transition-transform duration-700"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title?.includes('.') ? (
              <>
                {content.title.split('.')[0]}.
                <span className="block healthcare-text-gradient hover:from-blue-300 hover:to-purple-300 transition-all duration-500">
                  {content.title.split('.').slice(1).join('.').trim()}
                </span>
              </>
            ) : (
              content.title
            )}
          </h2>
          <p className="text-white/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            {content.description}
          </p>
        </div>

        {/* Enhanced Laptop Container with Reduced Bottom Margin */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className={`transition-all duration-1200 transform hover:scale-105 ${
            isVisible ? 'animate-swoop-in-reverse opacity-100' : 'opacity-0'
          }`} style={{animationDelay: '400ms'}}>
            <AdminLaptopVisualization 
              isVisible={isVisible}
              laptopOpen={laptopOpen}
              activeDemo={activeDemo}
              demoScreens={demoScreens}
            />
          </div>
        </div>

        {/* Enhanced CTA Section with Tighter Spacing */}
        <div className={`text-center pt-0 transition-all duration-1200 transform ${
          isVisible ? 'animate-swoop-in-reverse opacity-100' : 'opacity-0'
        }`} style={{animationDelay: '800ms'}}>
          <h3 className="text-white leading-none tracking-tight font-black text-shadow-white mb-3 sm:mb-4 hover:scale-105 transition-transform duration-500"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {content.content_data?.cta_headline || 'Ready to Transform Your Healthcare Operations?'}
          </h3>
          <p className="text-white/90 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide mb-6 sm:mb-8 hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)', lineHeight: 1.4 }}>
            {content.content_data?.cta_description || 'Join forward-thinking healthcare organizations who\'ve already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration.'}
          </p>
          <LeadCaptureModal source="admin-dashboard-button">
            <Button 
              size="lg"
              className="group relative px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:-translate-y-3 w-full sm:w-auto"
              style={{
                background: 'linear-gradient(145deg, hsl(210 100% 50%) 0%, hsl(210 100% 37%) 30%, hsl(210 100% 27%) 100%)',
                boxShadow: `
                  0 12px 32px hsl(210 100% 50% / 0.4),
                  0 4px 16px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleButtonClick}
            >
              <span className="relative z-10 flex items-center justify-center">
                {content.button_text}
              </span>
            </Button>
          </LeadCaptureModal>
        </div>
      </div>
    </section>
  );
});

AdminDashboard.displayName = 'AdminDashboard';

export default AdminDashboard;
