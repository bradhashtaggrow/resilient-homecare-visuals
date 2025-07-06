import React, { useState } from 'react';
import { createPortal } from 'react-dom';
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
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }} style={{ cursor: 'pointer' }}>
        {children}
      </div>
      
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-[99999] font-apple"
          onClick={handleBackdropClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative border border-gray-200 z-[99999]">
            {/* Apple-style close button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-[99999] transition-all duration-200"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            
            {/* Apple-style header */}
            <div className="text-center pt-12 pb-8 px-8 bg-white">
              <div className="mx-auto mb-6 flex justify-center">
                <img 
                  src="/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png" 
                  alt="Resilient Healthcare" 
                  className="h-12"
                />
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
        </div>,
        document.body
      )}
    </>
  );
};

export default LeadCaptureModal;