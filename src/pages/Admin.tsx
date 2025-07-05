
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ContentEditor from '@/components/admin/ContentEditor';
import ServicesManager from '@/components/admin/ServicesManager';
import MediaLibrary from '@/components/admin/MediaLibrary';
import RealTimePreview from '@/components/admin/RealTimePreview';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import SystemSettings from '@/components/admin/SystemSettings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WebsiteContent {
  id: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_video_url?: string;
  background_image_url?: string;
  mobile_background_url?: string;
  laptop_background_url?: string;
}

interface Service {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon_name: string;
  color: string;
  patient_image_url?: string;
  display_order: number;
}

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('disconnected');
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadData();
    setupRealtimeSubscription();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setSyncStatus('syncing');
      
      // Load website content
      const { data: contentData, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('section_key');

      if (contentError) throw contentError;

      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('display_order');

      if (servicesError) throw servicesError;

      setWebsiteContent(contentData || []);
      setServices(servicesData || []);
      setSyncStatus('connected');
      
      // Broadcast changes to main website
      broadcastToWebsite('data_updated', { 
        content: contentData, 
        services: servicesData 
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      setSyncStatus('disconnected');
      toast({
        title: "Error loading data",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const broadcastToWebsite = (type: string, data: any) => {
    // Use BroadcastChannel to communicate with main website
    try {
      const channel = new BroadcastChannel('website_updates');
      channel.postMessage({ type, data, timestamp: Date.now() });
      console.log(`Broadcasting ${type} to website:`, data);
    } catch (error) {
      console.warn('BroadcastChannel not supported:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    setSyncStatus('syncing');
    
    // Website content real-time updates
    const contentChannel = supabase
      .channel('website-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time website content change:', payload);
        setSyncStatus('connected');
        
        // Update local state immediately
        if (payload.eventType === 'UPDATE') {
          setWebsiteContent(prev => prev.map(item => 
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          ));
          broadcastToWebsite('content_updated', payload.new);
        } else if (payload.eventType === 'INSERT') {
          setWebsiteContent(prev => [...prev, payload.new as WebsiteContent]);
          broadcastToWebsite('content_added', payload.new);
        } else if (payload.eventType === 'DELETE') {
          setWebsiteContent(prev => prev.filter(item => item.id !== payload.old.id));
          broadcastToWebsite('content_deleted', payload.old);
        }
        
        toast({
          title: "Website updated",
          description: `${payload.new?.section_key || 'Content'} section updated in real-time`,
        });
      })
      .subscribe((status) => {
        console.log('Content subscription status:', status);
        setSyncStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      });

    // Services real-time updates
    const servicesChannel = supabase
      .channel('services-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Real-time services change:', payload);
        setSyncStatus('connected');
        
        // Update local state immediately
        if (payload.eventType === 'UPDATE') {
          setServices(prev => prev.map(item => 
            item.id === payload.new.id ? { ...item, ...payload.new } : item
          ));
          broadcastToWebsite('service_updated', payload.new);
        } else if (payload.eventType === 'INSERT') {
          setServices(prev => [...prev, payload.new as Service].sort((a, b) => a.display_order - b.display_order));
          broadcastToWebsite('service_added', payload.new);
        } else if (payload.eventType === 'DELETE') {
          setServices(prev => prev.filter(item => item.id !== payload.old.id));
          broadcastToWebsite('service_deleted', payload.old);
        }
        
        toast({
          title: "Services updated",
          description: `${payload.new?.title || 'Service'} updated in real-time`,
        });
      })
      .subscribe((status) => {
        console.log('Services subscription status:', status);
        setSyncStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      });

    // Media library real-time updates
    const mediaChannel = supabase
      .channel('media-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'media_library'
      }, (payload) => {
        console.log('Real-time media change:', payload);
        broadcastToWebsite('media_updated', payload);
        
        toast({
          title: "Media updated",
          description: "Media library updated in real-time",
        });
      })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(contentChannel);
      supabase.removeChannel(servicesChannel);
      supabase.removeChannel(mediaChannel);
    };
  };

  const handleContentUpdate = async (updatedContent: WebsiteContent[]) => {
    setWebsiteContent(updatedContent);
    // Real-time sync will handle broadcasting automatically via database triggers
  };

  const handleServicesUpdate = async (updatedServices: Service[]) => {
    setServices(updatedServices);
    // Real-time sync will handle broadcasting automatically via database triggers
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview syncStatus={syncStatus} />;
      case 'content':
        return <ContentEditor content={websiteContent} onContentChange={handleContentUpdate} syncStatus={syncStatus} />;
      case 'services':
        return <ServicesManager services={services} onServicesChange={handleServicesUpdate} syncStatus={syncStatus} />;
      case 'media':
        return <MediaLibrary syncStatus={syncStatus} />;
      case 'preview':
        return <RealTimePreview syncStatus={syncStatus} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview syncStatus={syncStatus} />;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          syncStatus={syncStatus}
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader activeSection={activeSection} syncStatus={syncStatus} />
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
