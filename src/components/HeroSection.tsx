
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10" />
        <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
      </div>
      
      {/* Floating Medical Icons */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}} />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Extend Hospital-Level Care
            <span className="block healthcare-text-gradient text-shadow-blue">
              Into the Home
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Reimagine patient recovery, reduce readmissions, and empower clinicians 
            with our comprehensive home healthcare platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="healthcare-gradient hover:scale-105 transition-all duration-300 text-lg px-8 py-6 shadow-2xl"
            >
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg px-8 py-6"
            >
              Watch Overview
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <p className="text-blue-200 text-sm mb-4">Trusted by healthcare professionals nationwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-medium">
              HOSPITAL A
            </div>
            <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-medium">
              CLINIC B
            </div>
            <div className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-medium">
              HEALTH SYS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
