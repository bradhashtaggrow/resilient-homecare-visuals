
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptimizedVideo from '@/components/OptimizedVideo';
import { Building2, Heart, Users, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CareAtHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-0 relative overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src='https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          {/* Enhanced blur transition that merges with white background */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-white/20 backdrop-blur-md" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              What is<br />
              <span className="text-blue-300">Resilient Community?</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Hospitals Section - Now outside video cover */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Hospitals</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Work with leading hospitals.</h3>
                    <p className="text-gray-600">Partner with top healthcare institutions to expand your reach and impact.</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Get access to a consistent stream of patient referrals.</h3>
                    <p className="text-gray-600">Receive steady patient referrals through our integrated network of healthcare partners.</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Support care delivery for inpatient at home and outpatient at home services.</h3>
                    <p className="text-gray-600">Comprehensive support for both inpatient and outpatient care delivery in home settings.</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplified workflows and credentialing through our platform.</h3>
                    <p className="text-gray-600">Streamlined processes that reduce administrative complexity and save time.</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">We pay you per visit so no need to worry about administrative burden.</h3>
                    <p className="text-gray-600">Simple per-visit payment structure that eliminates administrative hassles and ensures fair compensation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Healthcare Delivery?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our network of healthcare professionals delivering exceptional care at home.
          </p>
          
          <Link 
            to="/contact"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareAtHome;
