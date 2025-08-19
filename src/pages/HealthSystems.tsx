import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import WhyHealthSystemsSection from '@/components/healthsystems/WhyHealthSystemsSection';
import HealthSystemBenefitsSection from '@/components/healthsystems/HealthSystemBenefitsSection';
import HealthSystemFeaturesSection from '@/components/healthsystems/HealthSystemFeaturesSection';
import HealthSystemValuesSection from '@/components/healthsystems/HealthSystemValuesSection';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const HealthSystems = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: "Transform Your",
    highlightedText: "Health System",
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  
  const [contentSection, setContentSection] = useState({
    title: "Revolutionizing Healthcare Delivery",
    description: "We partner with progressive health systems and hospitals to transform patient care through cutting-edge technology and seamless care coordination. Our comprehensive platform enables you to expand services, improve outcomes, and prepare for the future of healthcare while maintaining the highest standards of clinical excellence."
  });

  useEffect(() => {
    console.log('Health Systems page - Loading content...');
    
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'health_systems_hero')
          .eq('is_active', true)
          .maybeSingle();

        if (heroData && !heroError) {
          console.log('Loaded health systems hero content:', heroData);
          // Split the title properly - the CMS stores "Transform Your Health System"
          const fullTitle = heroData.title || 'Transform Your Health System';
          const parts = fullTitle.split(' Your ');
          const newHeroContent = {
            title: parts[0] + ' Your',  // "Transform Your"
            highlightedText: parts[1] || 'Health System',  // "Health System"
            description: heroData.description || '',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new health systems hero content:', newHeroContent);
          setHeroContent(newHeroContent);
          
          if (heroData.description) {
            setContentSection({
              title: "Revolutionizing Healthcare Delivery",
              description: heroData.description
            });
          }
        } else {
          console.log('No health systems hero content found or error:', heroError);
        }
      } catch (error) {
        console.error('Error loading health systems content:', error);
      }
    };

    loadContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && data.section_key === 'health_systems_hero') {
        console.log('Health systems content updated via real-time sync:', data);
        loadContent();
      }
    };

    window.addEventListener('content-sync-update', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('content-sync-update', handleContentUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        description={heroContent.description}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
      />

      <WhyHealthSystemsSection />
      <HealthSystemBenefitsSection />
      <HealthSystemFeaturesSection />
      <HealthSystemValuesSection />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;