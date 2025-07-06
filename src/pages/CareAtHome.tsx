
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedVideo from '@/components/OptimizedVideo';
import LeadGenSection from '@/components/LeadGenSection';
import { Building2, Heart, Users, Shield, Clock, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareAtHome = () => {
  const services = [
    {
      id: 'hospitals-partnership',
      icon: Building2,
      title: "Work with leading hospitals",
      subtitle: "Partnership Excellence",
      description: "Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.",
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'patient-referrals',
      icon: Users,
      title: "Get access to a consistent stream of patient referrals",
      subtitle: "Steady Patient Flow",
      description: "Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.",
      color: "green",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'care-delivery',
      icon: Heart,
      title: "Support care delivery for inpatient at home and outpatient at home services",
      subtitle: "Comprehensive Home Care",
      description: "Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.",
      color: "purple",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'simplified-workflows',
      icon: Shield,
      title: "Simplified workflows and credentialing through our platform",
      subtitle: "Streamlined Operations",
      description: "Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.",
      color: "orange",
      patient_image_url: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'payment-structure',
      icon: CheckCircle,
      title: "We pay you per visit so no need to worry about administrative burden",
      subtitle: "Simple Payment Model",
      description: "Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.",
      color: "teal",
      patient_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1c796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      green: 'text-green-600 bg-green-50 hover:bg-green-100',
      purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      teal: 'text-teal-600 bg-teal-50 hover:bg-teal-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-32 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden h-[600px] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src='https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Bottom blur gradient effect that extends beyond section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/20 to-transparent backdrop-blur-sm z-20" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105 font-apple" 
                style={{ fontSize: 'clamp(2rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
              What is<br />
              <span className="text-blue-300">Resilient Community?</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Hospitals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-black tracking-tight font-apple mb-6" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Hospitals
            </h2>
            <p className="text-gray-600 leading-relaxed font-apple font-medium tracking-wide"
               style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1.4 }}>
              We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. 
              Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, 
              ensuring patients receive top-quality care where they are most comfortable.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`${
                  index % 2 === 0 ? 'animate-swoop-in-left' : 'animate-swoop-in-right'
                } opacity-100 translate-y-0`}
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
                          getColorClasses(service.color)
                        } flex items-center justify-center shadow-2xl`}>
                          <service.icon className="h-12 w-12" />
                        </div>
                      </div>

                      {/* Title and Subtitle */}
                      <div className="pr-16">
                        <h3 className="text-gray-900 leading-none tracking-tight font-black mb-3 font-apple"
                            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                          {service.title}
                        </h3>
                        <p className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent font-medium tracking-wide font-apple"
                           style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.3 }}>
                          {service.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed font-apple font-medium"
                         style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.4 }}>
                        {service.description}
                      </p>

                      {/* CTA Button */}
                      <div className="relative">
                        <button className="
                          relative px-8 py-4 font-semibold text-white rounded-xl font-apple
                          bg-gradient-to-r from-[#0080ff] to-[#0066cc]
                          shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40
                          transform transition-all duration-300 ease-out
                          hover:scale-105 hover:-translate-y-1
                          before:absolute before:inset-0 before:rounded-xl
                          before:bg-gradient-to-r before:from-[#1a8cff] before:to-[#0073e6]
                          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                          after:absolute after:inset-0 after:rounded-xl after:shadow-inner
                          after:bg-gradient-to-t after:from-white/10 after:to-transparent
                          group overflow-hidden
                        "
                        style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                          <span className="relative z-10 flex items-center gap-2">
                            Learn More
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 text-white drop-shadow-lg" />
                          </span>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Patient Image */}
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="relative group">
                      <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden relative">
                        <img 
                          src={service.patient_image_url}
                          alt={`${service.title} - Healthcare service`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
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

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default CareAtHome;
