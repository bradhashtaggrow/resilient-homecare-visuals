
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onLoadedData={() => console.log('Video data loaded')}
          onError={(e) => {
            console.log('Video failed to load:', e);
            console.log('Video error target:', e.target);
          }}
        >
          <source src="https://videos.pexels.com/video-files/8375494/8375494-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/8375494/8375494-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/8375494/8375494-sd_640_360_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1500 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'}`}>
          {/* Apple-Style Smaller Title */}
          <div className="mb-12">
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white" 
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
              The Future of Healthcare
            </h1>
          </div>
          
          {/* Smaller Subtitle */}
          <p className="text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1.3 }}>
            We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.
          </p>
          
          {/* Single Thick 3D Animated Button */}
          <div className="flex justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="group relative px-16 py-8 text-2xl font-bold rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 20px 48px rgba(0, 128, 255, 0.6),
                  0 8px 24px rgba(0, 0, 0, 0.4),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 12px rgba(0, 0, 0, 0.2)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 12px 32px rgba(0, 128, 255, 0.4),
                  0 4px 16px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
              }}
            >
              <span className="relative z-10 flex items-center">
                Request Demo
                <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform duration-500" />
              </span>
            </Button>
          </div>

          {/* Trust Indicators - Apple Style */}
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-12 text-white/90">
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 tracking-tight">38%</div>
                <div className="text-lg font-medium tracking-wide">Cost Savings</div>
              </div>
              <div className="w-px h-16 bg-white/20" />
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 tracking-tight">70%</div>
                <div className="text-lg font-medium tracking-wide">Reduction in Readmissions</div>
              </div>
              <div className="w-px h-16 bg-white/20" />
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2 tracking-tight">91%</div>
                <div className="text-lg font-medium tracking-wide">Patient Preference</div>
              </div>
            </div>
            
            <p className="text-white/80 text-xl font-medium tracking-wide">We manage the work. You own the program.</p>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce-gentle">
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center relative overflow-hidden">
            <div className="w-1.5 h-4 bg-white/60 rounded-full mt-3 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
