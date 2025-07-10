import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Database, Shield, Wifi, WifiOff, BarChart3 } from 'lucide-react';
import { useRealTimeSystemSettings } from '@/hooks/useRealTimeSystemSettings';
import { SystemMetricsGrid } from './settings/SystemMetricsGrid';
import { ConfigurationPanel } from './settings/ConfigurationPanel';
import { SecurityPanel } from './settings/SecurityPanel';
import { MonitoringTab } from './settings/MonitoringTab';

interface SystemSettingsProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ syncStatus = 'disconnected' }) => {
  const {
    metrics,
    recentActivity,
    security,
    config,
    systemHealth,
    loading,
    updateConfiguration,
    updateSecuritySettings,
    refreshMetrics
  } = useRealTimeSystemSettings();

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-success" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-muted-foreground" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading system settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-8 p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                System Settings
              </h2>
              <p className="text-lg text-muted-foreground">Advanced configuration and monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                {getSyncStatusIcon()}
              </div>
              <Badge variant="outline" className="glass border-0 text-sm bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  {syncStatus === 'connected' ? 'System Online' : 'Offline'}
                </div>
              </Badge>
            </div>
          </div>
        </div>

        {/* System Metrics Overview */}
        <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <SystemMetricsGrid metrics={metrics} systemHealth={systemHealth} />
        </div>

        {/* Main Settings Tabs */}
        <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
          <Tabs defaultValue="configuration" className="space-y-6">
            <div className="glass border-0 p-2 rounded-xl shadow-glow">
              <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2">
                <TabsTrigger 
                  value="configuration" 
                  className="glass border-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configuration
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="glass border-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="monitoring" 
                  className="glass border-0 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Monitoring
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="configuration" className="space-y-6">
              <ConfigurationPanel 
                config={config}
                onConfigUpdate={updateConfiguration}
                onRefreshSystem={refreshMetrics}
              />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <SecurityPanel 
                security={security}
                onSecurityUpdate={updateSecuritySettings}
              />
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <MonitoringTab 
                metrics={metrics}
                recentActivity={recentActivity}
                onRefresh={refreshMetrics}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Bottom spacing for better UX */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default SystemSettings;
