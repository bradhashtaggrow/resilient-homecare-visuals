
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
          <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Light black contrast overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1500 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'}`}>
          {/* Dynamic Headline */}
          <div className="mb-8 h-24 flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              <span className="block text-white animate-pulse-slow">
                {dynamicTexts[textIndex]}
              </span>
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-white mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Discover an easier, more convenient healthcare delivery solution with Resilient Healthcare™. 
            We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-110 transition-all duration-500 text-lg px-10 py-6 shadow-2xl hover:shadow-blue-500/25 group text-white border-0"
            >
              Book An Appointment
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-500 text-lg px-10 py-6 hover:scale-110 group"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-125 transition-transform" />
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-4">
            <div className="flex justify-center items-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">38%</div>
                <div className="text-xs">Cost Savings</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">70%</div>
                <div className="text-xs">Reduction in Readmissions</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">91%</div>
                <div className="text-xs">Patient Preference</div>
              </div>
            </div>
            
            <p className="text-white/80 text-base">We manage the work. You own the program.</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
