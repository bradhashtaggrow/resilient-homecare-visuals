
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface HospitalBenefitsContent {
  title: string;
  subtitle: string;
  benefits: string[];
  images: string[];
}

const HospitalBenefitsSection = () => {
  const [content, setContent] = useState<HospitalBenefitsContent>({
    title: "For Hospitals",
    subtitle: "Expand Home-Based Care Without Disrupting Workflows",
    benefits: [],
    images: []
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
        .eq('section_key', 'about_for_hospitals')
        .eq('is_active', true)
        .single();

      if (data && data.content_data) {
        setContent({
          title: data.title || "For Hospitals",
          subtitle: data.subtitle || "Expand Home-Based Care Without Disrupting Workflows",
          benefits: data.content_data.benefits || [],
          images: data.content_data.images || []
        });
      }
    } catch (error) {
      console.error('Error loading hospital benefits content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('hospital-benefits-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_for_hospitals'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-black tracking-tight font-apple mb-4" 
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
              {content.title}
            </h2>
            <p className="text-gray-600 font-apple font-medium tracking-wide mb-8"
               style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.4 }}>
              {content.subtitle}
            </p>
            
            <div className="space-y-4">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 font-apple leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {content.images.map((image, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <p className="text-blue-800 font-apple font-medium">{image}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefitsSection;
