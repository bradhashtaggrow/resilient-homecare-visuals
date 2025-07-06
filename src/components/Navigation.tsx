
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Healthcare</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            
            {isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : !user ? (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            ) : null}
          </div>

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

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Services</a>
            <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            
            {isAdmin ? (
              <div className="space-y-2 px-3 py-2">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="flex items-center w-full justify-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex items-center w-full justify-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : !user ? (
              <Link to="/login" className="block px-3 py-2">
                <Button variant="outline" size="sm" className="flex items-center w-full justify-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
