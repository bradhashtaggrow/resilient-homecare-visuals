import React from 'react';
import Navigation from '@/components/Navigation';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { useNavigate } from 'react-router-dom';

const RequestDemo = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/?success=true');
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Personalized Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our healthcare solutions can transform your organization. 
              Our experts will show you exactly how we can address your specific needs.
            </p>
          </div>
          
          <LeadCaptureForm 
            onSuccess={handleSuccess}
            onClose={handleClose}
            source="demo-page"
          />
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Tell Us About Your Needs</h3>
              <p className="text-gray-600">Share information about your organization and challenges</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Get a Customized Demo</h3>
              <p className="text-gray-600">Our experts will show you solutions tailored to your requirements</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Start Your Journey</h3>
              <p className="text-gray-600">Begin implementing solutions that drive real results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;