
import React from 'react';
import { PerformanceWrapper } from '@/hooks/usePerformance';
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
    <PerformanceWrapper pageName="home">
      <div className="min-h-screen bg-white paper-texture critical-above-fold">
        <Navigation />
        {/* No padding needed - sticky navigation flows with content */}
        <div>
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
    </PerformanceWrapper>
  );
};

export default Index;
