import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Database, HardDrive, Wifi } from 'lucide-react';

interface SystemHealthProps {
  health: {
    database: 'healthy' | 'warning' | 'error';
    storage: 'healthy' | 'warning' | 'error';
    realtime: 'connected' | 'disconnected' | 'syncing';
  };
}

export const SystemHealth: React.FC<SystemHealthProps> = ({ health }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
        return <CheckCircle className="h-3 w-3" />;
      case 'warning':
      case 'syncing':
        return <AlertCircle className="h-3 w-3" />;
      case 'error':
      case 'disconnected':
        return <XCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'connected':
        return 'bg-gradient-to-r from-success to-success/80';
      case 'warning':
      case 'syncing':
        return 'bg-gradient-to-r from-warning to-warning/80';
      case 'error':
      case 'disconnected':
        return 'bg-gradient-to-r from-destructive to-destructive/80';
      default:
        return 'bg-gradient-to-r from-muted to-muted/80';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'connected': return 'Connected';
      case 'warning': return 'Warning';
      case 'syncing': return 'Syncing';
      case 'error': return 'Error';
      case 'disconnected': return 'Disconnected';
      default: return 'Unknown';
    }
  };

  const healthItems = [
    {
      name: 'Database',
      icon: Database,
      status: health.database
    },
    {
      name: 'Storage',
      icon: HardDrive,
      status: health.storage
    },
    {
      name: 'Real-time',
      icon: Wifi,
      status: health.realtime
    }
  ];

  return (
    <Card className="glass border-0 shadow-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <CardTitle className="text-xl font-semibold">System Health</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {healthItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="flex items-center justify-between p-3 glass border-0 rounded-xl">
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <Badge className={`border-0 ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                <span className="ml-1">{getStatusText(item.status)}</span>
              </Badge>
            </div>
          );
        })}
        
        <div className="mt-6 p-4 glass border-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary-light/5">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">All systems operational</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Last checked: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};