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
      
      {/* Header Cover Section with Enhanced Parallax */}
      <section className="relative h-[66vh] flex items-center justify-center overflow-hidden will-change-transform">
        {/* Background Video with Parallax Effect */}
        <div className="absolute inset-0 z-0 transform scale-110 transition-transform duration-1000 hover:scale-105">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Dynamic Floating Orbs */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Enhanced Blur Transition with Gradient Magic */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 via-white/60 to-transparent backdrop-blur-lg z-10" />

        {/* Header Content - Massive Apple-Style Title */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1500 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}`}>
            <h1 className="text-white leading-none tracking-tight font-black transition-all duration-700 hover:scale-105 hover:text-blue-100 cursor-default"
                style={{ 
                  fontSize: 'clamp(3rem, 12vw, 12rem)', 
                  fontWeight: 900, 
                  lineHeight: 0.85,
                  textShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(255, 255, 255, 0.1)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 50%, #ffffff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              What is<br />Resilient Community?
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Section with Premium Design */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.05)_1px,transparent_0)] bg-[length:40px_40px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            {/* Refined Hospitals Title */}
            <div className="inline-block relative group mb-8">
              <h2 className="text-gray-900 leading-none tracking-tight font-bold transition-all duration-500 group-hover:scale-105 group-hover:text-blue-900 cursor-default" 
                  style={{ 
                    fontSize: 'clamp(2rem, 6vw, 4rem)', 
                    fontWeight: 800, 
                    lineHeight: 0.9,
                    background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 50%, #1f2937 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                Hospitals
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
            
            <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium mb-10 transition-all duration-500 hover:text-gray-900">
              We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.
            </p>
            
            {/* Enhanced CTA Button with Magnetic Effect */}
            <div className="relative inline-block group">
              <LeadCaptureModal source="care-at-home-main">
                <Button 
                  size="lg" 
                  className="group relative px-10 sm:px-14 py-5 sm:py-7 text-lg sm:text-xl font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-500 hover:scale-110 hover:-translate-y-3 hover:rotate-1 shadow-2xl hover:shadow-blue-500/25"
                  style={{
                    background: 'linear-gradient(145deg, #0ea5e9 0%, #3b82f6 30%, #1d4ed8 70%, #1e40af 100%)',
                    boxShadow: `
                      0 20px 40px rgba(59, 130, 246, 0.3),
                      0 8px 24px rgba(0, 0, 0, 0.2),
                      inset 0 2px 0 rgba(255, 255, 255, 0.3),
                      inset 0 -4px 12px rgba(0, 0, 0, 0.1)
                    `,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    Request Demo
                    <ArrowRight className="ml-3 h-6 w-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                  </span>
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>
              </LeadCaptureModal>
              {/* Magnetic Glow Effect */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-150"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-cyan-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight transition-all duration-500 hover:scale-105 hover:text-blue-900">
              Partner with Leading Hospitals
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-300 hover:text-gray-800">
              Join our network and transform how care is delivered in the home
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white via-blue-50/50 to-white hover:from-blue-50 hover:to-blue-100/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 border border-blue-100/50 hover:border-blue-200">
              <Building2 className="h-12 w-12 text-blue-600 mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 group-hover:text-blue-700" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-blue-900 transition-colors duration-300">Work with Leading Hospitals</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Get access to a consistent stream of patient referrals from top-tier healthcare institutions.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white via-green-50/50 to-white hover:from-green-50 hover:to-green-100/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 border border-green-100/50 hover:border-green-200">
              <Users className="h-12 w-12 text-green-600 mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 group-hover:text-green-700" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-green-900 transition-colors duration-300">Streamlined Care Delivery</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Support care delivery for inpatient at home and outpatient at home services with our integrated platform.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-white via-purple-50/50 to-white hover:from-purple-50 hover:to-purple-100/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 border border-purple-100/50 hover:border-purple-200 md:col-span-2 lg:col-span-1">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-6 group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 group-hover:text-purple-700" />
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors duration-300">Simplified Workflows</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Simplified workflows and credentialing through our platform - we handle the administrative burden.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Payment Model Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-slate-50/30 to-white relative overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(59,130,246,0.03)_35%,rgba(59,130,246,0.03)_65%,transparent_65%),linear-gradient(-45deg,transparent_35%,rgba(147,51,234,0.03)_35%,rgba(147,51,234,0.03)_65%,transparent_65%)] bg-[length:32px_32px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8 group hover:scale-110 transition-transform duration-300">
              <Star className="h-8 w-8 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight transition-all duration-500 hover:scale-105">
              Simple Payment Model
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 transition-all duration-300 hover:text-gray-800">
              We pay you per visit so no need to worry about administrative burden. Focus on what you do best - providing exceptional patient care.
            </p>
            
            <div className="bg-white p-10 sm:p-12 rounded-3xl shadow-2xl max-w-2xl mx-auto group hover:scale-105 transition-all duration-500 hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200 relative overflow-hidden">
              {/* Card Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="flex items-center justify-center mb-6 relative">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl group-hover:rotate-3 transition-transform duration-300">
                  <Award className="h-16 w-16 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                Per-Visit Payment Structure
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
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