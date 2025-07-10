import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsData {
  hourlyTraffic: Array<{ hour: number; visitors: number; pageViews: number }>;
  topPages: Array<{ page: string; views: number }>;
  deviceBreakdown: Array<{ device: string; sessions: number }>;
  trafficSources: Array<{ source: string; sessions: number }>;
  bounceRateHistory: Array<{ date: string; bounceRate: number }>;
  conversionFunnel: Array<{ stage: string; users: number }>;
}

interface StunningChartsProps {
  data: AnalyticsData | null;
}

const StunningCharts: React.FC<StunningChartsProps> = ({ data }) => {
  // Generate placeholder data if no real data is available
  const placeholderData: AnalyticsData = {
    hourlyTraffic: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      visitors: 0,
      pageViews: 0
    })),
    topPages: [
      { page: '/', views: 0 },
      { page: '/about', views: 0 },
      { page: '/services', views: 0 },
      { page: '/contact', views: 0 },
      { page: '/news', views: 0 }
    ],
    deviceBreakdown: [
      { device: 'Desktop', sessions: 0 },
      { device: 'Mobile', sessions: 0 },
      { device: 'Tablet', sessions: 0 }
    ],
    trafficSources: [
      { source: 'Direct', sessions: 0 },
      { source: 'Google', sessions: 0 },
      { source: 'Social', sessions: 0 },
      { source: 'Email', sessions: 0 }
    ],
    bounceRateHistory: [],
    conversionFunnel: [
      { stage: 'Page Views', users: 0 },
      { stage: 'Engagement', users: 0 },
      { stage: 'Contact Forms', users: 0 },
      { stage: 'Conversions', users: 0 }
    ]
  };

  const chartData = data || placeholderData;
  const isPlaceholder = !data;
  // Hourly Traffic Line Chart
  const hourlyTrafficData = {
    labels: chartData.hourlyTraffic.map(d => `${d.hour}:00`),
    datasets: [
      {
        label: 'Visitors',
        data: chartData.hourlyTraffic.map(d => d.visitors),
        borderColor: isPlaceholder ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
        backgroundColor: isPlaceholder ? 'hsl(var(--muted) / 0.1)' : 'hsl(var(--primary) / 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isPlaceholder ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Page Views',
        data: chartData.hourlyTraffic.map(d => d.pageViews),
        borderColor: isPlaceholder ? 'hsl(var(--muted-foreground))' : 'hsl(var(--secondary))',
        backgroundColor: isPlaceholder ? 'hsl(var(--muted-foreground) / 0.1)' : 'hsl(var(--secondary) / 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isPlaceholder ? 'hsl(var(--muted-foreground))' : 'hsl(var(--secondary))',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  // Top Pages Bar Chart
  const topPagesData = {
    labels: chartData.topPages.map(p => p.page),
    datasets: [
      {
        label: 'Page Views',
        data: chartData.topPages.map(p => p.views),
        backgroundColor: isPlaceholder ? [
          'hsl(var(--muted) / 0.8)',
          'hsl(var(--muted) / 0.6)',
          'hsl(var(--muted) / 0.4)',
          'hsl(var(--muted) / 0.3)',
          'hsl(var(--muted) / 0.2)'
        ] : [
          'hsl(var(--primary) / 0.8)',
          'hsl(var(--secondary) / 0.8)',
          'hsl(var(--accent) / 0.8)',
          'hsl(var(--muted) / 0.8)',
          'hsl(220 70% 50% / 0.8)'
        ],
        borderColor: isPlaceholder ? [
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))'
        ] : [
          'hsl(var(--primary))',
          'hsl(var(--secondary))',
          'hsl(var(--accent))',
          'hsl(var(--muted))',
          'hsl(220 70% 50%)'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  // Device Breakdown Doughnut Chart
  const deviceData = {
    labels: chartData.deviceBreakdown.map(d => d.device),
    datasets: [
      {
        data: chartData.deviceBreakdown.map(d => d.sessions),
        backgroundColor: isPlaceholder ? [
          'hsl(var(--muted) / 0.8)',
          'hsl(var(--muted) / 0.6)',
          'hsl(var(--muted) / 0.4)'
        ] : [
          'hsl(var(--primary) / 0.8)',
          'hsl(var(--secondary) / 0.8)',
          'hsl(var(--accent) / 0.8)'
        ],
        borderColor: isPlaceholder ? [
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))'
        ] : [
          'hsl(var(--primary))',
          'hsl(var(--secondary))',
          'hsl(var(--accent))'
        ],
        borderWidth: 3,
        hoverOffset: 15
      }
    ]
  };

  // Traffic Sources Polar Area Chart
  const trafficSourcesData = {
    labels: chartData.trafficSources.map(s => s.source),
    datasets: [
      {
        data: chartData.trafficSources.map(s => s.sessions),
        backgroundColor: isPlaceholder ? [
          'hsl(var(--muted) / 0.7)',
          'hsl(var(--muted) / 0.6)',
          'hsl(var(--muted) / 0.5)',
          'hsl(var(--muted) / 0.4)'
        ] : [
          'hsl(var(--primary) / 0.7)',
          'hsl(var(--secondary) / 0.7)',
          'hsl(var(--accent) / 0.7)',
          'hsl(var(--muted) / 0.7)',
          'hsl(220 70% 50% / 0.7)'
        ],
        borderColor: isPlaceholder ? [
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))',
          'hsl(var(--muted))'
        ] : [
          'hsl(var(--primary))',
          'hsl(var(--secondary))',
          'hsl(var(--accent))',
          'hsl(var(--muted))',
          'hsl(220 70% 50%)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'normal' as const
          }
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--popover))',
        titleColor: 'hsl(var(--popover-foreground))',
        bodyColor: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Hourly Traffic */}
      <div className="lg:col-span-2 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl"></div>
        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Real-Time Hourly Traffic
              </h3>
              <p className="text-sm text-muted-foreground">Live visitor analytics throughout the day</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">Live</span>
              </div>
            </div>
          </div>
          <div className="h-80 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl"></div>
            <Line data={hourlyTrafficData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chart-1/10 via-transparent to-chart-2/10 rounded-2xl"></div>
        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:shadow-chart-1/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-chart-1/20 to-chart-1/5 border border-chart-1/20">
              <BarChart3 className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Top Performing Pages</h3>
              <p className="text-xs text-muted-foreground">Most visited content</p>
            </div>
          </div>
          <div className="h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-lg"></div>
            <Bar data={topPagesData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 via-transparent to-chart-4/10 rounded-2xl"></div>
        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:shadow-chart-3/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-chart-3/20 to-chart-3/5 border border-chart-3/20">
              <BarChart3 className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Device Distribution</h3>
              <p className="text-xs text-muted-foreground">User device preferences</p>
            </div>
          </div>
          <div className="h-64 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-chart-3/5 via-transparent to-chart-4/5 rounded-full blur-3xl"></div>
            <Doughnut 
              data={deviceData} 
              options={{
                ...chartOptions,
                cutout: '65%',
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    position: 'bottom' as const,
                    labels: {
                      usePointStyle: true,
                      padding: 20,
                      font: {
                        size: 12,
                        weight: 500
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-chart-2/10 via-transparent to-chart-5/10 rounded-2xl"></div>
        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:shadow-chart-2/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2/20 to-chart-2/5 border border-chart-2/20">
              <BarChart3 className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Traffic Sources</h3>
              <p className="text-xs text-muted-foreground">Visitor acquisition channels</p>
            </div>
          </div>
          <div className="h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent rounded-lg"></div>
            <Bar 
              data={trafficSourcesData} 
              options={{
                ...chartOptions,
                indexAxis: 'y' as const,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    display: false
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl"></div>
        <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:shadow-primary/10 transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">User Journey Funnel</h3>
              <p className="text-xs text-muted-foreground">Conversion flow analysis</p>
            </div>
          </div>
          <div className="space-y-4">
            {chartData.conversionFunnel.map((stage, index) => {
              const totalUsers = chartData.conversionFunnel[0]?.users || 1;
              const percentage = index === 0 ? 100 : Math.round((stage.users / totalUsers) * 100);
              const colors = ['from-primary', 'from-chart-1', 'from-chart-2', 'from-chart-3'];
              return (
                <div key={stage.stage} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors[index % colors.length]} to-transparent`}></div>
                      <span className="font-semibold text-sm">{stage.stage}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {isPlaceholder ? '-' : stage.users.toLocaleString()} users
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isPlaceholder ? '0' : percentage}%
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full bg-muted/50 rounded-full h-4 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-muted/20 to-muted/5 rounded-full"></div>
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${colors[index % colors.length]} to-transparent ${isPlaceholder ? 'w-1' : ''}`}
                      style={!isPlaceholder ? { width: `${percentage}%` } : {}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </div>
              );
            })}
            {isPlaceholder && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/20 border border-muted/30">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
                  <p className="text-xs text-muted-foreground">Conversion funnel will appear as users interact with your site</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StunningCharts;