import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone, Tablet, Wifi, WifiOff, Maximize2 } from 'lucide-react';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

type DeviceView = 'desktop' | 'tablet' | 'mobile';

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'connected' }) => {
  const [activeView, setActiveView] = useState<DeviceView>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    return currentUrl;
  };

  const deviceConfigs = {
    desktop: {
      title: 'Desktop View',
      resolution: '1920×1080',
      description: 'Full desktop experience',
      icon: Monitor,
      frameImage: '/lovable-uploads/9909fcfb-d2bf-40c5-927d-20afb8f83059.png',
      frameClass: 'w-[600px] h-[380px]',
      screenClass: 'absolute top-[7%] left-[7.5%] right-[7.5%] bottom-[28%] rounded-t-lg',
      iframeScale: 'scale-[0.32]',
      iframeSize: '312.5%'
    },
    tablet: {
      title: 'Tablet View',
      resolution: '768×1024',
      description: 'Tablet responsive design',
      icon: Tablet,
      frameImage: '/lovable-uploads/4947099c-2181-4b87-8d5c-571a58986dc2.png',
      frameClass: 'w-[400px] h-[520px]',
      screenClass: 'absolute top-[5%] left-[7%] right-[7%] bottom-[5%] rounded-xl',
      iframeScale: 'scale-[0.35]',
      iframeSize: '285%'
    },
    mobile: {
      title: 'Mobile View', 
      resolution: '375×667',
      description: 'Mobile optimized',
      icon: Smartphone,
      frameImage: '/lovable-uploads/a3abea8b-7fc0-4e67-bf4c-920d3d91e58c.png',
      frameClass: 'w-[280px] h-[560px]',
      screenClass: 'absolute top-[7%] left-[11%] right-[11%] bottom-[7%] rounded-[28px]',
      iframeScale: 'scale-[0.22]',
      iframeSize: '454%'
    }
  };

  const activeConfig = deviceConfigs[activeView];
  const IconComponent = activeConfig.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
          <p className="text-gray-600">See your website changes in real-time</p>
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
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Device Toggle Buttons */}
      <div className="flex justify-center gap-2 p-1 bg-gray-100 rounded-lg w-fit mx-auto">
        {Object.entries(deviceConfigs).map(([key, config]) => {
          const IconComp = config.icon;
          return (
            <Button
              key={key}
              variant={activeView === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView(key as DeviceView)}
              className={`flex items-center gap-2 ${
                activeView === key 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-white/50'
              }`}
            >
              <IconComp className="h-4 w-4" />
              <span className="hidden sm:inline">{config.title}</span>
              <span className="sm:hidden">{config.resolution}</span>
            </Button>
          );
        })}
      </div>

      {/* Main Preview Area */}
      <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <IconComponent className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">{activeConfig.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {activeConfig.resolution} • {activeConfig.description}
              </p>
            </div>
          </div>
          {syncStatus === 'connected' && (
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Device Frame with Website */}
          <div className={`relative ${activeConfig.frameClass} transition-all duration-300`}>
            <img 
              src={activeConfig.frameImage}
              alt={`${activeConfig.title} frame`}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            {/* Screen Content */}
            <div className={`${activeConfig.screenClass} overflow-hidden bg-white`}>
              <iframe
                src={getPreviewUrl()}
                className={`w-full h-full border-0 bg-white ${activeConfig.iframeScale} origin-top-left`}
                style={{ 
                  width: activeConfig.iframeSize, 
                  height: activeConfig.iframeSize 
                }}
                title={`${activeConfig.title} Preview`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Real-Time Preview Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Wifi className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Live Updates</p>
                <p className="text-sm text-green-700">Changes reflect instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Responsive</p>
                <p className="text-sm text-blue-700">All device views available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <Eye className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900">Real Website</p>
                <p className="text-sm text-purple-700">Actual production view</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimePreview;