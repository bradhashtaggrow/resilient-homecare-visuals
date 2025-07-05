
import { useEffect, useState } from 'react';

interface WebsiteData {
  content?: any[];
  services?: any[];
  media?: any[];
}

export const useWebsiteSync = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  
  useEffect(() => {
    // Listen for updates from admin panel
    const channel = new BroadcastChannel('website_updates');
    
    const handleMessage = (event: MessageEvent) => {
      console.log('Website received update:', event.data);
      const { type, data, timestamp } = event.data;
      
      setLastUpdate(new Date(timestamp));
      
      // Trigger website refresh/updates based on the type
      switch (type) {
        case 'content_updated':
        case 'content_added':
        case 'content_deleted':
          // Reload content sections
          window.dispatchEvent(new CustomEvent('website-content-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'service_updated':
        case 'service_added':
        case 'service_deleted':
          // Reload services
          window.dispatchEvent(new CustomEvent('website-services-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'media_updated':
          // Reload media
          window.dispatchEvent(new CustomEvent('website-media-updated', { 
            detail: { type, data } 
          }));
          break;
          
        case 'data_updated':
          // Full data reload
          window.dispatchEvent(new CustomEvent('website-full-reload', { 
            detail: { type, data } 
          }));
          break;
      }
    };
    
    channel.addEventListener('message', handleMessage);
    setIsListening(true);
    
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
      setIsListening(false);
    };
  }, []);
  
  return {
    isListening,
    lastUpdate
  };
};
