
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  Users, 
  Globe, 
  Activity, 
  TrendingUp, 
  Eye,
  FileText,
  Image,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardStats {
  totalServices: number;
  totalContent: number;
  totalMedia: number;
  recentActivity: Array<{
    action: string;
    time: string;
    type: string;
  }>;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    totalContent: 0,
    totalMedia: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    setupRealtimeUpdates();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get services count
      const { count: servicesCount } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true });

      // Get content count
      const { count: contentCount } = await supabase
        .from('website_content')
        .select('*', { count: 'exact', head: true });

      // Get media count
      const { count: mediaCount } = await supabase
        .from('media_library')
        .select('*', { count: 'exact', head: true });

      // Get recent activity (last 10 records across all tables)
      const { data: recentServices } = await supabase
        .from('services')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: recentContent } = await supabase
        .from('website_content')
        .select('section_key, updated_at')
        .order('updated_at', { ascending: false })
        .limit(5);

      const { data: recentMedia } = await supabase
        .from('media_library')
        .select('original_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      // Combine and format recent activity
      const recentActivity = [
        ...(recentServices || []).map(item => ({
          action: `Added service: ${item.title}`,
          time: new Date(item.created_at).toLocaleString(),
          type: 'service'
        })),
        ...(recentContent || []).map(item => ({
          action: `Updated ${item.section_key} content`,
          time: new Date(item.updated_at).toLocaleString(),
          type: 'content'
        })),
        ...(recentMedia || []).map(item => ({
          action: `Uploaded ${item.original_name}`,
          time: new Date(item.created_at).toLocaleString(),
          type: 'media'
        }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 4);

      setStats({
        totalServices: servicesCount || 0,
        totalContent: contentCount || 0,
        totalMedia: mediaCount || 0,
        recentActivity
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeUpdates = () => {
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, () => loadDashboardData())
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, () => loadDashboardData())
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'media_library'
      }, () => loadDashboardData())
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const displayStats = [
    {
      title: 'Active Services',
      value: stats.totalServices.toString(),
      change: '+2',
      trend: 'up' as const,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Content Sections',
      value: stats.totalContent.toString(),
      change: '+3',
      trend: 'up' as const,
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Media Files',
      value: stats.totalMedia.toString(),
      change: `+${Math.max(0, stats.totalMedia - 10)}`,
      trend: 'up' as const,
      icon: Image,
      color: 'purple'
    },
    {
      title: 'System Status',
      value: 'Online',
      change: '99.9%',
      trend: 'up' as const,
      icon: Globe,
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin</h1>
        <p className="text-blue-100 text-lg">
          Here's what's happening with your healthcare platform today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                  }`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <FileText className="h-6 w-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Edit Content</p>
                <p className="text-sm text-gray-600">Update website text</p>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <Activity className="h-6 w-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Add Service</p>
                <p className="text-sm text-gray-600">Create new service</p>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <Image className="h-6 w-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Upload Media</p>
                <p className="text-sm text-gray-600">Add images/videos</p>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
                <Eye className="h-6 w-6 text-orange-600 mb-2" />
                <p className="font-medium text-gray-900">Preview Site</p>
                <p className="text-sm text-gray-600">View live changes</p>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest changes and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.length > 0 ? (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'content' ? 'bg-blue-500' :
                      activity.type === 'service' ? 'bg-green-500' :
                      activity.type === 'media' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-purple-600" />
            System Status
          </CardTitle>
          <CardDescription>Current system health and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse" />
              </div>
              <p className="font-semibold text-gray-900">Website Status</p>
              <p className="text-sm text-green-600">Online & Healthy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900">Performance</p>
              <p className="text-sm text-blue-600">Excellent (98%)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="font-semibold text-gray-900">Data Sync</p>
              <p className="text-sm text-purple-600">Real-time Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
