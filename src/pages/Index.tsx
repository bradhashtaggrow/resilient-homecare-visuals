
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileTabsSection from '@/components/tabs/MobileTabsSection';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import AdminDashboard from '@/components/AdminDashboard';
import FounderSection from '@/components/FounderSection';
import StatsSection from '@/components/StatsSection';
import LeadGenSection from '@/components/LeadGenSection';
import Footer from '@/components/Footer';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const Index = () => {
  const { isListening, lastUpdate } = useWebsiteSync();

  useEffect(() => {
    console.log('Website sync status:', { isListening, lastUpdate });
  }, [isListening, lastUpdate]);

  return (
    <div className="min-h-screen bg-white paper-texture">
      <Navigation />
      {/* Properly ordered sections matching CMS structure */}
      <div>
        <HeroSection />
        <ServiceLinesSection />
        <MobileTabsSection />
        <ValuePropositionSection />
        <AdminDashboard />
        <FounderSection />
        <StatsSection />
        <LeadGenSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
