
import React from 'react';
import { UserCheck, CheckCircle } from 'lucide-react';

const ClinicianBenefitsSection = () => {
  const clinicianBenefits = [
    "Work on your schedule—join the home healthcare gig economy.",
    "RAIN automates scheduling, payments, and records management for a seamless experience.",
    "Deliver high-quality, patient-centered care with less bureaucracy."
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-green-50/50 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-1 lg:order-1 relative">
            <div className="aspect-square overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professional"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-green-600/20 to-transparent rounded-full blur-2xl" />
          </div>
          <div className="order-2 lg:order-2">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                <UserCheck className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl font-apple">For Clinicians</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-6 lg:mb-8" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              More Flexibility, More Earnings, More Patient Impact
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {clinicianBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 lg:space-x-4 group">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-full flex items-center justify-center mt-1 group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-apple">{benefit}</p>
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
