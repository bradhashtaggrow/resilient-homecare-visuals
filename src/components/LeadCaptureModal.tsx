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
          onClick={handleBackdropClick}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 2147483647,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              zIndex: 2147483647,
              backgroundColor: 'white',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              width: '100%',
              maxWidth: '672px',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              border: '1px solid #e5e7eb'
            }}
          >
            {/* Apple-style close button */}
            <button
              onClick={handleClose}
              style={{ 
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2147483647,
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            
            {/* Apple-style header */}
            <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '32px', paddingLeft: '32px', paddingRight: '32px', backgroundColor: 'white' }}>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src="/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png" 
                  alt="Resilient Healthcare" 
                  style={{ height: '48px' }}
                />
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', letterSpacing: '-0.025em', marginBottom: '12px', margin: 0 }}>
                Request Your Demo
              </h2>
              <p style={{ color: '#6b7280', fontSize: '18px', fontWeight: '500', margin: 0 }}>
                Experience the future of healthcare technology
              </p>
            </div>
            
            {/* Form content */}
            <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingBottom: '32px' }}>
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