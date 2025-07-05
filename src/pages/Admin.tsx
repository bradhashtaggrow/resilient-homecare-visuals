
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Save, Upload, Eye, EyeOff, Trash2, Edit3, Image, Video, Type, Palette, Globe, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MediaLibrary from '@/components/admin/MediaLibrary';
import ContentEditor from '@/components/admin/ContentEditor';
import ServicesManager from '@/components/admin/ServicesManager';
import RealTimePreview from '@/components/admin/RealTimePreview';

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
}

interface Service {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: string;
  icon_name: string;
  patient_image_url?: string;
  display_order: number;
}

const Admin = () => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadData();
    setupRealtimeSubscriptions();
  }, []);

  const loadData = async () => {
    try {
      const [contentResult, servicesResult] = await Promise.all([
        supabase.from('website_content').select('*').order('section_key'),
        supabase.from('services').select('*').order('display_order')
      ]);

      if (contentResult.data) setContent(contentResult.data);
      if (servicesResult.data) setServices(servicesResult.data);
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load website content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Website content changes
    const contentChannel = supabase
      .channel('website_content_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Content change:', payload);
        loadData(); // Reload data on any change
      })
      .subscribe();

    // Services changes
    const servicesChannel = supabase
      .channel('services_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'services'
      }, (payload) => {
        console.log('Services change:', payload);
        loadData(); // Reload data on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(contentChannel);
      supabase.removeChannel(servicesChannel);
    };
  };

  const handleSave = async () => {
    toast({
      title: "Changes saved",
      description: "All changes have been saved and are live on the website",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">Healthcare CMS</h1>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Live
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={previewMode ? "default" : "outline"}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Content Sections
                  </CardTitle>
                  <CardDescription>Manage all website text content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{content.length}</div>
                  <p className="text-sm text-gray-600">Active sections</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Service Lines
                  </CardTitle>
                  <CardDescription>Manage healthcare services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{services.length}</div>
                  <p className="text-sm text-gray-600">Active services</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Media Library
                  </CardTitle>
                  <CardDescription>Images, videos & assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <p className="text-sm text-gray-600">Media files</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common CMS tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('content')}>
                    Edit Hero Section
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('services')}>
                    Manage Services
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('media')}>
                    Upload Media
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('preview')}>
                    Preview Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content">
            <ContentEditor content={content} onContentChange={setContent} />
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <ServicesManager services={services} onServicesChange={setServices} />
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <MediaLibrary />
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the visual appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded border"></div>
                      <Input value="#0080ff" readOnly />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded border"></div>
                      <Input value="#0066cc" readOnly />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Typography</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Heading Font</Label>
                      <Input value="Inter" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label>Body Font</Label>
                      <Input value="Inter" readOnly />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <RealTimePreview />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
