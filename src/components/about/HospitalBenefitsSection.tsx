
import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface HospitalContent {
  title: string;
  subtitle: string;
  benefits: string[];
  image_url?: string;
}

const HospitalBenefitsSection = () => {
  const [content, setContent] = useState<HospitalContent>({
    title: "For Hospitals",
    subtitle: "Expand Home-Based Care Without Disrupting Workflows",
    benefits: [
      "Reduce readmissions while optimizing care efficiency.",
      "Scale hospital-at-home services with on-demand contract clinicians.",
      "Maintain/improve profitability with AI-driven automation."
    ]
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'about_for_hospitals')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded hospital content:', data);
          setContent({
            title: data.title || "For Hospitals",
            subtitle: data.subtitle || "Expand Home-Based Care Without Disrupting Workflows",
            benefits: (data.content_data as any)?.benefits || [],
            image_url: (data.content_data as any)?.image_url
          });
        }
      } catch (error) {
        console.error('Error loading hospital content:', error);
      }
    };

    loadContent();

    // Listen for real-time updates via global content sync system
    const handleContentUpdate = (event: CustomEvent) => {
      const { table, data } = event.detail;
      if (table === 'website_content' && data.section_key === 'about_for_hospitals') {
        console.log('Hospital content updated via real-time sync:', data);
        loadContent();
      }
    };

    window.addEventListener('content-sync-update', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('content-sync-update', handleContentUpdate as EventListener);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4 flex-shrink-0">
                <Building2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <span className="text-blue-600 font-bold text-lg sm:text-xl font-apple">{content.title}</span>
            </div>
            <h2 className="font-black tracking-tight font-apple mb-6 lg:mb-8" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              {content.subtitle}
            </h2>
            <div className="space-y-4 lg:space-y-6">
              {content.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 lg:space-x-4 group">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-full flex items-center justify-center mt-1 group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)] transition-all duration-300">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-apple">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative group">
            <div className="aspect-square overflow-hidden rounded-2xl lg:rounded-3xl shadow-2xl relative">
              <img 
                src={content.image_url || "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt="Hospital technology"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefitsSection;
