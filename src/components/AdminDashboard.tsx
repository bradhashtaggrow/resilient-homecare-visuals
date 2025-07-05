
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
      { threshold: 0.1 }
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
    <section id="admin-dashboard" className="py-20 sm:py-24 md:py-32 lg:py-40 bg-gray-900 relative overflow-hidden min-h-screen">
      <AdminAnimatedBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Title with Mobile Optimization - Using reverse swoop */}
        <div className={`text-center mb-20 sm:mb-24 md:mb-32 lg:mb-40 transition-all duration-1200 transform ${
          isVisible ? 'animate-swoop-in-reverse opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-white leading-none tracking-tight font-black text-shadow-white mb-6 sm:mb-8 hover:scale-105 transition-transform duration-700"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Take Full Control Of Your Business. 
            <span className="block healthcare-text-gradient hover:from-blue-300 hover:to-purple-300 transition-all duration-500">
              Anywhere. Any place.
            </span>
          </h2>
          <p className="text-white/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            Next-generation management tools with AI-powered insights that give 
            administrators unprecedented visibility and control.
          </p>
        </div>

        {/* Enhanced Laptop Container with Reduced Bottom Margin */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className={`transition-all duration-1200 transform hover:scale-105 ${
            isVisible ? 'animate-swoop-in-reverse opacity-100' : 'opacity-0'
          }`} style={{animationDelay: '400ms'}}>
            <AdminLaptopVisualization 
              isVisible={isVisible}
              laptopOpen={laptopOpen}
              activeDemo={activeDemo}
              demoScreens={demoScreens}
            />
          </div>
        </div>

        {/* Enhanced CTA Section with Tighter Spacing */}
        <div className={`text-center pt-0 transition-all duration-1200 transform ${
          isVisible ? 'animate-swoop-in-reverse opacity-100' : 'opacity-0'
        }`} style={{animationDelay: '800ms'}}>
          <h3 className="text-white leading-none tracking-tight font-black text-shadow-white mb-3 sm:mb-4 hover:scale-105 transition-transform duration-500"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Ready to Transform 
            <span className="block healthcare-text-gradient hover:from-blue-300 hover:to-purple-300 transition-all duration-500">
              Your Healthcare Operations?
            </span>
          </h3>
          <p className="text-white/90 max-w-3xl mx-auto leading-relaxed font-medium tracking-wide mb-6 sm:mb-8 hover:text-white transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)', lineHeight: 1.4 }}>
            Join forward-thinking healthcare organizations who've already revolutionized their operations. 
            See our comprehensive platform in action with a personalized demonstration.
          </p>
          <Button 
            size="lg"
            className="group relative px-8 sm:px-16 py-6 sm:py-8 text-lg sm:text-2xl font-bold rounded-2xl sm:rounded-3xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:-translate-y-3 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(145deg, hsl(210 100% 50%) 0%, hsl(210 100% 37%) 30%, hsl(210 100% 27%) 100%)',
              boxShadow: `
                0 12px 32px hsl(210 100% 50% / 0.4),
                0 4px 16px rgba(0, 0, 0, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 8px rgba(0, 0, 0, 0.1)
              `,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `
                0 20px 48px hsl(210 100% 50% / 0.6),
                0 8px 24px rgba(0, 0, 0, 0.4),
                inset 0 2px 0 rgba(255, 255, 255, 0.3),
                inset 0 -2px 12px rgba(0, 0, 0, 0.2)
              `;
              e.currentTarget.style.background = 'linear-gradient(145deg, hsl(210 100% 60%) 0%, hsl(210 100% 50%) 30%, hsl(210 100% 37%) 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                0 12px 32px hsl(210 100% 50% / 0.4),
                0 4px 16px rgba(0, 0, 0, 0.3),
                inset 0 2px 0 rgba(255, 255, 255, 0.2),
                inset 0 -2px 8px rgba(0, 0, 0, 0.1)
              `;
              e.currentTarget.style.background = 'linear-gradient(145deg, hsl(210 100% 50%) 0%, hsl(210 100% 37%) 30%, hsl(210 100% 27%) 100%)';
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              Request Demo
              <ArrowRight className="ml-2 sm:ml-4 h-6 w-6 sm:h-8 sm:w-8 group-hover:translate-x-3 transition-transform duration-500" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
