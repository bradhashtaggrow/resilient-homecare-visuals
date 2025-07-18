import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import OptimizedVideo from './OptimizedVideo';
import LeadCaptureModal from './LeadCaptureModal';
import { supabase } from '@/integrations/supabase/client';

interface HeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_video_url?: string;
  background_image_url?: string;
  mobile_background_url?: string;
}

const HeroSection = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<HeroContent>({
    title: 'The Future of Healthcare',
    description: 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
    button_text: 'Request Demo',
    button_url: '#',
    background_video_url: '' // Start empty, only show database video
  });

  useEffect(() => {
    // Load hero content from database with performance optimization
    const loadHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'hero')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded hero content from database:', data);
          
          setContent({
            title: data.title || 'The Future of Healthcare',
            subtitle: data.subtitle || '',
            description: data.description || 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
            button_text: data.button_text || 'Request Demo',
            button_url: data.button_url || '#',
            background_video_url: data.background_video_url || '' // No fallback, only database video
          });
        } else {
          console.log('No hero content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading hero content from database:', error);
      }
    };

    loadHeroContent();

    // Listen for optimized real-time updates
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && data?.section_key === 'hero') {
        console.log('Hero content updated via optimized sync:', data);
        loadHeroContent();
      }
    };

    window.addEventListener('content-sync-update', handleContentUpdate as EventListener);

    return () => {
      window.removeEventListener('content-sync-update', handleContentUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation timing
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 20px 48px rgba(0, 128, 255, 0.6),
      0 8px 24px rgba(0, 0, 0, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 12px rgba(0, 0, 0, 0.2)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
  }, []);

  const handleButtonLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 12px 32px rgba(0, 128, 255, 0.4),
      0 4px 16px rgba(0, 0, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 8px rgba(0, 0, 0, 0.1)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
  }, []);

  const handleButtonClick = () => {
    if (content.button_url && content.button_url !== '#') {
      window.open(content.button_url, '_blank');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform">
      {/* Database Video Only - Instant Load */}
      {content?.background_video_url && (
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            key={content.background_video_url}
            src={content.background_video_url}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Mobile Background */}
      {content?.mobile_background_url && (
        <div className="absolute inset-0 z-0 md:hidden">
          <img
            src={content.mobile_background_url}
            alt="Mobile hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Enhanced Hero Content with Mobile Optimization */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Enhanced Apple-Style Title with Mobile Typography */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105" 
                style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
              {content.title}
            </h1>
          </div>
          
          {/* Enhanced Subtitle with Better Mobile Spacing */}
          <p className="text-white/90 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            {content.description}
          </p>
          
          {/* Enhanced 3D Animated Button with Mobile Optimization */}
          <div className="flex justify-center items-center mb-12 sm:mb-16">
            <LeadCaptureModal source="hero-button">
              <Button 
                size="lg" 
                className="group relative px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:-translate-y-3 w-full sm:w-auto max-w-xs sm:max-w-none will-change-transform"
                style={{
                  background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                  boxShadow: `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {content.button_text}
                </span>
              </Button>
            </LeadCaptureModal>
          </div>
        </div>
      </div>

      {/* Enhanced Modern Scroll Indicator with Mobile Optimization */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce-gentle hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/40 rounded-full flex justify-center relative overflow-hidden hover:border-white/60 transition-colors duration-300">
            <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/60 rounded-full mt-2 sm:mt-3 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
