
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import { 
  Save, 
  Upload, 
  Download, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Settings,
  Wifi,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface WebsiteContent {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  button_text: string | null;
  button_url: string | null;
  background_image_url: string | null;
  background_video_url: string | null;
  laptop_background_url: string | null;
  mobile_background_url: string | null;
  content_data: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WebsiteContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const WebsiteContentManager: React.FC<WebsiteContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedContent, setSelectedContent] = useState<WebsiteContent | null>(null);
  const [editingContent, setEditingContent] = useState<Partial<WebsiteContent>>({});
  const [activeTab, setActiveTab] = useState('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { toast } = useToast();

  // Load content data
  useEffect(() => {
    loadContent();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('website-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time website content change:', payload);
        loadContent();
        
        toast({
          title: "Content updated",
          description: "Website content updated in real-time",
        });
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('section_key');

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load website content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (contentData: Partial<WebsiteContent>) => {
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('website_content')
        .upsert({
          ...contentData,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Content saved",
        description: "Website content has been saved successfully",
      });

      setEditingContent({});
      setSelectedContent(null);
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error saving content",
        description: "Failed to save website content",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getSectionContent = (sectionKey: string) => {
    return content.find(c => c.section_key === sectionKey);
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'connected':
        return 'Connected';
      case 'syncing':
        return 'Syncing';
      default:
        return 'Disconnected';
    }
  };

  const ContentEditor = ({ sectionKey, title }: { sectionKey: string; title: string }) => {
    const sectionContent = getSectionContent(sectionKey);
    const [formData, setFormData] = useState<Partial<WebsiteContent>>(
      sectionContent || {
        section_key: sectionKey,
        title: '',
        subtitle: '',
        description: '',
        button_text: '',
        button_url: '',
        is_active: true
      }
    );

    const handleSave = () => {
      saveContent(formData);
    };

    const handleImageUpload = (field: string, url: string) => {
      setFormData(prev => ({ ...prev, [field]: url }));
    };

    return (
      <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            {title} Section
          </CardTitle>
          <CardDescription className="text-black">
            Configure the content for the {title.toLowerCase()} section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-black">Title</Label>
              <Input
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Section title"
                className="border-primary focus:border-primary"
              />
            </div>
            <div>
              <Label className="text-black">Subtitle</Label>
              <Input
                value={formData.subtitle || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Section subtitle"
                className="border-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <Label className="text-black">Description</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Section description"
              rows={4}
              className="border-primary focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-black">Button Text</Label>
              <Input
                value={formData.button_text || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                placeholder="Call to action text"
                className="border-primary focus:border-primary"
              />
            </div>
            <div>
              <Label className="text-black">Button URL</Label>
              <Input
                value={formData.button_url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, button_url: e.target.value }))}
                placeholder="Button destination URL"
                className="border-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black">Media Assets</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-black mb-2 block">Background Image</Label>
                <ImageUpload
                  currentImageUrl={formData.background_image_url || ''}
                  onImageUploaded={(url) => handleImageUpload('background_image_url', url)}
                  onImageRemoved={() => setFormData(prev => ({ ...prev, background_image_url: null }))}
                />
              </div>

              <div>
                <Label className="text-black mb-2 block">Laptop Background</Label>
                <ImageUpload
                  currentImageUrl={formData.laptop_background_url || ''}
                  onImageUploaded={(url) => handleImageUpload('laptop_background_url', url)}
                  onImageRemoved={() => setFormData(prev => ({ ...prev, laptop_background_url: null }))}
                />
              </div>
            </div>

            <div>
              <Label className="text-black mb-2 block">Mobile Background</Label>
              <ImageUpload
                currentImageUrl={formData.mobile_background_url || ''}
                onImageUploaded={(url) => handleImageUpload('mobile_background_url', url)}
                onImageRemoved={() => setFormData(prev => ({ ...prev, mobile_background_url: null }))}
              />
            </div>

            <div>
              <Label className="text-black">Background Video URL</Label>
              <Input
                value={formData.background_video_url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, background_video_url: e.target.value }))}
                placeholder="Video URL for background"
                className="border-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_active || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label className="text-black">Section Active</Label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              {getSyncStatusIcon()}
              <span className="text-sm text-black">{getSyncStatusText()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Content Preview</DialogTitle>
                    <DialogDescription>
                      Preview how your content will look on the website
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2 mb-4">
                    <Button
                      variant={previewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewMode === 'tablet' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet className="h-4 w-4 mr-2" />
                      Tablet
                    </Button>
                    <Button
                      variant={previewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                  <div className={`
                    mx-auto border rounded-lg overflow-hidden
                    ${previewMode === 'mobile' ? 'w-[375px] h-[600px]' : 
                      previewMode === 'tablet' ? 'w-[768px] h-[500px]' : 
                      'w-full h-[500px]'}
                  `}>
                    <iframe
                      src="/"
                      className="w-full h-full"
                      title="Website Preview"
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
              Website Content Manager
            </h1>
            <p className="text-xl text-slate-600 font-apple">
              Manage and customize your website content in real-time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200">
              <Wifi className="h-4 w-4 mr-2" />
              Live Sync Active
            </Badge>
          </div>
        </div>

        <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Globe className="h-4 w-4" />
          <AlertDescription className="text-blue-800">
            Changes you make here will be reflected on your live website in real-time. 
            Use the preview feature to see how your changes will look before saving.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <ContentEditor sectionKey="hero" title="Hero" />
          </TabsContent>

          <TabsContent value="services">
            <ContentEditor sectionKey="services" title="Services" />
          </TabsContent>

          <TabsContent value="features">
            <ContentEditor sectionKey="features" title="Features" />
          </TabsContent>

          <TabsContent value="testimonials">
            <ContentEditor sectionKey="testimonials" title="Testimonials" />
          </TabsContent>

          <TabsContent value="about">
            <ContentEditor sectionKey="about" title="About" />
          </TabsContent>

          <TabsContent value="contact">
            <ContentEditor sectionKey="contact" title="Contact" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WebsiteContentManager;
