
import React, { useEffect, useState } from 'react';
import { Heart, Video, FileCheck, Bell, MessageSquare, Clipboard, Activity, Shield, Calendar } from 'lucide-react';

const MobileShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(0);

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
        setRotation(prev => ({
          x: Math.sin(Date.now() * 0.001) * 5,
          y: Math.sin(Date.now() * 0.0008) * 15
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const patientFeatures = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Real-time Vitals Monitoring",
      description: "Continuous health tracking with instant alerts to care team",
      color: "red"
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "HD Tele-PT Sessions",
      description: "Crystal-clear virtual physical therapy from home comfort",
      color: "blue"
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: "AI Care Plans",
      description: "Personalized recovery roadmaps that adapt to your progress",
      color: "green"
    },
    {
      icon: <Activity className="h-6 w-6" />,
      title: "Progress Analytics",
      description: "Visual insights into your recovery journey and milestones",
      color: "purple"
    }
  ];

  const clinicianFeatures = [
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Intelligent Alerts",
      description: "AI-powered notifications for critical patient changes",
      color: "orange"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Secure Team Chat",
      description: "HIPAA-compliant communication across care teams",
      color: "teal"
    },
    {
      icon: <Clipboard className="h-6 w-6" />,
      title: "Smart Documentation",
      description: "Auto-populated forms with voice-to-text capabilities",
      color: "indigo"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Unified Scheduling",
      description: "Seamless appointment coordination across all providers",
      color: "pink"
    }
  ];

  return (
    <section id="mobile-showcase" className="py-32 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-black leading-none tracking-tight font-black text-shadow-white mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Mobile Platform That 
            <span className="block healthcare-text-gradient"> Connects Everyone</span>
          </h2>
          <p className="text-black max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            Empower patients with intuitive self-care tools while giving 
            clinicians unprecedented insights for exceptional care delivery.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          {/* Left Features - Patients */}
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-12">
              <h3 className="text-revolutionary-sub text-gray-900 mb-4 font-black leading-none tracking-tight">For Patients</h3>
              <p className="text-xl text-gray-600 font-light">Empowering recovery from home</p>
            </div>
            {patientFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'animate-slide-in-left' : 'opacity-0'
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`medical-card p-8 rounded-2xl hover-lift transition-all duration-500 ${
                  activeFeature === index ? 'shadow-2xl scale-105' : 'shadow-lg'
                }`}>
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 p-4 rounded-2xl text-white transition-all duration-500 ${
                      activeFeature === index 
                        ? 'healthcare-gradient scale-110' 
                        : 'bg-gray-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - iPhone */}
          <div className={`flex justify-center transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-scale-in' : 'opacity-0'
          }`}>
            <div className="relative">
              <div 
                className="relative"
                style={{
                  transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Phone Frame */}
                <div className="relative w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-full healthcare-gradient rounded-[2.5rem] p-8 relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white/80 text-sm mb-6">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-3 h-1 bg-white rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Interface */}
                    <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm h-full">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-semibold">Health Dashboard</div>
                            <div className="text-white/70 text-sm">John Doe</div>
                          </div>
                        </div>
                        
                        {/* Vital Signs */}
                        <div className="space-y-3">
                          <div className="bg-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Heart Rate</span>
                              <span className="text-white font-bold">72 BPM</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                              <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                            </div>
                          </div>
                          
                          <div className="bg-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center">
                              <span className="text-white/80 text-sm">Blood Pressure</span>
                              <span className="text-white font-bold">120/80</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                              <div className="bg-blue-400 h-2 rounded-full w-4/5"></div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3 mt-6">
                          <div className="bg-white/10 rounded-xl p-4 text-center">
                            <Video className="h-6 w-6 text-white mx-auto mb-2" />
                            <span className="text-white text-xs">Start Session</span>
                          </div>
                          <div className="bg-white/10 rounded-xl p-4 text-center">
                            <MessageSquare className="h-6 w-6 text-white mx-auto mb-2" />
                            <span className="text-white text-xs">Contact Team</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-float shadow-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '2s'}}>
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div className="absolute top-1/2 -right-12 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '4s'}}>
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Right Features - Clinicians */}
          <div className="space-y-8">
            <div className="text-center lg:text-right mb-12">
              <h3 className="text-revolutionary-sub text-gray-900 mb-4 font-black leading-none tracking-tight">For Clinicians</h3>
              <p className="text-xl text-gray-600 font-light">Streamlining care delivery</p>
            </div>
            {clinicianFeatures.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 delay-${(index + 4) * 200} ${
                  isVisible ? 'animate-slide-in-right' : 'opacity-0'
                }`}
                onMouseEnter={() => setActiveFeature(index + 4)}
              >
                <div className={`medical-card p-8 rounded-2xl hover-lift transition-all duration-500 ${
                  activeFeature === index + 4 ? 'shadow-2xl scale-105' : 'shadow-lg'
                }`}>
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 p-4 rounded-2xl text-white transition-all duration-500 ${
                      activeFeature === index + 4 
                        ? 'healthcare-gradient scale-110' 
                        : 'bg-gray-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
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
