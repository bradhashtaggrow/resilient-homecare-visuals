
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const dynamicTexts = [
    "Extend Hospital-Level Care Into the Home",
    "Transform Patient Recovery Experience", 
    "Revolutionize Healthcare Delivery"
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
      {/* Revolutionary Video Background */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-700/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Revolutionary Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1500 ${isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'}`}>
          {/* Dynamic Headline */}
          <div className="mb-8 h-32 flex items-center justify-center">
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight">
              <span className="block healthcare-text-gradient text-shadow-blue animate-pulse-slow">
                {dynamicTexts[textIndex]}
              </span>
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Reimagine patient recovery, reduce readmissions by 25%, and empower 
            clinicians with our revolutionary AI-powered home healthcare platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="healthcare-gradient hover:scale-110 transition-all duration-500 text-xl px-12 py-8 shadow-2xl hover:shadow-blue-500/25 group"
            >
              Request Live Demo
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-500 text-xl px-12 py-8 hover:scale-110 group"
            >
              <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform" />
              Watch Revolution
            </Button>
          </div>

          {/* Revolutionary Trust Indicators */}
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-8 text-blue-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm">Patients Served</div>
              </div>
              <div className="w-px h-12 bg-blue-300/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25%</div>
                <div className="text-sm">Fewer Readmissions</div>
              </div>
              <div className="w-px h-12 bg-blue-300/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">94%</div>
                <div className="text-sm">Patient Satisfaction</div>
              </div>
            </div>
            
            <p className="text-blue-200 text-lg">Trusted by healthcare professionals nationwide</p>
            <div className="flex justify-center items-center space-x-12 opacity-70">
              {['Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 'Kaiser Permanente'].map((name) => (
                <div key={name} className="px-6 py-3 bg-white/10 rounded-xl backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-colors">
                  {name}
                </div>
              ))}
            </div>
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
