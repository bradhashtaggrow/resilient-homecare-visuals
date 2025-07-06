
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import { Building2, Heart, Users, Shield, CheckCircle } from 'lucide-react';

const CareAtHome = () => {
  const services = [
    {
      id: 'hospitals-partnership',
      icon: Building2,
      title: "Partner with Leading Hospitals",
      subtitle: "Hospital Network Excellence",
      description: "Connect with top healthcare institutions to expand your reach and impact through our comprehensive network of trusted hospital partners.",
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'patient-referrals',
      icon: Users,
      title: "Consistent Patient Referral Stream",
      subtitle: "Steady Patient Flow",
      description: "Access a reliable stream of patient referrals through our integrated network of healthcare partners and streamlined referral management system.",
      color: "green",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'care-delivery',
      icon: Heart,
      title: "Complete Home Care Support",
      subtitle: "Comprehensive Care Solutions",
      description: "Full support for both inpatient and outpatient care delivery in home settings with complete clinical oversight and coordination.",
      color: "purple",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'simplified-workflows',
      icon: Shield,
      title: "Streamlined Platform Operations",
      subtitle: "Simplified Workflows",
      description: "Efficient processes that reduce administrative complexity, save valuable time, and ensure full compliance with healthcare standards.",
      color: "orange",
      patient_image_url: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'payment-structure',
      icon: CheckCircle,
      title: "Simple Per-Visit Payments",
      subtitle: "Transparent Compensation",
      description: "Straightforward per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation for your services.",
      color: "teal",
      patient_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1c796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="What is"
        highlightedText="Resilient Community?"
      />

      <ContentSection 
        title="Connecting Healthcare Professionals"
        description="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <TabsSection services={services} />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default CareAtHome;
