
import React, { useEffect, useState } from 'react';
import AdminAnimatedBackground from './admin/AdminAnimatedBackground';
import AdminLaptopVisualization from './admin/AdminLaptopVisualization';
import { useDemoScreens } from './admin/AdminDemoScreens';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [laptopOpen, setLaptopOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const demoScreens = useDemoScreens();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setLaptopOpen(true), 800);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('admin-dashboard');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (laptopOpen) {
      const interval = setInterval(() => {
        setActiveDemo((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [laptopOpen]);

  return (
    <section id="admin-dashboard" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <AdminAnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Title and Subtitle Container */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <h2 className="text-white leading-none tracking-tight font-black text-shadow-white mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Admin Dashboard That 
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Powers Operations</span>
          </h2>
          <p className="text-white/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            Next-generation management tools with AI-powered insights that give 
            administrators unprecedented visibility and control.
          </p>
        </div>

        {/* Laptop Container - Reduced spacing */}
        <div className="mb-16">
          <AdminLaptopVisualization 
            isVisible={isVisible}
            laptopOpen={laptopOpen}
            activeDemo={activeDemo}
            demoScreens={demoScreens}
          />
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Request Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
