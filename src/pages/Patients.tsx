import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Heart, Shield, Clock, Phone, Calendar, FileText } from 'lucide-react';

const Patients = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Patient Care
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your health and well-being are our top priorities. Experience compassionate, 
              personalized healthcare designed around your unique needs and lifestyle. 
              We're here to support you every step of your healthcare journey.
            </p>
          </div>
        </div>
      </section>

      {/* Patient Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Patient Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Easy Scheduling</h3>
              <p className="text-gray-600">
                Book appointments online or by phone with flexible scheduling options that fit your life.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Privacy Protected</h3>
              <p className="text-gray-600">
                Your medical information is secure and confidential, following strict HIPAA guidelines.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock access to healthcare support when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Portal */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Patient Portal</h2>
            <p className="text-xl text-gray-600">
              Access your health information and manage your care online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <FileText className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Medical Records</h3>
              <p className="text-gray-600 mb-4">
                View test results, treatment plans, and medical history anytime, anywhere.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Lab results and imaging</li>
                <li>• Medication lists</li>
                <li>• Visit summaries</li>
                <li>• Care plans</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Clock className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Appointment Management</h3>
              <p className="text-gray-600 mb-4">
                Schedule, reschedule, or cancel appointments with ease.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Online booking</li>
                <li>• Appointment reminders</li>
                <li>• Provider selection</li>
                <li>• Insurance verification</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Patients;