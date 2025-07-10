
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  animationDelay?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
  trend,
  animationDelay = '0s'
}) => {
  return (
    <div className="animate-scale-in" style={{ animationDelay }}>
      <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 group-hover:from-blue-500/20 group-hover:to-blue-600/30 transition-all duration-300">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-right">
              <CardTitle className="text-sm font-medium text-muted-foreground mb-2">{title}</CardTitle>
              <div className="text-3xl font-bold text-foreground">
                {value}
              </div>
              {trend && (
                <div className={`text-xs flex items-center justify-end mt-1 ${
                  trend.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  <span>{trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        {subtitle && (
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
