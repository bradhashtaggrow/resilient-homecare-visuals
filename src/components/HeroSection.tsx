
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight tracking-tight">
            <span className="block text-black font-apple">
              Fully Streamlined,
            </span>
            <span className="block gradient-text font-apple">
              Uncompromisingly Simple
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            Three core service lines designed to extend your hospital's reach, 
            improve patient outcomes, and streamline operations
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <LeadCaptureModal source="hero-primary">
              <button className="btn-3d-gradient text-lg px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3">
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </button>
            </LeadCaptureModal>
            
            <button className="flex items-center gap-3 text-lg font-semibold text-gray-700 hover:text-primary transition-colors duration-300 px-8 py-4 rounded-xl hover:bg-gray-50">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-white ml-1" />
              </div>
              Watch Overview
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guaranteed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">HIPAA</div>
              <div className="text-gray-600">Compliant Platform</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Technical Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;
