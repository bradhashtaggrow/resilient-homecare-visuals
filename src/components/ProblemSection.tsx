
import React, { useEffect, useState } from 'react';
import { AlertCircle, TrendingDown, Users } from 'lucide-react';

const ProblemSection = () => {
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

    const element = document.getElementById('problem-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: <AlertCircle className="h-8 w-8 text-red-500" />,
      title: "Fragmented Care",
      description: "Patients get lost between hospital discharge and home recovery"
    },
    {
      icon: <TrendingDown className="h-8 w-8 text-orange-500" />,
      title: "High Readmissions",
      description: "30-day readmission rates remain critically high across the industry"
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: "Clinician Burnout",
      description: "Healthcare workers overwhelmed by inefficient systems and workflows"
    }
  ];

  return (
    <section id="problem-section" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Story */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              "Dad's in the hospital, 
              <span className="healthcare-text-gradient"> again...</span>"
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Every year, millions of patients cycle through a broken system. 
              They're discharged too early, receive fragmented care, and end up 
              readmitted within weeks. Meanwhile, healthcare workers struggle 
              with overwhelming caseloads and outdated tools.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              <strong>There has to be a better way.</strong> What if we could bridge 
              the gap between hospital and home? What if recovery could be seamless, 
              supported, and successful?
            </p>
          </div>

          {/* Right Column - Problem Icons */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`}>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="medical-card p-6 rounded-xl hover-lift"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {problem.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {problem.title}
                      </h3>
                      <p className="text-gray-600">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
