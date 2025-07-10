import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone, Tablet, Wifi, WifiOff, Maximize2, RotateCcw } from 'lucide-react';
import { useWebsiteSync } from '@/hooks/useWebsiteSync';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

type DeviceView = 'desktop' | 'tablet' | 'mobile';

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'connected' }) => {
  const [activeView, setActiveView] = useState<DeviceView>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isListening, lastUpdate } = useWebsiteSync();

  // Auto-refresh iframe when website data changes
  useEffect(() => {
    if (lastUpdate) {
      setIsIframeLoading(true);
      setIframeKey(prev => prev + 1);
    }
  }, [lastUpdate]);

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

  const getPreviewUrl = () => {
    const currentUrl = window.location.origin;
    return `${currentUrl}?preview=true&device=${activeView}&t=${Date.now()}`;
  };

  const refreshPreview = () => {
    setIsIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  const deviceConfigs = {
    desktop: {
      title: 'Desktop',
      resolution: '1920×1080',
      description: 'Full desktop experience',
      icon: Monitor,
      frameClass: 'w-[800px] h-[500px]',
      frameImage: '/lovable-uploads/9909fcfb-d2bf-40c5-927d-20afb8f83059.png',
      screenClass: 'absolute top-[7%] left-[7%] right-[7%] bottom-[21%] overflow-hidden bg-white rounded-t-[6px] shadow-inner',
      iframeClass: 'w-full h-full border-0 bg-white',
      scale: 0.48
    },
    tablet: {
      title: 'Tablet',
      resolution: '768×1024',
      description: 'Tablet responsive design',
      icon: Tablet,
      frameClass: 'w-[400px] h-[520px]',
      frameImage: '/lovable-uploads/4947099c-2181-4b87-8d5c-571a58986dc2.png',
      screenClass: 'absolute top-[4.5%] left-[6.5%] right-[6.5%] bottom-[4.5%] overflow-hidden bg-white rounded-[8px] shadow-inner',
      iframeClass: 'w-full h-full border-0 bg-white',
      scale: 0.38
    },
    mobile: {
      title: 'Mobile',
      resolution: '375×667',
      description: 'Mobile optimized',
      icon: Smartphone,
      frameClass: 'w-[280px] h-[560px]',
      frameImage: '/lovable-uploads/a3abea8b-7fc0-4e67-bf4c-920d3d91e58c.png',
      screenClass: 'absolute top-[7%] left-[11%] right-[11%] bottom-[7%] overflow-hidden bg-white rounded-[22px] shadow-inner',
      iframeClass: 'w-full h-full border-0 bg-white',
      scale: 0.22
    }
  };

  const activeConfig = deviceConfigs[activeView];
  const IconComponent = activeConfig.icon;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Live Preview</h2>
          <p className="text-gray-600 mt-1">See your website changes in real-time across all devices</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`flex items-center gap-2 px-3 py-1 transition-colors ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span className="font-medium">
              {syncStatus === 'connected' ? 'Live Updates' : 
               syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}
            </span>
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshPreview}
            disabled={isIframeLoading}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <RotateCcw className={`h-4 w-4 ${isIframeLoading ? 'animate-spin' : ''}`} />
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
                onClick={() => {
                  setActiveView(key as DeviceView);
                  setIsIframeLoading(true);
                }}
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
              {syncStatus === 'connected' && !isIframeLoading && (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-700">Live</span>
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
        
        <CardContent className={`flex justify-center items-center ${isFullscreen ? 'min-h-[calc(100vh-250px)]' : 'min-h-[700px]'} p-12 bg-gradient-to-br from-gray-50 to-slate-100`}>
          <div className="transition-all duration-500 ease-in-out">
            {/* Device Frame Container */}
            <div className={`relative ${activeConfig.frameClass} mx-auto`}>
              {/* Screen Content - BEHIND the frame */}
              <div className={`${activeConfig.screenClass} z-10`}>
                <div 
                  className="w-full h-full relative"
                  style={{
                    transform: `scale(${activeConfig.scale})`,
                    transformOrigin: 'top left',
                    width: `${100 / activeConfig.scale}%`,
                    height: `${100 / activeConfig.scale}%`
                  }}
                >
                  <iframe
                    key={`${activeView}-${iframeKey}`}
                    ref={iframeRef}
                    src={getPreviewUrl()}
                    className={`${activeConfig.iframeClass} absolute top-0 left-0`}
                    title={`${activeConfig.title} Preview`}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
                    loading="eager"
                    onLoad={handleIframeLoad}
                    onError={() => setIsIframeLoading(false)}
                  />
                  
                  {/* Loading Overlay */}
                  {isIframeLoading && (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm text-gray-600 font-medium">Loading preview...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Device Frame - ON TOP of content */}
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

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-md">
              <Wifi className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="font-bold text-green-900 text-lg">Real-Time Sync</p>
              <p className="text-green-700">Changes update instantly</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md">
              <Monitor className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-lg">Responsive Design</p>
              <p className="text-blue-700">All device views supported</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-md">
              <Eye className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <p className="font-bold text-purple-900 text-lg">Live Website</p>
              <p className="text-purple-700">Actual production preview</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimePreview;