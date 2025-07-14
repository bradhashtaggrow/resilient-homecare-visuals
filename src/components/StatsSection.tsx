import React, { useEffect, useState } from 'react';
import { TrendingUp, Heart, Users, DollarSign, Award, Target, Star, Zap, Shield, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StatsContent {
  title?: string;
  description?: string;
  content_data?: {
    stats?: Array<{
      value: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [starsReady, setStarsReady] = useState(false);
  const [counts, setCounts] = useState({
    costSavings: 0,
    readmissionReduction: 0,
    patientPreference: 0,
    lessStress: 0
  });
  const [content, setContent] = useState<StatsContent>({
    title: 'What Does The Research Say?',
    description: '',
    content_data: {
      stats: [
        {
          value: '38%',
          title: 'Cost Savings',
          description: 'A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.',
          icon: 'DollarSign'
        },
        {
          value: '70%',
          title: 'Reduction in Readmissions',
          description: 'A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.',
          icon: 'TrendingUp'
        },
        {
          value: '91%',
          title: 'Patient Preference',
          description: 'A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.',
          icon: 'Heart'
        },
        {
          value: '95%',
          title: 'Less Stress',
          description: 'A study published in BMJ Open Quality reported that 95% of patients felt less stressed receiving care at home compared to inpatient hospital care.',
          icon: 'Users'
        }
      ]
    }
  });

  useEffect(() => {
    // Load stats content from database
    const loadStatsContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'stats')
          .eq('is_active', true)
          .maybeSingle();

        if (data && !error) {
          console.log('Loaded stats content from database:', data);
          console.log('Raw content_data:', data.content_data);
          
          // Safely handle content_data conversion
          let parsedContentData = {
            stats: [
              {
                value: '38%',
                title: 'Cost Savings',
                description: 'A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.',
                icon: 'DollarSign'
              },
              {
                value: '70%',
                title: 'Reduction in Readmissions',
                description: 'A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.',
                icon: 'TrendingUp'
              },
              {
                value: '91%',
                title: 'Patient Preference',
                description: 'A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.',
                icon: 'Heart'
              },
              {
                value: '95%',
                title: 'Less Stress',
                description: 'A study published in BMJ Open Quality reported that 95% of patients felt less stressed receiving care at home compared to inpatient hospital care.',
                icon: 'Users'
              }
            ]
          };

          // Try to parse content_data if it exists and has the right structure
          try {
            if (data.content_data && typeof data.content_data === 'object' && 'stats' in data.content_data) {
              parsedContentData = data.content_data as typeof parsedContentData;
            }
          } catch (e) {
            console.log('Using default stats data due to parsing error:', e);
          }
          
          setContent({
            title: data.title || 'What Does The Research Say?',
            description: data.description || '',
            content_data: parsedContentData
          });
        } else {
          console.log('No stats content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading stats content from database:', error);
      }
    };

    loadStatsContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('stats-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.stats'
      }, (payload) => {
        console.log('Real-time stats content change:', payload);
        loadStatsContent();
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
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    // Initialize stars after a brief delay to prevent glitching
    const starTimer = setTimeout(() => {
      setStarsReady(true);
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(starTimer);
    };
  }, []);

  useEffect(() => {
    if (isVisible && content.content_data?.stats) {
      const statsData = content.content_data.stats;
      
      // Extract percentage values from database content with proper null checks
      const targets = {
        costSavings: parseInt((statsData[0]?.value?.replace('%', '') || '38')),
        readmissionReduction: parseInt((statsData[1]?.value?.replace('%', '') || '70')),
        patientPreference: parseInt((statsData[2]?.value?.replace('%', '') || '91')),
        lessStress: parseInt((statsData[3]?.value?.replace('%', '') || '95'))
      };

      const duration = 3000;
      const steps = 100;
      const interval = duration / steps;

      const timer = setInterval(() => {
        setCounts(prev => {
          const newCounts = { ...prev };
          let allComplete = true;

          Object.keys(targets).forEach(key => {
            const target = targets[key as keyof typeof targets];
            const current = newCounts[key as keyof typeof newCounts];
            
            if (current < target) {
              const increment = Math.ceil(target / steps);
              
              newCounts[key as keyof typeof newCounts] = Math.min(
                current + increment,
                target
              );
              allComplete = false;
            }
          });

          if (allComplete) {
            clearInterval(timer);
          }

          return newCounts;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible, content.content_data?.stats]);

  // Generate stable star positions
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 80; i++) {
      const x = (i * 13 + 7) % 100;
      const y = (i * 17 + 11) % 100;
      const delay = (i * 0.1) % 4;
      const duration = 2 + (i % 3);
      
      stars.push({
        id: i,
        x,
        y,
        delay,
        duration
      });
    }
    return stars;
  };

  const stars = generateStars();

  // Icon mapping
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      DollarSign,
      TrendingUp,
      Heart,
      Users,
      Award,
      Target,
      Star,
      Zap,
      Shield,
      Activity
    };
    return icons[iconName] || DollarSign;
  };

  // Use database content or fallback to default stats
  const statsData = content.content_data?.stats || [
    { value: '38%', title: 'Healthcare Organizations', description: 'Leading hospitals and health systems trust our platform', icon: 'DollarSign' },
    { value: '70%', title: 'Patient Satisfaction', description: 'Patients prefer care delivered at home', icon: 'TrendingUp' },
    { value: '91%', title: 'Cost Reduction', description: 'Average savings compared to traditional care models', icon: 'Heart' },
    { value: '95%', title: 'Support Available', description: 'Round-the-clock clinical and technical support', icon: 'Users' }
  ];

  console.log('Final statsData being used:', statsData);

  const stats = statsData.map((stat, index) => {
    const IconComponent = getIconComponent(stat.icon);
    const colors = ['primary', 'secondary', 'accent', 'primary'];
    
    return {
      icon: React.createElement(IconComponent, { className: "h-10 w-10" }),
      value: counts[Object.keys(counts)[index] as keyof typeof counts] > 0 
        ? `${counts[Object.keys(counts)[index] as keyof typeof counts]}%` 
        : stat.value,
      label: stat.title,
      description: stat.description,
      color: colors[index]
    };
  });

  const getGradientClass = (color: string) => {
    const gradients = {
      primary: 'healthcare-gradient-primary',
      secondary: 'healthcare-gradient-secondary', 
      accent: 'healthcare-gradient'
    };
    return gradients[color as keyof typeof gradients] || 'healthcare-gradient-primary';
  };

  return (
    <section id="stats-section" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {starsReady && stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1200 ${
          isVisible ? 'animate-swoop-in' : 'opacity-0'
        }`}>
          <h2 className="text-white leading-none tracking-tight font-black text-shadow-white mb-6 lg:mb-8"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 6rem)', fontWeight: 900, lineHeight: 0.85 }}>
            {content.title}
          </h2>
          {content.description && (
            <p className="text-white/70 text-base sm:text-lg lg:text-xl max-w-4xl mx-auto px-4">
              {content.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`transition-all duration-1200 ${
                isVisible ? 'animate-swoop-in' : 'opacity-0'
              }`}
              style={{animationDelay: `${index * 200}ms`}}
            >
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl lg:rounded-2xl hover-lift border border-white/20 h-full transition-all duration-500 hover:bg-white/20">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Animated Value */}
                  <div className="text-white leading-none tracking-tight font-black mb-2 sm:mb-3 animate-count-up"
                       style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.85 }}>
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-blue-100/90 font-medium tracking-wide mb-2 sm:mb-3"
                       style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)', lineHeight: 1.3 }}>
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs sm:text-sm text-blue-200 mb-3 sm:mb-4 leading-relaxed">
                    {stat.description}
                  </div>
                  
                  {/* Trend indicator */}
                  <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    <TrendingUp className="h-3 w-3" />
                    <span>Research Based</span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl lg:rounded-2xl ${getGradientClass(stat.color)} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
