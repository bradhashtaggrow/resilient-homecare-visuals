import React, { lazy, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyticsHeader } from './analytics/AnalyticsHeader';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';

// Lazy load heavy analytics components
const AnalyticsOverview = lazy(() => import('./analytics/AnalyticsOverview').then(module => ({ default: module.AnalyticsOverview })));
const RealtimeActivity = lazy(() => import('./analytics/RealtimeActivity'));

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-6 md:space-y-8 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <AnalyticsHeader />
        </div>
        
        <div className="grid gap-6 lg:gap-8">
          {/* Hero metrics */}
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <Suspense fallback={<div className="h-48 bg-muted/50 rounded-lg animate-pulse" />}>
              <AnalyticsOverview />
            </Suspense>
          </div>
          
          {/* Real-time activity with glass effect */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
            <Card className="glass border-0 shadow-glow">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Eye className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold">Live Activity</CardTitle>
                      <CardDescription className="text-sm">Real-time visitor behavior</CardDescription>
                    </div>
                  </div>
                  <div className="sm:ml-auto">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      Live
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="h-32 bg-muted/50 rounded animate-pulse" />}>
                  <RealtimeActivity events={[]} />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Bottom spacing for better UX */}
        <div className="h-8 lg:h-16"></div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;