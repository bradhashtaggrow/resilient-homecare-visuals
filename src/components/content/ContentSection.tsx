
import React from 'react';

interface ContentSectionProps {
  title: string;
  description: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-black tracking-tight font-apple mb-6" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {title}
          </h2>
          <p className="text-gray-600 leading-relaxed font-apple font-medium tracking-wide"
             style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1.4 }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
