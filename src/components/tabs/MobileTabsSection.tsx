import React, { useEffect, useState } from 'react';
import { 
  Building2, Users, Heart, Zap, CheckCircle, 
  LucideIcon 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Tab {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon_name: string;
  display_order: number;
  image_url: string;
}

interface MobileTabsSectionProps {
  services?: Tab[];
}

const MobileTabsSection: React.FC<MobileTabsSectionProps> = ({ services: propServices }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [animationKey, setAnimationKey] = useState(0);
  const [content, setContent] = useState<any>({
    title: 'The Future of Care',
    subtitle: 'Experience healthcare like never before',
    description: 'Every interaction reimagined.',
    tabs: []
  });

  useEffect(() => {
    // Load mobile content from database
    const loadMobileContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'mobile')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded mobile tabs content from database:', data);
          const contentData = data.content_data as any;
          
          const tabs = contentData?.tabs || propServices || getDefaultTabs();
          const sortedTabs = tabs.sort((a: Tab, b: Tab) => (a.display_order || 0) - (b.display_order || 0));
          
          setContent({
            title: data.title || 'The Future of Care',
            subtitle: data.subtitle || 'Experience healthcare like never before',
            description: data.description || 'Every interaction reimagined.',
            tabs: sortedTabs
          });
          
          // Set first tab as active if none selected
          if (sortedTabs.length > 0 && !activeTab) {
            setActiveTab(sortedTabs[0].id);
          }
        } else {
          console.log('No mobile content found in database, using defaults');
          const defaultTabs = getDefaultTabs();
          setContent(prev => ({ ...prev, tabs: defaultTabs }));
          if (defaultTabs.length > 0 && !activeTab) {
            setActiveTab(defaultTabs[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading mobile content from database:', error);
        const defaultTabs = getDefaultTabs();
        setContent(prev => ({ ...prev, tabs: defaultTabs }));
        if (defaultTabs.length > 0 && !activeTab) {
          setActiveTab(defaultTabs[0].id);
        }
      }
    };

    loadMobileContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('mobile-tabs-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.mobile'
      }, (payload) => {
        console.log('Real-time mobile tabs content change:', payload);
        loadMobileContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [propServices, activeTab]);

  const getDefaultTabs = (): Tab[] => [
    {
      id: "partner-with",
      title: "Partner with",
      subtitle: "Leading Hospitals",
      description: "Connect with top-tier healthcare institutions to deliver exceptional patient care.",
      icon_name: "Building2",
      display_order: 1,
      image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: "consistent-patient",
      title: "Consistent Patient",
      subtitle: "Care Experience",
      description: "Ensure seamless continuity of care across all patient touchpoints.",
      icon_name: "Users",
      display_order: 2,
      image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: "complete-home",
      title: "Complete Home",
      subtitle: "Healthcare Solutions",
      description: "Comprehensive healthcare services delivered directly to patients' homes.",
      icon_name: "Heart",
      display_order: 3,
      image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: "streamlined-platform",
      title: "Streamlined Platform",
      subtitle: "Technology Integration",
      description: "Advanced platform technology that simplifies healthcare delivery.",
      icon_name: "Zap",
      display_order: 4,
      image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: "simple-per-visit",
      title: "Simple Per-Visit",
      subtitle: "Billing Model",
      description: "Transparent and straightforward per-visit billing for healthcare services.",
      icon_name: "CheckCircle",
      display_order: 5,
      image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  const getIconComponent = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
      Building2,
      Users,
      Heart,
      Zap,
      CheckCircle
    };
    
    return iconMap[iconName] || Building2;
  };

  const getColorClasses = (tabId: string): string => {
    const isActive = activeTab === tabId;
    return isActive 
      ? 'bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white shadow-blue-600/25'
      : 'text-blue-600 bg-blue-50 hover:bg-blue-100';
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setAnimationKey(prev => prev + 1);
  };

  const activeTabData = content.tabs.find((tab: Tab) => tab.id === activeTab);

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 healthcare-gradient opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(210_100%_27%/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(210_100%_37%/0.15),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-white leading-none tracking-tight font-black mb-6 lg:mb-8"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title}
          </h2>
          {content.subtitle && (
            <h3 className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4 sm:mb-6 px-4">
              {content.subtitle}
            </h3>
          )}
          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide px-4"
             style={{ fontSize: 'clamp(1rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            {content.description}
          </p>
        </div>

        {/* Tabs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Vertical Tab List */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {content.tabs.map((tab: Tab, index: number) => {
                const IconComponent = getIconComponent(tab.icon_name);
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                      w-full text-left p-6 rounded-2xl transition-all duration-300 
                      transform hover:scale-105 hover:shadow-2xl
                      ${getColorClasses(tab.id)}
                      border border-white/10 hover:border-white/20
                    `}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
                        ${activeTab === tab.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-600'
                        }
                        transition-all duration-300
                      `}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 leading-tight">
                          {tab.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${
                          activeTab === tab.id ? 'text-white/80' : 'text-blue-500'
                        }`}>
                          {tab.subtitle}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            {activeTabData && (
              <div 
                key={`${activeTabData.id}-${animationKey}`}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 
                          animate-fade-in h-full flex flex-col justify-center"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                  {/* Content */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      {(() => {
                        const IconComponent = getIconComponent(activeTabData.icon_name);
                        return (
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4285F4] to-[#1565C0] 
                                        flex items-center justify-center shadow-2xl">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <h3 className="text-white text-2xl lg:text-3xl font-bold leading-tight">
                          {activeTabData.title}
                        </h3>
                        <p className="text-blue-300 text-lg font-medium">
                          {activeTabData.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {activeTabData.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative group">
                    <div className="relative w-full h-64 lg:h-80 rounded-2xl shadow-2xl overflow-hidden">
                      <img 
                        src={activeTabData.image_url}
                        alt={`${activeTabData.title} - ${activeTabData.subtitle}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/20 to-[#1565C0]/20 
                                    opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileTabsSection;