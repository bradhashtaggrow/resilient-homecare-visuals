
import React from 'react';
import { PerformanceWrapper } from '@/hooks/usePerformance';
import { SEOHead, createOrganizationSchema, createMedicalOrganizationSchema, createSoftwareApplicationSchema, SEO_KEYWORDS } from '@/components/SEOHead';
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
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      createOrganizationSchema(),
      createMedicalOrganizationSchema(),
      createSoftwareApplicationSchema(),
      {
        "@type": "WebSite",
        "name": "Resilient Healthcare",
        "url": "https://resilienthealthcare.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://resilienthealthcare.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <PerformanceWrapper pageName="home">
      <SEOHead
        title="Remote Healthcare Technology Platform - Value-Based Care at Home"
        description="Revolutionary remote healthcare platform by Resilient Healthcare. Advanced telehealth technology, AI-powered diagnostics, secure patient monitoring, and value-based care at home solutions for healthcare providers and patients."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.home}`}
        canonical="/"
        ogTitle="Resilient Healthcare - Leading Remote Healthcare Technology Platform"
        ogDescription="Transform healthcare delivery with our advanced remote monitoring, AI-powered diagnostics, and comprehensive telehealth platform. Value-based care at home made simple."
        schemaData={combinedSchema}
      />
      <div className="min-h-screen bg-white paper-texture critical-above-fold">
        <Navigation />
        {/* No padding needed - sticky navigation flows with content */}
        <main>
          <HeroSection />
          <ServiceLinesSection />
          <MobileShowcase />
          <ValuePropositionSection />
          <AdminDashboard />
          <FounderSection />
          <StatsSection />
          <LeadGenSection />
          <Footer />
        </main>
      </div>
    </PerformanceWrapper>
  );
};

export default Index;
