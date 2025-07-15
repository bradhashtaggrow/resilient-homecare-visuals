
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const CareAtHome = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [services, setServices] = useState([]);
  const [heroContent, setHeroContent] = useState({
    title: 'What is',
    highlightedText: 'Resilient Community?',
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });

  // Available icons mapping with consistent blue gradient styling
  const availableIcons = {
    Building2,
    Heart,
    Users,
    Shield,
    CheckCircle,
    Activity,
    Zap
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent || Building2;
  };

  useEffect(() => {
    // Load content from database
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'care_at_home_hero')
          .eq('is_active', true)
          .single();

        if (heroData && !heroError) {
          console.log('Loaded care at home hero content:', heroData);
          // Split the title properly - the CMS stores the full title, we need to split it
          const fullTitle = heroData.title || 'Hospital-Level Care. At Home.';
          const parts = fullTitle.split('.');
          const newHeroContent = {
            title: parts[0] + '.',  // "Hospital-Level Care."
            highlightedText: parts[1] ? parts[1].trim() : 'At Home',  // "At Home"
            description: heroData.description || '',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new hero content:', newHeroContent);
          setHeroContent(newHeroContent);
        } else {
          console.log('No hero content found or error:', heroError);
        }

        // Load mobile content
        const { data: mobileData, error: mobileError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'care_at_home_mobile')
          .eq('is_active', true)
          .single();

        if (mobileData && !mobileError) {
          console.log('Loaded care at home mobile content:', mobileData);

          // Transform tabs data to services format
          if (mobileData.content_data && typeof mobileData.content_data === 'object' && mobileData.content_data !== null) {
            const contentData = mobileData.content_data as any;
            if (contentData.tabs) {
              const transformedServices = contentData.tabs.map((tab: any) => ({
                id: tab.id,
                icon: getIconComponent(tab.icon_name),
                title: tab.title,
                subtitle: tab.subtitle,
                description: tab.description,
                color: "blue", // Default color
                patient_image_url: tab.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
              }));
              setServices(transformedServices);
            }
          }
        } else {
          console.log('No care at home mobile content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading care at home content:', error);
      }
    };

    loadContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && 
          (data.section_key === 'care_at_home_hero' || data.section_key === 'care_at_home_mobile')) {
        console.log('Care at home content updated via real-time sync:', data);
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
        title="Connecting Healthcare Professionals"
        description="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      {services.length > 0 && <TabsSection services={services} />}

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default CareAtHome;
