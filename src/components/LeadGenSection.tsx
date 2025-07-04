
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
      className="py-32 relative overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        {/* Darker gradient overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
