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
  // Show empty state if no data
  if (!data) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold mb-2">No Chart Data Available</h3>
        <p className="text-muted-foreground">Charts will appear as users interact with your website.</p>
      </div>
    );
  }

  const chartData = data;
  // Create gradient fills for charts
  const createGradient = (ctx: any, colorStart: string, colorEnd: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
  };

  // Hourly Traffic Line Chart with stunning gradients
  const hourlyTrafficData = {
    labels: chartData.hourlyTraffic.map(d => `${d.hour}:00`),
    datasets: [
      {
        label: '👥 Visitors',
        data: chartData.hourlyTraffic.map(d => d.visitors),
        borderColor: '#3b82f6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          return createGradient(ctx, 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.05)');
        },
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: '#1d4ed8',
        pointHoverBorderWidth: 4,
        cubicInterpolationMode: 'monotone' as const
      },
      {
        label: '📄 Page Views',
        data: chartData.hourlyTraffic.map(d => d.pageViews),
        borderColor: '#8b5cf6',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          return createGradient(ctx, 'rgba(139, 92, 246, 0.3)', 'rgba(139, 92, 246, 0.02)');
        },
        borderWidth: 4,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: '#7c3aed',
        pointHoverBorderWidth: 4,
        cubicInterpolationMode: 'monotone' as const
      }
    ]
  };

  // Top Pages Bar Chart with vibrant gradients
  const topPagesData = {
    labels: chartData.topPages.map(p => p.page.replace('/', 'Home') || 'Home'),
    datasets: [
      {
        label: '📊 Page Views',
        data: chartData.topPages.map(p => p.views),
        backgroundColor: [
          'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
          'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        ],
        borderColor: [
          '#6366f1',
          '#06b6d4',
          '#10b981',
          '#f59e0b',
          '#ef4444'
        ],
        borderWidth: 3,
        borderRadius: 12,
        borderSkipped: false,
        hoverBackgroundColor: [
          'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          'linear-gradient(135deg, #0891b2 0%, #1d4ed8 100%)',
          'linear-gradient(135deg, #047857 0%, #065f46 100%)',
          'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
          'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
        ],
        hoverBorderWidth: 4
      }
    ]
  };

  // Device Breakdown Doughnut Chart with stunning colors
  const deviceData = {
    labels: chartData.deviceBreakdown.map(d => `${d.device} 💻📱📟`[d.device === 'Desktop' ? 0 : d.device === 'Mobile' ? 1 : 2]),
    datasets: [
      {
        data: chartData.deviceBreakdown.map(d => d.sessions),
        backgroundColor: [
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        ],
        borderColor: ['#667eea', '#f093fb', '#4facfe'],
        borderWidth: 4,
        hoverOffset: 20,
        hoverBorderWidth: 6,
        cutout: '65%'
      }
    ]
  };

  // Traffic Sources Bar Chart with modern styling
  const trafficSourcesData = {
    labels: chartData.trafficSources.map(s => `${s.source} ${s.source === 'Direct' ? '🔗' : s.source === 'Google' ? '🔍' : s.source === 'Social' ? '📱' : '📧'}`),
    datasets: [
      {
        label: '🚀 Sessions',
        data: chartData.trafficSources.map(s => s.sessions),
        backgroundColor: [
          'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
          'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
          'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)'
        ],
        borderColor: ['#667eea', '#f093fb', '#4facfe', '#43e97b'],
        borderWidth: 3,
        borderRadius: 8,
        hoverBackgroundColor: [
          'linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%)',
          'linear-gradient(90deg, #e53e3e 0%, #c53030 100%)',
          'linear-gradient(90deg, #3182ce 0%, #2c5282 100%)',
          'linear-gradient(90deg, #38a169 0%, #2f855a 100%)'
        ]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        hoverRadius: 12,
        hoverBorderWidth: 4,
      },
      bar: {
        borderRadius: 8,
        borderSkipped: false,
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 25,
          font: {
            size: 14,
            weight: 600,
            family: 'Inter, system-ui, sans-serif'
          },
          color: '#1f2937',
          boxWidth: 12,
          boxHeight: 12,
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13,
          weight: 'normal' as const
        },
        displayColors: true,
        boxPadding: 8,
        usePointStyle: true,
        callbacks: {
          labelColor: function(context: any) {
            return {
              borderColor: context.dataset.borderColor,
              backgroundColor: context.dataset.backgroundColor,
              borderWidth: 2,
              borderRadius: 6,
            };
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          lineWidth: 1,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: 500,
            family: 'Inter, system-ui, sans-serif'
          },
          padding: 12,
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          lineWidth: 1,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
            weight: 500,
            family: 'Inter, system-ui, sans-serif'
          },
          padding: 12,
          callback: function(value: any) {
            return typeof value === 'number' ? value.toLocaleString() : value;
          }
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      }
    },
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
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
                         {stage.users.toLocaleString()} users
                       </div>
                       <div className="text-xs text-muted-foreground">
                         {percentage}%
                       </div>
                     </div>
                   </div>
                   <div className="relative w-full bg-muted/50 rounded-full h-4 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-r from-muted/20 to-muted/5 rounded-full"></div>
                     <div 
                       className={`h-4 rounded-full transition-all duration-1000 bg-gradient-to-r ${colors[index % colors.length]} to-transparent`}
                       style={{ width: `${percentage}%` }}
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                     </div>
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StunningCharts;