
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ClinicianBenefitsContent {
  title: string;
  subtitle: string;
  benefits: string[];
}

const ClinicianBenefitsSection = () => {
  const [content, setContent] = useState<ClinicianBenefitsContent>({
    title: "For Clinicians",
    subtitle: "More Flexibility, More Earnings, More Patient Impact",
    benefits: []
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
        .eq('section_key', 'about_for_clinicians')
        .eq('is_active', true)
        .single();

      if (data && data.content_data) {
        setContent({
          title: data.title || "For Clinicians",
          subtitle: data.subtitle || "More Flexibility, More Earnings, More Patient Impact",
          benefits: data.content_data.benefits || []
        });
      }
    } catch (error) {
      console.error('Error loading clinician benefits content:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('clinician-benefits-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.about_for_clinicians'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-black tracking-tight font-apple mb-4" 
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
            {content.title}
          </h2>
          <p className="text-gray-600 font-apple font-medium tracking-wide max-w-3xl mx-auto"
             style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', lineHeight: 1.4 }}>
            {content.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="space-y-6">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 font-apple leading-relaxed text-lg">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicianBenefitsSection;
