
import React, { useState, useEffect } from 'react';
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

interface PatientTabsSectionProps {
  services: Service[];
}

const PatientTabsSection: React.FC<PatientTabsSectionProps> = ({ services }) => {
  const [activeTab, setActiveTab] = useState(services[0]?.id || '');
  const [animationKey, setAnimationKey] = useState(0);

  const getColorClasses = (color: string) => {
    // Use consistent two-blue gradient for all elements
    const blueGradient = {
      gradient: 'from-[#4F9CF9] to-[#183EC2]',
      border: 'border-[#4F9CF9]',
      bg: 'bg-[#4F9CF9]',
      text: 'text-[#4F9CF9]',
      shadow: 'shadow-[#4F9CF9]/30',
      ring: 'ring-[#4F9CF9]/20'
    };
    return blueGradient;
  };

  const handleTabChange = (serviceId: string) => {
    if (serviceId !== activeTab) {
      setActiveTab(serviceId);
      setAnimationKey(prev => prev + 1);
    }
  };

  const activeService = services.find(service => service.id === activeTab);
  const IconComponent = activeService?.icon;
  const colorClasses = getColorClasses(activeService?.color || 'blue');

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 font-apple tracking-tight">
            How We <span className="bg-gradient-to-r from-[#4F9CF9] to-[#183EC2] bg-clip-text text-transparent">Transform</span> Care
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive approach to delivering exceptional healthcare experiences at home
          </p>
        </div>

        {/* Vertical Tab Navigation */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Tab List - Vertical on large screens */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {services.map((service, index) => {
                const ServiceIcon = service.icon;
                const isActive = activeTab === service.id;
                
                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabChange(service.id)}
                    className={`
                      w-full text-left p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden
                      ${isActive 
                        ? `bg-gradient-to-r from-[#4F9CF9] to-[#183EC2] text-white shadow-2xl shadow-[#4F9CF9]/30 scale-105 -translate-y-1` 
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-lg hover:scale-102'
                      }
                      border-2 ${isActive ? 'border-transparent' : `border-[#4F9CF9]/30 hover:border-[#4F9CF9]/50`}
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Background Pattern */}
                    <div className={`absolute inset-0 opacity-10 ${isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-5'} transition-opacity duration-300`}>
                      <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-current transform translate-x-8 -translate-y-8" />
                      <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-current transform -translate-x-4 translate-y-4" />
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${isActive 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : `bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] text-white group-hover:scale-110`
                        }
                      `}>
                        <ServiceIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1 leading-tight">
                          {service.title.split(' ').slice(0, 4).join(' ')}
                        </h3>
                        <p className={`text-xs opacity-80 ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                          {service.subtitle}
                        </p>
                      </div>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-3">
            {activeService && (
              <div key={animationKey} className="animate-fade-in">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50 relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] opacity-5 rounded-full transform translate-x-20 -translate-y-20`} />
                  <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] opacity-10 rounded-full transform -translate-x-12 translate-y-12`} />
                  
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                      {/* Icon and Title */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] flex items-center justify-center shadow-2xl shadow-[#4F9CF9]/30 transform transition-all duration-500 hover:scale-110 hover:rotate-6`}>
                          {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                        </div>
                        <div>
                          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 font-apple leading-tight">
                            {activeService.title}
                          </h3>
                          <p className={`text-lg font-semibold bg-gradient-to-r from-[#4F9CF9] to-[#183EC2] bg-clip-text text-transparent`}>
                            {activeService.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {activeService.description}
                      </p>

                      {/* Action Button */}
                      <button className={`
                        group px-8 py-4 rounded-xl font-semibold text-white text-lg
                        bg-gradient-to-r from-[#4F9CF9] to-[#183EC2]
                        shadow-2xl shadow-[#4F9CF9]/30 transition-all duration-300
                        hover:scale-105 hover:-translate-y-1
                        focus:outline-none focus:ring-4 ring-[#4F9CF9]/20
                        relative overflow-hidden
                      `}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Explore This Service
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>

                    {/* Image */}
                    <div className="relative group">
                      <div className={`
                        absolute inset-0 bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] 
                        rounded-3xl blur-xl opacity-20 group-hover:opacity-30 
                        transition-all duration-700 scale-95 group-hover:scale-100
                      `} />
                      <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105">
                        <img 
                          src={activeService.patient_image_url}
                          alt={`${activeService.title} - Patient care service`}
                          className="w-full h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className={`absolute inset-0 bg-gradient-to-br from-[#4F9CF9] to-[#183EC2] opacity-0 group-hover:opacity-20 transition-all duration-500`} />
                      </div>
                    </div>
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

export default PatientTabsSection;
