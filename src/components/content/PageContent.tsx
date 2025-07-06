import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from '@/components/HeroSection';
import ServiceLinesSection from '@/components/ServiceLinesSection';
import MobileShowcase from '@/components/MobileShowcase';
import ValuePropositionSection from '@/components/ValuePropositionSection';
import LeadGenSection from '@/components/LeadGenSection';

interface PageContentProps {
  pageKey: string;
}

interface ContentData {
  hero?: any;
  services?: any;
  mobile?: any;
  value_prop?: any;
  lead_gen?: any;
}

const PageContent = ({ pageKey }: PageContentProps) => {
  const [contentData, setContentData] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageContent();
    
    // Set up real-time subscription for content changes
    const channel = supabase
      .channel(`page-content-${pageKey}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: `section_key=like.${pageKey}_%`
      }, () => {
        fetchPageContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pageKey]);

  const fetchPageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .like('section_key', `${pageKey}_%`)
        .eq('is_active', true);

      if (error) throw error;

      const organized: ContentData = {};
      data?.forEach(item => {
        const sectionType = item.section_key.replace(`${pageKey}_`, '');
        organized[sectionType as keyof ContentData] = item;
      });

      setContentData(organized);
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white paper-texture flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white paper-texture">
      <HeroSection 
        sectionKey={`${pageKey}_hero`}
        customContent={contentData.hero}
      />
      <ServiceLinesSection 
        sectionKey={`${pageKey}_services`}
        customContent={contentData.services}
      />
      <MobileShowcase 
        sectionKey={`${pageKey}_mobile`}
        customContent={contentData.mobile}
      />
      <ValuePropositionSection 
        sectionKey={`${pageKey}_value_prop`}
        customContent={contentData.value_prop}
      />
      <LeadGenSection 
        sectionKey={`${pageKey}_lead_gen`}
        customContent={contentData.lead_gen}
      />
    </div>
  );
};

export default PageContent;