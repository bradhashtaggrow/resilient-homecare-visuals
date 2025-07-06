import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Building2, Heart, Users, Shield, Clock, CheckCircle } from 'lucide-react';

const CareAtHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Care At Home
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing hospital-quality care directly to patients' homes through our comprehensive 
              at-home healthcare solutions. Experience personalized, convenient, and effective care 
              in the comfort of your own space.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Personalized Care</h3>
              <p className="text-gray-600">
                Tailored treatment plans designed specifically for each patient's unique needs and conditions.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Certified healthcare professionals providing skilled nursing and therapeutic services.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Safe & Secure</h3>
              <p className="text-gray-600">
                HIPAA-compliant care with the highest standards of safety and privacy protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Home Care Services</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <CheckCircle className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Skilled Nursing</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Wound care and medication management</li>
                <li>• IV therapy and injections</li>
                <li>• Post-operative care</li>
                <li>• Chronic disease management</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Clock className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Round-the-clock monitoring</li>
                <li>• Emergency response systems</li>
                <li>• Telehealth consultations</li>
                <li>• Family communication updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareAtHome;