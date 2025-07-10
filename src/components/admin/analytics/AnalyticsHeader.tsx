import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Calendar, Filter, TrendingUp, BarChart3, Globe, Zap } from 'lucide-react';

export const AnalyticsHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTimeString = currentTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="relative">
      {/* Header card with gradient background */}
      <Card className="gradient-card border-0 shadow-glow overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-chart-1/10"></div>
        <CardContent className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight gradient-text">
                    Analytics Command Center
                  </h1>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-muted-foreground text-lg">
                      {currentDate}
                    </p>
                    <Badge variant="outline" className="font-mono text-sm">
                      {currentTimeString}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                  Live Data
                </Badge>
                <Badge variant="outline" className="border-chart-2/20 text-chart-2">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Tracking
                </Badge>
                <Badge variant="outline" className="border-warning/20 text-warning">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Button variant="gradient" size="sm" className="rounded-xl">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="gradient" size="sm" className="rounded-xl">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="gradient" size="sm" className="rounded-xl">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              
              <Button variant="gradient" className="rounded-xl shadow-glow hover:shadow-xl transition-all duration-300">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};