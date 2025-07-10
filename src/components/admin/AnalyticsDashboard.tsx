
import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Import new focused components
import AnalyticsHeader from './analytics/AnalyticsHeader';
import AnalyticsOverview from './analytics/AnalyticsOverview';
import RealtimeActivity from './analytics/RealtimeActivity';
import AnalyticsCharts from './analytics/AnalyticsCharts';

interface AnalyticsSummary {
  total_page_views: number;
  unique_visitors: number;
  total_sessions: number;
  avg_session_duration: number;
  bounce_rate: number;
  top_pages: Array<{ page: string; views: number }>;
  traffic_sources: Array<{ source: string; sessions: number }>;
  device_breakdown: Array<{ device: string; sessions: number }>;
}

interface RealtimeEvent {
  id: string;
  event_type: string;
  event_name: string;
  page_url: string;
  created_at: string;
  properties: any;
  device_type?: string;
  country?: string;
  city?: string;
}

interface AnalyticsDashboardProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ syncStatus = 'connected' }) => {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(dateRange));
      
      const { data, error } = await supabase.rpc('get_analytics_summary', {
        start_date: startDate.toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0]
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const summary = data[0];
        setAnalytics({
          total_page_views: summary.total_page_views || 0,
          unique_visitors: summary.unique_visitors || 0,
          total_sessions: summary.total_sessions || 0,
          avg_session_duration: summary.avg_session_duration || 0,
          bounce_rate: summary.bounce_rate || 0,
          top_pages: Array.isArray(summary.top_pages) ? summary.top_pages as Array<{ page: string; views: number }> : [],
          traffic_sources: Array.isArray(summary.traffic_sources) ? summary.traffic_sources as Array<{ source: string; sessions: number }> : [],
          device_breakdown: Array.isArray(summary.device_breakdown) ? summary.device_breakdown as Array<{ device: string; sessions: number }> : []
        });
      } else {
        // No data available
        setAnalytics({
          total_page_views: 0,
          unique_visitors: 0,
          total_sessions: 0,
          avg_session_duration: 0,
          bounce_rate: 0,
          top_pages: [],
          traffic_sources: [],
          device_breakdown: []
        });
      }

      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error loading analytics",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [dateRange, toast]);

  const fetchRealtimeEvents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('id, event_type, event_name, page_url, created_at, properties, device_type, country, city')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setRealtimeEvents(data || []);
    } catch (error) {
      console.error('Error fetching realtime events:', error);
    }
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    fetchAnalytics();
    fetchRealtimeEvents();

    // Listen for new analytics events
    const eventsChannel = supabase
      .channel('analytics-events-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'analytics_events'
      }, (payload) => {
        console.log('New analytics event:', payload.new);
        fetchRealtimeEvents();
        fetchAnalytics(); // Refresh summary data
      })
      .subscribe();

    // Auto-refresh every 30 seconds for real-time feel
    const autoRefresh = setInterval(() => {
      fetchAnalytics();
      fetchRealtimeEvents();
    }, 30000);

    return () => {
      supabase.removeChannel(eventsChannel);
      clearInterval(autoRefresh);
    };
  }, [fetchAnalytics, fetchRealtimeEvents]);

  const handleRefresh = () => {
    fetchAnalytics();
    fetchRealtimeEvents();
  };

  return (
    <div className="space-y-6">
      <AnalyticsHeader
        syncStatus={syncStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={handleRefresh}
        loading={loading}
        lastUpdate={lastUpdate}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <AnalyticsOverview 
            analytics={analytics} 
            dateRange={dateRange} 
            loading={loading} 
          />
        </TabsContent>
        
        <TabsContent value="realtime" className="space-y-6">
          <RealtimeActivity events={realtimeEvents} />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsCharts analytics={analytics} />
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsOverview 
              analytics={analytics} 
              dateRange={dateRange} 
              loading={loading} 
            />
            <RealtimeActivity events={realtimeEvents.slice(0, 5)} />
          </div>
          <AnalyticsCharts analytics={analytics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
