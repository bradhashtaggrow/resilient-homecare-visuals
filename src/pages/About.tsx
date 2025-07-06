
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import DatabaseHeroSection from '@/components/DatabaseHeroSection';
import DatabaseContentSection from '@/components/DatabaseContentSection';
import WhyResilientSection from '@/components/about/WhyResilientSection';
import HospitalBenefitsSection from '@/components/about/HospitalBenefitsSection';
import ClinicianBenefitsSection from '@/components/about/ClinicianBenefitsSection';
import ValuesSection from '@/components/about/ValuesSection';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <DatabaseHeroSection 
        sectionKey="about_hero"
        defaultTitle="About"
        defaultHighlightedText="Resilient Healthcare"
      />

      <DatabaseContentSection 
        sectionKey="about_content"
        defaultTitle="Revolutionizing Home-Based Healthcare with RAIN"
        defaultDescription="Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption."
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
