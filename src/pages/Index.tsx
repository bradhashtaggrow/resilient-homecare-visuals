
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileShowcase from '@/components/MobileShowcase';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import AdminDashboard from '@/components/AdminDashboard';
import FounderSection from '@/components/FounderSection';
import LeadGenSection from '@/components/LeadGenSection';
import Footer from '@/components/Footer';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const Index = () => {
  // Enable real-time sync for independent operation
  useWebsiteSync();
  
  return (
    <div className="min-h-screen bg-white paper-texture">
      <Navigation />
      {/* No padding needed - sticky navigation flows with content */}
      <div>
        <HeroSection />
        <ServiceLinesSection />
        <MobileShowcase />
        <ValuePropositionSection />
        <AdminDashboard />
        <FounderSection />
        <LeadGenSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
