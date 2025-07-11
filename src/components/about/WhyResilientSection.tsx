
import React from 'react';
import { Zap, Building2, Users } from 'lucide-react';

const WhyResilientSection = () => {
  const whyResilientFeatures = [
    {
      title: "RAIN-Powered AI Infrastructure",
      description: "Reducing inefficiencies in care management through smart automation.",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fully Integrated With Hospital Systems",
      description: "Seamless connection to EHRs, scheduling, and billing workflows.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Flexible Workforce Model",
      description: "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-black tracking-tight font-apple mb-4 md:mb-6" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Why Choose Resilient?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Three core pillars that make us the leader in home-based healthcare solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyResilientFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div key={index} className="group bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-3">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 lg:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-apple leading-tight">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyResilientSection;
