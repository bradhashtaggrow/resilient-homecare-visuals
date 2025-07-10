import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MousePointer, 
  Globe, 
  Users, 
  Eye,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Activity
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RealtimeEvent {
  id: string;
  event_type: string;
  event_name: string;
  page_url: string;
  created_at: string;
  properties: any;
  device_type?: string;
  country?: string;
  city?: string;
}

interface RealtimeActivityProps {
  events: RealtimeEvent[];
}

const RealtimeActivity: React.FC<RealtimeActivityProps> = ({ events }) => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [recentLocations, setRecentLocations] = useState<{ country: string; city: string; count: number }[]>([]);

  useEffect(() => {
    // Only show real data, no simulated data
    setActiveUsers(0);
    setRecentLocations([]);
  }, []);

  const formatPageUrl = (url: string) => {
    if (url === '/') return 'Home';
    return url.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home';
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - eventTime.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Real-time Activity Feed */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Activity Feed
            <Badge variant="secondary" className="ml-auto">
              {events.length} events
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events.length > 0 ? (
              events.slice(0, 15).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-primary" />
                      {event.device_type && getDeviceIcon(event.device_type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{event.event_name}</p>
                        <Badge variant="outline" className="text-xs">
                          {formatPageUrl(event.page_url)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {event.country && event.city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.city}, {event.country}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(event.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent activity</p>
                <p className="text-sm text-muted-foreground">Real-time events will appear here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Statistics */}
      <div className="space-y-6">
        {/* Active Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeUsers > 0 ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{activeUsers}</div>
                <p className="text-sm text-muted-foreground">Currently browsing</p>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No active users detected</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Top Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentLocations.length > 0 ? (
              <div className="space-y-3">
                {recentLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">{location.city}</p>
                        <p className="text-xs text-muted-foreground">{location.country}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {location.count}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Location data will appear as users visit your site</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Page Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center py-4">
                <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Performance metrics will appear as users interact with your site</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealtimeActivity;