
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Get in"
        highlightedText="Touch"
      />

      <ContentSection 
        title="Contact Us"
        description="Ready to transform your healthcare delivery? Connect with our team to learn how Resilient Healthcare can help you expand your services, improve patient outcomes, and capture new revenue opportunities."
      />

      {/* Contact Information & Form */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-12">
              <div>
                <h2 className="font-black tracking-tight font-apple mb-8" 
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  📍 Resilient Healthcare Headquarters
                </h2>
                
                <div className="space-y-8">
                  <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-apple">📞 Call</h3>
                        <p className="text-gray-600 text-lg leading-relaxed font-apple">(732) 429-2102</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-8 rounded-3xl bg-gradient-to-br from-green-50 to-white border border-green-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-apple">✉️ Email</h3>
                        <p className="text-gray-600 text-lg leading-relaxed font-apple">jackleen@resilienthc.org</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/50 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center mb-8">
                <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="font-black tracking-tight font-apple" 
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  Send us a Message
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    Subject *
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg" 
                  className="group relative w-full px-8 py-6 text-xl font-bold rounded-2xl text-white border-0 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
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
                  <span className="relative z-10 flex items-center justify-center">
                    <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Message
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Contact;
