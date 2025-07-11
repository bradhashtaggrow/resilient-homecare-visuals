
import React from 'react';
import { Building2, CheckCircle } from 'lucide-react';

const HospitalBenefitsSection = () => {
  const hospitalBenefits = [
    "Reduce readmissions by 25-40% while optimizing care efficiency.",
    "Scale hospital-at-home services with on-demand contract clinicians.",
    "Maintain profitability with AI-driven automation that reduces overhead."
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                <Building2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl font-apple">For Hospitals</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-6 lg:mb-8" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Expand Home-Based Care Without Disrupting Workflows
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {hospitalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 lg:space-x-4 group">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-apple">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Hospital technology"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefitsSection;
