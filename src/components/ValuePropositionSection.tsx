
import React, { useEffect, useState } from 'react';
import { Building2, Database, Users, Target, TrendingUp, Heart, Activity, Shield, Award, MapPin, CheckCircle, Zap, Clock, BarChart3, Lock, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ValuePropContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface ValuePropFeature {
  id: string;
  title: string;
  subtitle?: string;
  subtitle2?: string;
  description?: string;
  icon_name: string;
  display_order: number;
}

const ValuePropositionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ValuePropContent>({
    title: 'We manage the work. You own the program.',
    subtitle: '',
    description: ''
  });
  const [features, setFeatures] = useState<ValuePropFeature[]>([]);

  // Available icons mapping
  const availableIcons = {
    Activity,
    Heart,
    Building2,
    TrendingUp,
    Shield,
    Target,
    Award,
    Users,
    MapPin,
    CheckCircle,
    Zap,
    Clock,
    BarChart3,
    Database,
    Lock,
    BookOpen
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent || Target;
  };

  useEffect(() => {
    // Load value proposition content from database
    const loadValuePropContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'value_proposition')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded value proposition content from database:', data);
          
          setContent({
            title: data.title || 'We manage the work. You own the program.',
            subtitle: data.subtitle || '',
            description: data.description || ''
          });

          // Load features from content_data
          if (data.content_data && typeof data.content_data === 'object' && data.content_data !== null) {
            const contentData = data.content_data as any;
            if (contentData.features) {
              setFeatures(contentData.features);
            }
          }
        } else {
          console.log('No value proposition content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading value proposition content from database:', error);
      }
    };

    loadValuePropContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('value-prop-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.value_proposition'
      }, (payload) => {
        console.log('Real-time value proposition content change:', payload);
        loadValuePropContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('value-proposition-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Enhanced 3D Animated Icon Component with Correct Blue Gradient
  const AnimatedIcon3D = ({ icon: Icon, delay = 0 }) => {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 perspective-1000">
        <div 
          className={`
            w-full h-full rounded-xl sm:rounded-2xl 
            bg-gradient-to-br from-[#0080ff] to-[#0066cc]
            flex items-center justify-center cursor-pointer
            transform-3d transition-all duration-700 ease-out
            shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/70
            hover:scale-110 hover:-translate-y-3 hover:rotate-y-12 hover:rotate-x-6
            before:absolute before:inset-0 before:rounded-xl sm:before:rounded-2xl before:bg-gradient-to-r 
            before:from-white/20 before:to-transparent before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            relative overflow-hidden group
          `}
          style={{ 
            animationDelay: `${delay}ms`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  };

  return (
    <section id="value-proposition-section" className="py-16 sm:py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Header with Better Mobile Typography */}
        <div className={`text-center mb-12 sm:mb-20 transition-all duration-1200 transform ${
          isVisible ? 'animate-swoop-in opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-black leading-none tracking-tight font-black mb-6 sm:mb-8 hover:scale-105 transition-transform duration-700"
              style={{ fontSize: 'clamp(1.5rem, 6vw, 8rem)', fontWeight: 900, lineHeight: 0.85 }}>
            <span className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent hover:from-[#1a8cff] hover:to-[#0073e6] transition-all duration-500">
              {content.title?.split('.')[0]}.
            </span>
            <span className="block text-gray-900 hover:text-gray-800 transition-colors duration-500">
              {content.title?.split('.').slice(1).join('.') || 'You own the program.'}
            </span>
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          )}
          {content.description && (
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mt-4">
              {content.description}
            </p>
          )}
        </div>

  {/* Enhanced Value Propositions Grid with Glow Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon_name);
            return (
              <div 
                key={feature.id}
                className={`text-center transition-all duration-1200 transform ${
                  isVisible ? 'animate-swoop-in opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{animationDelay: `${index * 300}ms`}}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 hover-lift h-full hover:shadow-2xl hover:scale-105 transition-all duration-500 group relative overflow-hidden">
                  {/* Glow Animation Overlay */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0080ff]/20 to-[#0066cc]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,128,255,0.3)] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Enhanced 3D Animated Icon */}
                    <AnimatedIcon3D icon={IconComponent} delay={index * 200} />
                    
                    {/* Enhanced Title and Subtitles with Mobile Typography */}
                    <div className="mb-4 sm:mb-6">
                      <h3 className="text-gray-900 leading-none tracking-tight font-black mb-2 group-hover:bg-gradient-to-r group-hover:from-[#0080ff] group-hover:to-[#0066cc] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                          style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
                        {feature.title}
                      </h3>
                      {feature.subtitle && (
                        <p className="text-gray-900 leading-none tracking-tight font-black mb-1 group-hover:bg-gradient-to-r group-hover:from-[#0080ff] group-hover:to-[#0066cc] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                           style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                          {feature.subtitle}
                        </p>
                      )}
                      {feature.subtitle2 && (
                        <p className="text-gray-900 leading-none tracking-tight font-black group-hover:bg-gradient-to-r group-hover:from-[#0080ff] group-hover:to-[#0066cc] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                           style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', fontWeight: 900, lineHeight: 0.9 }}>
                          {feature.subtitle2}
                        </p>
                      )}
                    </div>

                    {/* Enhanced Description with Hover Effects */}
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg group-hover:text-gray-900 transition-colors duration-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;
