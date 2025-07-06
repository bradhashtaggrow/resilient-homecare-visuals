
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import PatientTabsSection from '@/components/tabs/PatientTabsSection';
import { Building2, Heart, Users, Shield, CheckCircle } from 'lucide-react';

const Patients = () => {
  const services = [
    {
      id: 'hospitals-partnership',
      icon: Building2,
      title: "Work with leading hospitals",
      subtitle: "Partnership Excellence",
      description: "Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.",
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'patient-referrals',
      icon: Users,
      title: "Get access to a consistent stream of patient referrals",
      subtitle: "Steady Patient Flow",
      description: "Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.",
      color: "green",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'care-delivery',
      icon: Heart,
      title: "Support care delivery for inpatient at home and outpatient at home services",
      subtitle: "Comprehensive Home Care",
      description: "Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.",
      color: "purple",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'simplified-workflows',
      icon: Shield,
      title: "Simplified workflows and credentialing through our platform",
      subtitle: "Streamlined Operations",
      description: "Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.",
      color: "orange",
      patient_image_url: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'payment-structure',
      icon: CheckCircle,
      title: "We pay you per visit so no need to worry about administrative burden",
      subtitle: "Simple Payment Model",
      description: "Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.",
      color: "teal",
      patient_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1c796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Patient-centered"
        highlightedText="care at home"
      />

      <ContentSection 
        title="Patients"
        description="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <PatientTabsSection services={services} />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Patients;
