
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import LeadGenSection from '@/components/LeadGenSection';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap, LucideIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

interface TabData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  icon_name: string;
  image_url: string;
}

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  patient_image_url: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Building2,
  Heart,
  Users,
  Shield,
  CheckCircle,
  Activity,
  Zap,
};

const Patients = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: "Hospital-Quality Care",
    highlightedText: "at Home",
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  const [contentSection, setContentSection] = useState({
    title: "Patients",
    description: "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
  });
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    console.log('Patients page - Loading content...');
    // Load all content from database
    const loadAllContent = async () => {
      try {
        // Load hero content
        const { data: heroData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'patients_hero')
          .eq('is_active', true)
          .single();

        if (heroData) {
          console.log('Loaded patients hero content:', heroData);
          // Split the title properly - the CMS stores "Hospital-Quality Care at Home"
          const fullTitle = heroData.title || 'Hospital-Quality Care at Home';
          const parts = fullTitle.split(' at ');
          const newHeroContent = {
            title: parts[0],  // "Hospital-Quality Care"
            highlightedText: parts[1] ? 'at ' + parts[1] : 'at Home',  // "at Home"
            description: heroData.description || '',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new patients hero content:', newHeroContent);
          setHeroContent(newHeroContent);
          setContentSection({
            title: "Patients",
            description: heroData.description || "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home."
          });
        } else {
          console.log('No patients hero content found');
        }

        // Load mobile tabs content
        const { data: mobileData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'patients_mobile')
          .eq('is_active', true)
          .single();

        if (mobileData && mobileData.content_data && typeof mobileData.content_data === 'object' && 'tabs' in mobileData.content_data) {
          const tabsData = (mobileData.content_data as any).tabs as TabData[];
          const transformedServices: Service[] = tabsData.map((tab) => ({
            id: tab.id,
            icon: iconMap[tab.icon_name] || Building2,
            title: tab.title,
            subtitle: tab.subtitle,
            description: tab.description,
            color: tab.color,
            patient_image_url: tab.image_url
          }));
          setServices(transformedServices);
        }

      } catch (error) {
        console.error('Error loading patients content:', error);
      }
    };

    loadAllContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && 
          (data.section_key === 'patients_hero' || data.section_key === 'patients_mobile')) {
        console.log('Patients content updated via real-time sync:', data);
        loadAllContent();
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

      {services.length > 0 && <TabsSection services={services} />}

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Patients;
