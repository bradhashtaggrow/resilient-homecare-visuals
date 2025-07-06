
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Users, CheckCircle, Star, Award, Shield, Heart, Stethoscope, Globe } from 'lucide-react';
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
      
      {/* Premium Hero Cover Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Video Background with Premium Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
          >
            <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Floating Premium Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 left-2/3 w-48 h-48 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Premium Blur Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 via-white/80 via-white/60 via-white/40 to-transparent backdrop-blur-sm z-20" />

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-white font-medium mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              What is Resilient Community?
            </h1>
          </div>
        </div>
      </section>

      {/* Premium Main Content Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50/20 to-white relative overflow-hidden">
        {/* Subtle Premium Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.04)_1px,transparent_0)] bg-[length:48px_48px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            {/* Premium Section Title */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight" 
                  style={{ 
                    background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 40%, #6366f1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                Hospitals
              </h2>
            </div>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium mb-12">
              We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.
            </p>
            
            {/* Premium CTA Button */}
            <div className="relative inline-block group">
              <LeadCaptureModal source="care-at-home-main">
                <Button 
                  size="lg" 
                  className="group relative px-12 py-6 text-xl font-semibold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                    boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    Request Demo
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </LeadCaptureModal>
              <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-100/20 to-blue-100/20 rounded-full blur-3xl opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Partner with Leading Hospitals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network and transform how care is delivered in the home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-10 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 transition-all duration-700 hover:scale-105 hover:-translate-y-4 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Building2 className="h-16 w-16 text-blue-600 mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative z-10" />
              <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-blue-900 transition-colors duration-300 relative z-10">Work with Leading Hospitals</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-lg relative z-10">
                Get access to a consistent stream of patient referrals from top-tier healthcare institutions.
              </p>
            </div>
            
            <div className="group p-10 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100/50 transition-all duration-700 hover:scale-105 hover:-translate-y-4 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-green-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Users className="h-16 w-16 text-green-600 mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative z-10" />
              <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-green-900 transition-colors duration-300 relative z-10">Streamlined Care Delivery</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-lg relative z-10">
                Support care delivery for inpatient at home and outpatient at home services with our integrated platform.
              </p>
            </div>
            
            <div className="group p-10 rounded-3xl bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100/50 transition-all duration-700 hover:scale-105 hover:-translate-y-4 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-purple-200 md:col-span-2 lg:col-span-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <CheckCircle className="h-16 w-16 text-purple-600 mb-8 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative z-10" />
              <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-purple-900 transition-colors duration-300 relative z-10">Simplified Workflows</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-lg relative z-10">
                Simplified workflows and credentialing through our platform - we handle the administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Payment Model Section */}
      <section className="py-24 bg-gradient-to-br from-white via-slate-50/40 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.02)_35%,rgba(59,130,246,0.02)_65%,transparent_65%),linear-gradient(-45deg,transparent_35%,rgba(147,51,234,0.02)_35%,rgba(147,51,234,0.02)_65%,transparent_65%)] bg-[length:64px_64px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-12 group hover:scale-110 transition-transform duration-300">
              <Star className="h-10 w-10 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              Simple Payment Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              We pay you per visit so no need to worry about administrative burden. Focus on what you do best - providing exceptional patient care.
            </p>
            
            <div className="bg-white p-16 rounded-3xl shadow-2xl max-w-3xl mx-auto group hover:scale-105 transition-all duration-500 border border-gray-100 hover:border-blue-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="flex items-center justify-center mb-8 relative">
                <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl group-hover:rotate-6 transition-transform duration-300">
                  <Award className="h-20 w-20 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-blue-900 transition-colors duration-300">
                Per-Visit Payment Structure
              </h3>
              <p className="text-gray-600 text-xl leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
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
