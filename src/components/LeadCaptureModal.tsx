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
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Request Your Demo</h2>
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