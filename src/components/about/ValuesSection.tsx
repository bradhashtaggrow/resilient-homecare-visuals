
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="font-black tracking-tight font-apple mb-6" 
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The principles that guide everything we do in transforming healthcare delivery
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            const colors = ['blue', 'amber', 'emerald'];
            const color = colors[index];
            
            return (
              <div key={index} className="group text-center bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100">
                <div className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-10 w-10 text-${color}-600`} />
                </div>
                <h3 className="text-2xl font-bold mb-6 font-apple text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
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
