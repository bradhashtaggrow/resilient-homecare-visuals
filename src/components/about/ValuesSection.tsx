
import React, { useEffect, useState } from 'react';
import { Heart, Award, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Value {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

interface ValuesContent {
  title: string;
  subtitle: string;
  values: Value[];
}

const ValuesSection = () => {
  const [content, setContent] = useState<ValuesContent>({
    title: "Our Core Values",
    subtitle: "The principles that guide everything we do in transforming healthcare delivery",
    values: []
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
        .eq('section_key', 'about_values')
        .eq('is_active', true)
        .single();

      if (data && data.content_data) {
        setContent({
          title: data.title || "Our Core Values",
          subtitle: data.subtitle || "The principles that guide everything we do in transforming healthcare delivery",
          values: data.content_data.values || []
        });
      }
    } catch (error) {
      console.error('Error loading values content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('values-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_values'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="h-12 w-12 text-blue-600" />;
      case 'Award':
        return <Award className="h-12 w-12 text-blue-600" />;
      case 'Lightbulb':
        return <Lightbulb className="h-12 w-12 text-blue-600" />;
      default:
        return <Heart className="h-12 w-12 text-blue-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
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
          {content.values.map((value) => (
            <div key={value.id} className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300">
                  {getIcon(value.icon_name)}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-apple">
                {value.title}
              </h3>
              <p className="text-gray-600 font-apple leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
