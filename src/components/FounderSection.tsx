
import React, { useEffect, useState } from 'react';

const FounderSection = () => {
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
      { threshold: 0.3 }
    );

    const element = document.getElementById('founder-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="founder-section" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Portrait */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    JS
                  </div>
                </div>
              </div>
              
              {/* Floating Medical Symbols */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-float">
                <span className="text-white text-xl">⚕️</span>
              </div>
              <div className="absolute bottom-8 left-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
                <span className="text-white text-lg">💙</span>
              </div>
            </div>
          </div>

          {/* Right Column - Story */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="space-y-6">
              <blockquote className="text-2xl font-medium text-gray-900 leading-relaxed">
                "Dad's in the hospital, again..."
              </blockquote>
              
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  When I received that call for the third time in six months, I knew something 
                  had to change. As a physical therapist, I understood the clinical side. 
                  As a daughter, I felt the family's frustration.
                </p>
                
                <p>
                  The gap between hospital discharge and successful home recovery was glaring. 
                  Patients were being sent home with complex care plans, but no real support 
                  system to ensure they followed through.
                </p>
                
                <p>
                  That's when I realized we needed to bridge this gap with technology that 
                  actually works for both patients and clinicians. We needed to extend 
                  hospital-level care into the home environment.
                </p>
                
                <p className="font-semibold">
                  Resilient Healthcare was born from this personal mission to ensure no 
                  family has to experience the revolving door of hospital readmissions.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <div className="text-lg font-semibold text-gray-900">
                  Dr. Jackleen Samuel, PT, DPT
                </div>
                <div className="text-blue-600 font-medium">
                  Founder & CEO, Resilient Healthcare
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  15+ years in clinical practice • Healthcare innovation leader
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
