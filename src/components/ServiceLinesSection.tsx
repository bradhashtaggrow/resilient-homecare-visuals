import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  Activity, Heart, Building2, Users, Stethoscope, Home, Shield, Target, 
  TrendingUp, MapPin, Clock, Zap, Award, CheckCircle, Phone, Wifi, 
  Monitor, Smartphone, Headphones, Video, MessageSquare, Mail, 
  Calendar, FileText, Database, Settings, Globe, Search, Filter,
  BarChart, PieChart, LineChart, Upload, Download, Save, Edit,
  Plus, Minus, X, Check, Star, Flag, Bell, AlertCircle, Ambulance,
  LucideIcon 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { supabase } from '@/integrations/supabase/client';

interface ServiceLinesContent {
  title?: string;
  subtitle?: string;
  description?: string;
}

const ServiceLinesSection = () => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });
  
  const [activeService, setActiveService] = useState(0);
  const [content, setContent] = useState<any>({
    title: 'Fully Streamlined, Uncompromisingly Simple',
    subtitle: '',
    description: 'Three core service lines designed to extend your hospital\'s reach and improve patient outcomes.',
    services: []
  });

  useEffect(() => {
    // Load service lines content from database
    const loadServiceLinesContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'service_lines')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded service lines content from database:', data);
          
          setContent({
            title: data.title || 'Fully Streamlined, Uncompromisingly Simple',
            subtitle: data.subtitle || '',
            description: data.description || 'Three core service lines designed to extend your hospital\'s reach and improve patient outcomes.',
            services: (data.content_data as any)?.services || getDefaultServices()
          });
        } else {
          console.log('No service lines content found in database, using defaults');
          setContent(prev => ({ ...prev, services: getDefaultServices() }));
        }
      } catch (error) {
        console.error('Error loading service lines content from database:', error);
        setContent(prev => ({ ...prev, services: getDefaultServices() }));
      }
    };

    loadServiceLinesContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('service-lines-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.service_lines'
      }, (payload) => {
        console.log('Real-time service lines content change:', payload);
        loadServiceLinesContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getDefaultServices = () => [
    {
      id: 'outpatient-pt',
      icon: 'Activity',
      title: "Outpatient PT Anywhere",
      subtitle: "Home-Based Therapy & Recovery", 
      description: "Hospital-branded physical therapy delivered directly to patients' homes with full technology integration.",
      benefits: [
        { text: "Generate new outpatient therapy revenue", icon: "TrendingUp" },
        { text: "Reduce costly post-acute placements", icon: "Shield" },
        { text: "Improve patient outcomes with early intervention", icon: "Target" },
        { text: "Prepare for value-based care programs", icon: "Award" }
      ],
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'primary-care',
      icon: 'Heart',
      title: "Primary Care at Home",
      subtitle: "Transitional & Rural Care Extension",
      description: "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      benefits: [
        { text: "Extend transitional care management for high-risk patients", icon: "Users" },
        { text: "Expand rural health clinic reach into underserved areas", icon: "MapPin" },
        { text: "Reduce readmissions with targeted follow-up visits", icon: "CheckCircle" }
      ],
      color: "red",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'hospital-at-home',
      icon: 'Building2',
      title: "Acute Hospital-at-Home",
      subtitle: "CMS-Compliant Inpatient Care at Home",
      description: "Full implementation support for hospital-level care delivery in the home environment.",
      benefits: [
        { text: "Complete workflow design & policy development", icon: "Zap" },
        { text: "Staff training & education programs", icon: "Users" },
        { text: "Medicare waiver submission support", icon: "Clock" }
      ],
      note: "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
      color: "cyan",
      patient_image_url: "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const getIconComponent = (iconName: string, isWhite: boolean = false) => {
    const iconMap: Record<string, LucideIcon> = {
      Activity,
      Heart,
      Building2,
      Users,
      Stethoscope,
      Home,
      Shield,
      Target,
      TrendingUp,
      MapPin,
      Clock,
      Zap,
      Award,
      CheckCircle,
      Phone,
      Wifi,
      Monitor,
      Smartphone,
      Headphones,
      Video,
      MessageSquare,
      Mail,
      Calendar,
      FileText,
      Database,
      Settings,
      Globe,
      Search,
      Filter,
      BarChart,
      PieChart,
      LineChart,
      Upload,
      Download,
      Save,
      Edit,
      Plus,
      Minus,
      X,
      Check,
      Star,
      Flag,
      Bell,
      AlertCircle,
      Ambulance
    };
    
    const IconComponent = iconMap[iconName] || Activity;
    // Dynamic color based on active state
    return <IconComponent className={`h-12 w-12 transition-colors duration-300 ${isWhite ? 'text-white' : 'text-blue-600'}`} />;
  };

  const getBenefitIcon = (iconName: string) => {
    const iconMap: Record<string, LucideIcon> = {
      TrendingUp,
      Shield,
      Target,
      Award,
      Users,
      MapPin,
      CheckCircle,
      Zap,
      Clock
    };
    
    return iconMap[iconName] || TrendingUp;
  };

  // 3D Animated Icon Component with proper TypeScript interface
  interface AnimatedIcon3DProps {
    icon: LucideIcon;
    delay?: number;
  }

  const AnimatedIcon3D = React.memo<AnimatedIcon3DProps>(({ icon: Icon, delay = 0 }) => {
    return (
      <div className="w-10 h-10 flex-shrink-0 mt-0.5 perspective-1000">
        <div 
          className={`
            w-full h-full rounded-xl 
            bg-gradient-to-r from-[#0080ff] to-[#0066cc]
            flex items-center justify-center cursor-pointer
            transform-3d transition-all duration-500 ease-out
            shadow-lg shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/50
            hover:scale-110 hover:-translate-y-2 hover:rotate-y-12 hover:rotate-x-6
            before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
            before:from-white/20 before:to-transparent before:opacity-0 
            hover:before:opacity-100 before:transition-opacity before:duration-300
            relative overflow-hidden will-change-transform
          `}
          style={{ 
            animationDelay: `${delay}ms`,
            transformStyle: 'preserve-3d'
          }}
        >
          <Icon className="h-5 w-5 text-white drop-shadow-lg relative z-10" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    );
  });

  const getColorClasses = useCallback((color: string, isActive: boolean) => {
    // All services get the same blue treatment as requested
    return isActive 
      ? 'bg-gradient-to-r from-[#0080ff] to-[#0066cc] text-white shadow-blue-600/25' 
      : 'text-blue-600 bg-blue-50 hover:bg-gradient-to-r hover:from-[#0080ff] hover:to-[#0066cc] hover:text-white';
  }, []);

  return (
    <section 
      ref={elementRef}
      className="py-16 sm:py-24 lg:py-32 bg-white relative overflow-hidden paper-texture-subtle will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header with dynamic content */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 opacity-100 translate-y-0">
          <h2 className="text-black leading-none tracking-tight font-black text-shadow-white mb-6 lg:mb-8"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title?.includes(',') ? (
              <>
                {content.title.split(',')[0]},
                <span className="block bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent relative z-10 pb-2 mt-2">
                  {content.title.split(',').slice(1).join(',').trim()}
                </span>
              </>
            ) : (
              content.title
            )}
          </h2>
          {content.subtitle && (
            <h3 className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-4 sm:mb-6 px-4">
              {content.subtitle}
            </h3>
          )}
          <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide px-4"
             style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            {content.description}
          </p>
        </div>

        {/* Services Grid with Dynamic Data */}
        <div className="space-y-12 lg:space-y-16">
          {content.services?.map((service: any, index: number) => (
            <div 
              key={service.id || index}
              className={`${
                index % 2 === 0 ? 'animate-swoop-in-left' : 'animate-swoop-in-right'
              } opacity-100 translate-y-0`}
              style={{
                animationDelay: isVisible ? `${index * 200}ms` : '0ms',
                animationFillMode: 'both'
              }}
              onMouseEnter={() => setActiveService(index)}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-6 lg:space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="space-y-4 sm:space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100/50 relative will-change-transform">
                    {/* Service Icon */}
                    <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                      <div className={`w-full h-full rounded-xl lg:rounded-2xl transition-all duration-300 ${
                        getColorClasses(service.color, activeService === index)
                      } flex items-center justify-center shadow-2xl`}>
                        {getIconComponent(service.icon_name || service.icon, activeService === index)}
                      </div>
                    </div>

                    {/* Title and Subtitle */}
                    <div className="pr-12 sm:pr-16 lg:pr-20">
                      <h3 className="text-gray-900 leading-none tracking-tight font-black mb-2 lg:mb-3"
                          style={{ fontSize: 'clamp(1.25rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                        {service.title}
                      </h3>
                      <p className="bg-gradient-to-r from-[#0080ff] to-[#0066cc] bg-clip-text text-transparent font-medium tracking-wide"
                         style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)', lineHeight: 1.3 }}>
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Benefits List with 3D Animated Icons */}
                    <div className="space-y-3 sm:space-y-4">
                      {service.benefits?.map((benefit: any, benefitIndex: number) => {
                        // Handle both string benefits and object benefits for backward compatibility
                        const benefitText = typeof benefit === 'string' ? benefit : benefit.text;
                        const benefitIcon = typeof benefit === 'string' ? 'CheckCircle' : benefit.icon;
                        
                        return (
                          <div key={benefitIndex} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 mt-0.5">
                              <AnimatedIcon3D 
                                icon={getBenefitIcon(benefitIcon)} 
                                delay={benefitIndex * 150} 
                              />
                            </div>
                            <span className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">{benefitText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Note */}
                    {service.note && (
                      <div className="bg-blue-50/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 border-l-4 border-[#0080ff]">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {service.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Patient Image with Hover Overlay */}
                <div className={`order-first lg:order-none ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative group">
                    <div className="w-full h-64 sm:h-80 lg:h-96 rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden relative">
                      <img 
                        src={service.patient_image_url}
                        alt={`Patient receiving ${service.title} care`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                      {/* Hover Overlay with Correct Blue Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0080ff]/80 to-[#0066cc]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ServiceLinesSection);
