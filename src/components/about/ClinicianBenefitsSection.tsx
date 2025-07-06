
import React from 'react';
import { UserCheck, CheckCircle } from 'lucide-react';

const ClinicianBenefitsSection = () => {
  const clinicianBenefits = [
    "Work on your schedule—join the home healthcare gig economy.",
    "RAIN automates scheduling, payments, and records management for a seamless experience.",
    "Deliver high-quality, patient-centered care with less bureaucracy."
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-50/50 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="lg:order-1 relative">
            <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professional"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-600/20 to-transparent rounded-full blur-2xl" />
          </div>
          <div className="lg:order-2">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mr-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <span className="text-green-600 font-bold text-xl font-apple">For Clinicians</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-8" 
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              More Flexibility, More Earnings, More Patient Impact
            </h2>
            <div className="space-y-6">
              {clinicianBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed font-apple">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicianBenefitsSection;
