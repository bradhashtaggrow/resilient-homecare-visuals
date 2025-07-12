
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from './LeadCaptureModal';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 10;
      
      // Show menu when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      
      setScrolled(isScrolled);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Remove lastScrollY dependency

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      visible ? 'top-0' : '-top-24'
    } ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-black/10' : 'bg-white border-b border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="transition-transform duration-200 hover:scale-105">
              <img 
                src="/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png" 
                alt="Resilient Healthcare" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/care-at-home" className="text-black hover:text-primary transition-colors font-medium font-apple">
              Care At Home
            </Link>
            <Link to="/clinicians" className="text-black hover:text-primary transition-colors font-medium font-apple">
              Clinicians
            </Link>
            <Link to="/patients" className="text-black hover:text-primary transition-colors font-medium font-apple">
              Patients
            </Link>
            <Link to="/news" className="text-black hover:text-primary transition-colors font-medium font-apple">
              News
            </Link>
            <Link to="/about" className="text-black hover:text-primary transition-colors font-medium font-apple">
              About Us
            </Link>
            <Link to="/contact" className="text-black hover:text-primary transition-colors font-medium font-apple">
              Contact
            </Link>
            
            <LeadCaptureModal source="navigation">
              <Button className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-apple text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200">
                Request Demo
              </Button>
            </LeadCaptureModal>
            
            <Link to="/login">
              <Button className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-apple text-sm font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200">
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
              className="p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="lg:hidden fixed left-0 top-0 z-[60] w-full h-full">
            <div className="w-full h-full bg-white">
              {/* Mobile Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img 
                    src="/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png" 
                    alt="Resilient Healthcare" 
                    className="h-10 w-auto"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </Button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="px-6 py-8 bg-white h-full overflow-y-auto">
                <div className="space-y-6">
                  <Link 
                    to="/care-at-home" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Care At Home
                  </Link>
                  <Link 
                    to="/clinicians" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Clinicians
                  </Link>
                  <Link 
                    to="/patients" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Patients
                  </Link>
                  <Link 
                    to="/news" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    News
                  </Link>
                  <Link 
                    to="/about" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block text-2xl font-bold text-black hover:text-primary transition-colors font-apple text-center py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col items-center space-y-4 pt-8">
                    <LeadCaptureModal source="mobile-navigation">
                      <Button 
                        className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-apple text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Request Demo
                      </Button>
                    </LeadCaptureModal>
                    
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white hover:from-[#5a95f5] hover:to-[#2576d1] font-apple text-lg font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
