
import React, { useEffect, useState } from 'react';
import { Quote, Award, Users, BookOpen } from 'lucide-react';

const FounderSection = () => {
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
      { threshold: 0.1 }
    );

    const element = document.getElementById('founder-section');
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const achievements = [
    {
      icon: <BookOpen className="h-4 w-4 sm:h-6 sm:w-6" />,
      title: "PT, DPT",
      subtitle: "Physical Therapist"
    },
    {
      icon: <Users className="h-4 w-4 sm:h-6 sm:w-6" />,
      title: "Founder",
      subtitle: "& CEO"
    },
    {
      icon: <Award className="h-4 w-4 sm:h-6 sm:w-6" />,
      title: "Healthcare",
      subtitle: "Innovation Leader"
    }
  ];

  return (
    <section 
      id="founder-section" 
      className="py-4 sm:py-6 md:py-8 lg:py-10 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Title Section with Apple-Style Typography */}
        <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 transform ${
          isVisible ? 'animate-slide-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-gray-900 leading-none tracking-tight font-black text-shadow-white mb-6 sm:mb-8 hover:scale-105 transition-transform duration-700"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Founder's Story
          </h2>
          <p className="text-blue-600/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-blue-700 transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            from Dr. Jackleen Samuel, PT, DPT | Founder & CEO
          </p>
        </div>

        {/* Enhanced Professional Portrait Section with Subtle Gradient Border */}
        <div className="mb-12 sm:mb-16 flex justify-center">
          <div className={`transition-all duration-1500 transform ${
            isVisible ? 'animate-slide-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative group">
              {/* Subtle Gradient Border with Glow */}
              <div className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                   style={{
                     background: 'linear-gradient(135deg, #0080ff 0%, #0066cc 100%)',
                     filter: 'blur(2px)'
                   }}>
              </div>
              
              {/* Main Image Container */}
              <div className="relative">
                <img 
                  src="/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png"
                  alt="Dr. Jackleen Samuel, PT, DPT - Founder & CEO"
                  className="w-[405px] h-[405px] sm:w-[540px] sm:h-[540px] object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-700 relative z-10 border-2 border-transparent"
                  style={{
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #0080ff 0%, #0066cc 100%) border-box'
                  }}
                  loading="lazy"
                />
                
                {/* Enhanced Achievement Badges with Mobile Optimization */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 hover:scale-110 transition-transform duration-300 z-20">
                  <div className="bg-blue-600 text-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-700 transition-colors duration-300">
                    <BookOpen className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                </div>
                <div className="absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2 hover:scale-110 transition-transform duration-300 z-20">
                  <div className="bg-blue-500 text-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-600 transition-colors duration-300">
                    <Users className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-6 sm:-right-8 hover:scale-110 transition-transform duration-300 z-20">
                  <div className="bg-blue-700 text-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-800 transition-colors duration-300">
                    <Award className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Story Content with Mobile Optimization */}
        <div className={`transition-all duration-1500 delay-500 transform ${
          isVisible ? 'animate-slide-in-right opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Enhanced Quote Section with Mobile Typography */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
              <Quote className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 h-12 w-12 sm:h-16 sm:w-16 text-blue-200 group-hover:text-blue-300 transition-colors duration-500" />
              <blockquote className="text-gray-900 leading-none tracking-tight font-black pl-8 sm:pl-12 group-hover:text-blue-600 transition-colors duration-500"
                          style={{ fontSize: 'clamp(1.25rem, 3vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                "Dad's in the hospital, again..."
              </blockquote>
              <p className="text-blue-600/90 font-medium tracking-wide mt-3 sm:mt-4 pl-8 sm:pl-12 group-hover:text-blue-700 transition-colors duration-500"
                 style={{ fontSize: 'clamp(0.875rem, 2vw, 1.3rem)', lineHeight: 1.3 }}>
                That call became all too familiar.
              </p>
            </div>
            
            {/* Enhanced Story Content with Mobile Typography */}
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
              <p className="group-hover:text-gray-900 transition-colors duration-500">
                Over the last four years of my dad's life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn't return home at all.
              </p>
              
              <p className="group-hover:text-gray-900 transition-colors duration-500">
                As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.
              </p>
              
              <p className="text-blue-600/90 font-medium tracking-wide group-hover:text-blue-700 transition-colors duration-500"
                 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)', lineHeight: 1.3 }}>
                I built this company because families—and hospitals—deserve better.
              </p>
              
              <p className="group-hover:text-gray-900 transition-colors duration-500">
                At Resilient, we partner with hospitals to extend their care into the home. Whether it's primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-blue-500 hover:border-blue-600 transition-colors duration-500">
                <p className="text-gray-700 mb-3 sm:mb-4 group-hover:text-gray-900 transition-colors duration-500">
                  Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both.
                </p>
                <p className="text-gray-900 leading-none tracking-tight font-black hover:text-blue-600 transition-colors duration-500"
                   style={{ fontSize: 'clamp(1.125rem, 2.5vw, 2.5rem)', fontWeight: 900, lineHeight: 0.85 }}>
                  We are Resilient. And so are you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
