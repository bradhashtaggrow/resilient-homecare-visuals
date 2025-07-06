import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContentSectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface DatabaseContentSectionProps {
  sectionKey: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

const DatabaseContentSection: React.FC<DatabaseContentSectionProps> = ({ 
  sectionKey,
  defaultTitle = 'Default Title',
  defaultDescription = 'Default description text.'
}) => {
  const [content, setContent] = useState<ContentSectionContent>({
    title: defaultTitle,
    description: defaultDescription
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', sectionKey)
          .eq('is_active', true)
          .single();

        if (data && !error) {
          setContent({
            title: data.title || defaultTitle,
            subtitle: data.subtitle,
            description: data.description || defaultDescription
          });
        }
      } catch (error) {
        console.error('Error loading content from database:', error);
      }
    };

    loadContent();

    const channel = supabase
      .channel(`content-changes-${sectionKey}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: `section_key=eq.${sectionKey}`
      }, (payload) => {
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sectionKey, defaultTitle, defaultDescription]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-black tracking-tight font-apple mb-6" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {content.title}
          </h2>
          {content.subtitle && (
            <h3 className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              {content.subtitle}
            </h3>
          )}
          <p className="text-gray-600 leading-relaxed font-apple font-medium tracking-wide"
             style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1.4 }}>
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DatabaseContentSection;