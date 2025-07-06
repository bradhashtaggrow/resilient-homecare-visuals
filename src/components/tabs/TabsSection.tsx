
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
      blue: 'from-blue-500 to-blue-600 shadow-blue-500/30',
      green: 'from-green-500 to-green-600 shadow-green-500/30',
      purple: 'from-purple-500 to-purple-600 shadow-purple-500/30',
      orange: 'from-orange-500 to-orange-600 shadow-orange-500/30',
      teal: 'from-teal-500 to-teal-600 shadow-teal-500/30'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getRandomAnimation = () => {
    const animations = [
      'animate-fade-in',
      'animate-scale-in',
      'animate-slide-in-right',
      'animate-bounce',
      'animate-pulse'
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
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 font-apple">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions delivered where you need them most
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-16 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-gray-200/50">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className={`
                    flex flex-col items-center gap-2 p-6 rounded-xl transition-all duration-500
                    data-[state=active]:bg-gradient-to-r data-[state=active]:${getColorClasses(service.color)}
                    data-[state=active]:text-white data-[state=active]:shadow-2xl
                    data-[state=active]:scale-105 data-[state=active]:-translate-y-1
                    hover:scale-102 hover:-translate-y-0.5
                    text-gray-600 hover:text-gray-900
                    ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: activeTab === service.id ? 'scale(1.05) translateY(-4px)' : undefined
                  }}
                >
                  <ServiceIcon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-semibold text-center leading-tight">
                    {service.title.split(' ').slice(0, 2).join(' ')}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {services.map((service, index) => (
            <TabsContent
              key={service.id}
              value={service.id}
              className={`
                transition-all duration-500 ease-out
                ${activeTab === service.id ? animationClass : 'opacity-0'}
              `}
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/50 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getColorClasses(service.color)} opacity-10 rounded-full -translate-y-16 translate-x-16`} />
                    
                    {/* Service Icon */}
                    <div className="mb-8">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getColorClasses(service.color)} flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-6`}>
                        {IconComponent && <IconComponent className="h-10 w-10 text-white" />}
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <div className="mb-6">
                      <h3 className="text-4xl font-black text-gray-900 mb-3 font-apple leading-tight">
                        {service.title}
                      </h3>
                      <p className={`text-xl font-semibold bg-gradient-to-r ${getColorClasses(service.color).split(' ')[0]} ${getColorClasses(service.color).split(' ')[1]} bg-clip-text text-transparent`}>
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <button className={`
                      group px-8 py-4 rounded-xl font-semibold text-white
                      bg-gradient-to-r ${getColorClasses(service.color)}
                      shadow-2xl transition-all duration-300
                      hover:scale-105 hover:-translate-y-1
                      focus:outline-none focus:ring-4 focus:ring-offset-2
                      relative overflow-hidden
                    `}>
                      <span className="relative z-10 flex items-center gap-2">
                        Learn More
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative group">
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${getColorClasses(service.color)} 
                      rounded-3xl blur-xl opacity-30 group-hover:opacity-50 
                      transition-all duration-700 scale-95 group-hover:scale-100
                    `} />
                    <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-1">
                      <img 
                        src={service.patient_image_url}
                        alt={`${service.title} - Healthcare service`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(service.color).split(' ')[0]}/20 ${getColorClasses(service.color).split(' ')[1]}/20 opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default TabsSection;
