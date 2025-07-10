
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff } from 'lucide-react';
import { useRealTimeDashboard } from '@/hooks/useRealTimeDashboard';
import { MetricCard } from './dashboard/MetricCard';
import { ActivityFeed } from './dashboard/ActivityFeed';
import { SystemHealth } from './dashboard/SystemHealth';
import { QuickActions } from './dashboard/QuickActions';
import { Users, Briefcase, FileText, User } from 'lucide-react';

interface DashboardOverviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  stats?: {
    totalContent: number;
    totalServices: number;
    totalMedia: number;
    totalUsers: number;
  };
  onSectionChange?: (section: string) => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  syncStatus = 'disconnected',
  onSectionChange = () => {}
}) => {
  const { stats: realTimeStats, loading, refreshData } = useRealTimeDashboard();

  const getSyncStatusIcon = () => {
    switch (realTimeStats.systemHealth.realtime) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-success" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-8 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                Dashboard
              </h2>
              <p className="text-lg text-muted-foreground">Real-time healthcare platform management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                {getSyncStatusIcon()}
              </div>
              <Badge variant="outline" className="glass border-0 text-sm bg-gradient-to-r from-primary/10 to-primary-light/10 text-black border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  {realTimeStats.systemHealth.realtime === 'connected' ? 'Live Data' : 'Offline'}
                </div>
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Leads"
            value={realTimeStats.totalLeads}
            icon={Users}
            color="chart-1"
            subtitle="Customer inquiries"
            animationDelay="0.1s"
          />
          
          <MetricCard
            title="Services"
            value={realTimeStats.totalServices}
            icon={Briefcase}
            color="chart-2"
            subtitle="Available offerings"
            animationDelay="0.2s"
          />
          
          <MetricCard
            title="Blog Posts"
            value={realTimeStats.totalBlogPosts}
            icon={FileText}
            color="chart-3"
            subtitle="Published articles"
            animationDelay="0.3s"
          />
          
          <MetricCard
            title="System Users"
            value={realTimeStats.totalUsers}
            icon={User}
            color="chart-4"
            subtitle="Registered accounts"
            animationDelay="0.4s"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
            <QuickActions onSectionChange={onSectionChange} onRefresh={refreshData} />
          </div>

          {/* Activity Feed */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <ActivityFeed activities={realTimeStats.recentActivity} />
          </div>

          {/* System Health */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.7s' }}>
            <SystemHealth health={realTimeStats.systemHealth} />
          </div>
        </div>
        
        {/* Bottom spacing for better UX */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default DashboardOverview;
