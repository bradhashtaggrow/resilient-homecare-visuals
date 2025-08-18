import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

const HealthSystems = () => {
  // Initialize optimized real-time sync for independent operation
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: 'Transform Your',
    highlightedText: 'Health System',
    description: 'Partner with us to expand care delivery, improve outcomes, and prepare for the future of healthcare',
    backgroundVideoUrl: ''
  });
  
  const [services, setServices] = useState([
    // Fallback services in case database doesn't load
    {
      id: 'improved-outcomes',
      icon: Heart,
      title: 'Improved Patient Outcomes',
      subtitle: 'Better Health Results',
      description: 'Deliver personalized care that leads to better health results and higher patient satisfaction scores.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'operational-efficiency',
      icon: TrendingUp,
      title: 'Operational Efficiency',
      subtitle: 'Streamlined Operations',
      description: 'Streamline workflows and reduce administrative burden while increasing productivity across departments.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'cost-reduction',
      icon: DollarSign,
      title: 'Cost Reduction',
      subtitle: 'Financial Excellence',
      description: 'Significantly lower operational costs through optimized resource allocation and reduced readmissions.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'scalable-growth',
      icon: Building2,
      title: 'Scalable Growth',
      subtitle: 'Expand Your Network',
      description: 'Expand your care delivery network without proportional increases in infrastructure investment.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'enhanced-reputation',
      icon: Shield,
      title: 'Enhanced Reputation',
      subtitle: 'Market Leadership',
      description: 'Build market leadership through innovative care delivery and superior patient experience.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]);

  const [contentSection, setContentSection] = useState({
    title: 'Partner with Leading Health Systems',
    description: 'We connect health systems and hospitals with innovative technology solutions to deliver patient-centered care at home. Our platform enables seamless care coordination and improves outcomes while reducing costs.'
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
          // Split the title properly - the CMS stores the full title
          const fullTitle = heroData.title || 'Transform Your Health System';
          const parts = fullTitle.split(' Your ');
          const newHeroContent = {
            title: parts[0] + ' Your',  // "Transform Your"
            highlightedText: parts[1] || 'Health System',  // "Health System"
            description: heroData.description || 'Partner with us to expand care delivery, improve outcomes, and prepare for the future of healthcare',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          console.log('Setting new health systems hero content:', newHeroContent);
          setHeroContent(newHeroContent);
        } else {
          console.log('No health systems hero content found or error:', heroError);
        }

        // Load mobile content for ContentSection and services
        const { data: mobileData, error: mobileError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'health_systems_mobile')
          .eq('is_active', true)
          .maybeSingle();

        if (mobileData && !mobileError) {
          console.log('Loaded health systems mobile content:', mobileData);

          // Update content section with database content
          setContentSection({
            title: mobileData.title || 'Partner with Leading Health Systems',
            description: mobileData.description || 'We connect health systems and hospitals with innovative technology solutions to deliver patient-centered care at home. Our platform enables seamless care coordination and improves outcomes while reducing costs.'
          });

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
              console.log('Transformed health systems services:', transformedServices);
            }
          }
        } else {
          console.log('No health systems mobile content found, using defaults');
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

      {services.length > 0 && <TabsSection services={services} />}

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;