import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import LeadCaptureForm from './LeadCaptureForm';
import { X } from 'lucide-react';

interface LeadCaptureModalProps {
  children: React.ReactNode;
  source?: string;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ children, source = 'button' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

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

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      
      // Position modal centered to navigation menu for navigation source
      if (source === 'navigation') {
        // Get the navigation bar element
        const navElement = document.querySelector('nav');
        if (navElement) {
          const navRect = navElement.getBoundingClientRect();
          setModalPosition({
            top: navRect.bottom + scrollY + 10, // 10px below the navigation bar
            left: window.innerWidth / 2 // Center horizontally on the page
          });
        } else {
          // Fallback to center if nav not found
          setModalPosition({
            top: scrollY + 80, // Standard nav height + margin
            left: window.innerWidth / 2
          });
        }
      } else if (source === 'hero-button') {
        setModalPosition({
          top: scrollY + 120, // Fixed position from top of viewport for hero button
          left: window.innerWidth / 2 // Center horizontally on page
        });
      } else {
        setModalPosition({
          top: rect.top + scrollY - 15, // 15px above the button for other sources
          left: rect.left + rect.width / 2 // Center horizontally on button
        });
      }
    }
    setIsOpen(true);
  };

  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 font-apple"
      onClick={handleBackdropClick}
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 999999
      }}
      onLoad={() => console.log('Modal backdrop loaded')}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-200" 
        style={{ 
          position: 'absolute',
          top: `${modalPosition.top}px`,
          left: '50%',
          transform: source === 'hero-button' ? 'translate(-50%, 0)' : 
                    source === 'navigation' ? 'translate(-50%, 0)' : 
                    'translate(-50%, -100%)',
          minWidth: '400px'
        }}
      >
        {/* Apple-style close button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center z-10 transition-all duration-200 backdrop-blur-sm"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
        
        {/* Apple-style header */}
        <div className="text-center pt-6 pb-4 px-6 bg-gradient-to-b from-white/90 to-transparent">
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
        <div className="px-6 pb-6">
          <LeadCaptureForm 
            onSuccess={handleSuccess}
            onClose={handleClose}
            source={source}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div ref={triggerRef} onClick={handleOpen}>
        {children}
      </div>
      
      {/* Render modal in a portal to document.body */}
      {modalContent && createPortal(modalContent, document.body)}
    </>
  );
};

export default LeadCaptureModal;
