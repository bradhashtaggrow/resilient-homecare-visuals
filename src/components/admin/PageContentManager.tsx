
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Globe, Wifi, WifiOff, Eye } from 'lucide-react';
import ContentEditor from './ContentEditor';

interface WebsiteContent {
  id: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_video_url?: string;
  background_image_url?: string;
  mobile_background_url?: string;
  laptop_background_url?: string;
  content_data?: any;
  is_active?: boolean;
}

interface PageContentManagerProps {
  selectedPage: string;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const PageContentManager: React.FC<PageContentManagerProps> = ({ 
  selectedPage, 
  syncStatus = 'disconnected' 
}) => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPageContent();
    setupRealtimeSubscription();
  }, [selectedPage]);

  const loadPageContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .like('section_key', `${selectedPage}_%`)
        .eq('is_active', true)
        .order('section_key');

      if (error) throw error;

      console.log('Loaded page content:', data);
      setContent(data || []);
    } catch (error) {
      console.error('Error loading page content:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load page content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel(`page-content-${selectedPage}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: `section_key=like.${selectedPage}_%`
      }, (payload) => {
        console.log('Real-time page content change:', payload);
        loadPageContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-blue-600" />;
      case 'syncing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-blue-400" />;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'connected':
        return 'Real-time sync active';
      case 'syncing':
        return 'Syncing changes...';
      default:
        return 'Sync disconnected';
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200';
      case 'syncing':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gradient-to-r from-blue-50 to-slate-50 text-blue-600 border-blue-200';
    }
  };

  const getPageDisplayName = () => {
    const pageNames: Record<string, string> = {
      'home': 'Home Page',
      'about': 'About Page', 
      'clinicians': 'Clinicians Page',
      'care-at-home': 'Care At Home Page',
      'contact': 'Contact Page'
    };
    return pageNames[selectedPage] || selectedPage;
  };

  const handlePreview = () => {
    const routes: Record<string, string> = {
      'home': '/',
      'about': '/about',
      'clinicians': '/clinicians', 
      'care-at-home': '/care-at-home',
      'contact': '/contact'
    };
    const route = routes[selectedPage] || '/';
    window.open(window.location.origin + route, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {getPageDisplayName()} Content Management
          </h2>
          <p className="text-blue-600">Edit and manage content sections for the {getPageDisplayName().toLowerCase()}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={getSyncStatusColor()}>
            {getSyncStatusIcon()}
            <span className="ml-2">{getSyncStatusText()}</span>
          </Badge>
          <Button variant="outline" onClick={handlePreview} className="border-blue-200 text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
            <Eye className="h-4 w-4 mr-2" />
            Preview {getPageDisplayName()}
          </Button>
        </div>
      </div>

      <Separator className="bg-blue-100" />

      {content.length > 0 ? (
        <ContentEditor 
          content={content} 
          onContentChange={setContent} 
          syncStatus={syncStatus}
        />
      ) : (
        <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">No content sections found</h3>
            <p className="text-blue-600">Content sections for {getPageDisplayName().toLowerCase()} will appear here once they're configured</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PageContentManager;
