import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Monitor, Smartphone, Tablet, Wifi, WifiOff } from 'lucide-react';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'disconnected' }) => {
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
    // Get the current site URL for the iframe
    const currentUrl = window.location.origin;
    return currentUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
          <p className="text-gray-600">See your website changes in real-time</p>
        </div>
        <Badge variant="outline" className={`flex items-center gap-2 ${
          syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
          syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-red-50 text-red-700 border-red-200'
        }`}>
          {getSyncStatusIcon()}
          <span>{syncStatus === 'connected' ? 'Live Updates' : 'Offline'}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Desktop View - Laptop */}
        <Card className="flex flex-col items-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 w-full">
            <CardTitle className="text-sm font-medium">Desktop View</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-lg font-bold">1920x1080</div>
            <p className="text-xs text-muted-foreground text-center">Full desktop experience</p>
            
            {/* Laptop Frame */}
            <div className="relative w-80 h-52">
              <img 
                src="/lovable-uploads/9909fcfb-d2bf-40c5-927d-20afb8f83059.png" 
                alt="Laptop frame"
                className="w-full h-full object-contain"
              />
              {/* Screen content */}
              <div className="absolute top-[8%] left-[8%] right-[8%] bottom-[32%] overflow-hidden rounded-t-lg">
                <iframe
                  src={getPreviewUrl()}
                  className="w-full h-full border-0 bg-white scale-[0.25] origin-top-left"
                  style={{ width: '400%', height: '400%' }}
                  title="Desktop Preview"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tablet View - iPad */}
        <Card className="flex flex-col items-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 w-full">
            <CardTitle className="text-sm font-medium">Tablet View</CardTitle>
            <Tablet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-lg font-bold">768x1024</div>
            <p className="text-xs text-muted-foreground text-center">Tablet responsive design</p>
            
            {/* Tablet Frame */}
            <div className="relative w-56 h-72">
              <img 
                src="/lovable-uploads/4947099c-2181-4b87-8d5c-571a58986dc2.png" 
                alt="Tablet frame"
                className="w-full h-full object-contain"
              />
              {/* Screen content */}
              <div className="absolute top-[6%] left-[8%] right-[8%] bottom-[6%] overflow-hidden rounded-lg">
                <iframe
                  src={getPreviewUrl()}
                  className="w-full h-full border-0 bg-white scale-[0.2] origin-top-left"
                  style={{ width: '500%', height: '500%' }}
                  title="Tablet Preview"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile View - iPhone */}
        <Card className="flex flex-col items-center">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 w-full">
            <CardTitle className="text-sm font-medium">Mobile View</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-lg font-bold">375x667</div>
            <p className="text-xs text-muted-foreground text-center">Mobile optimized</p>
            
            {/* Phone Frame */}
            <div className="relative w-44 h-80">
              <img 
                src="/lovable-uploads/a3abea8b-7fc0-4e67-bf4c-920d3d91e58c.png" 
                alt="Phone frame"
                className="w-full h-full object-contain"
              />
              {/* Screen content */}
              <div className="absolute top-[8%] left-[12%] right-[12%] bottom-[8%] overflow-hidden rounded-3xl">
                <iframe
                  src={getPreviewUrl()}
                  className="w-full h-full border-0 bg-white scale-[0.15] origin-top-left"
                  style={{ width: '667%', height: '667%' }}
                  title="Mobile Preview"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Real-Time Preview Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-gray-600">
              {syncStatus === 'connected' 
                ? 'Live previews are active. Changes to your website will appear in real-time across all device views.'
                : 'Previews are currently offline. Connect to see real-time updates.'
              }
            </p>
            {syncStatus === 'connected' && (
              <p className="text-sm text-gray-500 mt-2">
                The previews above show your actual website as it appears on different devices.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimePreview;