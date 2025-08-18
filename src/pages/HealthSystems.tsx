import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { TrendingUp, Building, DollarSign, Zap, Heart, CheckCircle, ArrowRight, Users, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

// Custom sections for Health Systems page
const BurningPlatformSection = () => {
  const items = [
    {
      icon: Heart,
      title: "Improving Outcomes",
      description: "Enhanced patient care delivery and satisfaction through innovative home-based healthcare solutions that put patients first."
    },
    {
      icon: Building,
      title: "Expanding Services",
      description: "Broaden your service offerings and reach more patients in their preferred care environment with comprehensive solutions."
    },
    {
      icon: DollarSign,
      title: "Growing Revenue",
      description: "Increase revenue streams while reducing operational costs through efficient care delivery models and optimized workflows."
    },
    {
      icon: Zap,
      title: "Preparing for Shifting Payment Models",
      description: "Stay ahead of evolving healthcare payment structures and reimbursement changes with adaptive technology platforms."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            The Challenges <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Health Systems Face</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform these critical challenges into competitive advantages with our comprehensive platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HealthSystemBenefitsSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Improved Patient Outcomes",
      description: "Deliver personalized care that leads to better health results and higher patient satisfaction scores."
    },
    {
      icon: TrendingUp,
      title: "Operational Efficiency",
      description: "Streamline workflows and reduce administrative burden while increasing productivity across departments."
    },
    {
      icon: Shield,
      title: "Enhanced Reputation",
      description: "Build market leadership through innovative care delivery and superior patient experience."
    },
    {
      icon: Users,
      title: "Scalable Growth",
      description: "Expand your care delivery network without proportional increases in infrastructure investment."
    },
    {
      icon: ArrowRight,
      title: "Future-Ready Technology",
      description: "Stay ahead with cutting-edge healthcare technology that adapts to evolving industry needs."
    },
    {
      icon: Building,
      title: "Comprehensive Support",
      description: "Full-service platform with training, implementation, and ongoing support for seamless integration."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Why Leading <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Health Systems</span> Choose Us
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform your care delivery with proven results and comprehensive support
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HealthSystemsValueSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Commitment</span> to Excellence
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Dedicated to transforming healthcare delivery through innovation, partnership, and unwavering commitment to patient outcomes
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Patient-Centered Care</h3>
                  <p className="text-slate-600">Every solution is designed with the patient experience at the forefront.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Proven Results</h3>
                  <p className="text-slate-600">Track record of successful implementations and improved outcomes.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Continuous Innovation</h3>
                  <p className="text-slate-600">Constantly evolving technology to meet changing healthcare needs.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Transform Your Health System?</h3>
              <p className="text-slate-600 mb-6">Join leading health systems who are already delivering exceptional care at home with our comprehensive platform.</p>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

      <BurningPlatformSection />
      <HealthSystemBenefitsSection />
      <HealthSystemsValueSection />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;