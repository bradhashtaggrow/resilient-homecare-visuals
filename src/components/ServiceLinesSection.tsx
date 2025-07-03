
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
      subtitle: "Therapy & Recovery Services Extended into the Home",
      description: "Resilient partners with hospitals to extend therapy and recovery services into the home—built for value-based care, powered by technology, and aligned with hospital workflows.",
      details: "We don't just send therapists into the home. We deliver a fully managed, hospital-branded program that helps your team:",
      benefits: [
        "Generate new revenue under outpatient therapy & RTM billing models",
        "Reduce post-acute costs by avoiding unnecessary high costing placements", 
        "Improve outcomes through early intervention, virtual monitoring, & coordinated recovery",
        "Prepare for value-based programs like Medicare TEAM, ACOs, & bundled payments"
      ],
      color: "blue1",
      image: "knee-exam"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Primary Care at Home", 
      subtitle: "Extend Transitional Care & Rural Health Services",
      description: "Our Primary Care at Home program is designed for hospitals aiming to improve care continuity and reduce readmissions—particularly in transitional care and rural settings.",
      details: "We work with your hospital and TCM teams to deploy physician or advanced practice providers into the home, creating a seamless extension of your existing clinical operations.",
      benefits: [
        "Extension of transitional care management for high-risk discharges",
        "Rural health clinic expansion into underserved communities", 
        "Follow-up visits to reduce ED utilization and readmissions"
      ],
      additionalInfo: "We provide the infrastructure—staffing, technology, and coordination. You maintain the patient relationship and revenue.",
      color: "blue2",
      image: "nurse-patient"
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Acute Hospital-at-Home",
      subtitle: "CMS-Aligned Hospital-at-Home with Full Implementation Support", 
      description: "Our Hospital at Home offering helps hospitals rapidly deploy a compliant, scalable model for delivering inpatient-level care in the home.",
      details: "We support you through every step of implementation:",
      benefits: [
        "Workflow Design",
        "Policy & Procedure Development", 
        "Staff Training & Education",
        "Payor Contracting & Medicare Waiver Submission"
      ],
      note: "Note: The CMS Acute Hospital at Home waiver is currently extended through September 2025. We help hospitals navigate this evolving regulatory environment and prepare for future versions of the program.",
      additionalInfo: "We don't just offer coordination—we help you stand up the program, train your teams, and deliver compliant hospital-level care in the home.",
      color: "blue3",
      image: "hospital-home"
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
      className="py-32 bg-white relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/538d02df-2e37-481f-9af6-58f2718f977a.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* White overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/85" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Stethoscope className="h-4 w-4" />
            <span>Our Core Service Lines</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Fully Streamlined,
            <span className="block healthcare-text-gradient"> Uncompromisingly Simple</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Three core service lines designed to extend your hospital's reach and improve patient outcomes while generating new revenue streams.
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
                  <div className="space-y-6 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                    {/* Icon and Title */}
                    <div className="flex items-start space-x-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-500 ${
                        getColorClasses(service.color, activeService === index)
                      }`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-xl text-blue-600 font-semibold mb-4">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Details */}
                    <p className="text-lg text-gray-700 leading-relaxed font-medium">
                      {service.details}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-4">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start space-x-3">
                          <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    {service.additionalInfo && (
                      <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                        <p className="text-gray-700 leading-relaxed font-medium">
                          {service.additionalInfo}
                        </p>
                      </div>
                    )}

                    {/* Note */}
                    {service.note && (
                      <div className="bg-blue-100 rounded-2xl p-6 border-l-4 border-blue-600">
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

                {/* Image/Visual */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-2xl flex items-center justify-center">
                      <div className={`text-8xl ${
                        service.color === 'blue1' ? 'text-blue-900' :
                        service.color === 'blue2' ? 'text-blue-700' : 'text-blue-500'
                      }`}>
                        {service.icon}
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 healthcare-gradient rounded-full flex items-center justify-center animate-float shadow-xl">
                      <Users className="h-8 w-8 text-white" />
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
