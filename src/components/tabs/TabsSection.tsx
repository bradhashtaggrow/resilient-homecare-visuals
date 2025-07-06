
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon, ArrowRight } from 'lucide-react';

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
  const [animationClass, setAnimationClass] = useState('');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/30',
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-blue-600'
      },
      green: {
        gradient: 'from-green-500 to-green-600',
        shadow: 'shadow-green-500/30',
        bg: 'bg-green-500',
        hover: 'hover:bg-green-600',
        text: 'text-green-600'
      },
      purple: {
        gradient: 'from-purple-500 to-purple-600',
        shadow: 'shadow-purple-500/30',
        bg: 'bg-purple-500',
        hover: 'hover:bg-purple-600',
        text: 'text-purple-600'
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        shadow: 'shadow-orange-500/30',
        bg: 'bg-orange-500',
        hover: 'hover:bg-orange-600',
        text: 'text-orange-600'
      },
      teal: {
        gradient: 'from-teal-500 to-teal-600',
        shadow: 'shadow-teal-500/30',
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-teal-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getRandomAnimation = () => {
    const animations = [
      'animate-fade-in',
      'animate-scale-in',
      'animate-slide-in-right'
    ];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  const handleTabChange = (value: string) => {
    setAnimationClass('opacity-0 scale-95');
    setTimeout(() => {
      setActiveTab(value);
      setAnimationClass(getRandomAnimation());
    }, 150);
  };

  useEffect(() => {
    setAnimationClass('animate-fade-in');
  }, []);

  const activeService = services.find(service => service.id === activeTab);
  const IconComponent = activeService?.icon;

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 md:mb-6 font-apple tracking-tight">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare solutions delivered where you need them most
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-12 md:mb-16 bg-white/90 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-gray-200/50 gap-1">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const colorClasses = getColorClasses(service.color);
              
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className={`
                    flex flex-col items-center gap-2 p-4 md:p-6 rounded-xl transition-all duration-500 min-h-[100px]
                    text-gray-600 hover:text-gray-900 font-medium
                    data-[state=active]:bg-gradient-to-r data-[state=active]:${colorClasses.gradient}
                    data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:${colorClasses.shadow}
                    data-[state=active]:scale-105 data-[state=active]:-translate-y-1
                    hover:scale-102 hover:-translate-y-0.5
                    ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <ServiceIcon className="h-6 w-6 md:h-8 md:w-8 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-center leading-tight">
                    {service.title.split(' ').slice(0, 3).join(' ')}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            
            return (
              <TabsContent
                key={service.id}
                value={service.id}
                className={`
                  transition-all duration-500 ease-out mt-0
                  ${activeTab === service.id ? animationClass : 'opacity-0'}
                `}
              >
                <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  {/* Content Card */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-gray-200/50 relative overflow-hidden">
                      {/* Decorative Background Elements */}
                      <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${colorClasses.gradient} opacity-10 rounded-full -translate-y-12 md:-translate-y-16 translate-x-12 md:translate-x-16`} />
                      <div className={`absolute bottom-0 left-0 w-16 h-16 md:w-20 md:w-20 bg-gradient-to-br ${colorClasses.gradient} opacity-5 rounded-full translate-y-8 md:translate-y-10 -translate-x-8 md:-translate-x-10`} />
                      
                      {/* Service Icon */}
                      <div className="mb-6 md:mb-8">
                        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${colorClasses.gradient} flex items-center justify-center shadow-2xl ${colorClasses.shadow} transform transition-all duration-500 hover:scale-110 hover:rotate-6`}>
                          {IconComponent && <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-white" />}
                        </div>
                      </div>

                      {/* Title and Subtitle */}
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-2 md:mb-3 font-apple leading-tight">
                          {service.title}
                        </h3>
                        <p className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${colorClasses.gradient} bg-clip-text text-transparent`}>
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:mb-8">
                        {service.description}
                      </p>

                      {/* CTA Button */}
                      <button className={`
                        group px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-white text-base md:text-lg
                        bg-gradient-to-r ${colorClasses.gradient}
                        shadow-2xl ${colorClasses.shadow} transition-all duration-300
                        hover:scale-105 hover:-translate-y-1
                        focus:outline-none focus:ring-4 focus:ring-offset-2
                        relative overflow-hidden w-full sm:w-auto
                      `}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Learn More
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative group">
                      <div className={`
                        absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} 
                        rounded-3xl blur-xl opacity-30 group-hover:opacity-50 
                        transition-all duration-700 scale-95 group-hover:scale-100
                      `} />
                      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-1">
                        <img 
                          src={service.patient_image_url}
                          alt={`${service.title} - Healthcare service`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default TabsSection;
