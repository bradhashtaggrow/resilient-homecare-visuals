
import React, { useState, useEffect } from 'react';
import { Brain, Building2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WhyChooseFeature {
  title: string;
  description: string;
  icon: string;
  image_url?: string;
}

interface WhyChooseContent {
  title: string;
  subtitle: string;
  features: WhyChooseFeature[];
}

const WhyResilientSection = () => {
  const [content, setContent] = useState<WhyChooseContent>({
    title: "Why Choose Resilient?",
    subtitle: "Three core pillars that make us the leader in home-based healthcare solutions",
    features: []
  });

  const getIconComponent = (iconName: string) => {
    const icons = {
      Brain,
      Building2,
      Users,
      Hospital: Building2 // fallback for Hospital icon
    };
    return icons[iconName as keyof typeof icons] || Brain;
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'about_why_choose_resilient')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded why choose content:', data);
          console.log('Content data:', data.content_data);
          console.log('Features:', (data.content_data as any)?.features);
          
          const features = (data.content_data as any)?.features || [];
          console.log('Processed features:', features);
          
          setContent({
            title: data.title || "Why Choose Resilient?",
            subtitle: data.subtitle || "Three core pillars that make us the leader in home-based healthcare solutions",
            features: features
          });
        } else {
          console.error('Error loading why choose content:', error);
        }
      } catch (error) {
        console.error('Error loading why choose content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('why-choose-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_why_choose_resilient'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-black tracking-tight font-apple mb-4 md:mb-6" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {content.title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {content.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            
            return (
              <div key={index} className="group bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-3">
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={feature.image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center mb-4 lg:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-apple leading-tight">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyResilientSection;
