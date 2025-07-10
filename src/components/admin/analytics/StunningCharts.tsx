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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Hourly Traffic */}
      <div className="lg:col-span-2 bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Real-Time Hourly Traffic</h3>
        <div className="h-80">
          <Line data={hourlyTrafficData} options={chartOptions} />
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Pages</h3>
        <div className="h-64">
          <Bar data={topPagesData} options={chartOptions} />
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
        <div className="h-64">
          <Doughnut 
            data={deviceData} 
            options={{
              ...chartOptions,
              cutout: '60%',
              plugins: {
                ...chartOptions.plugins,
                legend: {
                  position: 'bottom' as const,
                  labels: {
                    usePointStyle: true,
                    padding: 20
                  }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
        <div className="h-64">
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

      {/* Conversion Funnel */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">User Journey Funnel</h3>
        <div className="space-y-3">
          {chartData.conversionFunnel.map((stage, index) => {
            const totalUsers = chartData.conversionFunnel[0]?.users || 1;
            const percentage = index === 0 ? 100 : Math.round((stage.users / totalUsers) * 100);
            return (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-muted-foreground">
                    {isPlaceholder ? '-' : stage.users} users ({isPlaceholder ? '0' : percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${isPlaceholder ? 'bg-muted w-1' : 'bg-primary'}`}
                    style={!isPlaceholder ? { width: `${percentage}%` } : {}}
                  ></div>
                </div>
              </div>
            );
          })}
          {isPlaceholder && (
            <div className="text-center py-2">
              <p className="text-xs text-muted-foreground">Conversion funnel will appear as users interact with your site</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StunningCharts;