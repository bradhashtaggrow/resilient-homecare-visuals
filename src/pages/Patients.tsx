
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { supabase } from '@/integrations/supabase/client';

const Patients = () => {
  const [heroContent, setHeroContent] = useState({
    title: "Patient-centered",
    highlightedText: "care at home"
  });
  const [contentSection, setContentSection] = useState({
    title: "Patients",
    description: "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
  });

  useEffect(() => {
    console.log('Patients page - Loading content...');
    // Load all content from database
    const loadAllContent = async () => {
      try {
        // Load hero content
        const { data: heroData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'patients_hero')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setHeroContent({
            title: heroData.title || "Patient-centered",
            highlightedText: "care at home"
          });
        }

        // Load content section
        const { data: contentData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'patients_hero')
          .eq('is_active', true)
          .single();

        if (contentData) {
          setContentSection({
            title: "Patients",
            description: contentData.description || "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home."
          });
        }

      } catch (error) {
        console.error('Error loading patients content:', error);
      }
    };

    loadAllContent();

    // Set up real-time subscription for patients content
    const channel = supabase
      .channel('patients-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.patients_hero'
      }, (payload) => {
        console.log('Real-time patients content change:', payload);
        loadAllContent();
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
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      <Footer />
    </div>
  );
};

export default Patients;
