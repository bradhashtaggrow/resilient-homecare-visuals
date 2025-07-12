
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
  const [footerContent, setFooterContent] = useState({
    title: "Join 500+ Healthcare Organizations",
    description: "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
    buttonText: "Request Demo",
    buttonUrl: "/request-demo"
  });

  useEffect(() => {
    loadHeroContent();
    loadFooterContent();
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

  const loadFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'about_footer')
        .eq('is_active', true)
        .single();

      if (data) {
        setFooterContent({
          title: data.title || "Join 500+ Healthcare Organizations",
          description: data.description || "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
          buttonText: data.button_text || "Request Demo",
          buttonUrl: data.button_url || "/request-demo"
        });
      }
    } catch (error) {
      console.error('Error loading about footer content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('about-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=in.(about_hero,about_footer)'
      }, (payload) => {
        if (payload.new?.section_key === 'about_hero') {
          loadHeroContent();
        } else if (payload.new?.section_key === 'about_footer') {
          loadFooterContent();
        }
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

      {/* Footer CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-black tracking-tight font-apple text-white mb-6" 
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {footerContent.title}
          </h2>
          <p className="text-blue-100 font-apple font-medium tracking-wide max-w-3xl mx-auto mb-8"
             style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.4 }}>
            {footerContent.description}
          </p>
          <a
            href={footerContent.buttonUrl}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors duration-300 font-apple"
          >
            {footerContent.buttonText}
          </a>
        </div>
      </section>

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default About;
