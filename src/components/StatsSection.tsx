
import React, { useEffect, useState } from 'react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    readmissionReduction: 0,
    patientSatisfaction: 0,
    clinicianEfficiency: 0,
    costSavings: 0
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
        costSavings: 32
      };

      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts(prev => {
          const newCounts = { ...prev };
          let allComplete = true;

          Object.keys(targets).forEach(key => {
            if (newCounts[key] < targets[key]) {
              newCounts[key] = Math.min(
                newCounts[key] + Math.ceil(targets[key] / steps),
                targets[key]
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
      value: `${counts.readmissionReduction}%`,
      label: "Lower Readmission Rates",
      description: "Significant reduction in 30-day hospital readmissions"
    },
    {
      value: `${counts.patientSatisfaction}%`,
      label: "Patient Satisfaction",
      description: "Patients report improved recovery experience"
    },
    {
      value: `${counts.clinicianEfficiency}%`,
      label: "Clinician Efficiency",
      description: "Reduction in administrative overhead"
    },
    {
      value: `$${counts.costSavings}K`,
      label: "Average Cost Savings",
      description: "Per patient through reduced readmissions"
    }
  ];

  return (
    <section id="stats-section" className="py-20 healthcare-gradient">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Proven Results That Matter
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our platform delivers measurable improvements in patient outcomes, 
            clinician efficiency, and healthcare costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-1000 delay-${index * 200} ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            >
              <div className="medical-card p-8 rounded-xl hover-lift bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-4xl font-bold text-white mb-2 animate-count-up">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-blue-100 mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-blue-200">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
