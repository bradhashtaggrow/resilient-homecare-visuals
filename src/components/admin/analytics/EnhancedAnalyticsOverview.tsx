import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Eye, 
  Clock, 
  Zap,
  Activity,
  Target
} from 'lucide-react';
import { useRealTimeAnalytics } from '@/hooks/useRealTimeAnalytics';

export const EnhancedAnalyticsOverview = () => {
  const { analytics, loading, realtimeEvents } = useRealTimeAnalytics();

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading analytics...</div>;
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">No Analytics Data Available</h3>
        <p className="text-muted-foreground">Start browsing your website to see real-time analytics data here.</p>
      </div>
    );
  }

  const metrics = [
    {
      title: 'Real-time Visitors',
      value: analytics.realtimeVisitors,
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Active now',
      pulse: true
    },
    {
      title: 'Total Page Views',
      value: analytics.totalPageViews.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'All time'
    },
    {
      title: 'Unique Visitors',
      value: analytics.uniqueVisitors.toLocaleString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'This month'
    },
    {
      title: 'Total Sessions',
      value: analytics.totalSessions.toLocaleString(),
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'This month'
    },
    {
      title: 'Avg. Session Duration',
      value: `${Math.floor(analytics.avgSessionDuration / 60)}m ${Math.floor(analytics.avgSessionDuration % 60)}s`,
      icon: Clock,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Per session'
    },
    {
      title: 'Bounce Rate',
      value: `${analytics.bounceRate.toFixed(1)}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Lower is better'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Today's Highlights - Real Data Only */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Today's Performance</h3>
            <p className="text-sm text-muted-foreground">Real-time insights for {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{analytics.todayStats.visitors}</div>
            <div className="text-xs text-muted-foreground">Visitors Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{analytics.todayStats.pageViews}</div>
            <div className="text-xs text-black">Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{Math.floor(analytics.todayStats.avgDuration / 60)}m</div>
            <div className="text-xs text-black">Avg. Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.todayStats.bounceRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Bounce Rate</div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid - Real Data Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title} className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md ${metric.pulse ? 'animate-pulse' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs">
                  {metric.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};