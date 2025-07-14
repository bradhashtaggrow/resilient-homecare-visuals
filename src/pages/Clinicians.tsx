
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import ServicesGrid from '@/components/services/ServicesGrid';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Clinicians = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Enabling',
    highlightedText: 'seamless referrals',
    background_video_url: ''
  });
  
  const [services, setServices] = useState([
    // Fallback services in case database doesn't load
    {
      id: 'work-with-hospitals',
      icon: Building2,
      title: 'Work with leading hospitals',
      subtitle: 'Partnership Excellence',
      description: 'Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'steady-patient-flow',
      icon: Users,
      title: 'Get access to a consistent stream of patient referrals',
      subtitle: 'Steady Patient Flow',
      description: 'Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'comprehensive-home-care',
      icon: Heart,
      title: 'Support care delivery for inpatient at home and outpatient at home services',
      subtitle: 'Comprehensive Home Care',
      description: 'Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'streamlined-operations',
      icon: Zap,
      title: 'Simplified workflows and credentialing through our platform',
      subtitle: 'Streamlined Operations',
      description: 'Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'simple-payment-model',
      icon: CheckCircle,
      title: 'We pay you per visit so no need to worry about administrative burden',
      subtitle: 'Simple Payment Model',
      description: 'Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]);

  // Available icons mapping
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
    console.log('Clinicians page - Loading content...');
    
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData, error: heroError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'clinicians_hero')
          .eq('is_active', true)
          .single();

        if (heroData && !heroError) {
          console.log('Loaded clinicians hero content:', heroData);
          setHeroContent({
            title: heroData.title || 'Enabling',
            highlightedText: heroData.subtitle || 'seamless referrals',
            background_video_url: heroData.background_video_url || 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
          });
        }


        // Load services content
        const { data: servicesData, error: servicesError } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'clinicians_mobile')
          .eq('is_active', true)
          .single();

        if (servicesData && !servicesError) {
          console.log('Loaded clinicians services content:', servicesData);

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
              console.log('Transformed clinicians services:', transformedServices);
            }
          }
        } else {
          console.log('No clinicians services content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading clinicians content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription for all clinicians sections
    const channel = supabase
      .channel('clinicians-all-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=in.(clinicians_hero,clinicians_mobile)'
      }, (payload) => {
        console.log('Real-time clinicians content change:', payload);
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        backgroundVideoUrl={heroContent.background_video_url}
      />

      <ContentSection 
        title="Clinicians"
        description="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      <ServicesGrid services={services} />

      <LeadGenSection />
    </div>
  );
};

export default Clinicians;
