import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Phone, Mail, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'get_in_touch')
          .single();

        if (error) throw error;
        setContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-apple flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const contentData = content?.content_data || {};
  const contactInfo = contentData.contact_info || {};
  const formConfig = contentData.form || {};
  const ctaConfig = contentData.cta || {};

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={content?.title || "Get in"}
        highlightedText="Touch"
      />

      <ContentSection 
        title={content?.subtitle || "Contact Us"}
        description={content?.description || "Ready to transform your healthcare delivery? Connect with our team to learn how Resilient Healthcare can help you expand your services, improve patient outcomes, and capture new revenue opportunities."}
      />

      {/* Contact Information & Form */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
              <div>
                <h2 className="font-black tracking-tight font-apple mb-6 lg:mb-8 text-center lg:text-left" 
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  {contactInfo.headquarters || "📍 Resilient Healthcare Headquarters"}
                </h2>
                
                <div className="space-y-6 lg:space-y-8">
                  <div className="group p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:from-[hsl(214,100%,65%)] hover:to-[hsl(214,100%,50%)]">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4 font-apple">
                          📞 Call Us
                        </h3>
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-apple">
                          (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:from-[hsl(214,100%,65%)] hover:to-[hsl(214,100%,50%)]">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-4 font-apple">
                          ✉️ Email Us
                        </h3>
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-apple break-all">
                          contact@resilienthealthcare.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group p-6 sm:p-8 lg:p-12 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-50 to-white border border-gray-100/50 hover:shadow-xl transition-all duration-500 order-1 lg:order-2">
              <div className="flex items-center mb-6 lg:mb-8">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="font-black tracking-tight font-apple" 
                    style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  {formConfig.title || "Send us a Message"}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-apple">
                      {formConfig.fields?.name?.label || "Full Name *"}
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={formConfig.fields?.name?.required !== false}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      placeholder={formConfig.fields?.name?.placeholder || "Your full name"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 font-apple">
                      {formConfig.fields?.phone?.label || "Phone Number"}
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={formConfig.fields?.phone?.required === true}
                      className="w-full h-12 sm:h-14 text-base sm:text-lg rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      placeholder={formConfig.fields?.phone?.placeholder || "Your phone number"}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    {formConfig.fields?.email?.label || "Email Address *"}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required={formConfig.fields?.email?.required !== false}
                    className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder={formConfig.fields?.email?.placeholder || "your.email@example.com"}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    {formConfig.fields?.subject?.label || "Subject *"}
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required={formConfig.fields?.subject?.required !== false}
                    className="w-full h-14 text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    placeholder={formConfig.fields?.subject?.placeholder || "What is this regarding?"}
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3 font-apple">
                    {formConfig.fields?.message?.label || "Message *"}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required={formConfig.fields?.message?.required !== false}
                    rows={6}
                    className="w-full text-lg rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                    placeholder={formConfig.fields?.message?.placeholder || "Please provide details about your inquiry..."}
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
                    {formConfig.button_text || "Send Message"}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {ctaConfig.title && (
        <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-apple">
              {ctaConfig.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-apple">
              {ctaConfig.description}
            </p>
            {ctaConfig.button_text && (
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                {ctaConfig.button_text}
              </Button>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
