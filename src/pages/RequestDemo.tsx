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
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Schedule Your Personalized Demo
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              See how our healthcare solutions can transform your organization. 
              Our experts will show you exactly how we can address your specific needs.
            </p>
          </div>
          
          <LeadCaptureForm 
            onSuccess={handleSuccess}
            onClose={handleClose}
            source="demo-page"
          />
          
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-3 text-center">
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Tell Us About Your Needs</h3>
              <p className="text-gray-600 text-sm sm:text-base">Share information about your organization and challenges</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Get a Customized Demo</h3>
              <p className="text-gray-600 text-sm sm:text-base">Our experts will show you solutions tailored to your requirements</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base">Start Your Journey</h3>
              <p className="text-gray-600 text-sm sm:text-base">Begin implementing solutions that drive real results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDemo;