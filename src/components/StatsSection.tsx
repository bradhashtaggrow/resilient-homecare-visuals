
import React, { useEffect, useState } from 'react';
import { TrendingUp, Heart, Users, DollarSign, Award, Target } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    costSavings: 0,
    readmissionReduction: 0,
    patientPreference: 0,
    lessStress: 0
  });

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

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = {
        costSavings: 38,
        readmissionReduction: 70,
        patientPreference: 91,
        lessStress: 96
      };

      const duration = 3000;
      const steps = 100;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts(prev => {
          const newCounts = { ...prev };
          let allComplete = true;

          Object.keys(targets).forEach(key => {
            const target = targets[key as keyof typeof targets];
            const current = newCounts[key as keyof typeof newCounts];
            
            if (current < target) {
              const increment = Math.ceil(target / steps);
              
              newCounts[key as keyof typeof newCounts] = Math.min(
                current + increment,
                target
              );
              allComplete = false;
            }
          });

          if (allComplete) {
            clearInterval(timer);
          }

          return newCounts;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stats = [
    {
      icon: <DollarSign className="h-10 w-10" />,
      value: `${counts.costSavings}%`,
      label: "Cost Savings",
      description: "A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.",
      color: "green",
      trend: "JAMA Internal Medicine"
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      value: `${counts.readmissionReduction}%`,
      label: "Reduction in Readmissions",
      description: "A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.",
      color: "red",
      trend: "30-day readmissions"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      value: `${counts.patientPreference}%`,
      label: "Patient Preference",
      description: "A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.",
      color: "pink",
      trend: "Annals of Internal Medicine"
    },
    {
      icon: <Users className="h-10 w-10" />,
      value: `${counts.lessStress}%`,
      label: "Less Stress",
      description: "A study published in BMJ Open Quality reported that 96% of patients felt less stressed receiving care at home compared to inpatient hospital care.",
      color: "blue",
      trend: "BMJ Open Quality"
    }
  ];

  const getGradientClass = (color: string) => {
    const gradients = {
      red: 'from-red-500 to-pink-500',
      pink: 'from-pink-500 to-rose-500',
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500'
    };
    return gradients[color as keyof typeof gradients] || 'from-blue-500 to-purple-500';
  };

  return (
    <section id="stats-section" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Award className="h-4 w-4" />
            <span>What does the Research Say?</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Powering Hospital Level 
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Value-Based Care at Home
            </span>
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            A different approach to hospital care, using simple methods and advanced AI technology. 
            We manage the work. You own the program.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
            >
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover-lift border border-white/20 h-full transition-all duration-500 hover:bg-white/20">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${getGradientClass(stat.color)} text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  
                  {/* Animated Value */}
                  <div className="text-5xl font-bold text-white mb-3 animate-count-up">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xl font-semibold text-blue-100 mb-3">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-blue-200 mb-4 leading-relaxed">
                    {stat.description}
                  </div>
                  
                  {/* Source/Trend */}
                  <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.trend}</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${getGradientClass(stat.color)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-6">
              You Keep the Brand. The Data. The Relationship.
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We operate behind the scenes—white-labeled under your hospital's brand and integrated into your workflows. 
              Extend your hospital. Power your value-based future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Launch Service Lines Beyond Your Four Walls
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
