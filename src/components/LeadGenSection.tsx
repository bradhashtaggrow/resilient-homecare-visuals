
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from 'lucide-react';

const LeadGenSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', organization: '', phone: '' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    "Personalized demo tailored to your needs",
    "Implementation timeline and pricing",
    "ROI analysis for your organization",
    "Integration with existing systems"
  ];

  return (
    <section id="lead-gen-section" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your 
            <span className="healthcare-text-gradient"> Healthcare Delivery?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join forward-thinking healthcare organizations that are revolutionizing 
            patient care with our comprehensive platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="medical-card p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Schedule Your Demo
              </h3>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="text"
                      name="organization"
                      placeholder="Organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 text-lg"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 text-lg"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full healthcare-gradient hover:scale-105 transition-all duration-300 text-lg py-6"
                  >
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                    Thank You!
                  </h4>
                  <p className="text-gray-600">
                    We'll be in touch within 24 hours to schedule your personalized demo.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Benefits */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  What You'll Get
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="medical-card p-6 rounded-xl bg-blue-50 border-blue-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Trusted by Healthcare Leaders
                </h4>
                <p className="text-gray-600 mb-4">
                  "Resilient Healthcare has transformed how we deliver care. 
                  Our readmission rates have dropped significantly, and our 
                  clinicians are more efficient than ever."
                </p>
                <div className="text-sm text-gray-500">
                  — Chief Medical Officer, Regional Health System
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadGenSection;
