
import React from 'react';
import { Building2, CheckCircle } from 'lucide-react';

const HospitalBenefitsSection = () => {
  const hospitalBenefits = [
    "Reduce readmissions by 25-40% while optimizing care efficiency.",
    "Scale hospital-at-home services with on-demand contract clinicians.",
    "Maintain profitability with AI-driven automation that reduces overhead."
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mr-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <span className="text-blue-600 font-bold text-xl font-apple">For Hospitals</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-8" 
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Expand Home-Based Care Without Disrupting Workflows
            </h2>
            <div className="space-y-6">
              {hospitalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed font-apple">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Hospital technology"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefitsSection;
