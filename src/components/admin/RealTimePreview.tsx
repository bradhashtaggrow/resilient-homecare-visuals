
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCcw, Maximize2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface RealTimePreviewProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const RealTimePreview: React.FC<RealTimePreviewProps> = ({ syncStatus = 'disconnected' }) => {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [realTimeSyncStatus, setRealTimeSyncStatus] = useState<'connected' | 'disconnected' | 'syncing'>('disconnected');

  const getSyncStatusIcon = () => {
    switch (realTimeSyncStatus) {
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
    console.log('Preview refreshed at:', new Date().toISOString());
  }, []);

  // Real-time database sync
  useEffect(() => {
    console.log('Setting up real-time preview sync...');
    setRealTimeSyncStatus('syncing');

    const channel = supabase
      .channel('admin-preview-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Website content updated:', payload);
        setRealTimeSyncStatus('connected');
        refreshPreview();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Services updated:', payload);
        setRealTimeSyncStatus('connected');
        refreshPreview();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, (payload) => {
        console.log('Blog posts updated:', payload);
        setRealTimeSyncStatus('connected');
        refreshPreview();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'value_proposition_features'
      }, (payload) => {
        console.log('Value proposition updated:', payload);
        setRealTimeSyncStatus('connected');
        refreshPreview();
      })
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          setRealTimeSyncStatus('connected');
        } else if (status === 'CHANNEL_ERROR') {
          setRealTimeSyncStatus('disconnected');
        }
      });

    // Auto-refresh every 15 seconds to keep in sync
    const autoRefresh = setInterval(() => {
      console.log('Auto-refreshing preview...');
      refreshPreview();
    }, 15000);

    // Initial load
    setTimeout(() => {
      refreshPreview();
    }, 1000);

    return () => {
      console.log('Cleaning up real-time preview sync...');
      supabase.removeChannel(channel);
      clearInterval(autoRefresh);
    };
  }, [refreshPreview]);

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
            realTimeSyncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            realTimeSyncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>
              {realTimeSyncStatus === 'connected' ? 'Live Updates' : 
               realTimeSyncStatus === 'syncing' ? 'Connecting...' : 'Offline'}
            </span>
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Website Preview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : 'relative'}`}>
            {isFullscreen && (
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Website Preview</h3>
                <Button
                  variant="outline"
                  onClick={() => setIsFullscreen(false)}
                >
                  Exit Fullscreen
                </Button>
              </div>
            )}
            
            <div className={`${isFullscreen ? 'h-full' : 'h-[600px]'} w-full relative overflow-hidden`}>
              <iframe
                key={`preview-${iframeKey}`}
                src={`${window.location.origin}?t=${Date.now()}`}
                className="w-full h-full border-0"
                onLoad={() => {
                  console.log('Website preview loaded successfully');
                  setRealTimeSyncStatus('connected');
                }}
                onError={() => {
                  console.error('Website preview failed to load');
                  setRealTimeSyncStatus('disconnected');
                }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                loading="eager"
              />
              
              {/* Loading overlay */}
              {realTimeSyncStatus === 'syncing' && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading website...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>Changes to website content, services, and blog posts will appear here automatically.</p>
        <p>Refresh manually if needed or wait for automatic updates every 15 seconds.</p>
      </div>
    </div>
  );
};

export default RealTimePreview;
