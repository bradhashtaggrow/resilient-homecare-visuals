import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, User, FileText, Briefcase } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: number;
  type: 'lead' | 'service' | 'blog' | 'user';
  action: string;
  timestamp: Date;
  data: any;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lead': return User;
      case 'service': return Briefcase;
      case 'blog': return FileText;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'lead': return 'chart-1';
      case 'service': return 'chart-2';
      case 'blog': return 'chart-3';
      default: return 'primary';
    }
  };

  const getActivityLabel = (type: string, action: string) => {
    const actionMap = {
      INSERT: 'created',
      UPDATE: 'updated',
      DELETE: 'deleted'
    };
    return `${type} ${actionMap[action as keyof typeof actionMap] || action}`;
  };

  return (
    <Card className="glass border-0 shadow-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const color = getActivityColor(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start space-x-4 p-3 glass border-0 rounded-xl hover:bg-primary/5 transition-all duration-300">
                <div className={`p-2 rounded-lg bg-gradient-to-br from-${color}/10 to-${color}/20`}>
                  <Icon className={`h-4 w-4 text-${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {getActivityLabel(activity.type, activity.action)}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                    </Badge>
                  </div>
                  {activity.data && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {activity.data.title || activity.data.first_name || activity.data.name || 'Item'}
                      {activity.data.last_name && ` ${activity.data.last_name}`}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};