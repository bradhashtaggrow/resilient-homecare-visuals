
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const dynamicTexts = [
    "The Future of Healthcare Delivery Is Here",
    "Expand Care Anywhere. Improve Outcomes.", 
    "Capture Revenue."
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Dynamic text rotation
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 4000);
    
    return () => clearInterval(interval);
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
        >
          <source src="https://videos.pexels.com/video-files/8375494/8375494-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Simple overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Simple 3D Edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top edge */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Left edge */}
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        
        {/* Right edge */}
        <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1500 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'}`}>
          {/* Dynamic Headline */}
          <div className="mb-12 h-32 flex items-center justify-center">
            <h1 className="text-revolutionary text-white leading-none tracking-tight font-black">
              <span className="block text-white animate-pulse-slow text-shadow-white">
                {dynamicTexts[textIndex]}
              </span>
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-revolutionary-sub text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed font-medium tracking-wide">
            Discover an easier, more convenient healthcare delivery solution with Resilient Healthcare™. 
            We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="cutting-edge-btn-primary group text-white border-0 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center text-xl font-semibold">
                Book An Appointment
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform duration-500" />
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="cutting-edge-btn-secondary group backdrop-blur-xl"
            >
              <Play className="mr-4 h-6 w-6 group-hover:scale-125 transition-transform duration-500" />
              <span className="text-xl font-semibold">Learn More</span>
            </Button>
          </div>

          {/* Trust Indicators */}
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

      {/* Scroll Indicator */}
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
