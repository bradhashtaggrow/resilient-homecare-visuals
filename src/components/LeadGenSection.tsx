
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Star, Award, Shield, Zap } from 'lucide-react';

const LeadGenSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('lead-gen-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="lead-gen-section" 
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden paper-texture-subtle flex items-center min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Enhanced Trust Section with Improved Animations */}
        <div className={`text-center transition-all duration-1200 transform ${
          isVisible ? 'animate-slide-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="healthcare-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden bg-opacity-95 backdrop-blur-sm hover:scale-105 transition-all duration-700 hover:shadow-2xl group">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full -translate-y-16 sm:-translate-y-24 translate-x-16 sm:translate-x-24 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-36 sm:h-36 bg-white/5 rounded-full translate-y-12 sm:translate-y-18 -translate-x-12 sm:-translate-x-18 group-hover:scale-110 transition-transform duration-1000 delay-200" />
            
            <div className="relative z-10">
              <h3 className="text-white leading-none tracking-tight font-black mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
                Join 500+ Healthcare Organizations
              </h3>
              <p className="text-white/90 mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto font-medium tracking-wide group-hover:text-white transition-colors duration-500"
                 style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
                Leading hospitals, health systems, and care providers trust Resilient Healthcare 
                to deliver exceptional patient outcomes and operational excellence.
              </p>
              
              {/* Enhanced Button with Mobile Optimization */}
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group-hover:bg-blue-50 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center">
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>

            {/* Floating Elements for Desktop */}
            <div className="hidden lg:block absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <Star className="h-8 w-8 text-white animate-pulse" />
            </div>
            <div className="hidden lg:block absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
              <Shield className="h-6 w-6 text-white animate-bounce-gentle" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenSection;
