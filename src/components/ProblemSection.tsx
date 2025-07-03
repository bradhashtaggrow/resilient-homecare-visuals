
import React, { useEffect, useState } from 'react';
import { AlertTriangle, TrendingDown, Users, HeartPulse, Clock, DollarSign } from 'lucide-react';

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('problem-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % 6);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const problems = [
    {
      icon: <AlertTriangle className="h-10 w-10" />,
      title: "Fragmented Care Transitions",
      description: "Patients lost between hospital discharge and home recovery",
      stat: "30%",
      statLabel: "readmission rate",
      color: "red"
    },
    {
      icon: <TrendingDown className="h-10 w-10" />,
      title: "Critical Readmission Crisis", 
      description: "Healthcare costs skyrocket with preventable hospital returns",
      stat: "$41B",
      statLabel: "annual cost",
      color: "orange"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Clinician Burnout Epidemic",
      description: "Healthcare workers overwhelmed by inefficient workflows",
      stat: "76%",
      statLabel: "report burnout",
      color: "yellow"
    },
    {
      icon: <HeartPulse className="h-10 w-10" />,
      title: "Monitoring Gaps",
      description: "Critical health changes go undetected at home",
      stat: "48hrs",
      statLabel: "average delay",
      color: "purple"
    },
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Communication Delays",
      description: "Vital patient information lost in translation",
      stat: "4.2hrs",
      statLabel: "response time",
      color: "blue"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Resource Waste",
      description: "Inefficient care coordination drains healthcare budgets",
      stat: "$2.8K",
      statLabel: "per readmission",
      color: "green"
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      red: isActive ? 'bg-red-500 text-white shadow-red-500/25' : 'text-red-500 bg-red-50 hover:bg-red-100',
      orange: isActive ? 'bg-orange-500 text-white shadow-orange-500/25' : 'text-orange-500 bg-orange-50 hover:bg-orange-100',
      yellow: isActive ? 'bg-yellow-500 text-white shadow-yellow-500/25' : 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100',
      purple: isActive ? 'bg-purple-500 text-white shadow-purple-500/25' : 'text-purple-500 bg-purple-50 hover:bg-purple-100',
      blue: isActive ? 'bg-blue-500 text-white shadow-blue-500/25' : 'text-blue-500 bg-blue-50 hover:bg-blue-100',
      green: isActive ? 'bg-green-500 text-white shadow-green-500/25' : 'text-green-500 bg-green-50 hover:bg-green-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="problem-section" className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.5) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Revolutionary Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <AlertTriangle className="h-4 w-4" />
            <span>Healthcare Crisis Alert</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            "Dad's in the hospital,
            <span className="block healthcare-text-gradient"> again..."</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every year, millions of patients cycle through a fundamentally broken system. 
            <strong className="text-gray-900"> There has to be a better way.</strong>
          </p>
        </div>

        {/* Revolutionary Problem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const isActive = activeCard === index;
            return (
              <div 
                key={index}
                className={`relative group transition-all duration-700 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{animationDelay: `${index * 150}ms`}}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={`p-8 rounded-2xl transition-all duration-500 hover-lift ${
                  isActive 
                    ? 'bg-white shadow-2xl scale-105 border border-gray-200' 
                    : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-xl'
                }`}>
                  {/* Icon with Dynamic Color */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
                    getColorClasses(problem.color, isActive)
                  }`}>
                    {problem.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {/* Dynamic Stats */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div className={`text-3xl font-bold transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {problem.stat}
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        {problem.statLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl text-white">
            <h3 className="text-4xl font-bold mb-6">What if recovery could be seamless?</h3>
            <p className="text-xl mb-8 opacity-90">
              What if we could bridge the gap between hospital and home? 
              What if care could be continuous, supported, and successful?
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-lg px-8 py-4"
            >
              Discover the Solution
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
