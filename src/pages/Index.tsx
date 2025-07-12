
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
      {/* Remove the pt-16 padding and let each section handle its own spacing */}
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
  );
};

export default Index;
