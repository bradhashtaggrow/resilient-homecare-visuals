
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw, Wifi, WifiOff, Zap } from 'lucide-react';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'disconnected' }) => {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    // Listen for real-time updates to refresh preview
    const handleStorageChange = () => {
      setLastSync(new Date());
      setPreviewKey(prev => prev + 1); // Force iframe refresh
    };

    // Listen for custom events from the sync system
    window.addEventListener('website-content-updated', handleStorageChange);
    window.addEventListener('website-services-updated', handleStorageChange);
    window.addEventListener('website-media-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('website-content-updated', handleStorageChange);
      window.removeEventListener('website-services-updated', handleStorageChange);
      window.removeEventListener('website-media-updated', handleStorageChange);
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPreviewKey(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getPreviewUrl = () => {
    return `${window.location.origin}?preview=${previewKey}&t=${Date.now()}`;
  };

  const getDeviceClasses = () => {
    switch (activeDevice) {
      case 'mobile':
        return 'w-full max-w-sm mx-auto';
      case 'tablet':
        return 'w-full max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

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

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'syncing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Preview</h2>
          <p className="text-gray-600">See your changes in real-time with instant synchronization</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getSyncStatusColor()}>
            {getSyncStatusIcon()}
            <span className="ml-2">
              {syncStatus === 'connected' ? 'Live Sync Active' : 
               syncStatus === 'syncing' ? 'Syncing...' : 'Sync Disconnected'}
            </span>
          </Badge>
          {lastSync && (
            <span className="text-sm text-gray-500">
              Last update: {lastSync.toLocaleTimeString()}
            </span>
          )}
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(getPreviewUrl(), '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in New Tab
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Website Preview</CardTitle>
              <CardDescription>Changes synchronize automatically and appear instantly</CardDescription>
            </div>
            <Tabs value={activeDevice} onValueChange={setActiveDevice}>
              <TabsList>
                <TabsTrigger value="desktop" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Desktop
                </TabsTrigger>
                <TabsTrigger value="tablet" className="flex items-center gap-2">
                  <Tablet className="h-4 w-4" />
                  Tablet
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg bg-white p-4">
            <div className={getDeviceClasses()}>
              <div className="border rounded-lg overflow-hidden shadow-lg">
                <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 flex-1 max-w-md">
                    {window.location.origin}
                  </div>
                  {syncStatus === 'connected' && (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <Zap className="h-3 w-3" />
                      Live
                    </div>
                  )}
                </div>
                <iframe
                  key={previewKey}
                  src={getPreviewUrl()}
                  className="w-full border-0"
                  style={{
                    height: activeDevice === 'mobile' ? '600px' :
                           activeDevice === 'tablet' ? '700px' : '800px'
                  }}
                  title="Website Preview"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${
                  syncStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                  syncStatus === 'syncing' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'
                }`}></div>
              </div>
              <div>
                <p className="font-medium">Real-time Sync</p>
                <p className="text-sm text-gray-600">
                  {syncStatus === 'connected' ? 'Changes appear instantly' :
                   syncStatus === 'syncing' ? 'Syncing changes...' : 'Reconnecting...'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Monitor className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-medium">Responsive Preview</p>
                <p className="text-sm text-gray-600">Test all device sizes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-medium">Live Website</p>
                <p className="text-sm text-gray-600">View actual production site</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimePreview;
