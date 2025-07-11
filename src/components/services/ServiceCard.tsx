
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  icon: LucideIcon;
  title: string;  
  subtitle: string;
  description: string;
  color: string;
  patient_image_url: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  icon: Icon,
  title,
  subtitle, 
  description,
  color,
  patient_image_url,
  index
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-[#4285F4] bg-gradient-to-r from-[#4285F4]/10 to-[#1565C0]/10 hover:from-[#4285F4] hover:to-[#1565C0] hover:text-white',
      green: 'text-green-600 bg-green-50 hover:bg-green-100', 
      purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      teal: 'text-teal-600 bg-teal-50 hover:bg-teal-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div 
      className={`${
        index % 2 === 0 ? 'animate-swoop-in-left' : 'animate-swoop-in-right'
      } opacity-100 translate-y-0`}
    >
      <div className={`grid lg:grid-cols-2 gap-12 items-center ${
        index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
      }`}>
        {/* Content */}
        <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
          <div className="space-y-6 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 relative">
            {/* Service Icon */}
            <div className="absolute -top-6 -right-6 w-24 h-24">
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                getColorClasses(color)
              } flex items-center justify-center shadow-2xl`}>
                <Icon className="h-12 w-12 transition-colors duration-300" />
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="pr-16">
              <h3 className="text-gray-900 leading-none tracking-tight font-black mb-3 font-apple"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                {title}
              </h3>
              <p className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent font-medium tracking-wide font-apple"
                 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.3 }}>
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed font-apple font-medium"
               style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.4 }}>
              {description}
            </p>
          </div>
        </div>

        {/* Patient Image */}
        <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
          <div className="relative group">
            <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden relative">
              <img 
                src={patient_image_url}
                alt={`${title} - Healthcare service`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
