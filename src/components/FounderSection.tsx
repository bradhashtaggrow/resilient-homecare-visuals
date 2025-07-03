
import React, { useEffect, useState } from 'react';
import { Quote, Award, Users, BookOpen } from 'lucide-react';

const FounderSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

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

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
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
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?ixlib=rb-4.0.3&auto=format&fit=crop&w=3024&h=3779&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Very subtle gradient overlay to naturally blend texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/93 to-white/95" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Portrait */}
          <div className={`transition-all duration-1500 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0'
          }`}>
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main Portrait Container */}
              <div 
                className="relative"
                style={{ transform: `translateY(${-parallaxOffset}px)` }}
              >
                <div className="w-96 h-96 mx-auto rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-3 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
                    <div className="text-white text-8xl font-bold relative z-10">
                      JS
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-float shadow-xl">
                  <span className="text-white text-2xl">⚕️</span>
                </div>
                <div className="absolute -bottom-8 -left-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '2s'}}>
                  <span className="text-white text-xl">💙</span>
                </div>
                <div className="absolute top-1/3 -left-12 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-800 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '4s'}}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center transition-all duration-1000 delay-${index * 200} hover-lift ${
                      isVisible ? 'animate-slide-up' : 'opacity-0'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3 text-blue-600">
                      {achievement.icon}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Founder Story */}
          <div className={`transition-all duration-1500 delay-500 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0'
          }`}>
            <div className="space-y-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              {/* Quote Section */}
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 h-16 w-16 text-blue-200" />
                <blockquote className="text-3xl md:text-4xl font-medium text-gray-900 leading-relaxed pl-12">
                  "Dad's in the hospital, again..."
                </blockquote>
              </div>
              
              {/* Story Content */}
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-900">
                  That call became all too familiar.
                </p>
                
                <p>
                  Over the last four years of my dad's life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn't return home at all.
                </p>
                
                <p>
                  As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.
                </p>
                
                <p className="text-xl font-semibold text-blue-600">
                  I built this company because families—and hospitals—deserve better.
                </p>
                
                <p>
                  At Resilient, we partner with hospitals to extend their care into the home. Whether it's primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-blue-500">
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both.
                  </p>
                  <p className="text-gray-700 text-2xl font-semibold">
                    We are Resilient. And so are you.
                  </p>
                </div>
              </div>
              
              {/* Professional Credentials */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 healthcare-gradient rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    JS
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. Jackleen Samuel, PT, DPT
                    </div>
                    <div className="text-lg text-blue-600 font-semibold mb-3">
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
      </div>
    </section>
  );
};

export default FounderSection;
