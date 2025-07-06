
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-200',
        shadow: 'shadow-blue-100'
      },
      green: {
        gradient: 'from-green-500 to-green-600',
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-200',
        shadow: 'shadow-green-100'
      },
      purple: {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-200',
        shadow: 'shadow-purple-100'
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        border: 'border-orange-200',
        shadow: 'shadow-orange-100'
      },
      teal: {
        gradient: 'from-teal-500 to-teal-600',
        bg: 'bg-teal-500',
        text: 'text-teal-600',
        border: 'border-teal-200',
        shadow: 'shadow-teal-100'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const activeService = services.find(service => service.id === activeTab);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Excellence in Care</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6 font-apple tracking-tight">
            How We <span className="text-blue-600">Deliver</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive healthcare solutions designed to transform patient care delivery
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Service Cards Grid */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                const isActive = activeTab === service.id;
                const colorClasses = getColorClasses(service.color);
                const isHovered = hoveredCard === service.id;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`
                      group relative p-6 rounded-3xl text-left transition-all duration-500 border-2
                      ${isActive 
                        ? `bg-gradient-to-br ${colorClasses.gradient} text-white border-transparent shadow-2xl scale-105` 
                        : `bg-white text-gray-800 ${colorClasses.border} hover:border-gray-300 hover:shadow-xl hover:scale-102`
                      }
                      ${isHovered && !isActive ? 'shadow-lg' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Background Decoration */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'}`}>
                      <div className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-current`} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`
                          w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300
                          ${isActive 
                            ? 'bg-white/20' 
                            : `bg-gradient-to-br ${colorClasses.gradient} text-white group-hover:scale-110`
                          }
                        `}>
                          <ServiceIcon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1 leading-tight">
                            {service.title}
                          </h3>
                          <p className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                            {service.subtitle}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className={`h-5 w-5 ml-auto transition-transform duration-300 ${isActive || isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Display */}
          <div className="lg:col-span-7">
            {activeService && (
              <div className="sticky top-8">
                <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full transform translate-x-32 -translate-y-32" />
                  </div>
                  
                  <div className="relative z-10">
                    {/* Content Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(activeService.color).gradient} flex items-center justify-center shadow-xl`}>
                          <activeService.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-black text-gray-900 font-apple leading-tight">
                            {activeService.title}
                          </h3>
                          <p className={`text-lg font-semibold ${getColorClasses(activeService.color).text}`}>
                            {activeService.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {activeService.description}
                      </p>
                    </div>

                    {/* Image Display */}
                    <div className="relative group mb-8">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={activeService.patient_image_url}
                          alt={`${activeService.title} - Healthcare service`}
                          className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className={`
                      group w-full lg:w-auto px-8 py-4 rounded-2xl font-semibold text-white text-lg
                      bg-gradient-to-r ${getColorClasses(activeService.color).gradient}
                      shadow-xl transition-all duration-300
                      hover:scale-105 hover:-translate-y-1
                      focus:outline-none focus:ring-4 focus:ring-gray-200
                      relative overflow-hidden
                    `}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Learn More
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
