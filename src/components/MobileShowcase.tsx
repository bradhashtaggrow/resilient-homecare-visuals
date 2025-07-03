
import React, { useEffect, useState } from 'react';
import { Smartphone, Heart, Video, FileCheck } from 'lucide-react';

const MobileShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

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

    const element = document.getElementById('mobile-showcase');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const patientFeatures = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Real-time Vitals Monitoring",
      description: "Continuous health tracking with instant alerts"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Secure Tele-PT Sessions",
      description: "Virtual physical therapy from home"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Automated Care Plans",
      description: "Personalized recovery roadmaps"
    }
  ];

  const clinicianFeatures = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Instant Alerts",
      description: "Real-time patient status notifications"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "HIPAA-Compliant Chat",
      description: "Secure communication platform"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "Digital Intake Forms",
      description: "Streamlined patient onboarding"
    }
  ];

  return (
    <section id="mobile-showcase" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mobile Platform That 
            <span className="healthcare-text-gradient"> Connects Everyone</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empower patients with intuitive self-care tools while giving 
            clinicians the insights they need to deliver exceptional care.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Features - Patient */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Patients</h3>
            {patientFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 delay-${index * 200} ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}
              >
                <div className="medical-card p-6 rounded-xl hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 healthcare-gradient rounded-lg text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - 3D Phone Mock */}
          <div className={`flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative">
              <div 
                className="w-64 h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-2 shadow-2xl"
                style={{
                  transform: `rotateY(${Math.sin(rotation * 0.05) * 15}deg) rotateX(${Math.cos(rotation * 0.03) * 5}deg)`
                }}
              >
                <div className="w-full h-full healthcare-gradient rounded-2xl p-6 flex flex-col">
                  <div className="flex-1 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="h-4 bg-white/30 rounded-full" />
                      <div className="h-4 bg-white/20 rounded-full w-3/4" />
                      <div className="h-4 bg-white/20 rounded-full w-1/2" />
                      <div className="mt-6 space-y-2">
                        <div className="h-8 bg-white/20 rounded-lg" />
                        <div className="h-8 bg-white/20 rounded-lg" />
                        <div className="h-8 bg-white/20 rounded-lg" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-pulse-slow" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}} />
            </div>
          </div>

          {/* Right Features - Clinicians */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Clinicians</h3>
            {clinicianFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 delay-${(index + 3) * 200} ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
              >
                <div className="medical-card p-6 rounded-xl hover-lift">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 healthcare-gradient rounded-lg text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;
