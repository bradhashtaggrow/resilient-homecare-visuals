import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Eye,
  Settings,
  Activity,
  Heart,
  Building2,
  TrendingUp,
  Shield,
  Target,
  Award,
  Users,
  MapPin,
  CheckCircle,
  Zap,
  Clock,
  BarChart3,
  Database,
  Lock,
  BookOpen
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
  const [uploadingPatientImage, setUploadingPatientImage] = useState<{[key: number]: boolean}>({});
  const [hasNewVideoUpload, setHasNewVideoUpload] = useState(false);
  const { toast } = useToast();

  // Available icons for selection
  const availableIcons = {
    Activity,
    Heart,
    Building2,
    TrendingUp,
    Shield,
    Target,
    Award,
    Users,
    MapPin,
    CheckCircle,
    Zap,
    Clock,
    BarChart3,
    Database,
    Lock,
    BookOpen
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Activity className="h-5 w-5" />;
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
    const order = {
      'navigation': 1,
      'hero': 2,
      'services': 3,
      'mobile_showcase': 4,
      'value_proposition': 5,
      'admin_dashboard': 6,
      'founder': 7,
      'stats': 8,
      'lead_generation': 9,
      'footer': 10
    };
    return order[sectionKey as keyof typeof order] || 999;
  };

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*');

      if (error) throw error;
      
      // Sort by the defined order
      const sortedData = (data || []).sort((a, b) => 
        getSectionOrder(a.section_key) - getSectionOrder(b.section_key)
      );
      
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
      .channel('website-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time content change:', payload);
        loadContent();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.section_key);
    setEditForm(section);
    setHasNewVideoUpload(false);
  };

  const handleSave = async () => {
    if (!editingSection || !editForm.id) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .update({
          title: editForm.title,
          subtitle: editForm.subtitle,
          description: editForm.description,
          button_text: editForm.button_text,
          button_url: editForm.button_url,
          background_image_url: editForm.background_image_url,
          background_video_url: editForm.background_video_url,
          mobile_background_url: editForm.mobile_background_url,
          laptop_background_url: editForm.laptop_background_url,
          content_data: editForm.content_data,
          is_active: editForm.is_active
        })
        .eq('id', editForm.id);

      if (error) throw error;

      toast({
        title: "Content updated",
        description: "Website content has been saved successfully",
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
    setHasNewVideoUpload(false);
  };

  const formatSectionName = (key: string) => {
    return key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `backgrounds/${fileName}`;

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
        description: "Failed to upload image",
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
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `backgrounds/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setHasNewVideoUpload(true);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload video",
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
      if (type === 'image') {
        setEditForm({
          ...editForm,
          background_image_url: url,
          mobile_background_url: url
        });
      } else {
        setEditForm({
          ...editForm,
          background_video_url: url,
          mobile_background_url: url
        });
      }
      
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
          <h2 className="text-4xl font-bold font-apple bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">Website Content Manager</h2>
          <p className="text-lg text-black">Manage all website sections, content, and media</p>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncStatusIcon()}
          <Badge variant="outline" className="text-sm">
            {syncStatus === 'connected' ? 'Live Updates' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </Badge>
        </div>
      </div>

      <div className="space-y-6 admin-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto bg-white p-4 rounded-lg">
        <div className="grid gap-6">
          {content.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <CardHeader className="bg-white border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-black">
                      {formatSectionName(section.section_key)}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Section: {section.section_key}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={section.is_active ? "default" : "secondary"}>
                      {section.is_active ? "Active" : "Inactive"}
                    </Badge>
                    {editingSection === section.section_key ? (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleSave} className="btn-3d-gradient">
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
              
              <CardContent className="p-6 space-y-4 bg-white">
                {editingSection === section.section_key ? (
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Title
                      </label>
                      <Input
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        placeholder="Section title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Description
                      </label>
                      <Textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        placeholder="Section description"
                        rows={3}
                      />
                    </div>

                    {/* File upload section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          <Image className="h-4 w-4 inline mr-1" />
                          Upload Background Image
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'image')}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploadingImage && (
                          <div className="mt-2 text-sm text-blue-600">Uploading...</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          <Video className="h-4 w-4 inline mr-1" />
                          Upload Background Video
                        </label>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileChange(e, 'video')}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {uploadingVideo && (
                          <div className="mt-2 text-sm text-blue-600">Uploading...</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {section.title && (
                      <div>
                        <span className="font-semibold text-black">Title:</span> 
                        <span className="text-black ml-2">{section.title}</span>
                      </div>
                    )}
                    {section.description && (
                      <div>
                        <span className="font-semibold text-black">Description:</span> 
                        <span className="text-black ml-2">{section.description}</span>
                      </div>
                    )}
                    {section.background_image_url && (
                      <div>
                        <span className="font-semibold text-black">Background Image:</span> 
                        <span className="text-black ml-2">Available</span>
                      </div>
                    )}
                    {section.background_video_url && (
                      <div>
                        <span className="font-semibold text-black">Background Video:</span> 
                        <span className="text-black ml-2">Available</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebsiteContentManager;
