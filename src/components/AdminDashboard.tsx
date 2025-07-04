
import React, { useEffect, useState } from 'react';
import AdminAnimatedBackground from './admin/AdminAnimatedBackground';
import AdminLaptopVisualization from './admin/AdminLaptopVisualization';
import AdminFeaturesGrid from './admin/AdminFeaturesGrid';
import { useDemoScreens } from './admin/AdminDemoScreens';

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
    <section id="admin-dashboard" className="py-32 pt-80 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <AdminAnimatedBackground />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
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

        <AdminLaptopVisualization 
          isVisible={isVisible}
          laptopOpen={laptopOpen}
          activeDemo={activeDemo}
          demoScreens={demoScreens}
        />

        <AdminFeaturesGrid isVisible={isVisible} />
      </div>
    </section>
  );
};

export default AdminDashboard;
