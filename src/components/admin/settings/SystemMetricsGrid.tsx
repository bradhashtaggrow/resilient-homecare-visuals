import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, Database, HardDrive, Zap, Shield, Clock, Users, Server } from 'lucide-react';

interface SystemMetrics {
  databaseSize: string;
  totalTables: number;
  totalUsers: number;
  storageUsed: string;
  uptime: string;
  lastBackup: Date | null;
  systemVersion: string;
  apiCalls: number;
}

interface SystemMetricsProps {
  metrics: SystemMetrics;
  systemHealth: {
    database: 'healthy' | 'warning' | 'error';
    storage: 'healthy' | 'warning' | 'error';
    api: 'healthy' | 'warning' | 'error';
    security: 'healthy' | 'warning' | 'error';
  };
}

export const SystemMetricsGrid: React.FC<SystemMetricsProps> = ({ metrics, systemHealth }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const metricsCards = [
    {
      title: 'Database',
      value: metrics.databaseSize,
      subtitle: `${metrics.totalTables} tables`,
      icon: Database,
      status: systemHealth.database,
      color: 'chart-1'
    },
    {
      title: 'Storage Used',
      value: metrics.storageUsed,
      subtitle: 'Media & files',
      icon: HardDrive,
      status: systemHealth.storage,
      color: 'chart-2'
    },
    {
      title: 'System Users',
      value: metrics.totalUsers.toString(),
      subtitle: 'Active accounts',
      icon: Users,
      status: systemHealth.security,
      color: 'chart-3'
    },
    {
      title: 'API Calls',
      value: metrics.apiCalls.toLocaleString(),
      subtitle: 'This month',
      icon: Zap,
      status: systemHealth.api,
      color: 'chart-4'
    },
    {
      title: 'System Uptime',
      value: metrics.uptime,
      subtitle: 'Continuous operation',
      icon: Clock,
      status: 'healthy',
      color: 'success'
    },
    {
      title: 'Version',
      value: metrics.systemVersion,
      subtitle: 'Current release',
      icon: Server,
      status: 'healthy',
      color: 'primary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricsCards.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={metric.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${metric.color}/10 to-${metric.color}/20 group-hover:from-${metric.color}/20 group-hover:to-${metric.color}/30 transition-all duration-300`}>
                    <Icon className={`h-6 w-6 text-${metric.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(metric.status)}
                    <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`text-2xl font-bold mb-1 ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                {metric.title === 'System Uptime' && metrics.lastBackup && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Last backup: {metrics.lastBackup.toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};