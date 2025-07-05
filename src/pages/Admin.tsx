
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
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('disconnected');
  const [stats, setStats] = useState({
    totalContent: 0,
    totalServices: 0,
    totalMedia: 0,
    totalUsers: 0
  });
  const { toast } = useToast();
  const { user } = useAuth();

  // Load initial data and stats
  useEffect(() => {
    loadData();
    setupRealtimeSubscription();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setSyncStatus('syncing');
      
      // Fetch stats from all tables
      const [contentResult, servicesResult, mediaResult, usersResult] = await Promise.all([
        supabase.from('website_content').select('count', { count: 'exact', head: true }),
        supabase.from('services').select('count', { count: 'exact', head: true }),
        supabase.from('media_library').select('count', { count: 'exact', head: true }),
        supabase.from('profiles').select('count', { count: 'exact', head: true })
      ]);

      if (contentResult.error) throw contentResult.error;
      if (servicesResult.error) throw servicesResult.error;
      if (mediaResult.error) throw mediaResult.error;
      if (usersResult.error) throw usersResult.error;

      setStats({
        totalContent: contentResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalMedia: mediaResult.count || 0,
        totalUsers: usersResult.count || 0
      });

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
        loadData(); // Refresh stats
        
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
        loadData(); // Refresh stats
        
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
        loadData(); // Refresh stats
        
        toast({
          title: "Media updated",
          description: "Media library updated in real-time",
        });
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, (payload) => {
        console.log('Real-time profiles change:', payload);
        setSyncStatus('connected');
        loadData(); // Refresh stats
        
        toast({
          title: "User profiles updated",
          description: "User data updated in real-time",
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
        return <DashboardOverview syncStatus={syncStatus} stats={stats} />;
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
        return <DashboardOverview syncStatus={syncStatus} stats={stats} />;
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
          <AdminHeader 
            activeSection={activeSection} 
            syncStatus={syncStatus}
            user={user}
          />
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
