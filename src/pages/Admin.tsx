
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import WebsiteContentManager from '@/components/admin/WebsiteContentManager';
import PageContentManager from '@/components/admin/PageContentManager';
import RealTimePreview from '@/components/admin/RealTimePreview';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import BlogManager from '@/components/admin/BlogManager';
import UserManagement from '@/components/admin/UserManagement';
import LeadsManager from '@/components/admin/LeadsManager';
import SystemSettings from '@/components/admin/SystemSettings';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedPage, setSelectedPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('disconnected');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalContent: 0,
    totalServices: 0,
    totalMedia: 0,
    totalUsers: 0
  });
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  // Load initial data and stats
  useEffect(() => {
    loadData();
    setupStorageMonitoring();
  }, []);

  // Handle sidebar behavior based on screen size
  useEffect(() => {
    // On desktop, keep sidebar open by default; on mobile/tablet, keep it closed
    if (!isMobile && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const loadData = async () => {
    try {
      setLoading(true);
      setSyncStatus('syncing');
      
      // Fetch stats from storage and database
      const [servicesResult, usersResult] = await Promise.all([
        supabase.from('services').select('count', { count: 'exact', head: true }),
        supabase.from('profiles').select('count', { count: 'exact', head: true })
      ]);

      // Get storage stats
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('media')
        .list('website-content', { limit: 1000 });

      if (servicesResult.error) throw servicesResult.error;
      if (usersResult.error) throw usersResult.error;
      if (storageError) console.warn('Storage access limited:', storageError);

      setStats({
        totalContent: storageFiles?.length || 0,
        totalServices: servicesResult.count || 0,
        totalMedia: storageFiles?.length || 0,
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

  const setupStorageMonitoring = () => {
    setSyncStatus('syncing');
    
    // Monitor database changes that might affect stats
    const channel = supabase
      .channel('admin-storage-updates')
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
        console.log('Storage monitoring status:', status);
        setSyncStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      });

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(channel);
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
        return <DashboardOverview syncStatus={syncStatus} stats={stats} onSectionChange={setActiveSection} />;
      case 'content':
        return selectedPage === 'home' ? 
          <WebsiteContentManager syncStatus={syncStatus} /> :
          <PageContentManager syncStatus={syncStatus} selectedPage={selectedPage} />;
      case 'preview':
        return <RealTimePreview syncStatus={syncStatus} isFullScreen={!sidebarOpen} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'blog':
        return <BlogManager />;
      case 'users':
        return <UserManagement syncStatus={syncStatus} />;
      case 'leads':
        return <LeadsManager syncStatus={syncStatus} />;
      case 'settings':
        return <SystemSettings syncStatus={syncStatus} />;
      default:
        return <DashboardOverview syncStatus={syncStatus} stats={stats} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Mobile/tablet overlay */}
      {sidebarOpen && (isMobile || window.innerWidth < 1024) && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${
        sidebarOpen 
          ? (isMobile || window.innerWidth < 1024)
            ? 'fixed left-0 top-0 z-50 w-80 h-full bg-white shadow-lg' 
            : 'relative w-80'
          : 'hidden'
      }`}>
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={(section) => {
            setActiveSection(section);
            // Auto-close sidebar on mobile/tablet after selection
            if (isMobile || window.innerWidth < 1024) {
              setSidebarOpen(false);
            }
          }}
          syncStatus={syncStatus}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader 
          activeSection={activeSection} 
          syncStatus={syncStatus}
          user={user}
          selectedPage={selectedPage}
          onPageChange={setSelectedPage}
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto admin-scrollbar">
          <div className={`${sidebarOpen ? 'p-3 sm:p-4 lg:p-6' : 'p-2 sm:p-3 lg:p-4'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
