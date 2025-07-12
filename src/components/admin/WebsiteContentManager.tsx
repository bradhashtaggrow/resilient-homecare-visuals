import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit3, 
  Save, 
  X, 
  Image, 
  Video, 
  Wifi,
  WifiOff,
  RefreshCw
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
  mobile_background_url: string | null;
  laptop_background_url: string | null;
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
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WebsiteContent>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const { toast } = useToast();

  // Define the EXACT home page sections in the correct order
  const HOME_PAGE_SECTIONS = [
    'hero',
    'service_lines',
    'mobile_showcase', 
    'value_proposition',
    'admin_dashboard',
    'founder',
    'stats',
    'lead_generation'
  ];

  // Add About page sections
  const ABOUT_PAGE_SECTIONS = [
    'about_hero',
    'about_why_choose',
    'about_for_hospitals',
    'about_for_clinicians',
    'about_values',
    'about_footer'
  ];

  const ALL_SECTIONS = [...HOME_PAGE_SECTIONS, ...ABOUT_PAGE_SECTIONS];

  const SECTION_LABELS = {
    // Home page sections
    'hero': 'Hero Section',
    'service_lines': 'Services Section',
    'mobile_showcase': 'Mobile Section', 
    'value_proposition': 'Value Proposition - We Manage the Work',
    'admin_dashboard': 'Laptop Section',
    'founder': 'Founder Section',
    'stats': 'What Does the Research Say',
    'lead_generation': 'Join 500+ Hospitals',
    // About page sections
    'about_hero': 'About - Hero Section',
    'about_why_choose': 'About - Why Choose Resilient',
    'about_for_hospitals': 'About - For Hospitals',
    'about_for_clinicians': 'About - For Clinicians',
    'about_values': 'About - Core Values',
    'about_footer': 'About - Footer CTA'
  };

  useEffect(() => {
    loadContent();
    setupRealtimeSubscription();
  }, []);

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

  const getSectionOrder = (sectionKey: string) => {
    const homeIndex = HOME_PAGE_SECTIONS.indexOf(sectionKey);
    if (homeIndex !== -1) return homeIndex;
    
    const aboutIndex = ABOUT_PAGE_SECTIONS.indexOf(sectionKey);
    if (aboutIndex !== -1) return HOME_PAGE_SECTIONS.length + aboutIndex;
    
    return 999;
  };

  const getSectionDisplayName = (key: string) => {
    return SECTION_LABELS[key as keyof typeof SECTION_LABELS] || key;
  };

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .in('section_key', ALL_SECTIONS);

      if (error) throw error;
      
      // Sort by order and show both home and about page sections
      const sortedData = (data || [])
        .filter(item => ALL_SECTIONS.includes(item.section_key))
        .sort((a, b) => getSectionOrder(a.section_key) - getSectionOrder(b.section_key));
      
      setContent(sortedData);
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

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('website-content-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time content change:', payload);
        loadContent();
        toast({
          title: "Content synced",
          description: "Website content updated in real-time",
        });
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.section_key);
    setEditForm(section);
  };

  const handleSave = async () => {
    if (!editingSection || !editForm.id) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .update({
          title: editForm.title?.trim() || null,
          subtitle: editForm.subtitle?.trim() || null,
          description: editForm.description?.trim() || null,
          background_image_url: editForm.background_image_url || null,
          background_video_url: editForm.background_video_url || null,
          is_active: editForm.is_active ?? true
        })
        .eq('id', editForm.id);

      if (error) throw error;

      toast({
        title: "Content updated",
        description: `${SECTION_LABELS[editingSection as keyof typeof SECTION_LABELS]} content saved successfully`,
      });

      setEditingSection(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save failed",
        description: "Failed to save website content",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditForm({});
  };

  const hasBackgroundMedia = (section: WebsiteContent) => {
    // Only hero, mobile, and laptop (admin_dashboard) sections have background media
    return ['hero', 'mobile_showcase', 'admin_dashboard'].includes(section.section_key);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload background image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    try {
      setUploadingVideo(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload background video",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = type === 'image' ? await handleImageUpload(file) : await handleVideoUpload(file);
    if (url) {
      setEditForm({
        ...editForm,
        [type === 'image' ? 'background_image_url' : 'background_video_url']: url
      });
      
      toast({
        title: "Upload successful",
        description: `Background ${type} uploaded successfully`,
      });
    }
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Website Content Manager</h2>
          <p className="text-gray-600">Manage home page and about page sections in real-time sync with database</p>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncStatusIcon()}
          <span className="text-sm text-gray-600">
            {syncStatus === 'connected' ? 'Real-time sync active' : 
             syncStatus === 'syncing' ? 'Syncing...' : 'Disconnected'}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={loadContent}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
        {content.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No home page sections found. Make sure the home page sections exist in the database.</p>
            </CardContent>
          </Card>
        ) : (
          content.map((section) => (
            <Card key={section.id} className="overflow-hidden border border-gray-200">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900 text-lg">
                      {getSectionDisplayName(section.section_key)}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      Order: {getSectionOrder(section.section_key) + 1} • Key: {section.section_key}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={section.is_active ? "default" : "secondary"}>
                      {section.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {editingSection === section.section_key ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(section)}>
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 bg-white">
                {editingSection === section.section_key ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <Input
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        placeholder="Enter section title"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <Input
                        value={editForm.subtitle || ''}
                        onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                        placeholder="Enter section subtitle"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        placeholder="Enter section description"
                        rows={3}
                        className="w-full"
                      />
                    </div>

                    {hasBackgroundMedia(section) && (
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-900">Background Media</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Image className="h-4 w-4 inline mr-1" />
                              Background Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'image')}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploadingImage && (
                              <div className="mt-2 text-sm text-blue-600 flex items-center">
                                <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                                Uploading image...
                              </div>
                            )}
                            {editForm.background_image_url && (
                              <div className="mt-2 text-sm text-green-600">✓ Image uploaded</div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Video className="h-4 w-4 inline mr-1" />
                              Background Video
                            </label>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleFileChange(e, 'video')}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {uploadingVideo && (
                              <div className="mt-2 text-sm text-blue-600 flex items-center">
                                <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                                Uploading video...
                              </div>
                            )}
                            {editForm.background_video_url && (
                              <div className="mt-2 text-sm text-green-600">✓ Video uploaded</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Title:</span>
                        <p className="text-gray-900 mt-1">{section.title || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Subtitle:</span>
                        <p className="text-gray-900 mt-1">{section.subtitle || 'Not set'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <p className="text-gray-900 mt-1">{section.description || 'Not set'}</p>
                    </div>

                    {hasBackgroundMedia(section) && (
                      <div className="pt-3 border-t">
                        <span className="text-sm font-medium text-gray-500">Background Media:</span>
                        <div className="mt-2 flex space-x-4">
                          {section.background_image_url && (
                            <span className="inline-flex items-center text-sm text-green-600">
                              <Image className="h-4 w-4 mr-1" />
                              Image available
                            </span>
                          )}
                          {section.background_video_url && (
                            <span className="inline-flex items-center text-sm text-green-600">
                              <Video className="h-4 w-4 mr-1" />
                              Video available
                            </span>
                          )}
                          {!section.background_image_url && !section.background_video_url && (
                            <span className="text-sm text-gray-400">No background media</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WebsiteContentManager;
