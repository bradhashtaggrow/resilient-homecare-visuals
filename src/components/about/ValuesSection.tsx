
import React from 'react';
import { Heart, Award, TrendingUp } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      title: "Compassionate Care",
      description: "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
      icon: Heart,
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from clinical care to customer service.",
      icon: Award,
    },
    {
      title: "Innovation",
      description: "Continuously improving healthcare delivery through technology and creative solutions.",
      icon: TrendingUp,
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-black tracking-tight font-apple mb-4 md:mb-6" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Our Core Values
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            The principles that guide everything we do in transforming healthcare delivery
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            
            return (
              <div key={index} className="group text-center bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 lg:hover:-translate-y-4 border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-2xl lg:rounded-3xl flex items-center justify-center group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)] transition-all duration-300">
                  <IconComponent className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-apple text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
