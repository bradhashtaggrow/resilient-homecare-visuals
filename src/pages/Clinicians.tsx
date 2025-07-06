
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import DatabaseHeroSection from '@/components/DatabaseHeroSection';
import DatabaseContentSection from '@/components/DatabaseContentSection';
import DatabaseServicesGrid from '@/components/DatabaseServicesGrid';

const Clinicians = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <DatabaseHeroSection 
        sectionKey="clinicians_hero"
        defaultTitle="Enabling"
        defaultHighlightedText="seamless referrals"
      />

      <DatabaseContentSection 
        sectionKey="clinicians_content"
        defaultTitle="Clinicians"
        defaultDescription="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <DatabaseServicesGrid sectionKey="clinicians_services_grid" />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Clinicians;
