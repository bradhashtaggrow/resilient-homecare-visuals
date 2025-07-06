import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Activity, Heart, Building2, Users, Shield, CheckCircle, LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string; 
  description: string;
  color: string;
  patient_image_url?: string;
}

interface DatabaseServicesGridProps {
  sectionKey: string;
}

const DatabaseServicesGrid: React.FC<DatabaseServicesGridProps> = ({ sectionKey }) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', sectionKey)
          .eq('is_active', true)
          .single();

        if (data && !error && data.content_data) {
          const contentData = data.content_data as any;
          setServices(contentData.services || []);
        }
      } catch (error) {
        console.error('Error loading services from database:', error);
      }
    };

    loadContent();

    const channel = supabase
      .channel(`services-changes-${sectionKey}`)
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
  }, [sectionKey]);

  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Activity,
      Heart,
      Building2,
      Users,
      Shield,
      CheckCircle
    };
    return iconMap[iconName] || Activity;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-600 bg-blue-50',
      green: 'text-green-600 bg-green-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50',
      teal: 'text-teal-600 bg-teal-50',
      red: 'text-red-600 bg-red-50'
    };
    return colorMap[color] || 'text-blue-600 bg-blue-50';
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <div key={service.id || index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-xl ${getColorClasses(service.color)} flex items-center justify-center mb-6`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                {service.subtitle && (
                  <p className="text-blue-600 font-medium mb-4">
                    {service.subtitle}
                  </p>
                )}
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                {service.patient_image_url && (
                  <div className="w-full h-48 rounded-xl overflow-hidden">
                    <img 
                      src={service.patient_image_url}
                      alt={`${service.title} service`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DatabaseServicesGrid;