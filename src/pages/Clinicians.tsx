
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import { Building2, Heart, Users, Shield, CheckCircle, Activity, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Clinicians = () => {
  const [content, setContent] = useState({
    title: "The Future of Care",
    subtitle: "Experience healthcare like never before",
    description: "Every interaction reimagined."
  });
  const [services, setServices] = useState([]);

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
    // Load content from database
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'clinicians_mobile')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded clinicians content:', data);
          
          setContent({
            title: data.title || "The Future of Care",
            subtitle: data.subtitle || "Experience healthcare like never before",
            description: data.description || "Every interaction reimagined."
          });

          // Transform tabs data to services format
          if (data.content_data && typeof data.content_data === 'object' && data.content_data !== null) {
            const contentData = data.content_data as any;
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
          console.log('No clinicians content found, using defaults');
        }
      } catch (error) {
        console.error('Error loading clinicians content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('clinicians-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.clinicians_mobile'
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
        title="Enabling"
        highlightedText="seamless referrals"
      />

      <ContentSection 
        title="Clinicians"
        description="We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
      />

      {services.length > 0 && <TabsSection services={services} />}

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Clinicians;
