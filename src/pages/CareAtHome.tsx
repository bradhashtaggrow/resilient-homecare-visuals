import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, CheckCircle, Star, Award, Shield } from 'lucide-react';
import LeadCaptureModal from '@/components/LeadCaptureModal';

const CareAtHome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white paper-texture">
      <Navigation />
      
      {/* Header Cover Section */}
      <section className="relative h-[33vh] flex items-center justify-center overflow-hidden will-change-transform">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Blur Transition at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-sm z-10" />

        {/* Header Content - Only Title */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Apple-Style Title */}
            <h1 className="text-white leading-none tracking-tight font-black text-shadow-white transition-transform duration-500 hover:scale-105" 
                style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
              What is<br />Resilient Community?
            </h1>
            <h2 className="text-white/80 mt-4 text-xl sm:text-3xl font-light tracking-wide">
              Hospitals
            </h2>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
              We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.
            </p>
            
            {/* CTA Button */}
            <LeadCaptureModal source="care-at-home-main">
              <Button 
                size="lg" 
                className="group relative px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                  boxShadow: `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Request Demo
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </LeadCaptureModal>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Partner with Leading Hospitals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network and transform how care is delivered in the home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Building2 className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Work with Leading Hospitals</h3>
              <p className="text-gray-600 leading-relaxed">
                Get access to a consistent stream of patient referrals from top-tier healthcare institutions.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-green-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Users className="h-12 w-12 text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Streamlined Care Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Support care delivery for inpatient at home and outpatient at home services with our integrated platform.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Simplified Workflows</h3>
              <p className="text-gray-600 leading-relaxed">
                Simplified workflows and credentialing through our platform - we handle the administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Model Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Simple Payment Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We pay you per visit so no need to worry about administrative burden. Focus on what you do best - providing exceptional patient care.
            </p>
            
            <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Award className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Per-Visit Payment Structure
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Transparent, fair compensation for every patient visit. No complex billing procedures, 
                no administrative overhead - just straightforward payment for quality care delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareAtHome;