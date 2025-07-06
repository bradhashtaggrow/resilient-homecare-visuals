
import React, { useState, useEffect, useRef } from 'react';
import { LucideIcon, ArrowRight, Sparkles, Play, ChevronRight } from 'lucide-react';

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  patient_image_url: string;
}

interface TabsSectionProps {
  services: Service[];
}

const TabsSection: React.FC<TabsSectionProps> = ({ services }) => {
  const [activeTab, setActiveTab] = useState(services[0]?.id || '');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const activeService = services.find(service => service.id === activeTab);

  const handleTabChange = (serviceId: string) => {
    if (serviceId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(serviceId);
      setIsTransitioning(false);
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { 
        primary: '#007AFF', 
        gradient: 'from-blue-500 via-blue-600 to-indigo-600',
        shadow: 'shadow-blue-500/30',
        glow: 'drop-shadow-[0_0_20px_rgba(0,122,255,0.5)]'
      },
      green: { 
        primary: '#34C759', 
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        shadow: 'shadow-green-500/30',
        glow: 'drop-shadow-[0_0_20px_rgba(52,199,89,0.5)]'
      },
      purple: { 
        primary: '#AF52DE', 
        gradient: 'from-purple-500 via-violet-500 to-purple-600',
        shadow: 'shadow-purple-500/30',
        glow: 'drop-shadow-[0_0_20px_rgba(175,82,222,0.5)]'
      },
      orange: { 
        primary: '#FF9500', 
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        shadow: 'shadow-orange-500/30',
        glow: 'drop-shadow-[0_0_20px_rgba(255,149,0,0.5)]'
      },
      teal: { 
        primary: '#5AC8FA', 
        gradient: 'from-cyan-400 via-teal-500 to-blue-500',
        shadow: 'shadow-cyan-500/30',
        glow: 'drop-shadow-[0_0_20px_rgba(90,200,250,0.5)]'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* White Background with Subtle Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(0,128,255,0.1) 0%, transparent 50%)`
          }}
        />
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen flex flex-col"
        onMouseMove={handleMouseMove}
      >
        {/* Header Section */}
        <div className="text-center pt-32 pb-20">          
          <h2 className="text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-none text-gray-900">
            The Future of{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Care
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Experience healthcare like never before. Every interaction reimagined.
          </p>
        </div>

        {/* Interface Section */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-7xl">
            
            {/* Navigation Pills */}
            <div className="flex justify-center mb-16">
              <div className="inline-flex bg-gray-50/80 backdrop-blur-2xl rounded-2xl border border-gray-200/50 p-2">
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  const isActive = activeTab === service.id;
                  const colorClasses = getColorClasses(service.color);
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleTabChange(service.id)}
                      className={`
                        relative px-6 py-4 rounded-xl transition-all duration-700 ease-out group
                        ${isActive 
                          ? `bg-gradient-to-r ${colorClasses.gradient} ${colorClasses.shadow} shadow-2xl text-white` 
                          : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-800'
                        }
                      `}
                      style={{
                        transform: isActive ? `translateY(-8px) scale(1.05)` : 'translateY(0)',
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className={`
                            w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500
                            ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
                          `}
                        >
                          <ServiceIcon className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>
                            {service.title.split(' ').slice(0, 2).join(' ')}
                          </div>
                        </div>
                      </div>
                      
                      {isActive && (
                        <div 
                          className="absolute -inset-4 rounded-2xl opacity-30 animate-pulse"
                          style={{ 
                            background: `linear-gradient(45deg, ${colorClasses.primary}20, transparent)`,
                            filter: 'blur(20px)'
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Display */}
            {activeService && (
              <div 
                className={`
                  transition-all duration-700 ease-out
                  ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
                `}
              >
                <div className="relative">
                  {/* Main Content Card */}
                  <div 
                    className="relative bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-200/50 overflow-hidden group shadow-xl hover:shadow-2xl transition-all duration-700"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Hero Image */}
                    <div className="relative h-96 lg:h-[32rem] overflow-hidden">
                      <img 
                        src={activeService.patient_image_url}
                        alt={activeService.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        style={{
                          transform: `translateZ(50px) translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                      
                      {/* Floating Icon */}
                      <div 
                        className={`
                          absolute top-8 left-8 w-20 h-20 rounded-2xl flex items-center justify-center 
                          bg-gradient-to-r ${getColorClasses(activeService.color).gradient} 
                          backdrop-blur-xl border border-white/30 ${getColorClasses(activeService.color).glow}
                        `}
                        style={{
                          transform: `translateZ(100px) translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px, 0)`
                        }}
                      >
                        <activeService.icon className="h-10 w-10 text-white" />
                      </div>

                      {/* Play Button Effect */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          transform: `translateZ(75px)`
                        }}
                      >
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-12" style={{ transform: `translateZ(25px)` }}>
                      <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                          <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                            {activeService.title}
                          </h3>
                          
                          <p 
                            className="text-2xl font-semibold mb-8 bg-gradient-to-r bg-clip-text text-transparent"
                            style={{ 
                              backgroundImage: `linear-gradient(135deg, ${getColorClasses(activeService.color).primary}, #666666)`
                            }}
                          >
                            {activeService.subtitle}
                          </p>
                          
                          <p className="text-lg text-gray-600 leading-relaxed mb-10">
                            {activeService.description}
                          </p>

                          {/* CTA Button */}
                          <button 
                            className={`
                              group relative px-8 py-4 bg-gradient-to-r ${getColorClasses(activeService.color).gradient} 
                              rounded-xl font-bold text-white text-lg overflow-hidden
                              transform transition-all duration-300 hover:scale-105 
                              ${getColorClasses(activeService.color).shadow} shadow-2xl
                              border border-white/20
                            `}
                            style={{
                              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
                            }}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                              Experience Now
                              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                            </span>
                            
                            {/* Animated Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] duration-700" />
                          </button>
                        </div>

                        {/* Stats/Features */}
                        <div className="space-y-6">
                          {[
                            { label: 'Response Time', value: '< 2min', color: 'from-green-400 to-emerald-500' },
                            { label: 'Satisfaction', value: '99.8%', color: 'from-blue-400 to-cyan-500' },
                            { label: 'Availability', value: '24/7', color: 'from-purple-400 to-pink-500' }
                          ].map((stat, index) => (
                            <div 
                              key={stat.label}
                              className="flex items-center justify-between p-4 bg-gray-50/50 backdrop-blur-xl rounded-xl border border-gray-200/30"
                              style={{
                                transform: `translateZ(${25 + index * 10}px)`,
                                animationDelay: `${index * 200}ms`
                              }}
                            >
                              <span className="text-gray-600 font-medium">{stat.label}</span>
                              <span className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                {stat.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Subtle Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${getColorClasses(activeService.color).primary}10, transparent, ${getColorClasses(activeService.color).primary}05)`,
                        filter: 'blur(1px)'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabsSection;
