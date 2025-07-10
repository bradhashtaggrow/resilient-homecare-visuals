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

  // Generate some sample time-series data for hourly traffic
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    visitors: Math.floor(Math.random() * 100) + 10,
    pageViews: Math.floor(Math.random() * 200) + 20
  }));

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
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Hour</span>
              <span>Visitors</span>
            </div>
            <div className="grid grid-cols-12 gap-2 h-32">
              {hourlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="flex-1 w-full flex items-end">
                    <div
                      className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t cursor-pointer"
                      style={{ height: `${(data.visitors / maxHourlyVisitors) * 100}%` }}
                      title={`${data.hour}:00 - ${data.visitors} visitors`}
                    ></div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {data.hour}
                  </span>
                </div>
              ))}
            </div>
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
            {analytics?.top_pages && analytics.top_pages.length > 0 ? (
              <div className="space-y-4">
                {analytics.top_pages.slice(0, 10).map((page, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No page data available yet</p>
                <p className="text-sm text-muted-foreground">Page analytics will appear as users visit your site</p>
              </div>
            )}
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
            {analytics?.traffic_sources && analytics.traffic_sources.length > 0 ? (
              <div className="space-y-4">
                {analytics.traffic_sources.slice(0, 8).map((source, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No traffic source data available yet</p>
                <p className="text-sm text-muted-foreground">Traffic sources will appear as users visit your site</p>
              </div>
            )}
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
              {analytics?.device_breakdown && analytics.device_breakdown.length > 0 ? (
                <div className="space-y-4">
                  {analytics.device_breakdown.map((device, index) => (
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
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No device data available yet</p>
              )}
            </div>

            {/* Browser Breakdown (Sample) */}
            <div>
              <h4 className="font-medium mb-4">Top Browsers</h4>
              <div className="space-y-4">
                {[
                  { name: 'Chrome', sessions: 156, color: 'bg-blue-500' },
                  { name: 'Safari', sessions: 89, color: 'bg-gray-500' },
                  { name: 'Firefox', sessions: 43, color: 'bg-orange-500' },
                  { name: 'Edge', sessions: 28, color: 'bg-blue-600' }
                ].map((browser, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${browser.color}`}></div>
                        <span className="font-medium text-sm">{browser.name}</span>
                      </div>
                      <span className="text-sm font-medium">{browser.sessions}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${browser.color}`}
                        style={{ width: `${getProgressWidth(browser.sessions, 156)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsCharts;