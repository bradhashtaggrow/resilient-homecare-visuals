
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Image
} from 'lucide-react';

interface DashboardOverviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  stats?: {
    totalContent: number;
    totalServices: number;
    totalMedia: number;
    totalUsers: number;
  };
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  syncStatus = 'disconnected',
  stats = { totalContent: 0, totalServices: 0, totalMedia: 0, totalUsers: 0 }
}) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-chart-2/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-chart-3/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 space-y-8 p-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
                Dashboard Overview
              </h2>
              <p className="text-lg text-muted-foreground">Monitor your healthcare website's performance</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20 transition-all duration-300">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Website Content</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                      {stats.totalContent}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Content sections managed</p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-2/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-2/10 to-chart-2/20 group-hover:from-chart-2/20 group-hover:to-chart-2/30 transition-all duration-300">
                    <BarChart3 className="h-6 w-6 text-chart-2" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Services</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">
                      {stats.totalServices}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Service offerings available</p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-3/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-3/10 to-chart-3/20 group-hover:from-chart-3/20 group-hover:to-chart-3/30 transition-all duration-300">
                    <Image className="h-6 w-6 text-chart-3" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Media Files</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-chart-3 to-chart-4 bg-clip-text text-transparent">
                      {stats.totalMedia}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Images and videos stored</p>
              </CardContent>
            </Card>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Card className="glass border-0 shadow-glow hover:shadow-chart-4/25 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-chart-4/10 to-chart-4/20 group-hover:from-chart-4/20 group-hover:to-chart-4/30 transition-all duration-300">
                    <Users className="h-6 w-6 text-chart-4" />
                  </div>
                  <div className="text-right">
                    <CardTitle className="text-sm font-medium text-muted-foreground mb-2">Total Users</CardTitle>
                    <div className="text-3xl font-bold bg-gradient-to-r from-chart-4 to-chart-5 bg-clip-text text-transparent">
                      {stats.totalUsers}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">Registered users active</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
            <Card className="glass border-0 shadow-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass border-0 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary-light/10 group-hover:from-primary/20 group-hover:to-primary-light/20 transition-all duration-300">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Edit Website Content</p>
                      <p className="text-sm text-muted-foreground">Update sections, services, and media</p>
                    </div>
                  </div>
                </div>
                <div className="glass border-0 p-4 rounded-xl hover:bg-success/5 transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-success/10 to-success/20 group-hover:from-success/20 group-hover:to-success/30 transition-all duration-300">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-success">Preview Changes</p>
                      <p className="text-sm text-muted-foreground">See live updates in real-time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
            <Card className="glass border-0 shadow-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Wifi className="h-5 w-5 text-success" />
                  </div>
                  <CardTitle className="text-xl font-semibold">System Health</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 glass border-0 rounded-xl">
                  <span className="text-sm font-medium">Database Connection</span>
                  <Badge className="bg-gradient-to-r from-success to-success/80 border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass border-0 rounded-xl">
                  <span className="text-sm font-medium">Real-time Sync</span>
                  <Badge className={`border-0 ${
                    syncStatus === 'connected' ? 'bg-gradient-to-r from-success to-success/80' : 'bg-gradient-to-r from-destructive to-destructive/80'
                  }`}>
                    {syncStatus === 'connected' ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Offline
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass border-0 rounded-xl">
                  <span className="text-sm font-medium">Media Storage</span>
                  <Badge className="bg-gradient-to-r from-success to-success/80 border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Bottom spacing for better UX */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default DashboardOverview;
