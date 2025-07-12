import React, { useEffect, useState } from 'react';
import { Quote, Award, Users, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FounderContent {
  title?: string;
  subtitle?: string;
  description?: string;
  founder_image?: string;
  quote?: string;
  quote_subtitle?: string;
  story?: string[];
  closing?: string;
  achievements?: Array<{
    icon: string;
    title: string;
    subtitle: string;
  }>;
}

const FounderSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<FounderContent>({
    title: "Founder's Story",
    subtitle: 'from Dr. Jackleen Samuel, PT, DPT | Founder & CEO',
    founder_image: "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png",
    quote: "Dad's in the hospital, again...",
    quote_subtitle: "That call became all too familiar.",
    story: [
      "Over the last four years of my dad's life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn't return home at all.",
      "As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.",
      "I built this company because families—and hospitals—deserve better.",
      "At Resilient, we partner with hospitals to extend their care into the home. Whether it's primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.",
      "Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both."
    ],
    closing: "We are Resilient. And so are you.",
    achievements: [
      { icon: "BookOpen", title: "PT, DPT", subtitle: "Physical Therapist" },
      { icon: "Users", title: "Founder", subtitle: "& CEO" },
      { icon: "Award", title: "Healthcare", subtitle: "Innovation Leader" }
    ]
  });

  useEffect(() => {
    // Load founder content from database
    const loadFounderContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'founder')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded founder content from database:', data);
          const contentData = data.content_data as any;
          
          setContent({
            title: data.title || "Founder's Story",
            subtitle: data.subtitle || 'from Dr. Jackleen Samuel, PT, DPT | Founder & CEO',
            description: data.description || '',
            founder_image: contentData?.founder_image || "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png",
            quote: contentData?.quote || "Dad's in the hospital, again...",
            quote_subtitle: contentData?.quote_subtitle || "That call became all too familiar.",
            story: contentData?.story || [
              "Over the last four years of my dad's life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn't return home at all.",
              "As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.",
              "I built this company because families—and hospitals—deserve better.",
              "At Resilient, we partner with hospitals to extend their care into the home. Whether it's primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.",
              "Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both."
            ],
            closing: contentData?.closing || "We are Resilient. And so are you.",
            achievements: contentData?.achievements || [
              { icon: "BookOpen", title: "PT, DPT", subtitle: "Physical Therapist" },
              { icon: "Users", title: "Founder", subtitle: "& CEO" },
              { icon: "Award", title: "Healthcare", subtitle: "Innovation Leader" }
            ]
          });
        } else {
          console.log('No founder content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading founder content from database:', error);
      }
    };

    loadFounderContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('founder-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.founder'
      }, (payload) => {
        console.log('Real-time founder content change:', payload);
        loadFounderContent();
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

    const element = document.getElementById('founder-section');
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="h-4 w-4 sm:h-6 sm:w-6" />;
      case 'Users':
        return <Users className="h-4 w-4 sm:h-6 sm:w-6" />;
      case 'Award':
        return <Award className="h-4 w-4 sm:h-6 sm:w-6" />;
      default:
        return <BookOpen className="h-4 w-4 sm:h-6 sm:w-6" />;
    }
  };

  return (
    <section 
      id="founder-section" 
      className="py-16 sm:py-24 md:py-32 lg:py-40 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced Title Section with Apple-Style Typography */}
        <div className={`text-center mb-12 sm:mb-20 transition-all duration-1000 transform ${
          isVisible ? 'animate-slide-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h2 className="text-gray-900 leading-none tracking-tight font-black text-shadow-white mb-6 sm:mb-8 hover:scale-105 transition-transform duration-700"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title}
          </h2>
          <p className="text-blue-600/90 max-w-4xl mx-auto leading-relaxed font-medium tracking-wide hover:text-blue-700 transition-colors duration-500"
             style={{ fontSize: 'clamp(0.875rem, 2.5vw, 2rem)', lineHeight: 1.3 }}>
            {content.subtitle}
          </p>
        </div>

        {/* Enhanced Professional Portrait Section with Fixed Achievement Badges */}
        <div className="mb-12 sm:mb-16 flex justify-center">
          <div className={`transition-all duration-1500 transform ${
            isVisible ? 'animate-slide-up opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative group">
              {/* Subtle Gradient Border with Glow */}
              <div className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                   style={{
                     background: 'linear-gradient(135deg, #0080ff 0%, #0066cc 100%)',
                     filter: 'blur(2px)'
                   }}>
              </div>
              
              {/* Main Image Container */}
              <div className="relative">
                <img 
                  src={content.founder_image}
                  alt="Dr. Jackleen Samuel, PT, DPT - Founder & CEO"
                  className="w-[405px] h-[405px] sm:w-[540px] sm:h-[540px] object-cover rounded-full shadow-2xl hover:scale-105 transition-transform duration-700 relative z-10 border-2 border-transparent"
                  style={{
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #0080ff 0%, #0066cc 100%) border-box'
                  }}
                  loading="lazy"
                />
                
                {/* Fixed Achievement Badges with Proper Floating Animation */}
                {content.achievements?.map((achievement, index) => {
                  const positions = [
                    { 
                      className: "absolute -top-4 -right-4 sm:-top-6 sm:-right-6", 
                      bgColor: "bg-blue-600 hover:bg-blue-700",
                      delay: "0s"
                    },
                    { 
                      className: "absolute top-1/2 -left-4 sm:-left-6 transform -translate-y-1/2", 
                      bgColor: "bg-blue-500 hover:bg-blue-600",
                      delay: "0.5s"
                    },
                    { 
                      className: "absolute -bottom-4 -right-8 sm:-bottom-6 sm:-right-12", 
                      bgColor: "bg-blue-700 hover:bg-blue-800",
                      delay: "1s"
                    }
                  ];
                  
                  const position = positions[index] || positions[0];
                  
                  return (
                    <div 
                      key={index} 
                      className={`${position.className} z-20 animate-float hover:scale-110 transition-transform duration-300`}
                      style={{ 
                        animationDelay: position.delay,
                        animationDuration: '3s',
                        animationIterationCount: 'infinite'
                      }}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full p-3 sm:p-4 shadow-xl transition-all duration-300 border-2 border-white/20">
                        {getAchievementIcon(achievement.icon)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Story Content with Mobile Optimization */}
        <div className={`transition-all duration-1500 delay-500 transform ${
          isVisible ? 'animate-slide-in-right opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {/* Enhanced Quote Section with Mobile Typography */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
              <Quote className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 h-12 w-12 sm:h-16 sm:w-16 text-blue-200 group-hover:text-blue-300 transition-colors duration-500" />
              <blockquote className="text-gray-900 leading-none tracking-tight font-black pl-8 sm:pl-12 group-hover:text-blue-600 transition-colors duration-500"
                          style={{ fontSize: 'clamp(1.25rem, 3vw, 3rem)', fontWeight: 900, lineHeight: 0.85 }}>
                {content.quote}
              </blockquote>
              <p className="text-blue-600/90 font-medium tracking-wide mt-3 sm:mt-4 pl-8 sm:pl-12 group-hover:text-blue-700 transition-colors duration-500"
                 style={{ fontSize: 'clamp(0.875rem, 2vw, 1.3rem)', lineHeight: 1.3 }}>
                {content.quote_subtitle}
              </p>
            </div>
            
            {/* Enhanced Story Content with Mobile Typography */}
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
              {content.story?.map((paragraph, index) => (
                <p key={index} className="group-hover:text-gray-900 transition-colors duration-500">
                  {paragraph}
                </p>
              ))}
              
              <div className="bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-l-4 border-blue-500 hover:border-blue-600 transition-colors duration-500">
                <p className="text-gray-900 leading-none tracking-tight font-black hover:text-blue-600 transition-colors duration-500"
                   style={{ fontSize: 'clamp(1.125rem, 2.5vw, 2.5rem)', fontWeight: 900, lineHeight: 0.85 }}>
                  {content.closing}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
