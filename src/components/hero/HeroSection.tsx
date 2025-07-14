
import React from 'react';
import OptimizedVideo from '@/components/OptimizedVideo';

interface HeroSectionProps {
  title: string;
  highlightedText: string;
  backgroundVideoUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, highlightedText, backgroundVideoUrl }) => {
  return (
    <section className="pt-32 pb-32 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden h-[600px] flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          key={backgroundVideoUrl} // Force re-render when URL changes
          src={backgroundVideoUrl || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Bottom blur gradient effect that extends beyond section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/20 to-transparent backdrop-blur-sm z-20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105 font-apple" 
              style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {title}<br />
            <span className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent">{highlightedText}</span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
