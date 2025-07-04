
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Star, Award, Shield, Zap } from 'lucide-react';

const LeadGenSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('lead-gen-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="lead-gen-section" 
      className="py-32 bg-white relative overflow-hidden paper-texture-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <h2 className="text-white leading-none tracking-tight font-black text-shadow-white mb-8"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            Ready to Transform Your 
            <span className="block healthcare-text-gradient">Healthcare Delivery?</span>
          </h2>
          <p className="text-white/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            Join visionary healthcare organizations that are revolutionizing patient care 
            and operational excellence with our comprehensive platform.
          </p>
        </div>

        {/* Bottom Trust Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="healthcare-gradient rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24" />
            <div className="relative">
              <h3 className="text-white leading-none tracking-tight font-black mb-6"
                  style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
                Join 500+ Healthcare Organizations
              </h3>
              <p className="text-white/90 mb-8 opacity-90 max-w-3xl mx-auto font-medium tracking-wide"
                 style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
                Leading hospitals, health systems, and care providers trust Resilient Healthcare 
                to deliver exceptional patient outcomes and operational excellence.
              </p>
              <div className="flex justify-center items-center space-x-12 opacity-80">
                {['Mayo Clinic', 'Johns Hopkins', 'Cleveland Clinic', 'Kaiser Permanente', 'Intermountain'].map((name) => (
                  <div key={name} className="px-6 py-3 bg-white/10 rounded-xl backdrop-blur-sm font-medium hover:bg-white/20 transition-colors">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenSection;
