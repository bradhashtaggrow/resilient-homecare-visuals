
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WebsiteData {
  content?: any[];
  services?: any[];
  media?: any[];
}

export const useWebsiteSync = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  useEffect(() => {
    console.log('Setting up Supabase real-time subscriptions...');
    
    // Create Supabase real-time channels for database changes
    const websiteContentChannel = supabase
      .channel('website_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content'
        },
        (payload) => {
          console.log('Website content changed:', payload);
          setLastUpdate(new Date());
          window.dispatchEvent(new CustomEvent('website-content-updated', { 
            detail: { type: 'content_updated', data: payload.new } 
          }));
        }
      )
      .subscribe();

    const servicesChannel = supabase
      .channel('services_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'services'
        },
        (payload) => {
          console.log('Services changed:', payload);
          setLastUpdate(new Date());
          window.dispatchEvent(new CustomEvent('website-services-updated', { 
            detail: { type: 'service_updated', data: payload.new } 
          }));
        }
      )
      .subscribe();

    const blogPostsChannel = supabase
      .channel('blog_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_posts'
        },
        (payload) => {
          console.log('Blog posts changed:', payload);
          setLastUpdate(new Date());
          window.dispatchEvent(new CustomEvent('website-content-updated', { 
            detail: { type: 'blog_updated', data: payload.new } 
          }));
        }
      )
      .subscribe();

    const valuePropsChannel = supabase
      .channel('value_props_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'value_proposition_features'
        },
        (payload) => {
          console.log('Value proposition features changed:', payload);
          setLastUpdate(new Date());
          window.dispatchEvent(new CustomEvent('website-content-updated', { 
            detail: { type: 'value_props_updated', data: payload.new } 
          }));
        }
      )
      .subscribe();

    // Fallback: Listen for BroadcastChannel updates (when in same browser/Lovable)
    const broadcastChannel = new BroadcastChannel('website_updates');
    
    const handleBroadcastMessage = (event: MessageEvent) => {
      console.log('Website received broadcast update:', event.data);
      const { type, data, timestamp } = event.data;
      
      setLastUpdate(new Date(timestamp));
      
      // Trigger website refresh/updates based on the type
      switch (type) {
        case 'content_updated':
        case 'content_added':
        case 'content_deleted':
          window.dispatchEvent(new CustomEvent('website-content-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'service_updated':
        case 'service_added':
        case 'service_deleted':
          window.dispatchEvent(new CustomEvent('website-services-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'media_updated':
          window.dispatchEvent(new CustomEvent('website-media-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'data_updated':
          window.dispatchEvent(new CustomEvent('website-full-reload', { 
            detail: { type, data } 
          }));
          break;
      }
    };
    
    broadcastChannel.addEventListener('message', handleBroadcastMessage);
    setIsListening(true);
    
    return () => {
      console.log('Cleaning up real-time subscriptions...');
      // Clean up Supabase channels
      supabase.removeChannel(websiteContentChannel);
      supabase.removeChannel(servicesChannel);
      supabase.removeChannel(blogPostsChannel);
      supabase.removeChannel(valuePropsChannel);
      
      // Clean up broadcast channel
      broadcastChannel.removeEventListener('message', handleBroadcastMessage);
      broadcastChannel.close();
      setIsListening(false);
    };
  }, []);
  
  return {
    isListening,
    lastUpdate
  };
};
