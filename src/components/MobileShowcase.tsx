
import React, { useEffect, useState } from 'react';
import { Shield, BarChart3, Users, Zap, Database, Lock } from 'lucide-react';

const MobileShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

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
          x: Math.sin(Date.now() * 0.0008) * 3,
          y: Math.sin(Date.now() * 0.0006) * 10
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const keyFeatures = [
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption with HIPAA compliance built-in"
    },
    {
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Real-Time Analytics",
      description: "Live dashboard with predictive insights and KPI tracking"  
    },
    {
      icon: <Users className="h-7 w-7" />,
      title: "Multi-Tenant Architecture",
      description: "Scalable infrastructure supporting unlimited organizations"
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "API-First Platform",
      description: "Seamless integration with existing healthcare systems"
    },
    {
      icon: <Database className="h-7 w-7" />,
      title: "Cloud Infrastructure",
      description: "99.9% uptime with automatic scaling and backup"
    },
    {
      icon: <Lock className="h-7 w-7" />,
      title: "Access Control",
      description: "Granular permissions with role-based authentication"
    }
  ];

  return (
    <section id="mobile-showcase" className="py-32 relative overflow-hidden">
      {/* Light to Dark Blue Gradient Background with Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900">
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
             style={{
               background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
               animation: 'shine 3s ease-in-out infinite'
             }} />
        {/* Additional radial shine effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-white leading-none tracking-tight font-black mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Go Mobile With Your 
            <span className="block text-white drop-shadow-lg">
              Patients This Year
            </span>
          </h2>
          <p className="text-white/90 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-md"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', lineHeight: 1.3 }}>
            Enterprise-grade mobile platform that connects your entire healthcare ecosystem 
            with military-grade security and real-time insights.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Features */}
          <div className="lg:col-span-4 space-y-8">
            {keyFeatures.slice(0, 3).map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'animate-slide-in-left opacity-100' : 'opacity-0'
                }`}
              >
                <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center - Hyper-Realistic Phone with Video Background */}
          <div className="lg:col-span-4 flex justify-center">
            <div className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'
            }`}>
              <div className="relative">
                <div 
                  className="relative"
                  style={{
                    transform: `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* iPhone 14 Pro Frame */}
                  <div className="relative w-80 h-[650px] bg-gradient-to-b from-gray-800 to-black rounded-[3.5rem] p-2 shadow-2xl">
                    {/* Screen Bezel */}
                    <div className="w-full h-full bg-black rounded-[3rem] p-1">
                      {/* Screen with Video Background */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-950 rounded-[2.8rem] relative overflow-hidden">
                        {/* Video Background Effect - Animated Video-like Content */}
                        <div className="absolute inset-0">
                          {/* Video play effect with moving gradients */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/20 to-blue-800/40 animate-pulse"></div>
                          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(59,130,246,0.3),transparent)] animate-spin" style={{animationDuration: '20s'}}></div>
                          
                          {/* Simulated video content - moving elements */}
                          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-400/60 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-300/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-500/70 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
                          
                          {/* Video scanlines effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse"></div>
                        </div>
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black rounded-full z-10"></div>
                        
                        {/* Admin Login Interface Overlay */}
                        <div className="p-8 pt-16 h-full flex flex-col relative z-10 bg-black/40 backdrop-blur-sm">
                          {/* Header */}
                          <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                              <Shield className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-white text-xl font-bold mb-2">Admin Portal</h3>
                            <p className="text-blue-200 text-sm">Secure Healthcare Management</p>
                          </div>

                          {/* Login Form */}
                          <div className="space-y-4 flex-1">
                            <div>
                              <input 
                                type="text" 
                                placeholder="Email Address"
                                className="w-full p-4 bg-white/10 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:border-blue-300 transition-colors backdrop-blur-sm"
                                defaultValue="admin@healthcare.com"
                              />
                            </div>
                            <div>
                              <input 
                                type="password" 
                                placeholder="Password"
                                className="w-full p-4 bg-white/10 border border-blue-400/30 rounded-xl text-white placeholder-blue-200 focus:border-blue-300 transition-colors backdrop-blur-sm"
                                defaultValue="••••••••"
                              />
                            </div>
                            
                            {/* Login Button */}
                            <button className="w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                              Secure Login
                            </button>

                            {/* Biometric */}
                            <div className="text-center py-4">
                              <div className="w-12 h-12 bg-white/10 rounded-full mx-auto flex items-center justify-center border border-blue-400/30">
                                <div className="w-8 h-8 border-2 border-blue-400 rounded-full"></div>
                              </div>
                              <p className="text-blue-200 text-xs mt-2">Touch ID / Face ID</p>
                            </div>
                          </div>

                          {/* Status Indicators */}
                          <div className="grid grid-cols-2 gap-3 mt-auto">
                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-center backdrop-blur-sm">
                              <div className="text-blue-300 text-sm font-semibold">System Status</div>
                              <div className="text-blue-200 text-xs">Operational</div>
                            </div>
                            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3 text-center backdrop-blur-sm">
                              <div className="text-blue-200 text-sm font-semibold">Security</div>
                              <div className="text-blue-100 text-xs">Verified</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Security Badges - Blue Theme Only */}
                  <div className="absolute -top-6 -right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center animate-float shadow-xl">
                    <Shield className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '2s'}}>
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-1/3 -right-8 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '4s'}}>
                    <Database className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-4 space-y-8">
            {keyFeatures.slice(3, 6).map((feature, index) => (
              <div 
                key={index + 3}
                className={`transition-all duration-1000 delay-${(index + 3) * 200} ${
                  isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0'
                }`}
              >
                <div className="group p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
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
      
      {/* Custom CSS for shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
      `}</style>
    </section>
  );
};

export default MobileShowcase;
