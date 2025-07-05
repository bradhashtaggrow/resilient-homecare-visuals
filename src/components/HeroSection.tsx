
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import OptimizedVideo from './OptimizedVideo';

const HeroSection = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden will-change-transform">
      {/* Optimized Video Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Minimal dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Enhanced Hero Content with Mobile Optimization */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Enhanced Apple-Style Title with Mobile Typography */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105" 
                style={{ fontSize: 'clamp(2rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
              The Future of Healthcare
            </h1>
          </div>
          
          {/* Enhanced Subtitle with Better Mobile Spacing */}
          <p className="text-white/90 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(1rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.
          </p>
          
          {/* Enhanced 3D Animated Button with Mobile Optimization */}
          <div className="flex justify-center items-center mb-12 sm:mb-16">
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
                Request Demo
                <ArrowRight className="ml-2 sm:ml-4 h-6 w-6 sm:h-8 sm:w-8 group-hover:translate-x-3 transition-transform duration-500" />
              </span>
            </Button>
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
