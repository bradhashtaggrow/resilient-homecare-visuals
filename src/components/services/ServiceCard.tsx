
import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

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
      blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
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
                <Icon className="h-12 w-12" />
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="pr-16">
              <h3 className="text-gray-900 leading-none tracking-tight font-black mb-3 font-apple"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                {title}
              </h3>
              <p className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent font-medium tracking-wide font-apple"
                 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.3 }}>
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed font-apple font-medium"
               style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.4 }}>
              {description}
            </p>

            {/* CTA Button */}
            <div className="relative">
              <button className="
                relative px-8 py-4 font-semibold text-white rounded-xl font-apple
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:-translate-y-1
                before:absolute before:inset-0 before:rounded-xl
                before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                after:absolute after:inset-0 after:rounded-xl after:shadow-inner
                after:bg-gradient-to-t after:from-white/10 after:to-transparent
                group overflow-hidden
              "
              style={{ 
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                boxShadow: `
                  0 12px 32px rgba(0, 128, 255, 0.4),
                  0 4px 16px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 20px 48px rgba(0, 128, 255, 0.6),
                  0 8px 24px rgba(0, 0, 0, 0.4),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 12px rgba(0, 0, 0, 0.2)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 12px 32px rgba(0, 128, 255, 0.4),
                  0 4px 16px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
              }}>
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white drop-shadow-lg" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#0080ff]/80 to-[#0066cc]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
