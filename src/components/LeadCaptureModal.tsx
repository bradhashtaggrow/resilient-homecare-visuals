import React, { useState } from 'react';
import LeadCaptureForm from './LeadCaptureForm';
import { X } from 'lucide-react';

interface LeadCaptureModalProps {
  children: React.ReactNode;
  source?: string;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ children, source = 'button' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-apple"
          onClick={handleBackdropClick}
          style={{ paddingTop: '120px' }}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative border border-white/20">
            {/* Apple-style close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center z-10 transition-all duration-200 backdrop-blur-sm"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            
            {/* Apple-style header */}
            <div className="text-center pt-12 pb-8 px-8 bg-gradient-to-b from-white/90 to-transparent">
              <div className="mx-auto mb-6">
                <svg className="w-32 h-12 text-blue-600" viewBox="0 0 120 40" fill="currentColor">
                  <path d="M15 8C15 8 25 3 35 8C35 8 25 13 15 8Z" fillOpacity="0.9"/>
                  <path d="M8 15C8 15 18 10 28 15C28 15 18 20 8 15Z" fillOpacity="0.7"/>
                  <path d="M22 22C22 22 32 17 42 22C42 22 32 27 22 22Z" fillOpacity="0.8"/>
                  <text x="50" y="15" fontSize="8" fontWeight="bold" fontFamily="Inter">Resilient</text>
                  <text x="50" y="25" fontSize="6" fontWeight="500" fontFamily="Inter">HEALTHCARE</text>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
                Request Your Demo
              </h2>
              <p className="text-gray-600 text-lg font-medium">
                Experience the future of healthcare technology
              </p>
            </div>
            
            {/* Form content */}
            <div className="px-8 pb-8">
              <LeadCaptureForm 
                onSuccess={handleSuccess}
                onClose={handleClose}
                source={source}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadCaptureModal;