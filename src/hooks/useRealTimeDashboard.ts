import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalLeads: number;
  totalServices: number;
  totalUsers: number;
  totalBlogPosts: number;
  recentLeads: any[];
  recentActivity: any[];
  systemHealth: {
    database: 'healthy' | 'warning' | 'error';
    storage: 'healthy' | 'warning' | 'error';
    realtime: 'connected' | 'disconnected' | 'syncing';
  };
}

export const useRealTimeDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    totalServices: 0,
    totalUsers: 0,
    totalBlogPosts: 0,
    recentLeads: [],
    recentActivity: [],
    systemHealth: {
      database: 'healthy',
      storage: 'healthy',
      realtime: 'disconnected'
    }
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [
        leadsResult,
        servicesResult,
        usersResult,
        blogPostsResult,
        recentLeadsResult
      ] = await Promise.all([
        supabase.from('leads').select('count', { count: 'exact', head: true }),
        supabase.from('services').select('count', { count: 'exact', head: true }),
        supabase.from('profiles').select('count', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('count', { count: 'exact', head: true }),
        supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      setStats(prev => ({
        ...prev,
        totalLeads: leadsResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalUsers: usersResult.count || 0,
        totalBlogPosts: blogPostsResult.count || 0,
        recentLeads: recentLeadsResult.data || [],
        systemHealth: {
          ...prev.systemHealth,
          database: 'healthy',
          storage: 'healthy'
        }
      }));

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setStats(prev => ({
        ...prev,
        systemHealth: {
          ...prev.systemHealth,
          database: 'error'
        }
      }));
      toast({
        title: "Dashboard Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeSubscriptions = () => {
    setStats(prev => ({
      ...prev,
      systemHealth: {
        ...prev.systemHealth,
        realtime: 'syncing'
      }
    }));

    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'leads'
      }, (payload) => {
        console.log('Real-time leads change:', payload);
        loadDashboardData();
        
        setStats(prev => ({
          ...prev,
          recentActivity: [
            {
              id: Date.now(),
              type: 'lead',
              action: payload.eventType,
              timestamp: new Date(),
              data: payload.new || payload.old
            },
            ...prev.recentActivity.slice(0, 9)
          ]
        }));

        toast({
          title: "New Lead Activity",
          description: `Lead ${payload.eventType === 'INSERT' ? 'created' : payload.eventType === 'UPDATE' ? 'updated' : 'deleted'}`,
        });
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Real-time services change:', payload);
        loadDashboardData();
        
        setStats(prev => ({
          ...prev,
          recentActivity: [
            {
              id: Date.now(),
              type: 'service',
              action: payload.eventType,
              timestamp: new Date(),
              data: payload.new || payload.old
            },
            ...prev.recentActivity.slice(0, 9)
          ]
        }));
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, (payload) => {
        console.log('Real-time blog posts change:', payload);
        loadDashboardData();
        
        setStats(prev => ({
          ...prev,
          recentActivity: [
            {
              id: Date.now(),
              type: 'blog',
              action: payload.eventType,
              timestamp: new Date(),
              data: payload.new || payload.old
            },
            ...prev.recentActivity.slice(0, 9)
          ]
        }));
      })
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        setStats(prev => ({
          ...prev,
          systemHealth: {
            ...prev.systemHealth,
            realtime: status === 'SUBSCRIBED' ? 'connected' : 'disconnected'
          }
        }));
      });

    return () => {
      supabase.removeChannel(channel);
    };
  };

  useEffect(() => {
    loadDashboardData();
    const cleanup = setupRealTimeSubscriptions();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadDashboardData, 30000);
    
    return () => {
      cleanup();
      clearInterval(interval);
    };
  }, []);

  return {
    stats,
    loading,
    refreshData: loadDashboardData
  };
};