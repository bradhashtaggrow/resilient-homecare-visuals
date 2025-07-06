
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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-black tracking-tight font-apple mb-6" 
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Why Choose Resilient?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Three core pillars that make us the leader in home-based healthcare solutions
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {whyResilientFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 font-apple">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
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
