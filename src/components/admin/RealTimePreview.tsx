
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone, Tablet, Wifi, WifiOff, Maximize2, RefreshCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'disconnected' }) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [iframeKey, setIframeKey] = useState(0);

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

  const refreshPreview = useCallback(() => {
    setIframeKey(prev => prev + 1);
    setLastUpdate(new Date());
  }, []);

  // Listen for real-time database changes
  useEffect(() => {
    const channel = supabase
      .channel('admin-preview-updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, () => {
        console.log('Website content updated, refreshing preview');
        refreshPreview();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, () => {
        console.log('Services updated, refreshing preview');
        refreshPreview();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, () => {
        console.log('Blog posts updated, refreshing preview');
        refreshPreview();
      })
      .subscribe();

    // Auto-refresh every 30 seconds to keep preview in sync
    const autoRefresh = setInterval(refreshPreview, 30000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(autoRefresh);
    };
  }, [refreshPreview]);

  const getDeviceConfig = (device: string) => {
    switch (device) {
      case 'desktop':
        return { width: 1200, height: 750, scale: 0.4 };
      case 'tablet':
        return { width: 768, height: 1024, scale: 0.35 };
      case 'mobile':
        return { width: 375, height: 667, scale: 0.5 };
      default:
        return { width: 1200, height: 750, scale: 0.4 };
    }
  };

  const DeviceFrame = ({ device, config }: { device: string; config: any }) => {
    const isSelected = selectedDevice === device;
    
    return (
      <div
        className={`relative cursor-pointer transition-all duration-300 ${
          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={() => setSelectedDevice(device as any)}
      >
        <div 
          className="bg-gray-800 rounded-2xl p-4 shadow-xl"
          style={{ 
            width: config.width * config.scale, 
            height: config.height * config.scale 
          }}
        >
          <div className="relative w-full h-full bg-white rounded-lg overflow-hidden">
            {isSelected && (
              <iframe
                key={`${device}-${iframeKey}`}
                src={window.location.origin}
                className="w-full h-full border-0"
                style={{
                  transform: `scale(${config.scale})`,
                  transformOrigin: 'top left',
                  width: `${100 / config.scale}%`,
                  height: `${100 / config.scale}%`
                }}
                onLoad={() => console.log(`${device} preview loaded`)}
              />
            )}
            {!isSelected && (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-sm font-medium capitalize">{device}</p>
          <p className="text-xs text-gray-500">{config.width}×{config.height}</p>
        </div>
      </div>
    );
  };

  const devices = [
    { name: 'desktop', config: getDeviceConfig('desktop') },
    { name: 'tablet', config: getDeviceConfig('tablet') },
    { name: 'mobile', config: getDeviceConfig('mobile') }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
          <p className="text-gray-600">See your website changes in real-time</p>
          {lastUpdate && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>{syncStatus === 'connected' ? 'Live Updates' : 'Offline'}</span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPreview}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {!isFullscreen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desktop View</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1920×1080</div>
              <p className="text-xs text-muted-foreground">Full desktop experience</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tablet View</CardTitle>
              <Tablet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">768×1024</div>
              <p className="text-xs text-muted-foreground">Tablet responsive design</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mobile View</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">375×667</div>
              <p className="text-xs text-muted-foreground">Mobile optimized</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Live Website Preview</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex items-center gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6' : ''}`}>
            {isFullscreen && (
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Website Preview - {selectedDevice}</h3>
                <Button
                  variant="outline"
                  onClick={() => setIsFullscreen(false)}
                >
                  Exit Fullscreen
                </Button>
              </div>
            )}
            
            <div className="flex justify-center items-center space-x-8 p-4">
              {devices.map(({ name, config }) => (
                <DeviceFrame key={name} device={name} config={config} />
              ))}
            </div>
            
            {selectedDevice && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Click on any device to preview. Changes will appear automatically.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimePreview;
