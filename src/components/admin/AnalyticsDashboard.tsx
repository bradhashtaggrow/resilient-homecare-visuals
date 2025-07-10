
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Wifi, 
  WifiOff, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor,
  Tablet,
  RefreshCw,
  Calendar,
  MousePointer
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
}

interface AnalyticsDashboardProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ syncStatus = 'disconnected' }) => {
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
        .select('id, event_type, event_name, page_url, created_at, properties')
        .order('created_at', { ascending: false })
        .limit(10);

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

    // Auto-refresh every 5 minutes
    const autoRefresh = setInterval(() => {
      fetchAnalytics();
      fetchRealtimeEvents();
    }, 300000);

    return () => {
      supabase.removeChannel(eventsChannel);
      clearInterval(autoRefresh);
    };
  }, [fetchAnalytics, fetchRealtimeEvents]);

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'syncing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-red-600" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const formatPageUrl = (url: string) => {
    if (url === '/') return 'Home';
    return url.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home';
  };

  const getPercentageChange = (current: number, comparison: number) => {
    if (comparison === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - comparison) / comparison) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Real-time website performance and user engagement metrics</p>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fetchAnalytics();
              fetchRealtimeEvents();
            }}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>{syncStatus === 'connected' ? 'Live Data' : 'Offline'}</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics?.total_page_views?.toLocaleString() || '0'}</div>
                    <p className="text-xs text-muted-foreground">
                      Total page views in {dateRange} days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics?.unique_visitors?.toLocaleString() || '0'}</div>
                    <p className="text-xs text-muted-foreground">
                      Unique sessions in {dateRange} days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics?.avg_session_duration ? formatDuration(Math.round(analytics.avg_session_duration)) : '0m 0s'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average time on site
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analytics?.bounce_rate ? `${Math.round(analytics.bounce_rate)}%` : '0%'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Single page sessions
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analytics?.device_breakdown && analytics.device_breakdown.length > 0 ? (
                      <div className="space-y-3">
                        {analytics.device_breakdown.map((device, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(device.device)}
                              <span className="font-medium capitalize">{device.device}</span>
                            </div>
                            <span className="text-sm text-gray-600">{device.sessions} sessions</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 text-center py-4">No device data available yet</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Total Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {analytics?.total_sessions?.toLocaleString() || '0'}
                      </div>
                      <p className="text-gray-600">Total user sessions</p>
                      <p className="text-xs text-gray-500 mt-2">
                        in the last {dateRange} days
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="realtime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Real-time Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {realtimeEvents.length > 0 ? (
                <div className="space-y-3">
                  {realtimeEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MousePointer className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-medium">{event.event_name}</p>
                          <p className="text-sm text-gray-600">{formatPageUrl(event.page_url)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          {new Date(event.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No recent activity</p>
                  <p className="text-sm text-gray-500">Real-time events will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.top_pages && analytics.top_pages.length > 0 ? (
                <div className="space-y-3">
                  {analytics.top_pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{formatPageUrl(page.page)}</p>
                          <p className="text-sm text-gray-600">{page.page}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{page.views} views</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No page data available yet</p>
                  <p className="text-sm text-gray-500">Page analytics will appear as users visit your site</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics?.traffic_sources && analytics.traffic_sources.length > 0 ? (
                <div className="space-y-3">
                  {analytics.traffic_sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium">{source.source}</p>
                          <p className="text-sm text-gray-600">Referral source</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{source.sessions} sessions</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No traffic source data available yet</p>
                  <p className="text-sm text-gray-500">Traffic sources will appear as users visit your site</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
