import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HealthSystemFeaturesContent {
  title: string;
  subtitle: string;
  features: string[];
  image_url?: string;
}

const HealthSystemFeaturesSection = () => {
  const [content, setContent] = useState<HealthSystemFeaturesContent>({
    title: "Platform Features",
    subtitle: "Comprehensive Technology Suite for Modern Healthcare",
    features: [
      "AI-powered patient-clinician matching for optimal care coordination.",
      "Real-time monitoring and analytics dashboard for operational insights.",
      "Seamless integration with existing EMR and healthcare management systems.",
      "Automated scheduling, billing, and compliance management tools."
    ],
    image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'health_systems_features')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded health system features content:', data);
          setContent({
            title: data.title || content.title,
            subtitle: data.subtitle || content.subtitle,
            features: (data.content_data as any)?.features || content.features,
            image_url: (data.content_data as any)?.image_url || content.image_url
          });
        }
      } catch (error) {
        console.error('Error loading health system features content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('health-systems-features-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.health_systems_features'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-green-50/50 to-blue-50/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-1 lg:order-1 relative group">
            <div className="aspect-square overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl relative">
              <img 
                src={content.image_url} 
                alt="Healthcare technology platform"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-green-600/20 to-transparent rounded-full blur-2xl" />
          </div>
          <div className="order-2 lg:order-2">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl font-apple">{content.title}</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-6 lg:mb-8" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              {content.subtitle}
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 lg:space-x-4 group">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-full flex items-center justify-center mt-1 group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-apple">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthSystemFeaturesSection;