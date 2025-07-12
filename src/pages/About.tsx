
import React, { useEffect, useState } from 'react';
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

interface HeroContent {
  title: string;
  highlightedText: string;
}

interface ContentSectionData {
  title: string;
  description: string;
}

const About = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "About",
    highlightedText: "Resilient Healthcare"
  });
  const [contentSection, setContentSection] = useState<ContentSectionData>({
    title: "Revolutionizing Home-Based Healthcare with RAIN",
    description: "Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption."
  });

  useEffect(() => {
    loadHeroContent();
    setupRealtimeSubscription();
  }, []);

  const loadHeroContent = async () => {
    try {
      const { data: heroData, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'about_hero')
        .eq('is_active', true)
        .single();

      if (heroData) {
        console.log('Loaded about hero content:', heroData);
        setHeroContent({
          title: heroData.title || "About",
          highlightedText: heroData.subtitle || "Resilient Healthcare"
        });
        setContentSection({
          title: "Revolutionizing Home-Based Healthcare with RAIN",
          description: heroData.description || "Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption."
        });
      }
    } catch (error) {
      console.error('Error loading about hero content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('about-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_hero'
      }, () => {
        loadHeroContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
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
