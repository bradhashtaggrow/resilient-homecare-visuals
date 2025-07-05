
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
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadData();
    setupRealtimeSubscription();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
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
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    // Website content real-time updates
    const contentChannel = supabase
      .channel('website-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Website content change:', payload);
        loadData(); // Reload data on any change
      })
      .subscribe();

    // Services real-time updates
    const servicesChannel = supabase
      .channel('services-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Services change:', payload);
        loadData(); // Reload data on any change
      })
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(contentChannel);
      supabase.removeChannel(servicesChannel);
    };
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
        return <DashboardOverview />;
      case 'content':
        return <ContentEditor content={websiteContent} onContentChange={setWebsiteContent} />;
      case 'services':
        return <ServicesManager services={services} onServicesChange={setServices} />;
      case 'media':
        return <MediaLibrary />;
      case 'preview':
        return <RealTimePreview />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
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
