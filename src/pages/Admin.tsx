
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import UnifiedContentManager from '@/components/admin/UnifiedContentManager';
import RealTimePreview from '@/components/admin/RealTimePreview';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import SystemSettings from '@/components/admin/SystemSettings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
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
      
      // Simple connection test
      const { error } = await supabase
        .from('website_content')
        .select('count', { count: 'exact', head: true });

      if (error) throw error;

      setSyncStatus('connected');
      
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

  const setupRealtimeSubscription = () => {
    setSyncStatus('syncing');
    
    // Website content real-time updates
    const contentChannel = supabase
      .channel('admin-realtime-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time website content change:', payload);
        setSyncStatus('connected');
        
        toast({
          title: "Website updated",
          description: "Content updated in real-time",
        });
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Real-time services change:', payload);
        setSyncStatus('connected');
        
        toast({
          title: "Services updated",
          description: "Services updated in real-time",
        });
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'media_library'
      }, (payload) => {
        console.log('Real-time media change:', payload);
        setSyncStatus('connected');
        
        toast({
          title: "Media updated",
          description: "Media library updated in real-time",
        });
      })
      .subscribe((status) => {
        console.log('Subscription status:', status);
        setSyncStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      });

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(contentChannel);
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
        return <DashboardOverview syncStatus={syncStatus} />;
      case 'content':
        return <UnifiedContentManager syncStatus={syncStatus} />;
      case 'preview':
        return <RealTimePreview syncStatus={syncStatus} />;
      case 'analytics':
        return <AnalyticsDashboard syncStatus={syncStatus} />;
      case 'users':
        return <UserManagement syncStatus={syncStatus} />;
      case 'settings':
        return <SystemSettings syncStatus={syncStatus} />;
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
