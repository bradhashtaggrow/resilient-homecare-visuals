import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Phone, Mail, Send, MessageCircle, ArrowRight, Star, Shield } from 'lucide-react';
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
  const [heroContent, setHeroContent] = useState({
    title: "Get in",
    highlightedText: "Touch",
    backgroundVideoUrl: ''
  });

  useEffect(() => {
    // Load content from database
    const loadContent = async () => {
      try {
        // Load contact content
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'get_in_touch')
          .single();

        if (error) throw error;
        setContent(data);

        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'contact_hero')
          .eq('is_active', true)
          .single();

        if (heroData && !heroError) {
          console.log('Loaded contact hero content:', heroData);
          console.log('Background video URL from DB:', heroData.background_video_url);
          const newHeroContent = {
            title: heroData.title || 'Get in',
            highlightedText: heroData.subtitle || 'Touch',
            backgroundVideoUrl: heroData.background_video_url || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
          };
          console.log('Setting new contact hero content:', newHeroContent);
          setHeroContent(newHeroContent);
        } else {
          console.log('No contact hero content found or error:', heroError);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();

    // Set up real-time subscription for both hero and contact sections
    const channel = supabase
      .channel('contact-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.contact_hero'
      }, (payload) => {
        console.log('Real-time contact hero change:', payload);
        loadContent();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.get_in_touch'
      }, (payload) => {
        console.log('Real-time contact content change:', payload);
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        key={`hero-${heroContent.backgroundVideoUrl}-${Date.now()}`} // Force re-render with timestamp
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
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
                  <div className="group p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)]">
                        <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 font-apple">
                          📞 Call Us
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-apple">
                          (555) 123-4567
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group p-6 sm:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-50 to-white border border-blue-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)]">
                        <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 font-apple">
                          ✉️ Email Us
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-apple break-all">
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
        <section 
          className="py-8 sm:py-12 md:py-16 lg:py-20 relative overflow-hidden paper-texture-subtle flex items-center min-h-[50vh]"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-white" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
            {/* Enhanced Trust Section with Improved Animations */}
            <div className="text-center transition-all duration-1200 transform opacity-100 translate-y-0">
              <div className="bg-gradient-to-r from-[#4F9CF9] to-[#183EC2] rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden bg-opacity-95 backdrop-blur-sm hover:scale-105 transition-all duration-700 hover:shadow-2xl group">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/10 rounded-full -translate-y-12 sm:-translate-y-16 lg:-translate-y-24 translate-x-12 sm:translate-x-16 lg:translate-x-24 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-36 lg:h-36 bg-white/5 rounded-full translate-y-8 sm:translate-y-12 lg:translate-y-18 -translate-x-8 sm:-translate-x-12 lg:-translate-x-18 group-hover:scale-110 transition-transform duration-1000 delay-200" />
                
                <div className="relative z-10">
                  <h3 className="text-white leading-none tracking-tight font-black mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500"
                      style={{ fontSize: 'clamp(1.5rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 0.85 }}>
                    {ctaConfig.title}
                  </h3>
                  <p className="text-white/90 mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto font-medium tracking-wide group-hover:text-white transition-colors duration-500"
                     style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.25rem)', lineHeight: 1.3 }}>
                    {ctaConfig.description}
                  </p>
                  
                  {/* Enhanced Button with Mobile Optimization */}
                  {ctaConfig.button_text && (
                    <Button 
                      size="lg" 
                      className="bg-white text-[#4F9CF9] hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg lg:text-xl font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 group-hover:bg-blue-50 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
                    >
                      <span className="flex items-center justify-center">
                        {ctaConfig.button_text}
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  )}
                </div>

                {/* Floating Elements for Desktop */}
                <div className="hidden lg:block absolute top-4 left-4 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Star className="h-8 w-8 text-white animate-pulse" />
                </div>
                <div className="hidden lg:block absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <Shield className="h-6 w-6 text-white animate-bounce-gentle" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
