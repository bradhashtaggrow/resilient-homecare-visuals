
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from './LeadCaptureModal';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50' : 'bg-white border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png" 
              alt="Resilient Healthcare" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <LeadCaptureModal source="navigation">
              <Button 
                size="lg" 
                className="group relative px-8 py-4 text-lg font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                  boxShadow: `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 20px 48px rgba(0, 128, 255, 0.6),
                    0 8px 24px rgba(0, 0, 0, 0.4),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -2px 12px rgba(0, 0, 0, 0.2)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Request Demo
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </LeadCaptureModal>
            
            <Link to="/login">
              <Button 
                size="lg" 
                className="group relative px-8 py-4 text-lg font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                  boxShadow: `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 20px 48px rgba(0, 128, 255, 0.6),
                    0 8px 24px rgba(0, 0, 0, 0.4),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -2px 12px rgba(0, 0, 0, 0.2)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `
                    0 12px 32px rgba(0, 128, 255, 0.4),
                    0 4px 16px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `;
                  e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <LogIn className="mr-3 h-5 w-5" />
                  Login
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
