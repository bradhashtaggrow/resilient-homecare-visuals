
import React, { useEffect, useState } from 'react';
import AdminAnimatedBackground from './admin/AdminAnimatedBackground';
import AdminLaptopVisualization from './admin/AdminLaptopVisualization';
import { useDemoScreens } from './admin/AdminDemoScreens';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

        {/* Laptop Container - 5 inches down from title */}
        <div className="mb-16" style={{ marginTop: '5in' }}>
          <AdminLaptopVisualization 
            isVisible={isVisible}
            laptopOpen={laptopOpen}
            activeDemo={activeDemo}
            demoScreens={demoScreens}
          />
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <h3 className="text-white leading-none tracking-tight font-black text-shadow-white mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Ready to Transform 
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Your Healthcare Operations?</span>
          </h3>
          <p className="text-white/90 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide mb-10"
             style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', lineHeight: 1.4 }}>
            Join forward-thinking healthcare organizations who've already revolutionized their operations. 
            See our comprehensive platform in action with a personalized demonstration.
          </p>
          <Button 
            size="lg"
            className="group relative px-16 py-8 text-2xl font-bold rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
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
            <span className="relative z-10 flex items-center">
              Request Demo
              <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform duration-500" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
