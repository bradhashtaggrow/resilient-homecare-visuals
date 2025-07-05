
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
        
        // Update local state immediately with proper type checking
        if (payload.eventType === 'UPDATE' && payload.new) {
          const updatedContent = payload.new as WebsiteContent;
          setWebsiteContent(prev => prev.map(item => 
            item.id === updatedContent.id ? { ...item, ...updatedContent } : item
          ));
          broadcastToWebsite('content_updated', updatedContent);
          
          toast({
            title: "Website updated",
            description: `${updatedContent.section_key || 'Content'} section updated in real-time`,
          });
        } else if (payload.eventType === 'INSERT' && payload.new) {
          const newContent = payload.new as WebsiteContent;
          setWebsiteContent(prev => [...prev, newContent]);
          broadcastToWebsite('content_added', newContent);
          
          toast({
            title: "Website updated",
            description: `${newContent.section_key || 'Content'} section added in real-time`,
          });
        } else if (payload.eventType === 'DELETE' && payload.old) {
          const deletedContent = payload.old as WebsiteContent;
          setWebsiteContent(prev => prev.filter(item => item.id !== deletedContent.id));
          broadcastToWebsite('content_deleted', deletedContent);
          
          toast({
            title: "Website updated",
            description: `${deletedContent.section_key || 'Content'} section deleted in real-time`,
          });
        }
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
        
        // Update local state immediately with proper type checking
        if (payload.eventType === 'UPDATE' && payload.new) {
          const updatedService = payload.new as Service;
          setServices(prev => prev.map(item => 
            item.id === updatedService.id ? { ...item, ...updatedService } : item
          ));
          broadcastToWebsite('service_updated', updatedService);
          
          toast({
            title: "Services updated",
            description: `${updatedService.title || 'Service'} updated in real-time`,
          });
        } else if (payload.eventType === 'INSERT' && payload.new) {
          const newService = payload.new as Service;
          setServices(prev => [...prev, newService].sort((a, b) => a.display_order - b.display_order));
          broadcastToWebsite('service_added', newService);
          
          toast({
            title: "Services updated",
            description: `${newService.title || 'Service'} added in real-time`,
          });
        } else if (payload.eventType === 'DELETE' && payload.old) {
          const deletedService = payload.old as Service;
          setServices(prev => prev.filter(item => item.id !== deletedService.id));
          broadcastToWebsite('service_deleted', deletedService);
          
          toast({
            title: "Services updated",
            description: `${deletedService.title || 'Service'} deleted in real-time`,
          });
        }
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
        return <ServicesManager services={services} onServicesChange={handleServicesUpdate} />;
      case 'media':
        return <MediaLibrary />;
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
        />
        <div className="flex-1 flex flex-col">
          <AdminHeader activeSection={activeSection} />
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
