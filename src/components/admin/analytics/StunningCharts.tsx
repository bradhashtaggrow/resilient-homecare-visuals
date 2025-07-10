import React from 'react';
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
  data: AnalyticsData;
}

const StunningCharts: React.FC<StunningChartsProps> = ({ data }) => {
  // Hourly Traffic Line Chart
  const hourlyTrafficData = {
    labels: data.hourlyTraffic.map(d => `${d.hour}:00`),
    datasets: [
      {
        label: 'Visitors',
        data: data.hourlyTraffic.map(d => d.visitors),
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary) / 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(var(--primary))',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      },
      {
        label: 'Page Views',
        data: data.hourlyTraffic.map(d => d.pageViews),
        borderColor: 'hsl(var(--secondary))',
        backgroundColor: 'hsl(var(--secondary) / 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'hsl(var(--secondary))',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  // Top Pages Bar Chart
  const topPagesData = {
    labels: data.topPages.map(p => p.page),
    datasets: [
      {
        label: 'Page Views',
        data: data.topPages.map(p => p.views),
        backgroundColor: [
          'hsl(var(--primary) / 0.8)',
          'hsl(var(--secondary) / 0.8)',
          'hsl(var(--accent) / 0.8)',
          'hsl(var(--muted) / 0.8)',
          'hsl(220 70% 50% / 0.8)'
        ],
        borderColor: [
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
    labels: data.deviceBreakdown.map(d => d.device),
    datasets: [
      {
        data: data.deviceBreakdown.map(d => d.sessions),
        backgroundColor: [
          'hsl(var(--primary) / 0.8)',
          'hsl(var(--secondary) / 0.8)',
          'hsl(var(--accent) / 0.8)'
        ],
        borderColor: [
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
    labels: data.trafficSources.map(s => s.source),
    datasets: [
      {
        data: data.trafficSources.map(s => s.sessions),
        backgroundColor: [
          'hsl(var(--primary) / 0.7)',
          'hsl(var(--secondary) / 0.7)',
          'hsl(var(--accent) / 0.7)',
          'hsl(var(--muted) / 0.7)',
          'hsl(220 70% 50% / 0.7)'
        ],
        borderColor: [
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
          {data.conversionFunnel.map((stage, index) => {
            const percentage = index === 0 ? 100 : Math.round((stage.users / data.conversionFunnel[0].users) * 100);
            return (
              <div key={stage.stage} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-muted-foreground">{stage.users} users ({percentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StunningCharts;