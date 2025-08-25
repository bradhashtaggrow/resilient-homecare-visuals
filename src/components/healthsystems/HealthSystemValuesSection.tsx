import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, Users, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const iconMap = {
  Shield,
  TrendingUp, 
  Users,
  Award,
};

const HealthSystemValuesSection = () => {
  const [content, setContent] = useState({
    title: 'Our Commitment to Health Systems',
    subtitle: 'The principles that guide our partnership approach to transforming healthcare delivery',
    values: [
      {
        title: "Security & Compliance",
        description: "HIPAA-compliant platform with enterprise-grade security to protect patient data and organizational integrity.",
        icon_name: "Shield",
      },
      {
        title: "Scalable Growth",
        description: "Technology that grows with your organization, supporting expansion without compromising performance or quality.",
        icon_name: "TrendingUp",
      },
      {
        title: "Partnership Focus", 
        description: "We work as an extension of your team, providing dedicated support throughout implementation and beyond.",
        icon_name: "Users",
      },
      {
        title: "Proven Excellence",
        description: "Track record of successful implementations with measurable improvements in patient outcomes and satisfaction.",
        icon_name: "Award",
      }
    ]
  });

  useEffect(() => {
    const loadContent = async () => {
      const { data } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'health_systems_values')
        .eq('is_active', true)
        .single();

      if (data) {
        const contentData = data.content_data as any;
        setContent({
          title: data.title || content.title,
          subtitle: data.subtitle || content.subtitle,
          values: contentData?.values || content.values
        });
      }
    };

    loadContent();

    const channel = supabase
      .channel('health-systems-values-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.health_systems_values' },
        () => loadContent()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.values.map((value, index) => {
            const IconComponent = iconMap[value.icon_name as keyof typeof iconMap] || Shield;
            
            return (
              <div key={index} className="group text-center bg-white rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 lg:hover:-translate-y-4 border border-gray-100">
                <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto mb-6 lg:mb-8 bg-gradient-to-br from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] rounded-2xl lg:rounded-3xl flex items-center justify-center group-hover:from-[hsl(214,100%,65%)] group-hover:to-[hsl(214,100%,50%)] transition-all duration-300">
                  <IconComponent className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-apple text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthSystemValuesSection;