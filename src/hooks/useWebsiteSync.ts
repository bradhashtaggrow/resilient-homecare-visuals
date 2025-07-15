
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Global content cache for performance optimization
const contentCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5000; // 5 seconds cache

interface WebsiteData {
  content?: any[];
  services?: any[];
  media?: any[];
}

export const useWebsiteSync = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  // Optimized update handler to prevent excessive re-renders
  const handleUpdate = useCallback((tableName: string, payload: any) => {
    console.log(`${tableName} updated via real-time:`, payload);
    setLastUpdate(new Date());
    
    // Clear cache for this table
    const cacheKey = `${tableName}_${payload.new?.section_key || payload.new?.id || 'all'}`;
    contentCache.delete(cacheKey);
    
    // Use requestAnimationFrame for optimal DOM updates
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent('content-sync-update', { 
        detail: { 
          table: tableName,
          type: payload.eventType,
          data: payload.new || payload.old,
          timestamp: new Date()
        } 
      }));
    });
  }, []);

  useEffect(() => {
    console.log('Setting up performance-optimized Supabase real-time sync...');
    
    // Create a single multiplexed channel for better performance
    const mainChannel = supabase
      .channel('optimized-sync-channel', {
        config: {
          broadcast: { self: false },
          presence: { key: 'website-sync' }
        }
      });

    // Listen to all website content tables
    mainChannel
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => handleUpdate('website_content', payload))
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => handleUpdate('services', payload))
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, (payload) => handleUpdate('blog_posts', payload))
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'value_proposition_features'
      }, (payload) => handleUpdate('value_proposition_features', payload))
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'service_benefits'
      }, (payload) => handleUpdate('service_benefits', payload))
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'media_library'
      }, (payload) => handleUpdate('media_library', payload))
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Optimized real-time sync active - ready for independent operation');
          setIsListening(true);
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Real-time subscription failed');
          setIsListening(false);
        }
      });
    
    return () => {
      console.log('Cleaning up optimized real-time sync...');
      supabase.removeChannel(mainChannel);
      contentCache.clear();
      setIsListening(false);
    };
  }, [handleUpdate]);
  
  return {
    isListening,
    lastUpdate
  };
};
