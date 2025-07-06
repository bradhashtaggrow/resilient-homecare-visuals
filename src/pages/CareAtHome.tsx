
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import DatabaseHeroSection from '@/components/DatabaseHeroSection';
import DatabaseContentSection from '@/components/DatabaseContentSection';
import TabsSection from '@/components/tabs/TabsSection';

const CareAtHome = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <DatabaseHeroSection 
        sectionKey="care-at-home_hero"
        defaultTitle="What is"
        defaultHighlightedText="Resilient Community?"
      />

      <DatabaseContentSection 
        sectionKey="care-at-home_content"
        defaultTitle="Connecting Healthcare Professionals"
        defaultDescription="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <TabsSection sectionKey="care-at-home_tabs" />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default CareAtHome;
