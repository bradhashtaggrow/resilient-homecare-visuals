import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  Globe, 
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  Calendar,
  Users
} from 'lucide-react';

interface AnalyticsChartsProps {
  analytics: {
    top_pages: Array<{ page: string; views: number }>;
    traffic_sources: Array<{ source: string; sessions: number }>;
    device_breakdown: Array<{ device: string; sessions: number }>;
  } | null;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analytics }) => {
  const formatPageUrl = (url: string) => {
    if (url === '/') return 'Home';
    return url.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Home';
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getProgressWidth = (value: number, max: number) => {
    return Math.max((value / max) * 100, 5); // Minimum 5% for visibility
  };

  // No hourly data - show empty state
  const hourlyData: Array<{ hour: number; visitors: number; pageViews: number }> = [];

  const maxHourlyVisitors = Math.max(...hourlyData.map(d => d.visitors));
  const maxTopPageViews = analytics?.top_pages ? Math.max(...analytics.top_pages.map(p => p.views)) : 0;
  const maxSourceSessions = analytics?.traffic_sources ? Math.max(...analytics.traffic_sources.map(s => s.sessions)) : 0;
  const maxDeviceSessions = analytics?.device_breakdown ? Math.max(...analytics.device_breakdown.map(d => d.sessions)) : 0;

  return (
    <div className="space-y-6">
      {/* Hourly Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Today's Traffic (Hourly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Hourly Data Available</h3>
            <p className="text-muted-foreground">Hourly traffic data will appear as users visit your website.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Performing Pages
            </CardTitle>
          </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {analytics?.top_pages && analytics.top_pages.length > 0 ? (
                 analytics.top_pages.slice(0, 10).map((page, index) => (
                   <div key={index} className="space-y-2">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                           <span className="text-xs font-medium text-primary">{index + 1}</span>
                         </div>
                         <div>
                           <p className="font-medium text-sm">{formatPageUrl(page.page)}</p>
                           <p className="text-xs text-muted-foreground">{page.page}</p>
                         </div>
                       </div>
                       <span className="text-sm font-medium">{page.views}</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                       <div
                         className="bg-primary h-2 rounded-full transition-all duration-500"
                         style={{ width: `${getProgressWidth(page.views, maxTopPageViews)}%` }}
                       ></div>
                     </div>
                   </div>
                 ))
               ) : (
                 // Show placeholder data when no real data is available
                 [
                   { page: '/', views: 0, name: 'Home' },
                   { page: '/about', views: 0, name: 'About' },
                   { page: '/services', views: 0, name: 'Services' },
                   { page: '/contact', views: 0, name: 'Contact' },
                   { page: '/news', views: 0, name: 'News' }
                 ].map((page, index) => (
                   <div key={index} className="space-y-2 opacity-50">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                           <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                         </div>
                         <div>
                           <p className="font-medium text-sm text-muted-foreground">{page.name}</p>
                           <p className="text-xs text-muted-foreground/70">{page.page}</p>
                         </div>
                       </div>
                       <span className="text-sm font-medium text-muted-foreground">-</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                       <div className="bg-muted h-2 rounded-full w-1"></div>
                     </div>
                   </div>
                 ))
               )}
               {(!analytics?.top_pages || analytics.top_pages.length === 0) && (
                 <div className="text-center py-2">
                   <p className="text-xs text-muted-foreground">Page analytics will appear as users visit your site</p>
                 </div>
               )}
             </div>
           </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {analytics?.traffic_sources && analytics.traffic_sources.length > 0 ? (
                 analytics.traffic_sources.slice(0, 8).map((source, index) => (
                   <div key={index} className="space-y-2">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <Globe className="h-4 w-4 text-muted-foreground" />
                         <div>
                           <p className="font-medium text-sm">{source.source}</p>
                           <p className="text-xs text-muted-foreground">Referral source</p>
                         </div>
                       </div>
                       <span className="text-sm font-medium">{source.sessions}</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                       <div
                         className="bg-secondary h-2 rounded-full transition-all duration-500"
                         style={{ width: `${getProgressWidth(source.sessions, maxSourceSessions)}%` }}
                       ></div>
                     </div>
                   </div>
                 ))
               ) : (
                 // Show placeholder data when no real data is available
                 [
                   { source: 'Direct', sessions: 0 },
                   { source: 'Google', sessions: 0 },
                   { source: 'Social Media', sessions: 0 },
                   { source: 'Email', sessions: 0 },
                   { source: 'Referral', sessions: 0 }
                 ].map((source, index) => (
                   <div key={index} className="space-y-2 opacity-50">
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <Globe className="h-4 w-4 text-muted-foreground" />
                         <div>
                           <p className="font-medium text-sm text-muted-foreground">{source.source}</p>
                           <p className="text-xs text-muted-foreground/70">Referral source</p>
                         </div>
                       </div>
                       <span className="text-sm font-medium text-muted-foreground">-</span>
                     </div>
                     <div className="w-full bg-muted rounded-full h-2">
                       <div className="bg-muted h-2 rounded-full w-1"></div>
                     </div>
                   </div>
                 ))
               )}
               {(!analytics?.traffic_sources || analytics.traffic_sources.length === 0) && (
                 <div className="text-center py-2">
                   <p className="text-xs text-muted-foreground">Traffic sources will appear as users visit your site</p>
                 </div>
               )}
             </div>
           </CardContent>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Device & Browser Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Device Breakdown */}
            <div>
               <h4 className="font-medium mb-4">Device Types</h4>
               <div className="space-y-4">
                 {analytics?.device_breakdown && analytics.device_breakdown.length > 0 ? (
                   analytics.device_breakdown.map((device, index) => (
                     <div key={index} className="space-y-2">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           {getDeviceIcon(device.device)}
                           <span className="font-medium capitalize text-sm">{device.device}</span>
                         </div>
                         <span className="text-sm font-medium">{device.sessions}</span>
                       </div>
                       <div className="w-full bg-muted rounded-full h-2">
                         <div
                           className="bg-accent h-2 rounded-full transition-all duration-500"
                           style={{ width: `${getProgressWidth(device.sessions, maxDeviceSessions)}%` }}
                         ></div>
                       </div>
                     </div>
                   ))
                 ) : (
                   // Show placeholder device data
                   [
                     { device: 'desktop', sessions: 0 },
                     { device: 'mobile', sessions: 0 },
                     { device: 'tablet', sessions: 0 }
                   ].map((device, index) => (
                     <div key={index} className="space-y-2 opacity-50">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           {getDeviceIcon(device.device)}
                           <span className="font-medium capitalize text-sm text-muted-foreground">{device.device}</span>
                         </div>
                         <span className="text-sm font-medium text-muted-foreground">-</span>
                       </div>
                       <div className="w-full bg-muted rounded-full h-2">
                         <div className="bg-muted h-2 rounded-full w-1"></div>
                       </div>
                     </div>
                   ))
                 )}
                 {(!analytics?.device_breakdown || analytics.device_breakdown.length === 0) && (
                   <div className="text-center py-2">
                     <p className="text-xs text-muted-foreground">Device analytics will appear as users visit your site</p>
                   </div>
                 )}
               </div>
            </div>

            {/* Browser Breakdown */}
            <div>
              <h4 className="font-medium mb-4">Top Browsers</h4>
              <div className="text-center py-8">
                <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Browser analytics will appear as users visit your site</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;