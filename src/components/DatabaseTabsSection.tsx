import React, { useState, useEffect } from 'react';
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

interface DatabaseTabsSectionProps {
  sectionKey: string;
}

const DatabaseTabsSection: React.FC<DatabaseTabsSectionProps> = ({ sectionKey }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState('');

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
          if (contentData.services && Array.isArray(contentData.services)) {
            setServices(contentData.services);
            setActiveTab(contentData.services[0]?.id || '');
          }
        }
      } catch (error) {
        console.error('Error loading services from database:', error);
      }
    };

    loadContent();

    const channel = supabase
      .channel(`tabs-changes-${sectionKey}`)
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
      blue: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      green: 'text-green-600 bg-green-50 hover:bg-green-100',
      purple: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      orange: 'text-orange-600 bg-orange-50 hover:bg-orange-100',
      teal: 'text-teal-600 bg-teal-50 hover:bg-teal-100',
      red: 'text-red-600 bg-red-50 hover:bg-red-100'
    };
    return colorMap[color] || 'text-blue-600 bg-blue-50 hover:bg-blue-100';
  };

  if (services.length === 0) {
    return null;
  }

  const activeService = services.find(service => service.id === activeTab);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => {
            const IconComponent = getIconComponent(service.icon);
            const isActive = activeTab === service.id;
            
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`
                  px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-3
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                <IconComponent className="h-5 w-5" />
                <span className="font-semibold">{service.title.split(' ').slice(0, 2).join(' ')}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeService && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <div className={`w-16 h-16 rounded-xl ${getColorClasses(activeService.color)} flex items-center justify-center mb-6`}>
                  {React.createElement(getIconComponent(activeService.icon), { className: "h-8 w-8" })}
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {activeService.title}
                </h3>
                
                <p className="text-blue-600 font-medium text-lg mb-6">
                  {activeService.subtitle}
                </p>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {activeService.description}
                </p>
                
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 self-start">
                  Learn More
                </button>
              </div>
              
              {/* Image */}
              {activeService.patient_image_url && (
                <div className="relative">
                  <img 
                    src={activeService.patient_image_url}
                    alt={`${activeService.title} service`}
                    className="w-full h-full object-cover min-h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DatabaseTabsSection;