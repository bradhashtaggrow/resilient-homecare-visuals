import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Heart, Building2, TrendingUp, Shield, Target, Award, Users, MapPin, CheckCircle, Zap, Clock } from 'lucide-react';

interface ServiceBenefit {
  text: string;
  icon: string;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: ServiceBenefit[];
  color: string;
  patient_image_url: string;
  note?: string;
}

interface ServiceLinesContent {
  title: string;
  subtitle: string;
  description: string;
  content_data: {
    services: Service[];
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Activity,
  Heart,
  Building2,
  TrendingUp,
  Shield,
  Target,
  Award,
  Users,
  MapPin,
  CheckCircle,
  Zap,
  Clock,
};

const ServiceLinesSection = () => {
  const [content, setContent] = useState<ServiceLinesContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const loadServiceLinesContent = async () => {
    try {
      setLoading(true);
      
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      if (typeof supabase.from !== 'function') {
        console.error('Supabase client missing from method');
        return;
      }

      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'service_lines')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error loading service lines content:', error);
        return;
      }

      if (data) {
        const contentData = {
          title: data.title || '',
          subtitle: data.subtitle || '',
          description: data.description || '',
          content_data: data.content_data as unknown as { services: Service[] }
        };
        setContent(contentData);
        // Set first service as active tab
        if (contentData.content_data?.services?.length > 0) {
          setActiveTab(contentData.content_data.services[0].id);
        }
      }
    } catch (error) {
      console.error('Exception loading service lines content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServiceLinesContent();

    // Real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content',
          filter: 'section_key=eq.service_lines'
        }, (payload) => {
        console.log('Real-time services content change:', payload);
        loadServiceLinesContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
    const colorMap: { [key: string]: any } = {
      blue: { 
        gradient: 'from-[#4285F4] to-[#1565C0]',
        shadow: 'shadow-[#4285F4]/30',
        glow: 'drop-shadow-[0_0_20px_rgba(66,133,244,0.5)]'
      },
      red: { 
        gradient: 'from-[#EA4335] to-[#C5221F]',
        shadow: 'shadow-[#EA4335]/30',
        glow: 'drop-shadow-[0_0_20px_rgba(234,67,53,0.5)]'
      },
      cyan: { 
        gradient: 'from-[#34A853] to-[#137333]',
        shadow: 'shadow-[#34A853]/30',
        glow: 'drop-shadow-[0_0_20px_rgba(52,168,83,0.5)]'
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!content || !content.content_data?.services) {
    return null;
  }

  const services = content.content_data.services.map(service => ({
    ...service,
    icon: iconMap[service.icon] || Activity
  }));

  const activeService = services.find(service => service.id === activeTab);

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
        {/* Header Section */}
        <div className="text-center pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8">          
          <h2 className="font-black mb-4 md:mb-6 lg:mb-8 tracking-tight leading-none text-gray-900"
              style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}>
            {content.title.split(',')[0]},{' '}
            <span className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent">
              {content.title.split(',')[1]}
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light px-4">
            {content.description}
          </p>
        </div>

        {/* Interface Section */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8">
          <div className="w-full max-w-7xl">
            
            {/* Navigation Pills */}
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
                            background: `linear-gradient(45deg, ${service.color === 'blue' ? '#4285F420' : service.color === 'red' ? '#EA433520' : '#34A85320'}, transparent)`,
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
                      ${isMobile ? 'min-h-[600px]' : isTablet ? 'min-h-[500px]' : 'min-h-[600px]'}
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
                            bg-gradient-to-r ${getColorClasses(activeService.color).gradient} bg-clip-text text-transparent
                          `}
                        >
                          {activeService.subtitle}
                        </p>
                        
                        <p className={`
                          ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-lg'} 
                          text-gray-600 leading-relaxed mb-6
                        `}>
                          {activeService.description}
                        </p>

                        {/* Benefits */}
                        <div className="space-y-3 mb-6">
                          {activeService.benefits.map((benefit, benefitIndex) => {
                            const BenefitIcon = iconMap[benefit.icon] || CheckCircle;
                            return (
                              <div key={benefitIndex} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r ${getColorClasses(activeService.color).gradient} flex-shrink-0`}>
                                  <BenefitIcon className="h-3 w-3 text-white" />
                                </div>
                                <span className="text-gray-700">{benefit.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {activeService.note && (
                          <div className={`p-4 rounded-lg bg-gradient-to-r ${getColorClasses(activeService.color).gradient} bg-opacity-10`}>
                            <p className="text-sm text-gray-800 font-medium">
                              {activeService.note}
                            </p>
                          </div>
                        )}
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
                        
                        {/* Overlay with Service Color */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(activeService.color).gradient} opacity-0 group-hover:opacity-80 transition-all duration-500 ease-out`} />
                      </div>

                    </div>

                    {/* Subtle Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-20 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${activeService.color === 'blue' ? '#4285F410' : activeService.color === 'red' ? '#EA433510' : '#34A85310'}, transparent, ${activeService.color === 'blue' ? '#4285F405' : activeService.color === 'red' ? '#EA433505' : '#34A85305'})`,
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

export default React.memo(ServiceLinesSection);
