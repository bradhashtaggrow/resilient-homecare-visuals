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
  const [heroContent, setHeroContent] = useState({
    title: "Get in",
    highlightedText: "Touch",
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
          const newHeroContent = {
            title: heroData.title || 'Get in',
            highlightedText: heroData.subtitle || 'Touch',
            backgroundVideoUrl: heroData.background_video_url || '' // No fallback, only database video
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

    // Set up real-time subscription
    const channel = supabase
      .channel('contact-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.contact_hero'
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

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default Contact;