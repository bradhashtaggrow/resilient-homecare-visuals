
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import DatabaseHeroSection from '@/components/DatabaseHeroSection';
import DatabaseContentSection from '@/components/DatabaseContentSection';
import PatientTabsSection from '@/components/tabs/PatientTabsSection';

const Patients = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <DatabaseHeroSection 
        sectionKey="patients_hero"
        defaultTitle="Patient-centered"
        defaultHighlightedText="care at home"
      />

      <DatabaseContentSection 
        sectionKey="patients_content"
        defaultTitle="Patients"
        defaultDescription="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <PatientTabsSection sectionKey="patients_patient_tabs" />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Patients;
