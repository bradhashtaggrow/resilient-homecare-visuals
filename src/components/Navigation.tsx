
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Platform', href: '#platform' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'paper-texture-card backdrop-blur-xl shadow-xl border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png" 
              alt="Resilient Healthcare" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-xl font-bold transition-all duration-300 hover:scale-105 tracking-tight ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
                style={{ fontWeight: 900 }}
              >
                {item.name}
              </a>
            ))}
            <Button 
              className="group relative px-8 py-4 text-lg font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                boxShadow: `
                  0 8px 24px rgba(0, 128, 255, 0.4),
                  0 2px 12px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 12px 32px rgba(0, 128, 255, 0.6),
                  0 4px 16px rgba(0, 0, 0, 0.4),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 12px rgba(0, 0, 0, 0.2)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 8px 24px rgba(0, 128, 255, 0.4),
                  0 2px 12px rgba(0, 0, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                `;
                e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
              }}
            >
              <span className="relative z-10 flex items-center">
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 paper-texture-card backdrop-blur-xl shadow-xl border-b border-gray-200/20">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors tracking-tight"
                  style={{ fontWeight: 900 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                className="w-full group relative px-8 py-4 text-lg font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300"
                style={{
                  background: 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)',
                  boxShadow: `
                    0 8px 24px rgba(0, 128, 255, 0.4),
                    0 2px 12px rgba(0, 0, 0, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                  `,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
