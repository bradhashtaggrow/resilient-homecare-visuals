
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
  const [heroContent, setHeroContent] = useState({
    title: "Enabling",
    highlightedText: "seamless referrals",
    description: "Transform healthcare delivery with our comprehensive referral platform designed for clinicians and healthcare agencies.",
    buttonText: "Learn More",
    buttonUrl: "#services"
  });
  
  const [servicesContent, setServicesContent] = useState({
    title: "Clinicians",
    description: "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable."
  });

  const [services, setServices] = useState([]);
  const [footerContent, setFooterContent] = useState({
    title: "Join 500+ Healthcare Organizations",
    subtitle: "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
    buttonText: "Contact Us",
    buttonUrl: "/contact"
  });

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
    loadAllContent();

    // Set up real-time subscription for all clinicians content
    const channel = supabase
      .channel('clinicians-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=in.(clinicians_hero,clinicians_services,clinicians_footer)'
      }, (payload) => {
        console.log('Real-time clinicians content change:', payload);
        loadAllContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadAllContent = async () => {
    try {
      // Load all clinicians content in one query
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .in('section_key', ['clinicians_hero', 'clinicians_services', 'clinicians_footer'])
        .eq('is_active', true);

      if (error) {
        console.error('Error loading clinicians content:', error);
        return;
      }

      if (data) {
        data.forEach((section) => {
          console.log(`Loaded ${section.section_key} content:`, section);
          
          switch (section.section_key) {
            case 'clinicians_hero':
              setHeroContent({
                title: section.title || "Enabling",
                highlightedText: section.subtitle || "seamless referrals",
                description: section.description || "Transform healthcare delivery with our comprehensive referral platform designed for clinicians and healthcare agencies.",
                buttonText: section.button_text || "Learn More",
                buttonUrl: section.button_url || "#services"
              });
              break;
              
            case 'clinicians_services':
              setServicesContent({
                title: section.title || "Clinicians",
                description: section.description || "We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home."
              });

              // Transform tabs data to services format
              if (section.content_data && typeof section.content_data === 'object' && section.content_data !== null) {
                const contentData = section.content_data as any;
                if (contentData.tabs && Array.isArray(contentData.tabs)) {
                  const transformedServices = contentData.tabs.map((tab: any) => ({
                    id: tab.id || `tab-${Math.random()}`,
                    icon: getIconComponent(tab.icon_name || 'Building2'),
                    title: tab.title || 'Service',
                    subtitle: tab.subtitle || '',
                    description: tab.description || '',
                    color: "blue",
                    patient_image_url: tab.image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                  }));
                  setServices(transformedServices);
                }
              }
              break;
              
            case 'clinicians_footer':
              setFooterContent({
                title: section.title || "Join 500+ Healthcare Organizations",
                subtitle: section.subtitle || "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
                buttonText: section.button_text || "Contact Us",
                buttonUrl: section.button_url || "/contact"
              });
              break;
          }
        });
      }
    } catch (error) {
      console.error('Error loading clinicians content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        description={heroContent.description}
        buttonText={heroContent.buttonText}
        buttonUrl={heroContent.buttonUrl}
      />

      <ContentSection 
        title={servicesContent.title}
        description={servicesContent.description}
      />

      {services.length > 0 && <TabsSection services={services} />}

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {footerContent.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            {footerContent.subtitle}
          </p>
          <a
            href={footerContent.buttonUrl}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            {footerContent.buttonText}
          </a>
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default Clinicians;
