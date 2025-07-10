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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isListening, lastUpdate } = useWebsiteSync();

  // Auto-refresh iframe when website data changes
  useEffect(() => {
    if (lastUpdate) {
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
    return `${currentUrl}?preview=true&t=${Date.now()}`;
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
      frameImage: '/lovable-uploads/9909fcfb-d2bf-40c5-927d-20afb8f83059.png',
      containerClass: 'w-full max-w-5xl mx-auto',
      frameClass: 'w-full max-w-[900px] mx-auto',
      screenClass: 'absolute top-[6%] left-[6.5%] right-[6.5%] bottom-[22%] rounded-t-md overflow-hidden',
      iframeScale: 0.47,
      viewportWidth: '1920px',
      viewportHeight: '1080px'
    },
    tablet: {
      title: 'Tablet',
      resolution: '768×1024',
      description: 'Tablet responsive design',
      icon: Tablet,
      frameImage: '/lovable-uploads/4947099c-2181-4b87-8d5c-571a58986dc2.png',
      containerClass: 'w-full max-w-md mx-auto',
      frameClass: 'w-full max-w-[400px] mx-auto',
      screenClass: 'absolute top-[4%] left-[6%] right-[6%] bottom-[4%] rounded-xl overflow-hidden',
      iframeScale: 0.37,
      viewportWidth: '768px',
      viewportHeight: '1024px'
    },
    mobile: {
      title: 'Mobile',
      resolution: '375×667',
      description: 'Mobile optimized',
      icon: Smartphone,
      frameImage: '/lovable-uploads/a3abea8b-7fc0-4e67-bf4c-920d3d91e58c.png',
      containerClass: 'w-full max-w-xs mx-auto',
      frameClass: 'w-full max-w-[280px] mx-auto',
      screenClass: 'absolute top-[7%] left-[11%] right-[11%] bottom-[7%] rounded-[24px] overflow-hidden',
      iframeScale: 0.42,
      viewportWidth: '375px',
      viewportHeight: '667px'
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
              {syncStatus === 'connected' && (
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
          <div className={`${activeConfig.containerClass} transition-all duration-500`}>
            <div className={`relative ${activeConfig.frameClass}`}>
              {/* Device Frame */}
              <img 
                src={activeConfig.frameImage}
                alt={`${activeConfig.title} frame`}
                className="w-full h-auto object-contain drop-shadow-2xl select-none"
                draggable={false}
              />
              
              {/* Screen Content */}
              <div className={`${activeConfig.screenClass} bg-white border border-gray-200 shadow-2xl`}>
                <iframe
                  key={`${activeView}-${iframeKey}`}
                  ref={iframeRef}
                  src={getPreviewUrl()}
                  className="w-full h-full border-0 bg-white origin-top-left"
                  style={{ 
                    transform: `scale(${activeConfig.iframeScale})`,
                    width: `${100 / activeConfig.iframeScale}%`,
                    height: `${100 / activeConfig.iframeScale}%`
                  }}
                  title={`${activeConfig.title} Preview`}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                  loading="eager"
                />
              </div>
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