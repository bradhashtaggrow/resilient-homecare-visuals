import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Zap,
  Globe,
  MousePointer,
  Activity,
  Target,
  BarChart3
} from 'lucide-react';
import { useRealTimeAnalytics } from '@/hooks/useRealTimeAnalytics';

export const EnhancedAnalyticsOverview = () => {
  const { analytics, loading, realtimeEvents } = useRealTimeAnalytics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-8 bg-muted rounded w-1/2 mt-2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: 'Real-time Visitors',
      value: analytics?.realtimeVisitors || 0,
      change: '+12%',
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Active now',
      trend: 'up',
      pulse: true
    },
    {
      title: 'Total Page Views',
      value: analytics?.totalPageViews.toLocaleString() || '0',
      change: '+8.2%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'All time',
      trend: 'up'
    },
    {
      title: 'Unique Visitors',
      value: analytics?.uniqueVisitors.toLocaleString() || '0',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'This month',
      trend: 'up'
    },
    {
      title: 'Total Sessions',
      value: analytics?.totalSessions.toLocaleString() || '0',
      change: '+6.1%',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'This month',
      trend: 'up'
    },
    {
      title: 'Avg. Session Duration',
      value: `${Math.floor((analytics?.avgSessionDuration || 0) / 60)}m ${Math.floor((analytics?.avgSessionDuration || 0) % 60)}s`,
      change: '+4.7%',
      icon: Clock,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Per session',
      trend: 'up'
    },
    {
      title: 'Bounce Rate',
      value: `${analytics?.bounceRate.toFixed(1)}%`,
      change: '-2.3%',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Lower is better',
      trend: 'down'
    },
    {
      title: 'Top Traffic Source',
      value: analytics?.trafficSources[0]?.source || 'Direct',
      change: `${analytics?.trafficSources[0]?.sessions || 0} sessions`,
      icon: Globe,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Primary channel',
      trend: 'neutral'
    },
    {
      title: 'Conversion Rate',
      value: '8.3%',
      change: '+1.2%',
      icon: BarChart3,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Goal completions',
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Today's Highlights */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Today's Performance</h3>
            <p className="text-sm text-muted-foreground">Real-time insights for {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{analytics?.todayStats.visitors}</div>
            <div className="text-xs text-muted-foreground">Visitors Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{analytics?.todayStats.pageViews}</div>
            <div className="text-xs text-muted-foreground">Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{Math.floor(analytics?.todayStats.avgDuration || 0 / 60)}m</div>
            <div className="text-xs text-muted-foreground">Avg. Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analytics?.todayStats.bounceRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Bounce Rate</div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title} className={`group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md ${metric.pulse ? 'animate-pulse' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  <div className={`text-xs font-medium flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-green-600' : 
                    'text-muted-foreground'
                  }`}>
                    {metric.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                    {metric.trend === 'down' && <TrendingUp className="h-3 w-3 rotate-180" />}
                    {metric.change}
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

      {/* Live Activity Feed */}
      {realtimeEvents.length > 0 && (
        <Card className="bg-gradient-to-br from-card/50 to-card backdrop-blur-sm border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Activity className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Activity Feed</CardTitle>
                <CardDescription>Real-time visitor interactions</CardDescription>
              </div>
              <div className="ml-auto">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {realtimeEvents.slice(0, 5).map((event, index) => (
                <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 animate-fade-in">
                  <MousePointer className="h-4 w-4 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {event.event_type === 'page_view' ? 'Page View' : event.event_type}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {event.page_url} • {event.country} • {event.device_type}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};