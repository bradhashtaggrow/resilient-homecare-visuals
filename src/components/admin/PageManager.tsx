import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Globe, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface PageSetting {
  id: string;
  page_name: string;
  display_name: string;
  description?: string;
  is_enabled: boolean;
}

const PageManager: React.FC = () => {
  const [pages, setPages] = useState<PageSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('page_settings')
        .select('*')
        .order('display_name');

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const togglePage = async (pageId: string, currentStatus: boolean) => {
    try {
      setUpdating(pageId);
      
      const { error } = await supabase
        .from('page_settings')
        .update({ is_enabled: !currentStatus })
        .eq('id', pageId);

      if (error) throw error;

      setPages(pages.map(page => 
        page.id === pageId 
          ? { ...page, is_enabled: !currentStatus }
          : page
      ));

      const action = !currentStatus ? 'enabled' : 'disabled';
      toast.success(`Page ${action} successfully`);
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Failed to update page status');
    } finally {
      setUpdating(null);
    }
  };

  const enabledCount = pages.filter(page => page.is_enabled).length;
  const disabledCount = pages.filter(page => !page.is_enabled).length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Loading pages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Page Management</h2>
          <p className="text-gray-600 mt-1">
            Control which pages are visible on your website
          </p>
        </div>
        <Button 
          onClick={loadPages}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enabled Pages</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{enabledCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disabled Pages</CardTitle>
            <EyeOff className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{disabledCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id} className={`transition-all duration-200 ${
            page.is_enabled ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    page.is_enabled ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <CardTitle className="text-lg">{page.display_name}</CardTitle>
                    <CardDescription>
                      Route: /{page.page_name === 'home' ? '' : page.page_name}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={page.is_enabled ? "default" : "secondary"}>
                    {page.is_enabled ? "Live" : "Disabled"}
                  </Badge>
                  <Switch
                    checked={page.is_enabled}
                    onCheckedChange={() => togglePage(page.id, page.is_enabled)}
                    disabled={updating === page.id}
                  />
                </div>
              </div>
            </CardHeader>
            {page.description && (
              <CardContent>
                <p className="text-sm text-gray-600">{page.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageManager;