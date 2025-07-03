
import React, { useEffect, useState } from 'react';
import { Activity, Heart, Building2, ArrowRight, Users, Stethoscope, Home, Shield, Target, TrendingUp, MapPin, Clock, Zap, Award, CheckCircle } from 'lucide-react';
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

  // 3D Animated Icon Component with Depth Effects
  const AnimatedIcon3D = ({ icon: Icon, color = "blue", delay = 0 }) => {
    const colorClasses = {
      emerald: 'from-emerald-400 via-emerald-500 to-emerald-600 shadow-emerald-500/50',
      blue: 'from-blue-400 via-blue-500 to-blue-600 shadow-blue-500/50',
      purple: 'from-purple-400 via-purple-500 to-purple-600 shadow-purple-500/50',
      orange: 'from-orange-400 via-orange-500 to-orange-600 shadow-orange-500/50',
      red: 'from-red-400 via-red-500 to-red-600 shadow-red-500/50',
      green: 'from-green-400 via-green-500 to-green-600 shadow-green-500/50',
      indigo: 'from-indigo-400 via-indigo-500 to-indigo-600 shadow-indigo-500/50',
      cyan: 'from-cyan-400 via-cyan-500 to-cyan-600 shadow-cyan-500/50',
      pink: 'from-pink-400 via-pink-500 to-pink-600 shadow-pink-500/50',
      yellow: 'from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50'
    };

    return (
      <div className="w-10 h-10 flex-shrink-0 mt-0.5 perspective-1000">
        <div 
          className={`
            w-full h-full rounded-xl bg-gradient-to-br ${colorClasses[color]} 
            flex items-center justify-center cursor-pointer
            transform-3d transition-all duration-500 ease-out
            shadow-lg hover:shadow-2xl
            hover:scale-110 hover:-translate-y-2 hover:rotate-y-12 hover:rotate-x-6
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
            before:from-white/20 before:to-transparent before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            relative overflow-hidden
          `}
          style={{ 
            animationDelay: `${delay}ms`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Icon className="h-5 w-5 text-white drop-shadow-lg relative z-10" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  };

  const services = [
    {
      icon: <Activity className="h-12 w-12" />,
      title: "Outpatient PT Anywhere",
      subtitle: "Home-Based Therapy & Recovery",
      description: "Hospital-branded physical therapy delivered directly to patients' homes with full technology integration.",
      benefits: [
        { text: "Generate new outpatient therapy revenue", icon: TrendingUp, color: "emerald" },
        { text: "Reduce costly post-acute placements", icon: Shield, color: "blue" },
        { text: "Improve patient outcomes with early intervention", icon: Target, color: "purple" },
        { text: "Prepare for value-based care programs", icon: Award, color: "orange" }
      ],
      color: "blue",
      patientImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Primary Care at Home", 
      subtitle: "Transitional & Rural Care Extension",
      description: "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      benefits: [
        { text: "Extend transitional care management for high-risk patients", icon: Users, color: "red" },
        { text: "Expand rural health clinic reach into underserved areas", icon: MapPin, color: "green" },
        { text: "Reduce readmissions with targeted follow-up visits", icon: CheckCircle, color: "indigo" }
      ],
      color: "red",
      patientImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Acute Hospital-at-Home",
      subtitle: "CMS-Compliant Inpatient Care at Home", 
      description: "Full implementation support for hospital-level care delivery in the home environment.",
      benefits: [
        { text: "Complete workflow design & policy development", icon: Zap, color: "cyan" },
        { text: "Staff training & education programs", icon: Users, color: "pink" },
        { text: "Medicare waiver submission support", icon: Clock, color: "yellow" }
      ],
      note: "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
      color: "cyan",
      patientImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive ? 'bg-blue-600 text-white shadow-blue-600/25' : 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      red: isActive ? 'bg-red-600 text-white shadow-red-600/25' : 'text-red-600 bg-red-50 hover:bg-red-100',
      cyan: isActive ? 'bg-cyan-600 text-white shadow-cyan-600/25' : 'text-cyan-600 bg-cyan-50 hover:bg-cyan-100'
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
                  <div className="space-y-6 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 relative">
                    {/* Service Icon */}
                    <div className="absolute -top-6 -right-6 w-24 h-24">
                      <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                        getColorClasses(service.color, activeService === index)
                      } flex items-center justify-center shadow-2xl`}>
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

                    {/* Benefits List with 3D Animated Icons */}
                    <div className="space-y-4">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start space-x-4">
                          <AnimatedIcon3D 
                            icon={benefit.icon} 
                            color={benefit.color}
                            delay={benefitIndex * 150} 
                          />
                          <span className="text-gray-700 leading-relaxed flex-1">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note */}
                    {service.note && (
                      <div className="bg-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-blue-600">
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
