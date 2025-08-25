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
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const Contact = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: "Contact Resilient",
    highlightedText: "Healthcare",
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  
  const [contentSection, setContentSection] = useState({
    title: "Contact Us",
    description: "Ready to transform your healthcare delivery? Connect with our team to learn how Resilient Healthcare can help you expand your services, improve patient outcomes, and capture new revenue opportunities."
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    console.log('Contact page - Loading content...');
    
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'contact_hero')
          .eq('is_active', true)
          .single();

        if (heroData && !heroError) {
          console.log('Loaded contact hero content:', heroData);
          // Split the title properly - the CMS stores "Contact Resilient Healthcare"
          const fullTitle = heroData.title || 'Contact Resilient Healthcare';
          const parts = fullTitle.split(' Healthcare');
          const newHeroContent = {
            title: parts[0],  // "Contact Resilient"
            highlightedText: parts[1] ? 'Healthcare' + parts[1] : 'Healthcare',  // "Healthcare"
            description: heroData.description || '',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new contact hero content:', newHeroContent);
          setHeroContent(newHeroContent);
          
          if (heroData.description) {
            setContentSection({
              title: "Contact Us",
              description: heroData.description
            });
          }
        } else {
          console.log('No contact hero content found or error:', heroError);
        }
      } catch (error) {
        console.error('Error loading contact content:', error);
      }
    };

    loadContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && data.section_key === 'contact_hero') {
        console.log('Contact content updated via real-time sync:', data);
        loadContent();
      }
    };

    window.addEventListener('content-sync-update', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('content-sync-update', handleContentUpdate as EventListener);
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

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        description={heroContent.description}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Ready to transform your healthcare delivery? Our team is here to help you implement 
                  innovative solutions that improve patient outcomes and expand your service capabilities.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0080ff] to-[#0066cc] rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+18888740852" className="hover:text-blue-600 transition-colors">+1 888-874-0852</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0080ff] to-[#0066cc] rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@resilienthc.org" className="hover:text-blue-600 transition-colors">info@ResilientHC.org</a>
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="john@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Hospital-at-Home Program"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full"
                    placeholder="Tell us about your healthcare delivery needs and how we can help..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0080ff] to-[#0066cc] hover:from-[#0066cc] hover:to-[#004499] text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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