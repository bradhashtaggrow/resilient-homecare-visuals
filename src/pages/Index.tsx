
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileShowcase from '@/components/MobileShowcase';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import AdminDashboard from '@/components/AdminDashboard';
import FounderSection from '@/components/FounderSection';
import StatsSection from '@/components/StatsSection';
import LeadGenSection from '@/components/LeadGenSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white paper-texture">
      <Navigation />
      {/* Add top padding to account for fixed navigation */}
      <div className="pt-16">
        <HeroSection />
        <ServiceLinesSection />
        <MobileShowcase />
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
