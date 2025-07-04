
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

        {/* Dashboard */}
        <div className="mb-16 relative">
          <div className={`transition-all duration-1500 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0'
          }`}>
            {/* Dashboard Background Container */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-8 shadow-2xl min-h-[600px]">
              
              {/* Achievement Badges - positioned around the dashboard */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center transition-all duration-1000 delay-${index * 200} hover-lift ${
                      isVisible ? 'animate-slide-up' : 'opacity-0'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100/20 rounded-xl mb-3 text-blue-200">
                      {achievement.icon}
                    </div>
                    <div className="text-lg font-bold text-white">{achievement.title}</div>
                    <div className="text-sm text-blue-200">{achievement.subtitle}</div>
                  </div>
                ))}
              </div>

              {/* Dashboard Background Elements - positioned at bottom */}
              <div className="grid grid-cols-2 gap-6 opacity-30">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="h-20 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded"></div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="h-20 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded"></div>
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
            
            {/* Professional Credentials */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  JS
                </div>
                <div>
                  <div className="text-gray-900 leading-none tracking-tight font-black mb-2"
                       style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, lineHeight: 0.85 }}>
                    Dr. Jackleen Samuel, PT, DPT
                  </div>
                  <div className="text-blue-600/90 font-medium tracking-wide mb-3"
                       style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', lineHeight: 1.3 }}>
                    Founder & CEO, Resilient Healthcare
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Doctor of Physical Therapy (DPT)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>Healthcare delivery innovation expert</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                      <span>Hospital partnership strategist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
