
import React, { useState, useEffect } from 'react';
import { SEOHead, createOrganizationSchema, SEO_KEYWORDS } from '@/components/SEOHead';
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
    title: "About Resilient",
    highlightedText: "Healthcare",
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
          const newHeroContent = {
            title: "About Resilient", // Keep hardcoded title
            highlightedText: "Healthcare", // Keep hardcoded highlighted text
            backgroundVideoUrl: heroData.background_video_url || '' // Only use database for video
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

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Resilient Healthcare",
    "description": "Learn about Resilient Healthcare's mission to revolutionize remote healthcare through innovative technology, value-based care at home, and advanced telehealth solutions.",
    "mainEntity": createOrganizationSchema()
  };

  return (
    <>
      <SEOHead
        title="About Resilient Healthcare - Innovating Remote Healthcare Technology"
        description="Discover how Resilient Healthcare is transforming healthcare delivery with cutting-edge remote monitoring technology, value-based care at home solutions, and comprehensive telehealth platforms for providers and patients."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.about}`}
        canonical="/about"
        ogTitle="About Resilient Healthcare - Leading Healthcare Technology Innovation"
        ogDescription="Learn about our mission to revolutionize remote healthcare through advanced technology, AI-powered diagnostics, and value-based care at home solutions."
        schemaData={aboutSchema}
      />
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
    </>
  );
};

export default About;
