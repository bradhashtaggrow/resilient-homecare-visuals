
import React, { useEffect, useState } from 'react';
import { Building2, Database, Users, Target, TrendingUp, Heart } from 'lucide-react';

const ValuePropositionSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('value-proposition-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // 3D Animated Icon Component
  const AnimatedIcon3D = ({ icon: Icon, delay = 0 }) => {
    return (
      <div className="w-20 h-20 mx-auto mb-6 perspective-1000">
        <div 
          className={`
            w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 
            flex items-center justify-center cursor-pointer
            transform-3d transition-all duration-700 ease-out
            shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/70
            hover:scale-110 hover:-translate-y-3 hover:rotate-y-12 hover:rotate-x-6
            before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r 
            before:from-white/20 before:to-transparent before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            relative overflow-hidden
          `}
          style={{ 
            animationDelay: `${delay}ms`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Icon className="h-10 w-10 text-white drop-shadow-lg relative z-10" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  };

  const valueProps = [
    {
      icon: Target,
      title: "Expand Care Anywhere.",
      subtitle: "Improve Outcomes.",
      subtitle2: "Capture Revenue.",
      description: "Resilient partners with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue."
    },
    {
      icon: Building2,
      title: "You Keep the Brand.",
      subtitle: "The Data.",
      subtitle2: "The Relationship.",
      description: "You Keep the Brand. The Data. The Relationship. We operate behind the scenes—white-labeled under your hospital's brand and integrated into your workflows."
    },
    {
      icon: TrendingUp,
      title: "Extend Your Hospital.",
      subtitle: "Power Your Value-Based",
      subtitle2: "Future.",
      description: "Launch service lines beyond your four walls with Resilient—and get in the game for value-based care and risk-based contracts without the overhead."
    }
  ];

  return (
    <section id="value-proposition-section" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <h2 className="text-black leading-none tracking-tight font-black mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            <span className="text-blue-600">We manage the work.</span>
            <span className="block text-gray-900">You own the program.</span>
          </h2>
        </div>

        {/* Value Propositions Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{animationDelay: `${index * 300}ms`}}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 hover-lift h-full">
                {/* 3D Animated Icon */}
                <AnimatedIcon3D icon={prop.icon} delay={index * 200} />
                
                {/* Title and Subtitles */}
                <div className="mb-6">
                  <h3 className="text-gray-900 leading-none tracking-tight font-black mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
                    {prop.title}
                  </h3>
                  <p className="text-gray-900 leading-none tracking-tight font-black mb-1"
                     style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                    {prop.subtitle}
                  </p>
                  <p className="text-gray-900 leading-none tracking-tight font-black"
                     style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                    {prop.subtitle2}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-lg">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
