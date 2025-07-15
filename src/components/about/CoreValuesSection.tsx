import React from 'react';
import { Heart, Star, Lightbulb } from 'lucide-react';

const CoreValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
      color: "blue"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from clinical care to customer service.",
      color: "purple"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously improving healthcare delivery through technology and creative solutions.",
      color: "green"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-600',
          border: 'border-purple-200'
        };
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-600',
          border: 'border-green-200'
        };
      default:
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
    }
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do in transforming healthcare delivery
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const colorClasses = getColorClasses(value.color);
            const IconComponent = value.icon;
            
            return (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${colorClasses.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className={`w-8 h-8 ${colorClasses.text}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;