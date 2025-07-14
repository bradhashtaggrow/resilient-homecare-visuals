
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileShowcase from '@/components/MobileShowcase';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import AdminDashboard from '@/components/AdminDashboard';
import FounderSection from '@/components/FounderSection';
import StatsSection from '@/components/StatsSection';
import { supabase } from '@/integrations/supabase/client';

interface HomePageContent {
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  services_title?: string;
  services_description?: string;
  background_video_url?: string;
  background_image_url?: string;
}

const Index = () => {
  const [content, setContent] = useState<HomePageContent>({
    hero_title: 'The Future of',
    hero_subtitle: 'Hospitals',
    hero_description: 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
    services_title: 'Our Services',
    services_description: 'We provide comprehensive healthcare services designed to improve patient outcomes.',
  });

  useEffect(() => {
    // Load home page content from database
    const loadHomePageContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'hero')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded home page content:', data);
          setContent({
            hero_title: data.title || 'The Future of',
            hero_subtitle: data.subtitle || 'Hospitals',
            hero_description: data.description || 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
            services_title: 'Our Services',
            services_description: 'We provide comprehensive healthcare services designed to improve patient outcomes.',
            background_video_url: data.background_video_url,
            background_image_url: data.background_image_url,
          });
        } else {
          console.log('No home page content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading home page content:', error);
      }
    };

    loadHomePageContent();

    // Set up real-time subscription for home page content
    const channel = supabase
      .channel('home-page-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.hero'
      }, (payload) => {
        console.log('Real-time home page content change:', payload);
        loadHomePageContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={content.hero_title || 'The Future of'}
        highlightedText={content.hero_subtitle || 'Hospitals'}
      />

      <ContentSection 
        title={content.services_title || 'Our Services'}
        description={content.hero_description || 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.'}
      />

      <ServiceLinesSection />
      <MobileShowcase />
      <ValuePropositionSection />
      <AdminDashboard />
      <FounderSection />
      <StatsSection />
      <LeadGenSection />
      
      <Footer />
    </div>
  );
};

export default Index;
