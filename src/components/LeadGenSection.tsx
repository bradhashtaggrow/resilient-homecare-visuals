
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
      className="py-32 bg-white relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/538d02df-2e37-481f-9af6-58f2718f977a.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* White overlay to ensure readability */}
      <div className="absolute inset-0 bg-white/85" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Star className="h-4 w-4" />
            <span>Join the Healthcare Revolution</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Ready to Transform Your 
            <span className="block healthcare-text-gradient"> Healthcare Delivery?</span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join visionary healthcare organizations that are revolutionizing patient care 
            and operational excellence with our comprehensive platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Revolutionary Form */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Form Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-16 translate-x-16" />
              
              <h3 className="text-3xl font-bold text-gray-900 mb-8 relative">
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
                    className="w-full healthcare-gradient hover:scale-105 transition-all duration-300 text-xl py-6 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    Demo Scheduled Successfully!
                  </h4>
                  <p className="text-lg text-gray-600 mb-6">
                    Thank you for your interest in revolutionizing healthcare delivery. 
                    Our team will contact you within 2 hours to schedule your personalized demo.
                  </p>
                  <div className="bg-blue-50 rounded-2xl p-6">
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
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                What You'll Experience
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Personalized Demo Experience
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Tailored demonstration showcasing solutions for your specific challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Implementation Roadmap
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Detailed timeline, pricing, and step-by-step deployment strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Comprehensive ROI Analysis
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Custom financial impact assessment for your organization
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Seamless Integration Planning
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Technical consultation for existing systems and workflows
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revolutionary Testimonials */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Trusted by Healthcare Leaders
              </h3>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
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
          <div className="healthcare-gradient rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24" />
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6">
                Join 500+ Healthcare Organizations
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
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
