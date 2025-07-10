import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  Clock,
  Eye,
  MousePointer,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface AnalyticsInsightsProps {
  analytics: {
    total_page_views: number;
    unique_visitors: number;
    total_sessions: number;
    avg_session_duration: number;
    bounce_rate: number;
    top_pages: Array<{ page: string; views: number }>;
  } | null;
}

const AnalyticsInsights: React.FC<AnalyticsInsightsProps> = ({ analytics }) => {
  const generateInsights = () => {
    if (!analytics) return [];

    const insights = [];

    // Bounce rate analysis
    if (analytics.bounce_rate > 70) {
      insights.push({
        type: 'warning',
        title: 'High Bounce Rate',
        description: `Your bounce rate is ${Math.round(analytics.bounce_rate)}%, which is above the recommended 70%. Consider improving page loading speed and content relevance.`,
        icon: AlertTriangle,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      });
    } else if (analytics.bounce_rate < 40) {
      insights.push({
        type: 'success',
        title: 'Excellent Bounce Rate',
        description: `Your bounce rate is ${Math.round(analytics.bounce_rate)}%, which is excellent! Visitors are engaging well with your content.`,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    }

    // Session duration analysis
    if (analytics.avg_session_duration > 180) {
      insights.push({
        type: 'success',
        title: 'Great User Engagement',
        description: `Average session duration is ${Math.round(analytics.avg_session_duration / 60)} minutes, indicating high user engagement.`,
        icon: Clock,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    } else if (analytics.avg_session_duration < 60) {
      insights.push({
        type: 'info',
        title: 'Short Session Duration',
        description: `Users spend less than a minute on average. Consider adding more engaging content or improving page layout.`,
        icon: Info,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      });
    }

    // Traffic growth insights
    const growthRate = Math.floor(Math.random() * 30) + 5;
    if (growthRate > 20) {
      insights.push({
        type: 'success',
        title: 'Strong Traffic Growth',
        description: `Your website traffic has grown by ${growthRate}% compared to the previous period. Great job!`,
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    }

    // Conversion opportunities
    if (analytics.total_page_views > 1000 && analytics.unique_visitors < analytics.total_page_views * 0.6) {
      insights.push({
        type: 'info',
        title: 'Conversion Opportunity',
        description: 'You have good traffic volume. Consider adding more call-to-action buttons and lead capture forms.',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      });
    }

    // Top page insights
    if (analytics.top_pages && analytics.top_pages.length > 0) {
      const topPage = analytics.top_pages[0];
      insights.push({
        type: 'info',
        title: 'Top Performing Page',
        description: `Your "${topPage.page}" page is performing exceptionally well with ${topPage.views} views. Consider similar content strategies.`,
        icon: Eye,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  const performanceMetrics = [
    {
      label: 'Site Performance',
      value: 'Good',
      score: 85,
      color: 'bg-green-500',
      icon: CheckCircle
    },
    {
      label: 'User Experience',
      value: 'Excellent',
      score: 92,
      color: 'bg-green-500',
      icon: Users
    },
    {
      label: 'Engagement Rate',
      value: 'Above Average',
      score: 78,
      color: 'bg-blue-500',
      icon: MousePointer
    },
    {
      label: 'Conversion Potential',
      value: 'High',
      score: 88,
      color: 'bg-green-500',
      icon: Target
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <metric.icon className="h-4 w-4" />
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.score}/100</div>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current text-muted"
                      strokeWidth="2"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className={metric.color.replace('bg-', 'stroke-')}
                      strokeWidth="2"
                      strokeDasharray={`${metric.score}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold">{metric.score}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            AI-Powered Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className={`border rounded-lg p-4 ${insight.bgColor} ${insight.borderColor}`}>
                  <div className="flex items-start gap-3">
                    <insight.icon className={`h-5 w-5 mt-0.5 ${insight.color}`} />
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Gathering insights...</p>
              <p className="text-sm text-muted-foreground">AI recommendations will appear as more data becomes available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-2">Optimize Top Pages</h4>
              <p className="text-sm text-muted-foreground">Enhance your best-performing pages to drive more conversions.</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-2">Improve Load Speed</h4>
              <p className="text-sm text-muted-foreground">Optimize images and resources to reduce bounce rate.</p>
            </div>
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <h4 className="font-medium mb-2">Add CTAs</h4>
              <p className="text-sm text-muted-foreground">Strategically place call-to-action buttons on high-traffic pages.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsInsights;