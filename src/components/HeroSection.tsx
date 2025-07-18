import React, { useEffect, useState } from 'react';
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
  // Start with defaults immediately visible
  const [content, setContent] = useState<HeroContent>({
    title: 'The Future of Healthcare',
    description: 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
    button_text: 'Request Demo',
    button_url: '#',
    background_video_url: 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4' // Always show video immediately
  });

  useEffect(() => {
    // Load database content in background without blocking
    const loadHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'hero')
          .eq('is_active', true)
          .maybeSingle();

        if (data && !error) {
          console.log('Loaded hero content from database:', data);
          setContent({
            title: data.title || 'The Future of Healthcare',
            subtitle: data.subtitle || '',
            description: data.description || 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
            button_text: data.button_text || 'Request Demo',
            button_url: data.button_url || '#',
            // Only replace video if database has one, otherwise keep default
            background_video_url: data.background_video_url || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
          });
        }
      } catch (error) {
        console.error('Error loading hero content from database:', error);
      }
    };

    // Load in background after initial render
    setTimeout(loadHeroContent, 10);
  }, []);

  return (
    <section className="pt-32 pb-32 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden h-screen flex items-center">
      {/* Video Background - Always show immediately */}
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          key={content.background_video_url} // Force re-render when URL changes
          src={content.background_video_url}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Bottom blur gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/20 to-transparent backdrop-blur-sm z-20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white text-shadow-white leading-none tracking-tight font-black transition-transform duration-500 hover:scale-105 font-apple"
              style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title}
          </h1>
          <p className="text-white/90 mt-8 text-xl leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>
          
          {/* Button */}
          <div className="flex justify-center items-center mt-12">
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
              >
                <span className="relative z-10 flex items-center justify-center">
                  {content.button_text}
                </span>
              </Button>
            </LeadCaptureModal>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce-gentle hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/40 rounded-full flex justify-center relative overflow-hidden hover:border-white/60 transition-colors duration-300">
            <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/60 rounded-full mt-2 sm:mt-3 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
