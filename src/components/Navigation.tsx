
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from 'lucide-react';

const Navigation = React.memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navItems = [
    { name: 'Platform', href: '#platform' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 12px 32px rgba(0, 128, 255, 0.6),
      0 4px 16px rgba(0, 0, 0, 0.4),
      inset 0 2px 0 rgba(255, 255, 255, 0.3),
      inset 0 -2px 12px rgba(0, 0, 0, 0.2)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, #1a8cff 0%, #0073e6 30%, #0059b3 100%)';
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = `
      0 8px 24px rgba(0, 128, 255, 0.4),
      0 2px 12px rgba(0, 0, 0, 0.3),
      inset 0 2px 0 rgba(255, 255, 255, 0.2),
      inset 0 -2px 8px rgba(0, 0, 0, 0.1)
    `;
    e.currentTarget.style.background = 'linear-gradient(145deg, #0080ff 0%, #0066cc 30%, #004d99 100%)';
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-gray-200/30' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Enhanced Logo with Hover Animation */}
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png" 
              alt="Resilient Healthcare" 
              className="h-10 sm:h-12 w-auto"
              loading="eager"
            />
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-lg lg:text-xl font-bold transition-all duration-300 hover:scale-105 tracking-tight relative group ${
                  isScrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
                style={{ fontWeight: 900 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button 
              className="group relative px-6 lg:px-8 py-4 lg:py-5 text-base lg:text-lg font-bold rounded-xl lg:rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="relative z-10 flex items-center">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:scale-110 transition-transform duration-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu with Animations */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/30 animate-slide-down">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-lg sm:text-xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 tracking-tight hover:translate-x-2"
                  style={{ 
                    fontWeight: 900,
                    animationDelay: `${index * 100}ms`
                  }}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                className="w-full group relative px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-bold rounded-xl sm:rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 mt-4"
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
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
