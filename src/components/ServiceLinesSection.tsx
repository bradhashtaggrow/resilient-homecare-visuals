
import React, { useEffect, useState } from 'react';
import { Activity, Heart, Building2, ArrowRight, CheckCircle, Users, Stethoscope } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ServiceLinesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

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

    const element = document.getElementById('service-lines-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Activity className="h-12 w-12" />,
      title: "Outpatient PT Anywhere",
      subtitle: "Home-Based Therapy & Recovery",
      description: "Hospital-branded physical therapy delivered directly to patients' homes with full technology integration.",
      benefits: [
        "Generate new outpatient therapy revenue",
        "Reduce costly post-acute placements", 
        "Improve patient outcomes with early intervention",
        "Prepare for value-based care programs"
      ],
      color: "blue1",
      patientImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Primary Care at Home", 
      subtitle: "Transitional & Rural Care Extension",
      description: "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      benefits: [
        "Extend transitional care management for high-risk patients",
        "Expand rural health clinic reach into underserved areas", 
        "Reduce readmissions with targeted follow-up visits"
      ],
      color: "blue2",
      patientImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Acute Hospital-at-Home",
      subtitle: "CMS-Compliant Inpatient Care at Home", 
      description: "Full implementation support for hospital-level care delivery in the home environment.",
      benefits: [
        "Complete workflow design & policy development",
        "Staff training & education programs", 
        "Medicare waiver submission support"
      ],
      note: "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
      color: "blue3",
      patientImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const getColorClasses = (color: String, isActive: boolean) => {
    const colors = {
      blue1: isActive ? 'bg-blue-900 text-white shadow-blue-900/25' : 'text-blue-900 bg-blue-50 hover:bg-blue-100',
      blue2: isActive ? 'bg-blue-700 text-white shadow-blue-700/25' : 'text-blue-700 bg-blue-100 hover:bg-blue-200',
      blue3: isActive ? 'bg-blue-500 text-white shadow-blue-500/25' : 'text-blue-500 bg-blue-200 hover:bg-blue-300'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section 
      id="service-lines-section" 
      className="py-32 bg-white relative overflow-hidden paper-texture-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-blue-100/90 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Stethoscope className="h-4 w-4" />
            <span>Our Core Service Lines</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Fully Streamlined,
            <span className="block healthcare-text-gradient"> Uncompromisingly Simple</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Three core service lines designed to extend your hospital's reach and improve patient outcomes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{animationDelay: `${index * 300}ms`}}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-6 bg-white/85 backdrop-blur-sm rounded-3xl p-8 shadow-xl relative">
                    {/* 3D Floating Icon */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 perspective-1000">
                      <div className={`w-full h-full rounded-2xl transition-all duration-500 transform hover:rotate-y-12 hover:rotate-x-12 ${
                        getColorClasses(service.color, activeService === index)
                      } flex items-center justify-center animate-float shadow-2xl`}>
                        {service.icon}
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <div className="pr-16">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xl text-blue-600 font-semibold mb-4">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefits List with 3D Icons */}
                    <div className="space-y-4">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start space-x-4">
                          <div className="w-8 h-8 perspective-1000 flex-shrink-0 mt-0.5">
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:rotate-12 hover:scale-110 shadow-lg">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          <span className="text-gray-700 leading-relaxed flex-1">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note */}
                    {service.note && (
                      <div className="bg-blue-100/90 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-600">
                        <p className="text-gray-700 leading-relaxed">
                          {service.note}
                        </p>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button 
                      size="lg" 
                      className="healthcare-gradient hover:scale-105 transition-all duration-300 text-white px-8 py-4 text-lg"
                    >
                      Learn More About {service.title}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Patient Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative group">
                    <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden relative">
                      <img 
                        src={service.patientImage}
                        alt={`Patient receiving ${service.title} care`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                    </div>
                    
                    {/* 3D Floating Elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 perspective-1000">
                      <div className="w-full h-full healthcare-gradient rounded-full flex items-center justify-center animate-float shadow-xl transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-8 -left-8 w-14 h-14 perspective-1000">
                      <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center animate-float shadow-xl transform transition-all duration-500 hover:rotate-12 hover:scale-110" style={{animationDelay: '2s'}}>
                        <span className="text-white text-xl">💙</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceLinesSection;
