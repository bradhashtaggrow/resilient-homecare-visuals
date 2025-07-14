
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import WhyResilientSection from '@/components/about/WhyResilientSection';
import HospitalBenefitsSection from '@/components/about/HospitalBenefitsSection';
import ClinicianBenefitsSection from '@/components/about/ClinicianBenefitsSection';
import ValuesSection from '@/components/about/ValuesSection';
import { supabase } from '@/integrations/supabase/client';

const About = () => {
  const [heroContent, setHeroContent] = useState({
    title: "About",
    highlightedText: "Resilient Healthcare",
    backgroundVideoUrl: 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
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
          const newHeroContent = {
            title: heroData.title || 'About',
            highlightedText: heroData.subtitle || 'Resilient Healthcare',
            backgroundVideoUrl: heroData.background_video_url || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
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
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      <WhyResilientSection />
      <HospitalBenefitsSection />
      <ClinicianBenefitsSection />
      <ValuesSection />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default About;
