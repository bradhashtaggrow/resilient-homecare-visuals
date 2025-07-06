
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, CheckCircle, Star, Award } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Cover Section - Matching Home Page Style */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Clean Video Background */}
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

        {/* Clean Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-20" />

        {/* Simple Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-white text-2xl md:text-3xl font-medium mb-6">
              What is Resilient Community?
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section - Matching Home Page */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            {/* Main Title - Matching Home Page Typography */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-6 font-black leading-none tracking-tight" 
                  style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.85 }}>
                Hospitals
              </h2>
            </div>
            
            {/* Description Text */}
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium mb-8">
              We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.
            </p>
            
            {/* Clean CTA Button - Matching Home Page */}
            <div className="mb-12">
              <LeadCaptureModal source="care-at-home-main">
                <Button 
                  size="lg" 
                  className="group relative px-12 py-6 text-xl font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                    boxShadow: '0 12px 32px rgba(0, 128, 255, 0.4), 0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Request Demo
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </Button>
              </LeadCaptureModal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Clean Design */}
      <section className="py-16 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Partner with Leading Hospitals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network and transform how care is delivered in the home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl border border-gray-100">
              <Building2 className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Work with Leading Hospitals</h3>
              <p className="text-gray-600 leading-relaxed">
                Get access to a consistent stream of patient referrals from top-tier healthcare institutions.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl border border-gray-100">
              <Users className="h-12 w-12 text-green-600 mb-6 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Streamlined Care Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Support care delivery for inpatient at home and outpatient at home services with our integrated platform.
              </p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-white transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl border border-gray-100 md:col-span-2 lg:col-span-1">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-6 group-hover:scale-110 transition-all duration-300" />
              <h3 className="text-xl font-bold mb-4 text-gray-900">Simplified Workflows</h3>
              <p className="text-gray-600 leading-relaxed">
                Simplified workflows and credentialing through our platform - we handle the administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Model Section - Clean Design */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-8">
              <Star className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Simple Payment Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              We pay you per visit so no need to worry about administrative burden. Focus on what you do best - providing exceptional patient care.
            </p>
            
            <div className="bg-gray-50 p-12 rounded-2xl shadow-lg max-w-3xl mx-auto group hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Award className="h-12 w-12 text-white" />
                </div>
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
