
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from './LeadCaptureModal';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Navigation that follows scroll */}
      <div 
        className={`sticky top-0 w-full transition-all duration-300 ease-in-out ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100/30'
        }`}
        style={{ 
          position: 'sticky',
          top: 0,
          zIndex: 9999999
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* Logo and Navigation - Left Side */}
            <div className="flex items-center space-x-12 flex-1">
              <Link to="/" className="transition-transform duration-200 hover:scale-105 flex items-center">
                <img 
                  src="/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png" 
                  alt="Resilient Healthcare" 
                  className="h-10 w-auto"
                />
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 h-full">
                <Link 
                  to="/care-at-home" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  Care At Home
                </Link>
                <Link 
                  to="/clinicians" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  Clinicians
                </Link>
                <Link 
                  to="/patients" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  Patients
                </Link>
                <Link 
                  to="/news" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  News
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary transition-colors duration-200 font-apple font-semibold text-base flex items-center justify-center h-full"
                >
                  Contact
                </Link>
              </div>
            </div>
            
            {/* Action Buttons - Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              <LeadCaptureModal source="navigation">
                <Button className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-semibold text-sm px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
                  Request Demo
                </Button>
              </LeadCaptureModal>
              
              <Link to="/login">
                <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200">
                  Login
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Panel - Now attached to navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-[99998] animate-fade-in">
            <div className="px-6 py-8">
              <div className="space-y-6">
                <Link 
                  to="/care-at-home" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Care At Home
                </Link>
                <Link 
                  to="/clinicians" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Clinicians
                </Link>
                <Link 
                  to="/patients" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Patients
                </Link>
                <Link 
                  to="/news" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
                <Link 
                  to="/about" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="block text-xl font-semibold text-gray-900 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-4 pt-6">
                  <LeadCaptureModal source="mobile-navigation">
                    <Button 
                      className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-semibold text-lg px-6 py-3 rounded-lg shadow-md w-full"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Request Demo
                    </Button>
                  </LeadCaptureModal>
                  
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="text-gray-700 border-gray-300 hover:bg-gray-50 font-semibold text-lg px-6 py-3 rounded-lg w-full"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
