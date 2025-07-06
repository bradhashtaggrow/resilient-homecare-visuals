
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedVideo from '@/components/OptimizedVideo';
import LeadGenSection from '@/components/LeadGenSection';
import { Building2, Heart, Users, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareAtHome = () => {
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-apple tracking-tight" 
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700 }}>
                      Work with leading hospitals.
                    </h3>
                    <p className="text-gray-600 font-apple font-medium" 
                       style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      Partner with top healthcare institutions to expand your reach and impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-apple tracking-tight" 
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700 }}>
                      Get access to a consistent stream of patient referrals.
                    </h3>
                    <p className="text-gray-600 font-apple font-medium" 
                       style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      Receive steady patient referrals through our integrated network of healthcare partners.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-white border border-purple-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-apple tracking-tight" 
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700 }}>
                      Support care delivery for inpatient at home and outpatient at home services.
                    </h3>
                    <p className="text-gray-600 font-apple font-medium" 
                       style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      Comprehensive support for both inpatient and outpatient care delivery in home settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-apple tracking-tight" 
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700 }}>
                      Simplified workflows and credentialing through our platform.
                    </h3>
                    <p className="text-gray-600 font-apple font-medium" 
                       style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      Streamlined processes that reduce administrative complexity and save time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-white border border-teal-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 font-apple tracking-tight" 
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700 }}>
                      We pay you per visit so no need to worry about administrative burden.
                    </h3>
                    <p className="text-gray-600 font-apple font-medium" 
                       style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>
                      Simple per-visit payment structure that eliminates administrative hassles and ensures fair compensation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default CareAtHome;
