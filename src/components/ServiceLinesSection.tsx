
import React, { useState, useMemo, useCallback } from 'react';
import { Activity, Heart, Building2, ArrowRight, Users, Stethoscope, Home, Shield, Target, TrendingUp, MapPin, Clock, Zap, Award, CheckCircle, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ServiceLinesSection = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });
  
  const [activeService, setActiveService] = useState(0);

  // Memoize services to prevent recreation on every render
  const services = useMemo(() => [
    {
      icon: <Activity className="h-12 w-12" />,
      title: "Outpatient PT Anywhere",
      subtitle: "Home-Based Therapy & Recovery",
      description: "Hospital-branded physical therapy delivered directly to patients' homes with full technology integration.",
      benefits: [
        { text: "Generate new outpatient therapy revenue", icon: TrendingUp },
        { text: "Reduce costly post-acute placements", icon: Shield },
        { text: "Improve patient outcomes with early intervention", icon: Target },
        { text: "Prepare for value-based care programs", icon: Award }
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
        { text: "Extend transitional care management for high-risk patients", icon: Users },
        { text: "Expand rural health clinic reach into underserved areas", icon: MapPin },
        { text: "Reduce readmissions with targeted follow-up visits", icon: CheckCircle }
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
        { text: "Complete workflow design & policy development", icon: Zap },
        { text: "Staff training & education programs", icon: Users },
        { text: "Medicare waiver submission support", icon: Clock }
      ],
      note: "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
      color: "cyan",
      patientImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ], []);

  // 3D Animated Icon Component with proper TypeScript interface
  interface AnimatedIcon3DProps {
    icon: LucideIcon;
    delay?: number;
  }

  const AnimatedIcon3D = React.memo<AnimatedIcon3DProps>(({ icon: Icon, delay = 0 }) => {
    return (
      <div className="w-10 h-10 flex-shrink-0 mt-0.5 perspective-1000">
        <div 
          className={`
            w-full h-full rounded-xl 
            bg-gradient-to-r from-[#0080ff] to-[#0066cc]
            flex items-center justify-center cursor-pointer
            transform-3d transition-all duration-500 ease-out
            shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/50
            hover:scale-110 hover:-translate-y-2 hover:rotate-y-12 hover:rotate-x-6
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
            before:from-white/20 before:to-transparent before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            relative overflow-hidden will-change-transform
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
  });

  const getColorClasses = useCallback((color: string, isActive: boolean) => {
    const colors = {
      blue: isActive ? 'bg-gradient-to-r from-[#0080ff] to-[#0066cc] text-white shadow-blue-600/25' : 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      red: isActive ? 'bg-gradient-to-r from-[#0080ff] to-[#0066cc] text-white shadow-blue-600/25' : 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      cyan: isActive ? 'bg-gradient-to-r from-[#0080ff] to-[#0066cc] text-white shadow-blue-600/25' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
    };
    return colors[color as keyof typeof colors];
  }, []);

  return (
    <section 
      ref={elementRef}
      className="py-32 bg-white relative overflow-hidden paper-texture-subtle will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-black leading-none tracking-tight font-black text-shadow-white mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Fully Streamlined,
            <span className="block bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent"> Uncompromisingly Simple</span>
          </h2>
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            Three core service lines designed to extend your hospital's reach and improve patient outcomes.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: `${index * 200}ms`}}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-6 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50 relative will-change-transform">
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
                      <h3 className="text-gray-900 leading-none tracking-tight font-black mb-3"
                          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.85 }}>
                        {service.title}
                      </h3>
                      <p className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent font-medium tracking-wide"
                         style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', lineHeight: 1.3 }}>
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
                            delay={benefitIndex * 150} 
                          />
                          <span className="text-gray-700 leading-relaxed flex-1">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note */}
                    {service.note && (
                      <div className="bg-blue-50/90 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-[#0080ff]">
                        <p className="text-gray-700 leading-relaxed">
                          {service.note}
                        </p>
                      </div>
                    )}

                    {/* CTA Button with 3D Effects */}
                    <div className="relative">
                      <button className="
                        relative px-8 py-4 text-lg font-semibold text-white rounded-xl
                        bg-gradient-to-r from-[#0080ff] to-[#0066cc]
                        shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40
                        transform transition-all duration-300 ease-out
                        hover:scale-105 hover:-translate-y-1
                        before:absolute before:inset-0 before:rounded-xl
                        before:bg-gradient-to-r before:from-[#1a8cff] before:to-[#0073e6]
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                        after:absolute after:inset-0 after:rounded-xl after:shadow-inner
                        after:bg-gradient-to-t after:from-white/10 after:to-transparent
                        group overflow-hidden will-change-transform
                      ">
                        <span className="relative z-10 flex items-center gap-2">
                          Learn More
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white drop-shadow-lg" />
                        </span>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Patient Image with Hover Overlay */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative group">
                    <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden relative">
                      <img 
                        src={service.patientImage}
                        alt={`Patient receiving ${service.title} care`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                      {/* Hover Overlay with Correct Blue Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0080ff]/80 to-[#0066cc]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
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

export default React.memo(ServiceLinesSection);
