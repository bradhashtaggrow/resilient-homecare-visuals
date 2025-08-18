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
          .maybeSingle();

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
          const benefitsWithIcons = benefitItems.map(item => ({
            ...item,
            icon: iconMap[item.icon_name] || CheckCircle
          }));
          setBenefits(benefitsWithIcons);
        }

      } catch (error) {
        console.error('Error loading health systems content:', error);
      }
    };

    loadContent();

    // Set up real-time subscriptions for CMS updates
    const websiteContentChannel = supabase
      .channel('health-systems-website-content')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=like.health_systems_%'
      }, (payload) => {
        console.log('Health Systems website content changed:', payload);
        loadContent();
      })
      .subscribe();

    const itemsChannel = supabase
      .channel('health-systems-items')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'health_systems_items'
      }, (payload) => {
        console.log('Health Systems items changed:', payload);
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(websiteContentChannel);
      supabase.removeChannel(itemsChannel);
    };
  }, []);

  const { elementRef: burningPlatformRef } = useIntersectionObserver({
    threshold: 0.1,
  });

  const { elementRef: benefitsRef } = useIntersectionObserver({
    threshold: 0.1,
  });

  const burningPlatformContent = sectionContent['health_systems_burning_platform'] || {
    title: 'The Challenge Health Systems Face Today',
    subtitle: 'Traditional healthcare delivery models are under unprecedented pressure',
    description: 'Rising costs, staff shortages, and patient demands for convenient care create an urgent need for innovative solutions.'
  };

  const benefitsContent = sectionContent['health_systems_benefits'] || {
    title: 'Why Leading Health Systems Choose Resilient Healthcare',
    subtitle: 'Transform your care delivery with our comprehensive platform',
    description: 'Join the healthcare revolution and deliver exceptional patient outcomes while reducing costs and improving efficiency.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section with background video */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {heroContent.backgroundVideoUrl && (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src={heroContent.backgroundVideoUrl} type="video/mp4" />
          </video>
        )}
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent z-10"></div>
        
        <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {heroContent.title}{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {heroContent.highlightedText}
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed max-w-4xl mx-auto">
            {heroContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Schedule a Demo
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Burning Platform Section */}
      <section 
        ref={burningPlatformRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-orange-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {burningPlatformContent.title}
            </h2>
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              {burningPlatformContent.subtitle}
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {burningPlatformContent.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {burningPlatformItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={item.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className={`w-12 h-12 ${item.gradient_class} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {benefitsContent.title}
            </h2>
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              {benefitsContent.subtitle}
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {benefitsContent.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={benefit.id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className={`w-12 h-12 ${benefit.gradient_class} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;