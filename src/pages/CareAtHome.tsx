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
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.patient_image_url}
                      alt={`${service.title} - Healthcare service`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-12 h-12 rounded-full transition-all duration-300 ${
                        getColorClasses(service.color)
                      } flex items-center justify-center shadow-lg`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {service.title}
                      </h3>
                      <p className={`text-sm font-semibold ${
                        service.color === 'blue' ? 'text-blue-600' :
                        service.color === 'green' ? 'text-green-600' :
                        service.color === 'purple' ? 'text-purple-600' :
                        service.color === 'orange' ? 'text-orange-600' :
                        'text-teal-600'
                      }`}>
                        {service.subtitle}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {service.description}
                    </p>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg flex items-center justify-center gap-2 group">
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
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
