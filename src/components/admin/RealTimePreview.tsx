
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Debounced refresh to prevent loops
  const debouncedRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }
    
    refreshTimeoutRef.current = setTimeout(() => {
      setIframeKey(prev => prev + 1);
      setLastUpdate(new Date());
      console.log('Preview refreshed at:', new Date().toISOString());
    }, 500); // 500ms debounce
  }, []);

  const manualRefresh = useCallback(() => {
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
    setLastUpdate(new Date());
  }, []);

  // Real-time database sync
  useEffect(() => {
    console.log('Setting up real-time preview sync...');
    setRealTimeSyncStatus('syncing');

    const channel = supabase
      .channel('admin-preview-realtime', {
        config: {
          broadcast: { self: false },
          presence: { key: 'admin-preview' }
        }
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Website content updated:', payload);
        setRealTimeSyncStatus('connected');
        debouncedRefresh();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Services updated:', payload);
        setRealTimeSyncStatus('connected');
        debouncedRefresh();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, (payload) => {
        console.log('Blog posts updated:', payload);
        setRealTimeSyncStatus('connected');
        debouncedRefresh();
      })
      .subscribe((status) => {
        console.log('Real-time subscription status:', status);
        if (status === 'SUBSCRIBED') {
          setRealTimeSyncStatus('connected');
        } else if (status === 'CHANNEL_ERROR') {
          setRealTimeSyncStatus('disconnected');
        }
      });

    // Less aggressive auto-refresh - every 2 minutes only
    const autoRefresh = setInterval(() => {
      console.log('Auto-refreshing preview...');
      debouncedRefresh();
    }, 120000); // 2 minutes

    return () => {
      console.log('Cleaning up real-time preview sync...');
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      supabase.removeChannel(channel);
      clearInterval(autoRefresh);
    };
  }, [debouncedRefresh]);

  const handleIframeLoad = useCallback(() => {
    console.log('Website preview loaded successfully');
    setIsLoading(false);
    setRealTimeSyncStatus('connected');
  }, []);

  const handleIframeError = useCallback(() => {
    console.error('Website preview failed to load');
    setIsLoading(false);
    setRealTimeSyncStatus('disconnected');
  }, []);

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
            onClick={manualRefresh}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
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
            
            <div className={`${isFullscreen ? 'h-full' : 'h-[600px]'} w-full relative overflow-hidden bg-gray-50`}>
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading website preview...</p>
                  </div>
                </div>
              )}

              <iframe
                key={`preview-${iframeKey}`}
                src={window.location.origin}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                loading="lazy"
                style={{ 
                  opacity: isLoading ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>Changes to website content will appear here automatically.</p>
        <p>Manual refresh available if needed.</p>
      </div>
    </div>
  );
};

export default RealTimePreview;
