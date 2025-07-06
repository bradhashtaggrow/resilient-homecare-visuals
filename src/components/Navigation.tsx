
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from './LeadCaptureModal';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/79c3abe6-a93e-4fa3-898e-e31fe76e979f.png" 
              alt="Resilient Healthcare Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            
            <LeadCaptureModal source="navigation">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Request Demo
              </Button>
            </LeadCaptureModal>
            
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center border-blue-200 text-blue-600 hover:bg-blue-50">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
            
            <div className="px-3 py-2">
              <LeadCaptureModal source="mobile-navigation">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-center py-2 rounded-lg font-medium transition-colors">
                  Request Demo
                </Button>
              </LeadCaptureModal>
            </div>
            
            <Link to="/login" className="block px-3 py-2">
              <Button variant="outline" size="sm" className="flex items-center w-full justify-center border-blue-200 text-blue-600 hover:bg-blue-50">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
