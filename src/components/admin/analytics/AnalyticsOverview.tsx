import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Users, Eye, Clock, TrendingUp, Globe, MousePointer, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface OverviewStats {
  totalSessions: number;
  totalPageViews: number;
  avgSessionDuration: number;
  bounceRate: number;
  uniqueVisitors: number;
  currentActiveUsers: number;
}

export const AnalyticsOverview = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalSessions: 0,
    totalPageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    uniqueVisitors: 0,
    currentActiveUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverviewStats = async () => {
      try {
        // Get total sessions from today
        const today = new Date().toISOString().split('T')[0];
        
        const { data: sessionsData } = await supabase
          .from('analytics_sessions')
          .select('*')
          .gte('started_at', today);

        // Get total page views from today
        const { data: pageViewsData } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('event_type', 'page_view')
          .gte('created_at', today);

        // Calculate stats
        const totalSessions = sessionsData?.length || 0;
        const totalPageViews = pageViewsData?.length || 0;
        
        // Calculate average session duration
        const sessionsWithDuration = sessionsData?.filter(s => s.duration_seconds) || [];
        const avgSessionDuration = sessionsWithDuration.length > 0 
          ? sessionsWithDuration.reduce((acc, s) => acc + (s.duration_seconds || 0), 0) / sessionsWithDuration.length
          : 0;

        // Calculate bounce rate
        const bouncedSessions = sessionsData?.filter(s => s.is_bounce) || [];
        const bounceRate = totalSessions > 0 ? (bouncedSessions.length / totalSessions) * 100 : 0;

        // Get unique visitors (sessions with unique session_id)
        const uniqueVisitors = new Set(sessionsData?.map(s => s.session_id) || []).size;

        // Get current active users (sessions active in last 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const { data: activeUsersData } = await supabase
          .from('analytics_events')
          .select('session_id')
          .gte('created_at', fiveMinutesAgo);

        const currentActiveUsers = new Set(activeUsersData?.map(e => e.session_id) || []).size;

        setStats({
          totalSessions,
          totalPageViews,
          avgSessionDuration: Math.round(avgSessionDuration),
          bounceRate: Math.round(bounceRate),
          uniqueVisitors,
          currentActiveUsers
        });
      } catch (error) {
        console.error('Error fetching overview stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchOverviewStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const metrics = [
    {
      title: "Active Users",
      value: stats.currentActiveUsers.toLocaleString(),
      icon: Activity,
      gradient: "from-primary to-primary-light",
      change: "+12%",
      changeType: "positive",
      pulse: true
    },
    {
      title: "Total Sessions", 
      value: stats.totalSessions.toLocaleString(),
      icon: Globe,
      gradient: "from-primary to-primary-light",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Page Views",
      value: stats.totalPageViews.toLocaleString(),
      icon: Eye,
      gradient: "from-primary to-primary-light",
      change: "+15%",
      changeType: "positive"
    },
    {
      title: "Avg. Session",
      value: formatDuration(stats.avgSessionDuration),
      icon: Clock,
      gradient: "from-primary to-primary-light",
      change: "-2%",
      changeType: "negative"
    },
    {
      title: "Bounce Rate",
      value: `${stats.bounceRate}%`,
      icon: MousePointer,
      gradient: "from-primary to-primary-light",
      change: "-5%",
      changeType: "positive"
    },
    {
      title: "Unique Visitors",
      value: stats.uniqueVisitors.toLocaleString(),
      icon: TrendingUp,
      gradient: "from-primary to-primary-light",
      change: "+18%",
      changeType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.changeType === 'positive' ? ArrowUpRight : ArrowDownRight;
        
        return (
          <Card 
            key={metric.title} 
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            {/* Content */}
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      {metric.title}
                    </p>
                    {metric.pulse && (
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <p className="text-3xl font-bold tracking-tight">
                    {loading ? (
                      <div className="w-16 h-8 bg-muted rounded animate-pulse"></div>
                    ) : (
                      metric.value
                    )}
                  </p>
                  
                  <Badge 
                    variant="outline" 
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      metric.changeType === 'positive' 
                        ? 'text-success border-success/20 bg-success/5' 
                        : 'text-destructive border-destructive/20 bg-destructive/5'
                    }`}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {metric.change}
                  </Badge>
                </div>
                
                {/* Icon with gradient background */}
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Hover effect bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};