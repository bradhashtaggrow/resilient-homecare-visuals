
import React, { useEffect, useState } from 'react';
import { Zap, Building2, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_name: string;
}

interface WhyResilientContent {
  title: string;
  subtitle: string;
  pillars: Pillar[];
}

const WhyResilientSection = () => {
  const [content, setContent] = useState<WhyResilientContent>({
    title: "Why Choose Resilient?",
    subtitle: "Three core pillars that make us the leader in home-based healthcare solutions",
    pillars: []
  });

  useEffect(() => {
    loadContent();
    setupRealtimeSubscription();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'about_why_choose')
        .eq('is_active', true)
        .single();

      if (data && data.content_data) {
        setContent({
          title: data.title || "Why Choose Resilient?",
          subtitle: data.subtitle || "Three core pillars that make us the leader in home-based healthcare solutions",
          pillars: data.content_data.pillars || []
        });
      }
    } catch (error) {
      console.error('Error loading why resilient content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('why-resilient-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_why_choose'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="h-8 w-8 text-blue-600" />;
      case 'Building2':
        return <Building2 className="h-8 w-8 text-blue-600" />;
      case 'Users':
        return <Users className="h-8 w-8 text-blue-600" />;
      default:
        return <Zap className="h-8 w-8 text-blue-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-black tracking-tight font-apple mb-4" 
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {content.title}
          </h2>
          <p className="text-gray-600 font-apple font-medium tracking-wide max-w-3xl mx-auto"
             style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.4 }}>
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.pillars.map((pillar) => (
            <div key={pillar.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="mb-6">
                {getIcon(pillar.icon_name)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-apple">
                {pillar.title}
              </h3>
              <p className="text-gray-600 font-apple leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyResilientSection;
