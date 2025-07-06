
import React, { useState } from 'react';
import { LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

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
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { primary: 'rgb(0, 122, 255)', secondary: 'rgba(0, 122, 255, 0.1)' },
      green: { primary: 'rgb(52, 199, 89)', secondary: 'rgba(52, 199, 89, 0.1)' },
      purple: { primary: 'rgb(175, 82, 222)', secondary: 'rgba(175, 82, 222, 0.1)' },
      orange: { primary: 'rgb(255, 149, 0)', secondary: 'rgba(255, 149, 0, 0.1)' },
      teal: { primary: 'rgb(90, 200, 250)', secondary: 'rgba(90, 200, 250, 0.1)' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const activeService = services.find(service => service.id === activeTab);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gray-100/80 backdrop-blur-sm rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700 tracking-wide">Excellence Redefined</span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-none">
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Deliver</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Comprehensive healthcare solutions designed with precision and care
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Service Navigation - Apple Style */}
          <div className="lg:col-span-5">
            <div className="space-y-3">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                const isActive = activeTab === service.id;
                const isHovered = hoveredTab === service.id;
                const colorClasses = getColorClasses(service.color);
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    onMouseEnter={() => setHoveredTab(service.id)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className={`
                      group relative w-full text-left p-6 rounded-2xl transition-all duration-500 ease-out
                      ${isActive 
                        ? 'bg-white shadow-2xl shadow-black/10 scale-[1.02] border border-gray-200/60' 
                        : 'bg-white/40 backdrop-blur-sm border border-gray-200/40 hover:bg-white/80 hover:shadow-xl hover:shadow-black/5'
                      }
                    `}
                    style={{
                      transform: isActive ? 'translateY(-8px) scale(1.02)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive 
                        ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px ${colorClasses.primary}15`
                        : isHovered 
                          ? '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                          : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div 
                        className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
                        style={{ backgroundColor: colorClasses.primary }}
                      />
                    )}
                    
                    <div className="flex items-start gap-4 relative z-10">
                      <div 
                        className={`
                          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                          ${isActive ? 'text-white shadow-lg' : 'text-gray-700 bg-gray-100'}
                        `}
                        style={{
                          backgroundColor: isActive ? colorClasses.primary : undefined,
                          transform: isHovered || isActive ? 'scale(1.1)' : 'scale(1)'
                        }}
                      >
                        <ServiceIcon className="h-7 w-7" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-lg mb-1 leading-tight transition-colors duration-300 ${
                          isActive ? 'text-gray-900' : 'text-gray-800'
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`text-sm transition-colors duration-300 ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {service.subtitle}
                        </p>
                      </div>

                      <ArrowRight 
                        className={`h-5 w-5 transition-all duration-300 ${
                          isActive ? 'text-gray-900 translate-x-1' : 'text-gray-400'
                        }`}
                        style={{ 
                          color: isActive ? colorClasses.primary : undefined,
                          transform: isHovered || isActive ? 'translateX(4px)' : 'translateX(0)'
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Display - Apple Product Card Style */}
          <div className="lg:col-span-7">
            {activeService && (
              <div className="sticky top-12">
                <div 
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-gray-200/60 relative"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
                  }}
                >
                  {/* Hero Image */}
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <img 
                      src={activeService.patient_image_url}
                      alt={`${activeService.title} - Healthcare service`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Floating Icon */}
                    <div 
                      className="absolute top-8 left-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl text-white backdrop-blur-sm"
                      style={{ 
                        backgroundColor: `${getColorClasses(activeService.color).primary}dd`
                      }}
                    >
                      <activeService.icon className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10">
                    <div className="mb-8">
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        {activeService.title}
                      </h3>
                      <p 
                        className="text-lg font-semibold mb-6"
                        style={{ color: getColorClasses(activeService.color).primary }}
                      >
                        {activeService.subtitle}
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {activeService.description}
                      </p>
                    </div>

                    {/* CTA Button - Apple Style */}
                    <button 
                      className="group relative px-8 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black/10"
                      style={{ 
                        backgroundColor: getColorClasses(activeService.color).primary,
                        boxShadow: `0 8px 32px ${getColorClasses(activeService.color).primary}40`
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        Learn More
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
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
