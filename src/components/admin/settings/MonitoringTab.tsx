import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Database, 
  Zap, 
  Users, 
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SystemActivity {
  id: string;
  activityType: string;
  activityDescription: string;
  userId?: string;
  metadata: any;
  createdAt: string;
}

interface MonitoringTabProps {
  metrics: any;
  recentActivity: SystemActivity[];
  onRefresh: () => void;
}

export const MonitoringTab: React.FC<MonitoringTabProps> = ({ 
  metrics, 
  recentActivity, 
  onRefresh 
}) => {
  const performanceMetrics = [
    {
      title: 'CPU Usage',
      value: '12%',
      trend: -2.3,
      status: 'good',
      icon: Zap,
      color: 'chart-1'
    },
    {
      title: 'Memory Usage',
      value: '34%',
      trend: 1.8,
      status: 'good',
      icon: Database,
      color: 'chart-2'
    },
    {
      title: 'Active Sessions',
      value: '24',
      trend: 5.2,
      status: 'good',
      icon: Users,
      color: 'chart-3'
    },
    {
      title: 'Response Time',
      value: '145ms',
      trend: -12.5,
      status: 'excellent',
      icon: Clock,
      color: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend < 0) return <TrendingDown className="h-3 w-3 text-destructive" />;
    return <div className="h-3 w-3" />;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'configuration_update': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'security_update': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'user_login': return <Users className="h-4 w-4 text-success" />;
      case 'system_error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Refresh */}
      <Card className="glass border-0 shadow-glow gradient-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold gradient-text font-apple">System Monitoring</CardTitle>
                <p className="text-sm text-muted-foreground font-apple">Real-time performance and activity monitoring</p>
              </div>
            </div>
            <Button onClick={onRefresh} variant="outline" size="sm" className="font-apple">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 gradient-card group hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg gradient-primary group-hover:opacity-90 transition-all duration-300">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium text-foreground font-apple">{metric.title}</CardTitle>
                        <div className={`text-2xl font-bold gradient-text font-apple ${getStatusColor(metric.status)}`}>
                          {metric.value}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-xs font-apple ${metric.trend > 0 ? 'text-success' : metric.trend < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {Math.abs(metric.trend)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="glass border-0 shadow-glow gradient-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold gradient-text font-apple">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 gradient-text font-apple">Performance Charts</h3>
                <p className="text-muted-foreground text-sm font-apple">
                  Real-time performance visualization coming soon.
                  Will include CPU, memory, and response time trends.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass border-0 shadow-glow gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold gradient-text font-apple">System Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-apple">No recent activity</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 glass border-0 rounded-xl gradient-card hover:opacity-90 transition-all duration-300">
                  <div className="p-2 rounded-lg gradient-primary">
                    {getActivityIcon(activity.activityType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate font-apple">
                        {activity.activityDescription}
                      </p>
                      <Badge variant="outline" className="text-xs ml-2 font-apple">
                        {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 capitalize font-apple">
                      {activity.activityType.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* System Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-0 shadow-glow border-success/20 bg-success/5 gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-success" />
              <CardTitle className="text-lg font-semibold gradient-text font-apple">Database Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-apple">Connection Pool</span>
                <Badge className="bg-success text-white font-apple">Optimal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Query Performance</span>
                <Badge className="bg-success text-white font-apple">Fast</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Storage Usage</span>
                <Badge className="bg-primary text-white font-apple">Normal</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-glow border-primary/20 bg-primary/5 gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold gradient-text font-apple">API Health</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-apple">Response Time</span>
                <Badge className="bg-success text-white font-apple">Excellent</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Error Rate</span>
                <Badge className="bg-success text-white font-apple">0.01%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Uptime</span>
                <Badge className="bg-success text-white font-apple">99.9%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-glow border-chart-3/20 bg-chart-3/5 gradient-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-chart-3" />
              <CardTitle className="text-lg font-semibold gradient-text font-apple">User Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-apple">Active Users</span>
                <Badge className="bg-chart-3 text-white font-apple">{metrics.totalUsers}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Sessions Today</span>
                <Badge className="bg-primary text-white font-apple">47</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-apple">Avg Session Time</span>
                <Badge className="bg-success text-white font-apple">12 min</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};