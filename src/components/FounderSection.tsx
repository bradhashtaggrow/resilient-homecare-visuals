
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

    // Parallax scroll effect
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
      title: "15+ Years",
      subtitle: "Clinical Practice"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "1000+",
      subtitle: "Patients Treated"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Healthcare",
      subtitle: "Innovation Leader"
    }
  ];

  return (
    <section id="founder-section" className="py-32 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Enhanced Portrait */}
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
                    {/* Portrait Placeholder with Enhanced Design */}
                    <div className="text-white text-8xl font-bold relative z-10">
                      JS
                    </div>
                    
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                  </div>
                </div>
                
                {/* Floating Professional Elements */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-float shadow-xl">
                  <span className="text-white text-2xl">⚕️</span>
                </div>
                <div className="absolute -bottom-8 -left-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '2s'}}>
                  <span className="text-white text-xl">💙</span>
                </div>
                <div className="absolute top-1/3 -left-12 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-float shadow-xl" style={{animationDelay: '4s'}}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Achievement Badges */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-2xl p-4 shadow-lg text-center transition-all duration-1000 delay-${index * 200} hover-lift ${
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

          {/* Right Column - Revolutionary Story */}
          <div className={`transition-all duration-1500 delay-500 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0'
          }`}>
            <div className="space-y-8">
              {/* Quote Section */}
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 h-16 w-16 text-blue-200" />
                <blockquote className="text-3xl md:text-4xl font-medium text-gray-900 leading-relaxed pl-12">
                  "Dad's in the hospital, again..."
                </blockquote>
              </div>
              
              {/* Enhanced Story Content */}
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-900">
                  When I received that call for the third time in six months, I knew something 
                  had to fundamentally change.
                </p>
                
                <p>
                  As a Doctor of Physical Therapy with over 15 years of clinical experience, 
                  I understood the medical complexities. As a daughter watching her father 
                  struggle through the revolving door of hospital readmissions, I felt the 
                  family's profound frustration and helplessness.
                </p>
                
                <p>
                  The gap between hospital discharge and successful home recovery wasn't just 
                  visible—it was a chasm. Patients were being sent home with complex care plans, 
                  medications they didn't understand, and exercises they couldn't remember, 
                  but no real support system to ensure they followed through.
                </p>
                
                <p className="text-xl font-semibold text-blue-600">
                  That's when I realized we needed to bridge this gap with technology that 
                  actually works for both patients and clinicians.
                </p>
                
                <p>
                  We needed to extend hospital-level care into the home environment. Not just 
                  through another app or device, but through a comprehensive platform that 
                  truly understands the complexities of healthcare delivery and the human 
                  experience of recovery.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-500">
                  <p className="text-xl font-bold text-gray-900 mb-4">
                    Resilient Healthcare was born from this deeply personal mission—to ensure 
                    no family has to experience the preventable cycle of hospital readmissions.
                  </p>
                  <p className="text-gray-700">
                    Today, we're not just solving a healthcare problem. We're revolutionizing 
                    how care is delivered, experienced, and measured—one patient, one family, 
                    one recovery at a time.
                  </p>
                </div>
              </div>
              
              {/* Enhanced Professional Credentials */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
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
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>15+ years in clinical practice</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Healthcare innovation thought leader</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Featured speaker at 20+ healthcare conferences</span>
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
