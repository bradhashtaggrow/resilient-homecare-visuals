import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Shield, Target, Award, CheckCircle, Clock, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

interface ValuePropositionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  propositions?: ValueProposition[];
}

const ValuePropositionSection = () => {
  const [content, setContent] = useState<ValuePropositionContent>({
    title: 'We Manage The Work.',
    subtitle: 'You Own The Program.',
    description: 'Our comprehensive approach delivers measurable outcomes for hospitals, patients, and communities.',
    propositions: []
  });

  const [isVisible, setIsVisible] = useState(false);

  // Combine title and subtitle for typing animation
  const fullText = `${content.title}\n${content.subtitle}`;
  
  const { displayedText, isComplete } = useTypingAnimation({
    text: fullText,
    speed: 50,
    delay: isVisible ? 500 : 0
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'value_proposition')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded value proposition content:', data);
          const contentData = data.content_data as any;
          setContent({
            title: data.title || 'We Manage The Work.',
            subtitle: data.subtitle || 'You Own The Program.',
            description: data.description || 'Our comprehensive approach delivers measurable outcomes for hospitals, patients, and communities.',
            propositions: contentData?.propositions || content.propositions
          });
        }
      } catch (error) {
        console.error('Error loading value proposition content:', error);
      }
    };

    loadContent();

    const channel = supabase
      .channel('value-proposition-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.value_proposition'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('value-proposition-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName: string) => {
    const icons = {
      TrendingUp,
      Users,
      Shield,
      Target,
      Award,
      CheckCircle,
      Clock,
      Zap
    };
    return icons[iconName as keyof typeof icons] || TrendingUp;
  };

  // Split the displayed text by newlines for proper rendering
  const textLines = displayedText.split('\n');

  return (
    <section id="value-proposition-section" className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header with Typing Animation */}
        <div className="text-center mb-20">
          <div className="min-h-[160px] flex flex-col items-center justify-center">
            <h2 className="text-6xl font-black text-gray-900 leading-tight mb-4 font-apple">
              {textLines[0] && (
                <span className="block">
                  {textLines[0]}
                </span>
              )}
              {textLines[1] && (
                <span className="block bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent">
                  {textLines[1]}
                </span>
              )}
              {isVisible && !isComplete && (
                <span className="animate-pulse">|</span>
              )}
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValuePropositionSection;
