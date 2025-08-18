import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import { TrendingUp, Building, DollarSign, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const HealthSystems = () => {
  const { isListening } = useWebsiteSync();
  
  const [heroContent, setHeroContent] = useState({
    title: 'Transform Your',
    highlightedText: 'Health System',
    description: 'Partner with us to expand care delivery, improve outcomes, and prepare for the future of healthcare',
    backgroundVideoUrl: ''
  });

  const [burningPlatformItems, setBurningPlatformItems] = useState<any[]>([]);

  const [benefits, setBenefits] = useState<any[]>([]);
  const [sectionContent, setSectionContent] = useState<any>({});

  // Icon mapping
  const iconMap: { [key: string]: any } = {
    TrendingUp,
    Building, 
    DollarSign,
    Zap,
    CheckCircle,
    // Add other icons as needed
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
          .single();

        if (heroData && !heroError) {
          console.log('Loaded health systems hero content:', heroData);
          const fullTitle = heroData.title || 'Transform Your Health System';
          const parts = fullTitle.split(' Your ');
          const newHeroContent = {
            title: parts[0] + ' Your',
            highlightedText: parts[1] || 'Health System',
            description: heroData.description || 'Partner with us to expand care delivery, improve outcomes, and prepare for the future of healthcare',
            backgroundVideoUrl: heroData.background_video_url || ''
          };
          setHeroContent(newHeroContent);
        }

        // Load section content
        const { data: sections } = await supabase
          .from('website_content')
          .select('*')
          .in('section_key', ['health_systems_burning_platform', 'health_systems_benefits', 'health_systems_cta'])
          .eq('is_active', true);

        if (sections) {
          const sectionsMap: any = {};
          sections.forEach(section => {
            sectionsMap[section.section_key] = section;
          });
          setSectionContent(sectionsMap);
        }

        // Load burning platform items
        const { data: burningPlatform } = await supabase
          .from('health_systems_items')
          .select('*')
          .eq('section_type', 'burning_platform')
          .eq('is_active', true)
          .order('display_order');

        if (burningPlatform) {
          const itemsWithIcons = burningPlatform.map(item => ({
            ...item,
            icon: iconMap[item.icon_name] || TrendingUp
          }));
          setBurningPlatformItems(itemsWithIcons);
        }

        // Load benefits
        const { data: benefitItems } = await supabase
          .from('health_systems_items')
          .select('*')
          .eq('section_type', 'benefit')
          .eq('is_active', true)
          .order('display_order');

        if (benefitItems) {
          setBenefits(benefitItems);
        }

      } catch (error) {
        console.error('Error loading health systems content:', error);
      }
    };

    loadContent();

    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && data.section_key?.startsWith('health_systems')) {
        console.log('Health systems content updated via real-time sync:', data);
        loadContent();
      } else if (table === 'health_systems_items') {
        console.log('Health systems items updated via real-time sync:', data);
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

      {/* Burning Platform Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-black tracking-tight font-apple mb-6" 
                style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
              {sectionContent.health_systems_burning_platform?.title || 'Why Partner with Us?'}
            </h2>
            <p className="text-gray-600 leading-relaxed font-apple font-medium tracking-wide max-w-3xl mx-auto"
               style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', lineHeight: 1.4 }}>
              {sectionContent.health_systems_burning_platform?.description || 'Healthcare is evolving rapidly. Position your health system for success with our comprehensive platform.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {burningPlatformItems.map((item, index) => {
              const { elementRef, isVisible } = useIntersectionObserver({
                threshold: 0.2,
                triggerOnce: true
              });

              return (
                <div 
                  key={item.title}
                  ref={elementRef as any}
                  className={`group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
                  }}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${item.gradient_class || item.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-apple">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-apple font-medium text-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-black tracking-tight font-apple mb-8" 
                  style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
                {sectionContent.health_systems_benefits?.title || 'Built for Success'}
              </h2>
              <p className="text-gray-600 leading-relaxed font-apple font-medium mb-8"
                 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', lineHeight: 1.5 }}>
                {sectionContent.health_systems_benefits?.description || 'Our platform is designed specifically for health systems looking to expand their reach and improve patient outcomes through innovative care delivery models.'}
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const { elementRef, isVisible } = useIntersectionObserver({
                    threshold: 0.8,
                    triggerOnce: true
                  });

                  return (
                    <div 
                      key={benefit.id || index}
                      ref={elementRef as any}
                      className={`flex items-center space-x-4 transition-all duration-500 ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-gray-700 font-apple font-medium text-lg">
                        {benefit.title || benefit}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-6">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-apple">
                    {sectionContent.health_systems_cta?.title || 'Ready to Transform Healthcare Delivery?'}
                  </h3>
                  <p className="text-gray-600 font-apple font-medium mb-6 text-lg leading-relaxed">
                    {sectionContent.health_systems_cta?.description || 'Join leading health systems already using our platform to deliver exceptional care at home and improve patient outcomes.'}
                  </p>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
                    <p className="text-3xl font-bold text-gray-900 mb-2">98%</p>
                    <p className="text-gray-600 font-apple font-medium">
                      Patient satisfaction rate with our care delivery model
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;