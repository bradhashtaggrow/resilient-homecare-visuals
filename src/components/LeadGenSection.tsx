import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Star, Award, Shield, Zap } from 'lucide-react';

const LeadGenSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    role: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Revolutionary form submitted:', formData);
    setSubmitted(true);
    setIsLoading(false);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', organization: '', phone: '', role: '' });
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Personalized Demo Experience",
      description: "Tailored demonstration showcasing solutions for your specific challenges"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Implementation Roadmap", 
      description: "Detailed timeline, pricing, and step-by-step deployment strategy"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Comprehensive ROI Analysis",
      description: "Custom financial impact assessment for your organization"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Seamless Integration Planning",
      description: "Technical consultation for existing systems and workflows"
    }
  ];

  const testimonials = [
    {
      quote: "Resilient Healthcare has completely transformed our patient care delivery. Readmission rates dropped 28% in just 6 months.",
      author: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      organization: "Metro Regional Health System"
    },
    {
      quote: "The platform's AI-driven insights have revolutionized how we coordinate care. Our clinicians are more efficient and less burned out.",
      author: "Michael Rodriguez",
      role: "VP of Operations",
      organization: "Coastal Healthcare Network"
    },
    {
      quote: "Implementation was seamless, and the ROI exceeded our projections by 180%. This is truly the future of healthcare.",
      author: "Jennifer Martinez",
      role: "Chief Innovation Officer",
      organization: "Sunrise Medical Group"
    }
  ];

  return (
    <section 
      id="lead-gen-section" 
      className="py-32 bg-white relative overflow-hidden paper-texture-subtle"
    >
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-blue-100/90 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Star className="h-4 w-4" />
            <span>Join the Healthcare Revolution</span>
          </div>
          <h2 className="leading-none tracking-tight font-black mb-8"
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 8rem)', 
                fontWeight: 900, 
                lineHeight: 0.85,
                background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            Ready to Transform Your 
            <span className="block"
                  style={{
                    background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Healthcare Delivery?</span>
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide"
             style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', lineHeight: 1.3 }}>
            Join visionary healthcare organizations that are revolutionizing patient care 
            and operational excellence with our comprehensive platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Revolutionary Form */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0'
          }`}>
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Form Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16" />
              
              <h3 className="leading-none tracking-tight font-black mb-8"
                  style={{ 
                    fontSize: 'clamp(2rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    lineHeight: 0.85,
                    background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                Schedule Your Revolutionary Demo
              </h3>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Dr. Jane Smith"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="jane@hospital.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization *
                    </label>
                    <Input
                      type="text"
                      name="organization"
                      placeholder="Metro General Hospital"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role *
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        required
                        className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white"
                      >
                        <option value="">Select Role</option>
                        <option value="ceo">CEO/President</option>
                        <option value="cmo">Chief Medical Officer</option>
                        <option value="coo">Chief Operating Officer</option>
                        <option value="cio">Chief Information Officer</option>
                        <option value="director">Director</option>
                        <option value="manager">Manager</option>
                        <option value="clinician">Clinician</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full hover:scale-105 transition-all duration-300 text-xl py-6 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                      boxShadow: `
                        0 8px 24px rgba(74, 144, 226, 0.4),
                        0 2px 12px rgba(0, 0, 0, 0.3),
                        inset 0 2px 0 rgba(255, 255, 255, 0.2),
                        inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                      `,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Scheduling Your Demo...</span>
                      </div>
                    ) : (
                      <>
                        Request Revolutionary Demo
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    * Required fields. We respect your privacy and will never share your information.
                  </p>
                </form>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h4 className="leading-none tracking-tight font-black mb-4"
                      style={{ 
                        fontSize: 'clamp(2rem, 5vw, 4rem)', 
                        fontWeight: 900, 
                        lineHeight: 0.85,
                        background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                    Demo Scheduled Successfully!
                  </h4>
                  <p className="text-blue-600/90 font-medium tracking-wide mb-6"
                     style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', lineHeight: 1.3 }}>
                    Thank you for your interest in revolutionizing healthcare delivery. 
                    Our team will contact you within 2 hours to schedule your personalized demo.
                  </p>
                  <div className="bg-blue-50/90 backdrop-blur-sm rounded-2xl p-6">
                    <p className="text-blue-700 font-medium">
                      📧 Confirmation email sent to {formData.email}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Benefits & Social Proof */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0'
          }`}>
            {/* What You'll Get */}
            <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h3 className="leading-none tracking-tight font-black mb-8"
                  style={{ 
                    fontSize: 'clamp(2rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    lineHeight: 0.85,
                    background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                What You'll Experience
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 p-3 bg-blue-100/90 backdrop-blur-sm rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-blue-600/90 font-medium tracking-wide mb-2"
                          style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', lineHeight: 1.3 }}>
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Revolutionary Testimonials */}
            <div className="space-y-6">
              <h3 className="leading-none tracking-tight font-black"
                  style={{ 
                    fontSize: 'clamp(2rem, 5vw, 4rem)', 
                    fontWeight: 900, 
                    lineHeight: 0.85,
                    background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                Trusted by Healthcare Leaders
              </h3>
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "Resilient Healthcare has completely transformed our patient care delivery. Readmission rates dropped 28% in just 6 months."
                </blockquote>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">Dr. Sarah Chen</div>
                  <div className="text-blue-600 font-medium">Chief Medical Officer</div>
                  <div className="text-gray-500 text-sm">Metro Regional Health System</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Section */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="rounded-3xl p-12 text-white relative overflow-hidden"
               style={{
                 background: 'linear-gradient(145deg, #4A90E2 0%, #357ABD 100%)',
                 boxShadow: `
                   0 20px 48px rgba(74, 144, 226, 0.4),
                   0 8px 24px rgba(0, 0, 0, 0.3),
                   inset 0 2px 0 rgba(255, 255, 255, 0.2),
                   inset 0 -2px 8px rgba(0, 0, 0, 0.1)
                 `
               }}>
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
