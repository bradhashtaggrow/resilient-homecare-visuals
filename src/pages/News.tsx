
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileShowcase from '@/components/MobileShowcase';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import LeadGenSection from '@/components/LeadGenSection';
import Footer from '@/components/Footer';

const News = () => {
  return (
    <div className="min-h-screen bg-white paper-texture">
      <Navigation />
      <HeroSection />
      <ServiceLinesSection />
      <MobileShowcase />
      <ValuePropositionSection />
      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default News;
