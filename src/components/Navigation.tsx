
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
          <div className="flex items-center space-x-8">
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
              <Button className="btn-3d-gradient font-apple text-lg font-semibold">
                Request Demo
              </Button>
            </LeadCaptureModal>
            
            <Link to="/login">
              <Button className="btn-3d-gradient font-apple text-lg font-semibold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
