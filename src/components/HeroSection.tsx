import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
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
  // Instant defaults - no loading state
  const [heroData, setHeroData] = useState<HeroContent>({
    title: 'The Future of Healthcare',
    description: 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
    button_text: 'Request Demo',
    button_url: '#',
    background_video_url: ''
  });

  // Background database sync - non-blocking
  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'hero')
          .eq('is_active', true)
          .maybeSingle();

        if (data?.background_video_url) {
          setHeroData(prev => ({
            ...prev,
            title: data.title || prev.title,
            description: data.description || prev.description,
            button_text: data.button_text || prev.button_text,
            button_url: data.button_url || prev.button_url,
            background_video_url: data.background_video_url
          }));
        }
      } catch (error) {
        // Fail silently, keep defaults
      }
    };
    
    loadContent();
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {heroData.background_video_url && (
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src={heroData.background_video_url}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-white leading-none tracking-tight font-black text-shadow-white" 
              style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {heroData.title}
          </h1>
        </div>
        
        <p className="text-white/90 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-medium"
           style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', lineHeight: 1.3 }}>
          {heroData.description}
        </p>
        
        <div className="flex justify-center items-center mb-12 sm:mb-16">
          <LeadCaptureModal source="hero-button">
            <Button 
              size="lg" 
              className="group relative px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:-translate-y-3 w-full sm:w-auto max-w-xs sm:max-w-none"
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
                {heroData.button_text}
              </span>
            </Button>
          </LeadCaptureModal>
        </div>
      </div>

      {/* Scroll Indicator */}
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
