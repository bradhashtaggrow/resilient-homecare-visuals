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

interface DatabaseHeroSectionProps {
  sectionKey: string;
  defaultTitle?: string;
  defaultHighlightedText?: string;
}

const DatabaseHeroSection: React.FC<DatabaseHeroSectionProps> = ({ 
  sectionKey, 
  defaultTitle = 'Default Title',
  defaultHighlightedText = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<HeroContent>({
    title: defaultTitle,
    description: 'Default description text.',
    button_text: 'Request Demo',
    button_url: '#',
    background_video_url: 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
  });

  useEffect(() => {
    const loadHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', sectionKey)
          .eq('is_active', true)
          .single();

        if (data && !error) {
          setContent({
            title: data.title || defaultTitle,
            subtitle: data.subtitle || defaultHighlightedText,
            description: data.description || 'Default description text.',
            button_text: data.button_text || 'Request Demo',
            button_url: data.button_url || '#',
            background_video_url: data.background_video_url || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
            background_image_url: data.background_image_url,
            mobile_background_url: data.mobile_background_url
          });
        }
      } catch (error) {
        console.error('Error loading hero content from database:', error);
      }
    };

    loadHeroContent();

    const channel = supabase
      .channel(`hero-content-changes-${sectionKey}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: `section_key=eq.${sectionKey}`
      }, (payload) => {
        loadHeroContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionKey, defaultTitle, defaultHighlightedText]);

  useEffect(() => {
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

  return (
    <section className="pt-32 pb-32 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden h-[600px] flex items-center">
      {/* Background Media */}
      {content?.background_video_url ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={content.background_video_url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : content?.background_image_url ? (
        <div className="absolute inset-0 z-0">
          <img
            src={content.background_image_url}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src='https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
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
      
      {/* Bottom blur gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/20 to-transparent backdrop-blur-sm z-20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105 font-apple" 
                style={{ fontSize: 'clamp(2rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
              {content.title && content.subtitle ? (
                <>
                  {content.title}<br />
                  <span className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent">
                    {content.subtitle}
                  </span>
                </>
              ) : (
                content.title
              )}
            </h1>
            
            {content.description && (
              <p className="text-white/90 mt-8 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-white transition-colors duration-500"
                 style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', lineHeight: 1.3 }}>
                {content.description}
              </p>
            )}
            
            {content.button_text && (
              <div className="flex justify-center items-center mt-12">
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
                      <ArrowRight className="ml-2 sm:ml-4 h-6 w-6 sm:h-8 sm:w-8 group-hover:translate-x-3 transition-transform duration-500" />
                    </span>
                  </Button>
                </LeadCaptureModal>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatabaseHeroSection;