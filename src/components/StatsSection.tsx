
import React, { useEffect, useState } from 'react';
import { TrendingUp, Heart, Users, DollarSign, Award, Target } from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    readmissionReduction: 0,
    patientSatisfaction: 0,
    clinicianEfficiency: 0,
    costSavings: 0,
    patientsServed: 0,
    avgResponseTime: 0
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
        readmissionReduction: 25,
        patientSatisfaction: 94,
        clinicianEfficiency: 40,
        costSavings: 32,
        patientsServed: 1000,
        avgResponseTime: 4.2
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
              const increment = key === 'patientsServed' 
                ? Math.ceil(target / steps) 
                : key === 'avgResponseTime' 
                  ? target / steps 
                  : Math.ceil(target / steps);
              
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
      icon: <TrendingUp className="h-10 w-10" />,
      value: `${counts.readmissionReduction}%`,
      label: "Lower Readmission Rates",
      description: "Significant reduction in 30-day hospital readmissions",
      color: "red",
      trend: "+5% this quarter"
    },
    {
      icon: <Heart className="h-10 w-10" />,
      value: `${counts.patientSatisfaction}%`,
      label: "Patient Satisfaction",
      description: "Patients report dramatically improved recovery experience",
      color: "pink",
      trend: "+8% vs industry avg"
    },
    {
      icon: <Users className="h-10 w-10" />,
      value: `${counts.clinicianEfficiency}%`,
      label: "Clinician Efficiency",
      description: "Reduction in administrative overhead and burnout",
      color: "blue",
      trend: "3.2 hrs saved/day"
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      value: `$${counts.costSavings}K`,
      label: "Average Cost Savings",
      description: "Per patient through reduced readmissions and complications",
      color: "green",
      trend: "ROI: 320%"
    },
    {
      icon: <Award className="h-10 w-10" />,
      value: `${counts.patientsServed.toLocaleString()}+`,
      label: "Patients Served",
      description: "Lives transformed through our comprehensive platform",
      color: "purple",
      trend: "+45% growth YoY"
    },
    {
      icon: <Target className="h-10 w-10" />,
      value: `${counts.avgResponseTime.toFixed(1)} min`,
      label: "Average Response Time",
      description: "Lightning-fast emergency response and care coordination",
      color: "orange",
      trend: "Industry leading"
    }
  ];

  const getGradientClass = (color: string) => {
    const gradients = {
      red: 'from-red-500 to-pink-500',
      pink: 'from-pink-500 to-rose-500',
      blue: 'from-blue-500 to-cyan-500',
      green: 'from-green-500 to-emerald-500',
      purple: 'from-purple-500 to-indigo-500',
      orange: 'from-orange-500 to-yellow-500'
    };
    return gradients[color as keyof typeof gradients] || 'from-blue-500 to-purple-500';
  };

  return (
    <section id="stats-section" className="py-32 relative overflow-hidden">
      {/* Revolutionary Gradient Background */}
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
            <span>Measurable Impact & Results</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Proven Results That 
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Transform Healthcare
            </span>
          </h2>
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Our revolutionary platform delivers measurable improvements in patient outcomes, 
            clinician efficiency, and healthcare economics—backed by real data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
            >
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover-lift border border-white/20 h-full transition-all duration-500 hover:bg-white/20">
                  {/* Icon with Dynamic Gradient */}
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
                  
                  {/* Trend Indicator */}
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

        {/* Bottom CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1500 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to see these results in your organization?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the healthcare revolution and discover how Resilient Healthcare 
              can transform your patient outcomes and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl">
                Get Your Custom ROI Analysis
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                Schedule Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
