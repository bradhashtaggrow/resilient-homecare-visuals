import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw,
  Download,
  Settings,
  Calendar
} from 'lucide-react';

interface AnalyticsHeaderProps {
  syncStatus: 'connected' | 'disconnected' | 'syncing';
  dateRange: string;
  setDateRange: (value: string) => void;
  onRefresh: () => void;
  loading: boolean;
  lastUpdate: Date;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({
  syncStatus,
  dateRange,
  setDateRange,
  onRefresh,
  loading,
  lastUpdate
}) => {
  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'syncing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-red-600" />;
    }
  };

  const exportData = () => {
    // Sample export functionality
    const data = {
      exportDate: new Date().toISOString(),
      dateRange: dateRange,
      data: 'analytics data would go here'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time website performance and user engagement metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 24 hours</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>{syncStatus === 'connected' ? 'Live Data' : syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}</span>
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;