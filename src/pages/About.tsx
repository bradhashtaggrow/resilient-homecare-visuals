
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import WhyChooseResilientSection from '@/components/about/WhyChooseResilientSection';
import CoreValuesSection from '@/components/about/CoreValuesSection';
import { supabase } from '@/integrations/supabase/client';

const About = () => {
  const [heroContent, setHeroContent] = useState({
    title: "About Resilient",
    highlightedText: "Healthcare",
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  
  const [contentSection, setContentSection] = useState({
    title: "Revolutionizing Home-Based Healthcare with RAIN",
    description: "Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption."
  });

  useEffect(() => {
    console.log('About page - Loading content...');
    
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'about_hero')
          .eq('is_active', true)
          .single();

        if (heroData && !heroError) {
          console.log('Loaded about hero content:', heroData);
          // Split the title properly - the CMS stores "About Resilient Healthcare"
          const fullTitle = heroData.title || 'About Resilient Healthcare';
          const parts = fullTitle.split(' Resilient ');
          const newHeroContent = {
            title: parts[0] + ' Resilient',  // "About Resilient"
            highlightedText: parts[1] || 'Healthcare',  // "Healthcare"
            description: heroData.description || '',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new about hero content:', newHeroContent);
          setHeroContent(newHeroContent);
          
          if (heroData.description) {
            setContentSection({
              title: "Revolutionizing Home-Based Healthcare with RAIN",
              description: heroData.description
            });
          }
        } else {
          console.log('No about hero content found or error:', heroError);
        }
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('about-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_hero'
      }, (payload) => {
        console.log('Real-time about content change:', payload);
        loadContent();
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
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        description={heroContent.description}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      <WhyChooseResilientSection />
      <CoreValuesSection />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default About;
