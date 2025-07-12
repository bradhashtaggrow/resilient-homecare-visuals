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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeService = services.find(service => service.id === activeTab);

  // Responsive breakpoint detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleTabChange = (serviceId: string) => {
    if (serviceId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(serviceId);
      setIsTransitioning(false);
    }, 300);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    }
  };

  const getColorClasses = (color: string) => {
    const blueGradient = { 
      primary: '#4285F4', 
      gradient: 'from-[#4285F4] to-[#1565C0]',
      shadow: 'shadow-[#4285F4]/30',
      glow: 'drop-shadow-[0_0_20px_rgba(66,133,244,0.5)]'
    };
    return blueGradient;
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 relative overflow-hidden pb-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(66,133,244,0.1) 0%, transparent 50%)`
          }}
        />
        {/* Responsive Floating Particles */}
        {[...Array(isMobile ? 10 : isTablet ? 15 : 20)].map((_, i) => (
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
        {/* Responsive Header Section */}
        <div className="text-center pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8">          
          <h2 className="font-black mb-4 md:mb-6 lg:mb-8 tracking-tight leading-none text-gray-900"
              style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}>
            The Future of{' '}
            <span className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent">
              Care
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-4">
            Experience healthcare like never before. Every interaction reimagined.
          </p>
        </div>

        {/* Interface Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8">
          <div className="w-full max-w-7xl">
            
            {/* Responsive Navigation Pills */}
            <div className="flex justify-center mb-8 md:mb-12 lg:mb-16">
              <div className={`
                ${isMobile 
                  ? 'flex flex-col space-y-2 w-full max-w-sm' 
                  : isTablet 
                    ? 'grid grid-cols-2 gap-3 w-full max-w-2xl' 
                    : 'inline-flex bg-gray-50/80 backdrop-blur-2xl rounded-2xl border border-gray-200/50 p-2'
                }
              `}>
                {services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  const isActive = activeTab === service.id;
                  const colorClasses = getColorClasses(service.color);
                  
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleTabChange(service.id)}
                      className={`
                        relative transition-all duration-700 ease-out group
                        ${isMobile 
                          ? `w-full px-4 py-3 rounded-xl ${isActive 
                              ? `bg-gradient-to-r ${colorClasses.gradient} ${colorClasses.shadow} shadow-xl text-white` 
                              : 'bg-gray-50/80 hover:bg-gray-100/80 text-gray-600 hover:text-gray-800 border border-gray-200/50'
                            }`
                          : isTablet
                            ? `px-4 py-3 rounded-xl ${isActive 
                                ? `bg-gradient-to-r ${colorClasses.gradient} ${colorClasses.shadow} shadow-xl text-white` 
                                : 'bg-gray-50/80 hover:bg-gray-100/80 text-gray-600 hover:text-gray-800 border border-gray-200/50'
                              }`
                            : `px-6 py-4 rounded-xl ${isActive 
                                ? `bg-gradient-to-r ${colorClasses.gradient} ${colorClasses.shadow} shadow-2xl text-white` 
                                : 'hover:bg-gray-100/80 text-gray-600 hover:text-gray-800'
                              }`
                        }
                      `}
                      style={{
                        transform: isActive && !isMobile ? `translateY(-8px) scale(1.05)` : 'translateY(0)',
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className={`flex items-center ${isMobile ? 'gap-3' : isTablet ? 'gap-2' : 'gap-3'}`}>
                        <div 
                          className={`
                            ${isMobile ? 'w-8 h-8' : isTablet ? 'w-9 h-9' : 'w-10 h-10'} 
                            rounded-lg flex items-center justify-center transition-all duration-500
                            ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}
                          `}
                        >
                          <ServiceIcon className={`${isMobile ? 'h-5 w-5' : isTablet ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                        <div className="text-left flex-1">
                          <div className={`font-semibold ${isMobile ? 'text-sm' : isTablet ? 'text-sm' : 'text-sm'} ${isActive ? 'text-white' : 'text-gray-700'}`}>
                            {isMobile 
                              ? service.title
                              : service.title.split(' ').slice(0, 2).join(' ')
                            }
                          </div>
                          {isMobile && (
                            <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                              {service.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {isActive && !isMobile && (
                        <div 
                          className="absolute -inset-4 rounded-2xl opacity-30 animate-pulse"
                          style={{ 
                            background: `linear-gradient(45deg, #4285F420, transparent)`,
                            filter: 'blur(20px)'
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Content Display */}
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
                    className={`
                      relative bg-white/90 backdrop-blur-2xl rounded-2xl md:rounded-3xl 
                      border border-gray-200/50 overflow-hidden group 
                      shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-700
                      ${isMobile ? 'mx-2' : ''}
                    `}
                    style={{
                      transform: !isMobile ? `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)` : 'none',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Half and Half Layout */}
                    <div className={`
                      ${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} 
                      ${isMobile ? 'min-h-[500px]' : isTablet ? 'min-h-[400px]' : 'min-h-[500px]'}
                    `}>
                      
                      {/* Left Side - Content */}
                      <div className={`
                        ${isMobile ? 'order-2 p-6' : isTablet ? 'p-6' : 'p-12'} 
                        flex flex-col justify-center bg-white
                      `}>
                        {/* Floating Icon */}
                        <div 
                          className={`
                            ${isMobile ? 'w-12 h-12 mb-4' : isTablet ? 'w-16 h-16 mb-6' : 'w-20 h-20 mb-8'} 
                            rounded-xl md:rounded-2xl flex items-center justify-center 
                            bg-gradient-to-r ${getColorClasses(activeService.color).gradient} 
                            ${getColorClasses(activeService.color).glow} mb-6
                          `}
                        >
                          <activeService.icon className={`${isMobile ? 'h-6 w-6' : isTablet ? 'h-8 w-8' : 'h-10 w-10'} text-white`} />
                        </div>

                        <h3 className={`
                          ${isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl lg:text-5xl'} 
                          font-black text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight
                        `}>
                          {activeService.title}
                        </h3>
                        
                        <p 
                          className={`
                            ${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl'} 
                            font-semibold mb-4 md:mb-6 
                            bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent
                          `}
                        >
                          {activeService.subtitle}
                        </p>
                        
                        <p className={`
                          ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg'} 
                          text-gray-600 leading-relaxed
                        `}>
                          {activeService.description}
                        </p>
                      </div>

                      {/* Right Side - Image */}
                      <div className={`
                        relative overflow-hidden ${isMobile ? 'order-1 h-48' : 'h-full'}
                        ${isMobile ? '' : isTablet ? 'rounded-r-2xl' : 'rounded-r-3xl'}
                      `}>
                        <img 
                          src={activeService.patient_image_url}
                          alt={activeService.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          style={{
                            transform: !isMobile ? `translateZ(50px) translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)` : 'none'
                          }}
                        />
                        
                        {/* Updated Overlay with Blue Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                      </div>

                    </div>

                    {/* Subtle Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-20 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, #4285F410, transparent, #4285F405)`,
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
