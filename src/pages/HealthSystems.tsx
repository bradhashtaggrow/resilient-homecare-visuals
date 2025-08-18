import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import ServicesGrid from '@/components/services/ServicesGrid';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const HealthSystems = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: 'Transform Your',
    highlightedText: 'Health System',
    description: '',
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  
  const [services, setServices] = useState([
    // Fallback services in case database doesn't load
    {
      id: 'improving-outcomes',
      icon: Heart,
      title: 'Improving Outcomes',
      subtitle: 'Enhanced Patient Care',
      description: 'Enhanced patient care delivery and satisfaction through innovative home-based healthcare solutions that put patients first.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'expanding-services',
      icon: Building2,
      title: 'Expanding Services',
      subtitle: 'Broaden Your Reach',
      description: 'Broaden your service offerings and reach more patients in their preferred care environment with comprehensive solutions.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'growing-revenue',
      icon: DollarSign,
      title: 'Growing Revenue',
      subtitle: 'Financial Excellence',
      description: 'Increase revenue streams while reducing operational costs through efficient care delivery models and optimized workflows.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'shifting-payment-models',
      icon: Zap,
      title: 'Preparing for Shifting Payment Models',
      subtitle: 'Future-Ready Solutions',
      description: 'Stay ahead of evolving healthcare payment structures and reimbursement changes with adaptive technology platforms.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'operational-efficiency',
      icon: CheckCircle,
      title: 'Operational Efficiency',
      subtitle: 'Streamlined Operations',
      description: 'Streamline workflows and reduce administrative burden while increasing productivity across all departments and teams.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]);

  const [contentSection, setContentSection] = useState({
    title: 'Partner with Leading Health Systems',
    description: 'We connect health systems and hospitals with innovative technology solutions to deliver patient-centered care at home. Our platform enables seamless care coordination, improves outcomes, and prepares you for the future of healthcare delivery.'
  });

  // Available icons mapping
  const availableIcons = {
    Building2,
    Heart,
    Users,
    Shield,
    CheckCircle,
    Activity,
    Zap,
    TrendingUp,
    DollarSign
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent || Building2;
  };

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
        } else {
          console.log('No health systems hero content found or error:', heroError);
        }

        // Load services content
        const { data: servicesData, error: servicesError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'health_systems_mobile')
          .eq('is_active', true)
          .maybeSingle();

        if (servicesData && !servicesError) {
          console.log('Loaded health systems services content:', servicesData);

          // Update content section with database content
          setContentSection({
            title: servicesData.title || 'Partner with Leading Health Systems',
            description: servicesData.description || 'We connect health systems and hospitals with innovative technology solutions to deliver patient-centered care at home. Our platform enables seamless care coordination, improves outcomes, and prepares you for the future of healthcare delivery.'
          });

          // Transform tabs data to services format
          if (servicesData.content_data && typeof servicesData.content_data === 'object' && servicesData.content_data !== null) {
            const contentData = servicesData.content_data as any;
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
              console.log('Transformed health systems services:', transformedServices);
            }
          }
        } else {
          console.log('No health systems services content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading health systems content:', error);
      }
    };

    loadContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && 
          (data.section_key === 'health_systems_hero' || data.section_key === 'health_systems_mobile')) {
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

      <ServicesGrid services={services} />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;