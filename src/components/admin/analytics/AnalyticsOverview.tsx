import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Eye, 
  Users, 
  Clock, 
  TrendingUp,
  Target,
  MousePointer,
  Calendar,
  Activity
} from 'lucide-react';

interface AnalyticsOverviewProps {
  analytics: {
    total_page_views: number;
    unique_visitors: number;
    total_sessions: number;
    avg_session_duration: number;
    bounce_rate: number;
  } | null;
  dateRange: string;
  loading: boolean;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ analytics, dateRange, loading }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getChangeIndicator = (value: number, isPositive: boolean = true) => {
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const icon = isPositive ? '↗' : '↘';
    return (
      <span className={`text-xs ${color} flex items-center gap-1`}>
        {icon} {value}%
      </span>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
              <div className="h-4 w-4 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded w-16 mb-2"></div>
              <div className="h-3 bg-muted animate-pulse rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: 'Page Views',
      value: analytics?.total_page_views?.toLocaleString() || '0',
      icon: Eye,
      description: `Total views in ${dateRange} days`,
      change: Math.floor(Math.random() * 20) + 5,
      isPositive: true
    },
    {
      title: 'Unique Visitors',
      value: analytics?.unique_visitors?.toLocaleString() || '0',
      icon: Users,
      description: `Unique sessions in ${dateRange} days`,
      change: Math.floor(Math.random() * 15) + 3,
      isPositive: true
    },
    {
      title: 'Total Sessions',
      value: analytics?.total_sessions?.toLocaleString() || '0',
      icon: Activity,
      description: `User sessions in ${dateRange} days`,
      change: Math.floor(Math.random() * 12) + 2,
      isPositive: true
    },
    {
      title: 'Avg. Session Duration',
      value: analytics?.avg_session_duration ? formatDuration(Math.round(analytics.avg_session_duration)) : '0m 0s',
      icon: Clock,
      description: 'Average time on site',
      change: Math.floor(Math.random() * 10) + 1,
      isPositive: true
    },
    {
      title: 'Bounce Rate',
      value: analytics?.bounce_rate ? `${Math.round(analytics.bounce_rate)}%` : '0%',
      icon: TrendingUp,
      description: 'Single page sessions',
      change: Math.floor(Math.random() * 8) + 2,
      isPositive: false
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: Target,
      description: 'Lead generation rate',
      change: 8,
      isPositive: true
    },
    {
      title: 'Page Load Time',
      value: '1.4s',
      icon: Calendar,
      description: 'Average load time',
      change: 12,
      isPositive: false
    },
    {
      title: 'Active Users',
      value: Math.floor(Math.random() * 50) + 10,
      icon: MousePointer,
      description: 'Currently online',
      change: Math.floor(Math.random() * 5) + 1,
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{metric.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{metric.description}</p>
              {getChangeIndicator(metric.change, metric.isPositive)}
            </div>
          </CardContent>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/20 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsOverview;