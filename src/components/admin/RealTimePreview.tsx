
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

const RealTimePreview = () => {
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getPreviewUrl = () => {
    return window.location.origin;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Preview</h2>
          <p className="text-gray-600">See your changes in real-time</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Live Sync Active
          </Badge>
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
              <CardDescription>Changes are synchronized in real-time</CardDescription>
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
                    {getPreviewUrl()}
                  </div>
                </div>
                <iframe
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
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <p className="font-medium">Real-time Sync</p>
                <p className="text-sm text-gray-600">Changes appear instantly</p>
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
