
import React from 'react';

interface HeroSectionProps {
  title: string;
  highlightedText: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  highlightedText,
  description,
  buttonText,
  buttonUrl
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {title}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            {highlightedText}
          </span>
        </h1>
        
        {description && (
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            {description}
          </p>
        )}
        
        {buttonText && buttonUrl && (
          <a
            href={buttonUrl}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            {buttonText}
          </a>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;
