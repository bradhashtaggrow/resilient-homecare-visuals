
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
      { threshold: 0.3 }
    );

    const element = document.getElementById('founder-section');
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const achievements = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "PT, DPT",
      subtitle: "Physical Therapist"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Founder",
      subtitle: "& CEO"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Healthcare",
      subtitle: "Innovation Leader"
    }
  ];

  return (
    <section 
      id="founder-section" 
      className="py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Title Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <h2 className="text-gray-900 leading-none tracking-tight font-black mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Founder's Story
          </h2>
          <p className="text-blue-600/90 font-medium tracking-wide"
             style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.3 }}>
            from Dr. Jackleen Samuel, PT, DPT | Founder & CEO
          </p>
        </div>

        {/* Professional Portrait Section */}
        <div className="mb-16 flex justify-center">
          <div className={`transition-all duration-1500 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}>
            <div className="relative">
              <img 
                src="/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png"
                alt="Dr. Jackleen Samuel, PT, DPT - Founder & CEO"
                className="w-80 h-80 object-cover rounded-full shadow-2xl"
              />
              {/* Achievement Badges around the image */}
              <div className="absolute -top-4 -right-4">
                <div className="bg-blue-600 text-white rounded-full p-3 shadow-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                <div className="bg-blue-500 text-white rounded-full p-3 shadow-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-8">
                <div className="bg-blue-700 text-white rounded-full p-3 shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <div className={`transition-all duration-1500 delay-500 ${
          isVisible ? 'animate-slide-in-right' : 'opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Quote Section */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <Quote className="absolute -top-4 -left-4 h-16 w-16 text-blue-200" />
              <blockquote className="text-gray-900 leading-none tracking-tight font-black pl-12"
                          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                "Dad's in the hospital, again..."
              </blockquote>
              <p className="text-blue-600/90 font-medium tracking-wide mt-4 pl-12"
                 style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', lineHeight: 1.3 }}>
                That call became all too familiar.
              </p>
            </div>
            
            {/* Story Content */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <p>
                Over the last four years of my dad's life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn't return home at all.
              </p>
              
              <p>
                As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.
              </p>
              
              <p className="text-blue-600/90 font-medium tracking-wide"
                 style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', lineHeight: 1.3 }}>
                I built this company because families—and hospitals—deserve better.
              </p>
              
              <p>
                At Resilient, we partner with hospitals to extend their care into the home. Whether it's primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-4">
                  Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both.
                </p>
                <p className="text-gray-900 leading-none tracking-tight font-black"
                   style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, lineHeight: 0.85 }}>
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
