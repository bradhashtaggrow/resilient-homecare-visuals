
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import DatabaseHeroSection from '@/components/DatabaseHeroSection';
import DatabaseContentSection from '@/components/DatabaseContentSection';

const News = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <DatabaseHeroSection 
        sectionKey="news_hero"
        defaultTitle="Healthcare"
        defaultHighlightedText="News & Updates"
      />

      <DatabaseContentSection 
        sectionKey="news_content"
        defaultTitle="News"
        defaultDescription="Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare."
      />

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default News;
