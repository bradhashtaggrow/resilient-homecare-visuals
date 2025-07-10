
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, RefreshCw, Calendar as CalendarIcon, Filter, TrendingUp, BarChart3, Globe, Zap } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AnalyticsHeaderProps {
  onDateRangeChange?: (startDate: Date | undefined, endDate: Date | undefined) => void;
  onRefresh?: () => void;
  onFilterChange?: (filters: any) => void;
}

export const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  onDateRangeChange, 
  onRefresh, 
  onFilterChange 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      onRefresh?.();
      // Add a brief delay to show the refresh animation
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDateRangeChange = (newStartDate: Date | undefined, newEndDate: Date | undefined) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    onDateRangeChange?.(newStartDate, newEndDate);
  };

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
      {/* Header card with white background */}
      <Card className="glass border-0 shadow-glow overflow-hidden">
        <CardContent className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight gradient-text">
                    Analytics
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {startDate ? (
                        endDate ? (
                          `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
                        ) : (
                          format(startDate, "MMM d, yyyy")
                        )
                      ) : (
                        "Date Range"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: startDate, to: endDate }}
                      onSelect={(range) => handleDateRangeChange(range?.from, range?.to)}
                      numberOfMonths={2}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-primary/10 hover:text-primary"
                  onClick={() => onFilterChange?.({})}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-primary/10 hover:text-primary"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                  Refresh
                </Button>
              </div>
              
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
