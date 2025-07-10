import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone, Tablet, Wifi, WifiOff, Maximize2, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

type DeviceView = 'desktop' | 'tablet' | 'mobile';

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'connected' }) => {
  const [activeView, setActiveView] = useState<DeviceView>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [realTimeSyncStatus, setRealTimeSyncStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Real-time database sync
  useEffect(() => {
    const setupRealTimeSync = async () => {
      try {
        // Create channel for real-time updates
        const channel = supabase
          .channel('website-preview-updates')
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'website_content'
          }, (payload) => {
            console.log('Website content updated:', payload);
            setLastUpdate(new Date());
            setIframeKey(prev => prev + 1);
          })
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'services'
          }, (payload) => {
            console.log('Services updated:', payload);
            setLastUpdate(new Date());
            setIframeKey(prev => prev + 1);
          })
          .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'blog_posts'
          }, (payload) => {
            console.log('Blog posts updated:', payload);
            setLastUpdate(new Date());
            setIframeKey(prev => prev + 1);
          })
          .subscribe((status) => {
            console.log('Real-time subscription status:', status);
            setRealTimeSyncStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
          });

        // Cleanup function
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error setting up real-time sync:', error);
        setRealTimeSyncStatus('disconnected');
      }
    };

    const cleanup = setupRealTimeSync();
    
    return () => {
      if (cleanup) {
        cleanup.then(fn => fn && fn());
      }
    };
  }, []);

  // Auto-refresh iframe periodically for persistent sync
  useEffect(() => {
    const interval = setInterval(() => {
      if (realTimeSyncStatus === 'connected') {
        setIframeKey(prev => prev + 1);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [realTimeSyncStatus]);

  const getSyncStatusIcon = () => {
    const currentStatus = realTimeSyncStatus === 'connected' ? 'connected' : syncStatus;
    switch (currentStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'syncing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-red-600" />;
    }
  };

  const getPreviewUrl = () => {
    const currentUrl = window.location.origin;
    return `${currentUrl}?preview=true&device=${activeView}&realtime=${Date.now()}`;
  };

  const refreshPreview = () => {
    setIframeKey(prev => prev + 1);
  };

  const deviceConfigs = {
    desktop: {
      title: 'Desktop',
      resolution: '1920×1080',
      description: 'Full desktop experience',
      icon: Monitor,
      frameClass: 'w-[1200px] h-[750px]', // Much larger laptop
      frameImage: '/lovable-uploads/84cc2dfb-c230-4c3a-9c47-646317ef95d8.png', // New clean laptop frame
      screenClass: 'absolute top-[5%] left-[6%] right-[6%] bottom-[18%] overflow-hidden bg-white rounded-t-[8px]',
      iframeClass: 'w-full h-full border-0 bg-white transform origin-top-left',
      scale: 0.65
    },
    tablet: {
      title: 'Tablet',
      resolution: '768×1024',
      description: 'Tablet responsive design',
      icon: Tablet,
      frameClass: 'w-[450px] h-[600px]',
      frameImage: '/lovable-uploads/4947099c-2181-4b87-8d5c-571a58986dc2.png',
      screenClass: 'absolute top-[4%] left-[6%] right-[6%] bottom-[4%] overflow-hidden bg-white rounded-[12px]',
      iframeClass: 'w-full h-full border-0 bg-white transform origin-top-left',
      scale: 0.42
    },
    mobile: {
      title: 'Mobile',
      resolution: '375×667',
      description: 'Mobile optimized',
      icon: Smartphone,
      frameClass: 'w-[320px] h-[640px]',
      frameImage: '/lovable-uploads/a3abea8b-7fc0-4e67-bf4c-920d3d91e58c.png',
      screenClass: 'absolute top-[6%] left-[10%] right-[10%] bottom-[6%] overflow-hidden bg-white rounded-[28px]',
      iframeClass: 'w-full h-full border-0 bg-white transform origin-top-left',
      scale: 0.25
    }
  };

  const activeConfig = deviceConfigs[activeView];
  const IconComponent = activeConfig.icon;
  const currentStatus = realTimeSyncStatus === 'connected' ? 'connected' : syncStatus;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Live Preview</h2>
          <p className="text-gray-600 mt-1">Real-time database sync • Persistent preview updates</p>
          {lastUpdate && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`flex items-center gap-2 px-3 py-1 transition-all duration-300 ${
            currentStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-300 shadow-md' :
            currentStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-300' :
            'bg-red-50 text-red-700 border-red-300'
          }`}>
            {getSyncStatusIcon()}
            <span className="font-semibold">
              {currentStatus === 'connected' ? 'Live Sync Active' : 
               currentStatus === 'syncing' ? 'Syncing...' : 'Offline'}
            </span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPreview}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Device Toggle Buttons */}
      <div className="flex justify-center">
        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl shadow-inner">
          {Object.entries(deviceConfigs).map(([key, config]) => {
            const IconComp = config.icon;
            const isActive = activeView === key;
            return (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => setActiveView(key as DeviceView)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-white shadow-md text-blue-600 hover:bg-white scale-105' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <IconComp className={`h-5 w-5 ${isActive ? 'text-blue-600' : ''}`} />
                <div className="text-left">
                  <div className="font-semibold">{config.title}</div>
                  <div className="text-xs opacity-70">{config.resolution}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Preview Area */}
      <Card className={`transition-all duration-300 border-0 shadow-2xl ${isFullscreen ? 'fixed inset-4 z-50 bg-white' : 'bg-gradient-to-br from-slate-50 via-white to-gray-50'}`}>
        <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl shadow-md ${
                activeView === 'desktop' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 
                activeView === 'tablet' ? 'bg-gradient-to-br from-purple-100 to-purple-200' : 
                'bg-gradient-to-br from-green-100 to-green-200'
              }`}>
                <IconComponent className={`h-6 w-6 ${
                  activeView === 'desktop' ? 'text-blue-700' : 
                  activeView === 'tablet' ? 'text-purple-700' : 
                  'text-green-700'
                }`} />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">{activeConfig.title} View</CardTitle>
                <p className="text-gray-600 mt-1">
                  {activeConfig.resolution} • {activeConfig.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentStatus === 'connected' && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-700">Real-Time</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="flex items-center gap-2 bg-white shadow-sm hover:shadow-md"
              >
                <Maximize2 className="h-4 w-4" />
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={`flex justify-center items-center ${isFullscreen ? 'min-h-[calc(100vh-250px)]' : 'min-h-[800px]'} p-8 bg-gradient-to-br from-gray-50 to-slate-100`}>
          <div className="transition-all duration-500 ease-in-out">
            {/* Device Frame Container */}
            <div className={`relative ${activeConfig.frameClass} mx-auto`}>
              {/* Screen Content - Positioned precisely within device frame */}
              <div className={`${activeConfig.screenClass} z-10 bg-black`}>
                <iframe
                  key={`${activeView}-${iframeKey}`}
                  ref={iframeRef}
                  src={getPreviewUrl()}
                  className={`${activeConfig.iframeClass}`}
                  style={{
                    transform: `scale(${activeConfig.scale})`,
                    width: `${100 / activeConfig.scale}%`,
                    height: `${100 / activeConfig.scale}%`
                  }}
                  title={`${activeConfig.title} Preview`}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
                  loading="eager"
                  frameBorder="0"
                  scrolling="yes"
                />
              </div>
              
              {/* Device Frame - Positioned on top */}
              <img 
                src={activeConfig.frameImage}
                alt={`${activeConfig.title} frame`}
                className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none z-20"
                draggable={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-md">
              <Wifi className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="font-bold text-green-900 text-lg">Database Sync</p>
              <p className="text-green-700 text-sm">{realTimeSyncStatus === 'connected' ? 'Connected' : 'Disconnected'}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md">
              <Monitor className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-lg">Responsive</p>
              <p className="text-blue-700 text-sm">All devices</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-md">
              <Eye className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="font-bold text-purple-900 text-lg">Live Preview</p>
              <p className="text-purple-700 text-sm">Real-time updates</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-md">
              <RotateCcw className="h-6 w-6 text-orange-700" />
            </div>
            <div>
              <p className="font-bold text-orange-900 text-lg">Auto-Refresh</p>
              <p className="text-orange-700 text-sm">30s intervals</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimePreview;