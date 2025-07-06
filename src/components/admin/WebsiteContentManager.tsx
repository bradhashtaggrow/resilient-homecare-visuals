import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import MediaLibrary from './MediaLibrary';
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
  const [activeTab, setActiveTab] = useState('content');
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
    setHasNewVideoUpload(false); // Clear any previous upload flag
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
    setHasNewVideoUpload(false); // Clear any upload flag
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
          mobile_background_url: url // Auto-set mobile background to same image
        });
      } else {
        setEditForm({
          ...editForm,
          background_video_url: url,
          mobile_background_url: url // Auto-set mobile background to same video
        });
      }
      
      toast({
        title: "Upload successful",
        description: `Background ${type} uploaded successfully`,
      });
    }
  };

  const handlePatientImageUpload = async (file: File, serviceIndex: number) => {
    try {
      setUploadingPatientImage(prev => ({ ...prev, [serviceIndex]: true }));
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `patient-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Update the service with the new image URL
      const newServices = [...((editForm.content_data as any)?.services || [])];
      newServices[serviceIndex] = { ...newServices[serviceIndex], patient_image_url: data.publicUrl };
      setEditForm({
        ...editForm,
        content_data: { ...editForm.content_data, services: newServices }
      });

      toast({
        title: "Upload successful",
        description: "Patient image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading patient image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload patient image",
        variant: "destructive"
      });
    } finally {
      setUploadingPatientImage(prev => ({ ...prev, [serviceIndex]: false }));
    }
  };

  const handlePatientImageChange = async (e: React.ChangeEvent<HTMLInputElement>, serviceIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handlePatientImageUpload(file, serviceIndex);
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
          <h2 className="text-2xl font-bold text-gray-900">Website Content Manager</h2>
          <p className="text-gray-600">Manage all website sections, content, and media</p>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncStatusIcon()}
          <Badge variant="outline" className="text-sm">
            {syncStatus === 'connected' ? 'Live Updates' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Content Management
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Media Library
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6 admin-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto bg-white p-4 rounded-lg">
          <div className="grid gap-6">
            {content.map((section) => (
                <Card key={section.id} className="overflow-hidden">
                  <CardHeader className="bg-white border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold">
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
                
                <CardContent className="p-6 space-y-4 bg-white">
                  {editingSection === section.section_key ? (
                    <div className="grid gap-4">
                      {/* Conditional form fields based on section type */}
                      {section.section_key === 'hero' ? (
                        // Hero section specific form
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text (for form dropdown)
                              </label>
                              <Input
                                value={editForm.button_text || ''}
                                onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                                placeholder="Button text (e.g., 'Request Demo')"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Image className="h-4 w-4 inline mr-1" />
                                Upload Background Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'image')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingImage}
                              />
                              {uploadingImage && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading image...
                                </div>
                              )}
                              {editForm.background_image_url && (
                                <div className="mt-2">
                                  <img
                                    src={editForm.background_image_url}
                                    alt="Background preview"
                                    className="w-full h-20 object-cover rounded border"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Video className="h-4 w-4 inline mr-1" />
                                Upload Background Video
                              </label>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileChange(e, 'video')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingVideo}
                              />
                              {uploadingVideo && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading video...
                                </div>
                              )}
                              {editForm.background_video_url && (
                                <div className="mt-2">
                                  <video
                                    src={editForm.background_video_url}
                                    className="w-full h-60 object-contain rounded border bg-gray-100"
                                    muted
                                    controls
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : section.section_key === 'services' ? (
                        // Services section specific form - no button/background fields
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                              </label>
                              <Input
                                value={editForm.subtitle || ''}
                                onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                                placeholder="Section subtitle"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>
                        </>
                      ) : section.section_key === 'mobile_showcase' ? (
                        // Mobile showcase section specific form - no subtitle, button URL, mobile background
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                              </label>
                              <Input
                                value={editForm.button_text || ''}
                                onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                                placeholder="Button text"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Image className="h-4 w-4 inline mr-1" />
                                Upload Background Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'image')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingImage}
                              />
                              {uploadingImage && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading image...
                                </div>
                              )}
                              {editForm.background_image_url && (
                                <div className="mt-2">
                                  <img
                                    src={editForm.background_image_url}
                                    alt="Background preview"
                                    className="w-full h-40 object-contain rounded border bg-gray-100"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Video className="h-4 w-4 inline mr-1" />
                                Upload Background Video
                              </label>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileChange(e, 'video')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingVideo}
                              />
                              {uploadingVideo && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading video...
                                </div>
                              )}
                              {editForm.background_video_url && (
                                <div className="mt-2">
                                  <video
                                    src={editForm.background_video_url}
                                    className="w-full h-60 object-contain rounded border bg-gray-100"
                                    muted
                                    controls
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : section.section_key === 'value_proposition' ? (
                        // Value proposition section specific form - features with icons
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>
                        </>
                      ) : section.section_key === 'admin_dashboard' ? (
                        // Admin dashboard section specific form - no subtitle, button URL, mobile background
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                              </label>
                              <Input
                                value={editForm.button_text || ''}
                                onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                                placeholder="Button text"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Image className="h-4 w-4 inline mr-1" />
                                Upload Background Image
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'image')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingImage}
                              />
                              {uploadingImage && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading image...
                                </div>
                              )}
                              {editForm.background_image_url && (
                                <div className="mt-2">
                                  <img
                                    src={editForm.background_image_url}
                                    alt="Background preview"
                                    className="w-full h-40 object-contain rounded border bg-gray-100"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Video className="h-4 w-4 inline mr-1" />
                                Upload Background Video
                              </label>
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileChange(e, 'video')}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingVideo}
                              />
                              {uploadingVideo && (
                                <div className="flex items-center mt-2 text-sm text-blue-600">
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Uploading video...
                                </div>
                              )}
                              {editForm.background_video_url && (
                                <div className="mt-2">
                                  <video
                                    src={editForm.background_video_url}
                                    className="w-full h-60 object-contain rounded border bg-gray-100"
                                    muted
                                    controls
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      ) : section.section_key === 'founder' ? (
                        // Founder section specific form - comprehensive founder content
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                              </label>
                              <Input
                                value={editForm.subtitle || ''}
                                onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                                placeholder="Section subtitle"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quote
                            </label>
                            <Input
                              value={(editForm.content_data as any)?.quote || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                content_data: { ...editForm.content_data, quote: e.target.value }
                              })}
                              placeholder="Main quote"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quote Subtitle
                            </label>
                            <Input
                              value={(editForm.content_data as any)?.quote_subtitle || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                content_data: { ...editForm.content_data, quote_subtitle: e.target.value }
                              })}
                              placeholder="Quote subtitle"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Founder Story
                            </label>
                            <Textarea
                              value={((editForm.content_data as any)?.story || [])[0] || ''}
                              onChange={(e) => {
                                const currentStory = (editForm.content_data as any)?.story || [];
                                const newStory = [...currentStory];
                                newStory[0] = e.target.value;
                                setEditForm({
                                  ...editForm,
                                  content_data: { ...editForm.content_data, story: newStory }
                                });
                              }}
                              placeholder="Founder's story"
                              rows={8}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Closing Statement
                            </label>
                            <Input
                              value={(editForm.content_data as any)?.closing || ''}
                              onChange={(e) => setEditForm({
                                ...editForm,
                                content_data: { ...editForm.content_data, closing: e.target.value }
                              })}
                              placeholder="Closing statement"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Image className="h-4 w-4 inline mr-1" />
                              Upload Founder Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const url = await handleImageUpload(file);
                                if (url) {
                                  setEditForm({
                                    ...editForm,
                                    content_data: { ...editForm.content_data, founder_image: url }
                                  });
                                  toast({
                                    title: "Upload successful",
                                    description: "Founder image uploaded successfully",
                                  });
                                }
                              }}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              disabled={uploadingImage}
                            />
                            {uploadingImage && (
                              <div className="flex items-center mt-2 text-sm text-blue-600">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                Uploading image...
                              </div>
                            )}
                            {(editForm.content_data as any)?.founder_image && (
                              <div className="mt-2">
                                <img
                                  src={(editForm.content_data as any)?.founder_image}
                                  alt="Founder preview"
                                  className="w-full h-48 object-contain rounded border bg-gray-100"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      ) : section.section_key === 'stats' ? (
                        // Stats section specific form - title, description, and individual stats
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          {/* Individual Stats Configuration */}
                          <div className="space-y-6 pt-4 border-t">
                            <h4 className="text-lg font-medium text-gray-900">Individual Statistics</h4>
                            {[0, 1, 2, 3].map((statIndex) => {
                              const statLabels = ['Cost Savings', 'Reduction in Readmissions', 'Patient Preference', 'Less Stress'];
                              const stats = (editForm.content_data as any)?.stats || [];
                              const currentStat = stats[statIndex] || {};
                              
                              return (
                                <div key={statIndex} className="border rounded-lg p-4 bg-gray-50">
                                  <h5 className="font-medium text-gray-800 mb-4">{statLabels[statIndex]} Statistic</h5>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Percentage Value
                                      </label>
                                      <Input
                                        value={currentStat.value || ''}
                                        onChange={(e) => {
                                          const newStats = [...stats];
                                          newStats[statIndex] = { ...currentStat, value: e.target.value };
                                          setEditForm({
                                            ...editForm,
                                            content_data: { ...editForm.content_data, stats: newStats }
                                          });
                                        }}
                                        placeholder="e.g., 38%"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Label
                                      </label>
                                      <Input
                                        value={currentStat.label || ''}
                                        onChange={(e) => {
                                          const newStats = [...stats];
                                          newStats[statIndex] = { ...currentStat, label: e.target.value };
                                          setEditForm({
                                            ...editForm,
                                            content_data: { ...editForm.content_data, stats: newStats }
                                          });
                                        }}
                                        placeholder={statLabels[statIndex]}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Description
                                    </label>
                                    <Textarea
                                      value={currentStat.description || ''}
                                      onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[statIndex] = { ...currentStat, description: e.target.value };
                                        setEditForm({
                                          ...editForm,
                                          content_data: { ...editForm.content_data, stats: newStats }
                                        });
                                      }}
                                      placeholder="Detailed description of the statistic"
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Source/Publication
                                    </label>
                                    <Input
                                      value={currentStat.source || ''}
                                      onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[statIndex] = { ...currentStat, source: e.target.value };
                                        setEditForm({
                                          ...editForm,
                                          content_data: { ...editForm.content_data, stats: newStats }
                                        });
                                      }}
                                      placeholder="e.g., JAMA Internal Medicine"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        // Regular form for other sections
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                              </label>
                              <Input
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                placeholder="Section title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle
                              </label>
                              <Input
                                value={editForm.subtitle || ''}
                                onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                                placeholder="Section subtitle"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <Textarea
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                              placeholder="Section description"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button Text
                              </label>
                              <Input
                                value={editForm.button_text || ''}
                                onChange={(e) => setEditForm({...editForm, button_text: e.target.value})}
                                placeholder="Button text"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Button URL
                              </label>
                              <Input
                                value={editForm.button_url || ''}
                                onChange={(e) => setEditForm({...editForm, button_url: e.target.value})}
                                placeholder="Button URL"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Image className="h-4 w-4 inline mr-1" />
                                Background Image URL
                              </label>
                              <Input
                                value={editForm.background_image_url || ''}
                                onChange={(e) => setEditForm({...editForm, background_image_url: e.target.value})}
                                placeholder="Image URL"
                              />
                              {editForm.background_image_url && (
                                <div className="mt-2">
                                  <img
                                    src={editForm.background_image_url}
                                    alt="Background preview"
                                    className="w-full h-20 object-cover rounded border"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Video className="h-4 w-4 inline mr-1" />
                                Background Video URL
                              </label>
                              <Input
                                value={editForm.background_video_url || ''}
                                onChange={(e) => setEditForm({...editForm, background_video_url: e.target.value})}
                                placeholder="Video URL"
                              />
                              {editForm.background_video_url && (
                                <div className="mt-2">
                                  <video
                                    src={editForm.background_video_url}
                                    className="w-full h-20 object-cover rounded border"
                                    muted
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Settings className="h-4 w-4 inline mr-1" />
                                Mobile Background URL
                              </label>
                              <Input
                                value={editForm.mobile_background_url || ''}
                                onChange={(e) => setEditForm({...editForm, mobile_background_url: e.target.value})}
                                placeholder="Mobile image URL"
                              />
                              {editForm.mobile_background_url && (
                                <div className="mt-2">
                                  <img
                                    src={editForm.mobile_background_url}
                                    alt="Mobile background preview"
                                    className="w-full h-20 object-cover rounded border"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`active-${section.id}`}
                          checked={editForm.is_active || false}
                          onChange={(e) => setEditForm({...editForm, is_active: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`active-${section.id}`} className="text-sm font-medium text-gray-700">
                          Section is active
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {section.title && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Title:</span>
                          <p className="text-gray-900">{section.title}</p>
                        </div>
                      )}
                      {section.subtitle && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Subtitle:</span>
                          <p className="text-gray-900">{section.subtitle}</p>
                        </div>
                      )}
                      {section.description && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Description:</span>
                          <p className="text-gray-900">{section.description}</p>
                        </div>
                      )}
                      {(section.background_image_url || section.background_video_url || section.mobile_background_url) && (
                        <div className="space-y-3 pt-2">
                          {section.background_image_url && (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Image className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Background Image</span>
                              </div>
                              <img
                                src={section.background_image_url}
                                alt="Background"
                                className="w-full h-32 object-cover rounded border"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          {section.background_video_url && (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Video className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Background Video</span>
                              </div>
                              <video
                                src={section.background_video_url}
                                className="w-full h-32 object-cover rounded border"
                                muted
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          {section.mobile_background_url && (
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Settings className="h-4 w-4 text-gray-500" />
                                <span className="text-sm text-gray-600">Mobile Background</span>
                              </div>
                              <img
                                src={section.mobile_background_url}
                                alt="Mobile background"
                                className="w-full h-32 object-cover rounded border"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Services Section - Display services when not editing */}
                      {section.section_key === 'services' && (section.content_data as any)?.services && (
                        <div className="space-y-4 pt-4">
                          <h4 className="text-sm font-medium text-gray-500">Individual Services:</h4>
                          <div className="grid gap-4">
                            {((section.content_data as any)?.services || []).map((service: any, index: number) => (
                              <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                                <div className="flex items-start space-x-4">
                                  {service.patient_image_url && (
                                    <img
                                      src={service.patient_image_url}
                                      alt={service.title}
                                      className="w-16 h-16 object-cover rounded"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      {getIconComponent(service.icon)}
                                      <h5 className="font-medium text-gray-900">{service.title}</h5>
                                    </div>
                                    <p className="text-sm text-blue-600">{service.subtitle}</p>
                                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                    {service.benefits && (
                                      <div className="mt-2">
                                        <p className="text-xs font-medium text-gray-500">Benefits:</p>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                          {service.benefits.map((benefit: any, i: number) => (
                                            <li key={i} className="flex items-center space-x-2">
                                              {getIconComponent(benefit.icon)}
                                              <span>{benefit.text}</span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    {service.note && (
                                      <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                        <strong>Note:</strong> {service.note}
                                      </div>
                      )}

                      {/* Founder Section - Display founder content when not editing */}
                      {section.section_key === 'founder' && (section.content_data as any) && (
                        <div className="space-y-4 pt-4">
                          <h4 className="text-sm font-medium text-gray-500">Founder Content:</h4>
                          <div className="space-y-3">
                            {(section.content_data as any)?.quote && (
                              <div>
                                <span className="text-sm font-medium text-gray-500">Quote:</span>
                                <p className="text-gray-900 italic">"{(section.content_data as any).quote}"</p>
                                {(section.content_data as any)?.quote_subtitle && (
                                  <p className="text-sm text-gray-600 mt-1">{(section.content_data as any).quote_subtitle}</p>
                                )}
                              </div>
                            )}
                            {(section.content_data as any)?.founder_image && (
                              <div>
                                <span className="text-sm font-medium text-gray-500">Founder Image:</span>
                                <img
                                  src={(section.content_data as any).founder_image}
                                  alt="Founder"
                                  className="w-full h-48 object-contain rounded border bg-gray-100 mt-2"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            {(section.content_data as any)?.story && (section.content_data as any).story[0] && (
                              <div>
                                <span className="text-sm font-medium text-gray-500">Story:</span>
                                <p className="text-gray-900 mt-1 text-sm leading-relaxed">{(section.content_data as any).story[0]}</p>
                              </div>
                            )}
                            {(section.content_data as any)?.achievements && (
                              <div>
                                <span className="text-sm font-medium text-gray-500">Achievements:</span>
                                <div className="grid gap-2 mt-2">
                                  {(section.content_data as any).achievements.map((achievement: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-3 bg-white shadow-sm">
                                      <div className="flex items-center space-x-2">
                                        {getIconComponent(achievement.icon)}
                                        <div>
                                          <h5 className="font-medium text-gray-900">{achievement.title}</h5>
                                          <p className="text-sm text-gray-600">{achievement.subtitle}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {(section.content_data as any)?.closing && (
                              <div>
                                <span className="text-sm font-medium text-gray-500">Closing:</span>
                                <p className="text-gray-900 font-medium">{(section.content_data as any).closing}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                     </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Value Proposition Section - Display features when not editing */}
                      {section.section_key === 'value_proposition' && (section.content_data as any)?.features && (
                        <div className="space-y-4 pt-4">
                          <h4 className="text-sm font-medium text-gray-500">Value Proposition Features:</h4>
                          <div className="grid gap-4">
                            {((section.content_data as any)?.features || []).map((feature: any, index: number) => (
                              <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                                <div className="flex items-start space-x-4">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      {getIconComponent(feature.icon)}
                                      <h5 className="font-medium text-gray-900">{feature.title}</h5>
                                    </div>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Services Section - Special handling for detailed services */}
                  {editingSection === section.section_key && section.section_key === 'services' && (
                    <div className="space-y-6 mt-6 admin-scrollbar max-h-96 overflow-y-auto p-4 bg-white border rounded-lg shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Individual Services</h4>
                        {(editForm.content_data as any)?.services?.map((service: any, serviceIndex: number) => (
                          <div key={serviceIndex} className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-gray-900">Service {serviceIndex + 1}: {service.title}</h5>
                            </div>
                          
                                <div className="flex items-start space-x-4">
                                  <div className="flex items-center space-x-2">
                                    {getIconComponent(service.icon)}
                                    <Select
                                      value={service.icon || 'Activity'}
                                      onValueChange={(value) => {
                                        const newServices = [...((editForm.content_data as any)?.services || [])];
                                        newServices[serviceIndex] = { ...service, icon: value };
                                        setEditForm({
                                          ...editForm,
                                          content_data: { ...editForm.content_data, services: newServices }
                                        });
                                      }}
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent className="bg-white border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                                        {Object.keys(availableIcons).map((iconName) => (
                                          <SelectItem key={iconName} value={iconName} className="hover:bg-gray-50">
                                            <div className="flex items-center space-x-2">
                                              {getIconComponent(iconName)}
                                              <span>{iconName}</span>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                              <Input
                                value={service.title || ''}
                                onChange={(e) => {
                                  const newServices = [...((editForm.content_data as any)?.services || [])];
                                  newServices[serviceIndex] = { ...service, title: e.target.value };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { ...editForm.content_data, services: newServices }
                                  });
                                }}
                                placeholder="Service title"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Service Subtitle</label>
                              <Input
                                value={service.subtitle || ''}
                                onChange={(e) => {
                                  const newServices = [...((editForm.content_data as any)?.services || [])];
                                  newServices[serviceIndex] = { ...service, subtitle: e.target.value };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { ...editForm.content_data, services: newServices }
                                  });
                                }}
                                placeholder="Service subtitle"
                              />
                                    </div>
                                  </div>
                                </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                            <Textarea
                              value={service.description || ''}
                              onChange={(e) => {
                                const newServices = [...((editForm.content_data as any)?.services || [])];
                                newServices[serviceIndex] = { ...service, description: e.target.value };
                                setEditForm({
                                  ...editForm,
                                  content_data: { ...editForm.content_data, services: newServices }
                                });
                              }}
                              placeholder="Service description"
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Learn More Button Text</label>
                            <Input
                              value={service.button_text || ''}
                              onChange={(e) => {
                                const newServices = [...((editForm.content_data as any)?.services || [])];
                                newServices[serviceIndex] = { ...service, button_text: e.target.value };
                                setEditForm({
                                  ...editForm,
                                  content_data: { ...editForm.content_data, services: newServices }
                                });
                              }}
                              placeholder="e.g., 'Learn More', 'Get Started'"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Image className="h-4 w-4 inline mr-1" />
                              Upload Patient Image
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handlePatientImageChange(e, serviceIndex)}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              disabled={uploadingPatientImage[serviceIndex]}
                            />
                            {uploadingPatientImage[serviceIndex] && (
                              <div className="flex items-center mt-2 text-sm text-blue-600">
                                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                Uploading image...
                              </div>
                            )}
                            {service.patient_image_url && (
                              <div className="mt-2">
                                <img
                                  src={service.patient_image_url}
                                  alt="Service patient preview"
                                  className="w-full h-48 object-contain rounded border bg-gray-100"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Benefits</label>
                            <div className="space-y-2">
                              {service.benefits?.map((benefit: any, benefitIndex: number) => (
                                <div key={benefitIndex} className="flex items-center space-x-2 p-3 border rounded bg-white shadow-sm">
                                  <div className="flex items-center space-x-2 flex-1">
                                    <div className="flex items-center space-x-2">
                                      {getIconComponent(benefit.icon)}
                                      <Select
                                        value={benefit.icon || 'CheckCircle'}
                                        onValueChange={(value) => {
                                          const newServices = [...((editForm.content_data as any)?.services || [])];
                                          const newBenefits = [...(service.benefits || [])];
                                          newBenefits[benefitIndex] = { ...benefit, icon: value };
                                          newServices[serviceIndex] = { ...service, benefits: newBenefits };
                                          setEditForm({
                                            ...editForm,
                                            content_data: { ...editForm.content_data, services: newServices }
                                          });
                                        }}
                                      >
                                        <SelectTrigger className="w-32">
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                                          {Object.keys(availableIcons).map((iconName) => (
                                            <SelectItem key={iconName} value={iconName} className="hover:bg-gray-50">
                                              <div className="flex items-center space-x-2">
                                                {getIconComponent(iconName)}
                                                <span>{iconName}</span>
                                              </div>
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Input
                                      value={benefit.text || ''}
                                      onChange={(e) => {
                                        const newServices = [...((editForm.content_data as any)?.services || [])];
                                        const newBenefits = [...(service.benefits || [])];
                                        newBenefits[benefitIndex] = { ...benefit, text: e.target.value };
                                        newServices[serviceIndex] = { ...service, benefits: newBenefits };
                                        setEditForm({
                                          ...editForm,
                                          content_data: { ...editForm.content_data, services: newServices }
                                        });
                                      }}
                                      placeholder="Benefit description"
                                      className="flex-1"
                                    />
                                  </div>
                                </div>
                              )) || []}
                            </div>
                          </div>

                          {service.note && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Special Note</label>
                              <Textarea
                                value={service.note || ''}
                                onChange={(e) => {
                                  const newServices = [...((editForm.content_data as any)?.services || [])];
                                  newServices[serviceIndex] = { ...service, note: e.target.value };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { ...editForm.content_data, services: newServices }
                                  });
                                }}
                                placeholder="Special note or disclaimer"
                                rows={2}
                              />
                            </div>
                          )}
                        </div>
                       )) || []}
                     </div>
                   )}

                   {/* Value Proposition Section - Special handling for features */}
                   {editingSection === section.section_key && section.section_key === 'value_proposition' && (
                     <div className="space-y-6 mt-6 admin-scrollbar max-h-96 overflow-y-auto p-4 bg-white border rounded-lg shadow-sm">
                       <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Value Proposition Features</h4>
                         {(editForm.content_data as any)?.features?.map((feature: any, featureIndex: number) => (
                           <div key={featureIndex} className="border rounded-lg p-4 space-y-4 bg-white shadow-sm">
                             <div className="flex items-center justify-between">
                               <h5 className="font-medium text-gray-900">Feature {featureIndex + 1}: {feature.title}</h5>
                             </div>
                           
                             <div className="flex items-start space-x-4">
                               <div className="flex items-center space-x-2">
                                 {getIconComponent(feature.icon)}
                                 <Select
                                   value={feature.icon || 'Target'}
                                   onValueChange={(value) => {
                                     const newFeatures = [...((editForm.content_data as any)?.features || [])];
                                     newFeatures[featureIndex] = { ...feature, icon: value };
                                     setEditForm({
                                       ...editForm,
                                       content_data: { ...editForm.content_data, features: newFeatures }
                                     });
                                   }}
                                 >
                                   <SelectTrigger className="w-40">
                                     <SelectValue />
                                   </SelectTrigger>
                                   <SelectContent className="bg-white border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                                     {Object.keys(availableIcons).map((iconName) => (
                                       <SelectItem key={iconName} value={iconName} className="hover:bg-gray-50">
                                         <div className="flex items-center space-x-2">
                                           {getIconComponent(iconName)}
                                           <span>{iconName}</span>
                                         </div>
                                       </SelectItem>
                                     ))}
                                   </SelectContent>
                                 </Select>
                               </div>
                               <div className="flex-1 grid grid-cols-1 gap-4">
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">Feature Title</label>
                                   <Input
                                     value={feature.title || ''}
                                     onChange={(e) => {
                                       const newFeatures = [...((editForm.content_data as any)?.features || [])];
                                       newFeatures[featureIndex] = { ...feature, title: e.target.value };
                                       setEditForm({
                                         ...editForm,
                                         content_data: { ...editForm.content_data, features: newFeatures }
                                       });
                                     }}
                                     placeholder="Feature title"
                                   />
                                 </div>
                                 <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">Feature Description</label>
                                   <Textarea
                                     value={feature.description || ''}
                                     onChange={(e) => {
                                       const newFeatures = [...((editForm.content_data as any)?.features || [])];
                                       newFeatures[featureIndex] = { ...feature, description: e.target.value };
                                       setEditForm({
                                         ...editForm,
                                         content_data: { ...editForm.content_data, features: newFeatures }
                                       });
                                     }}
                                     placeholder="Feature description"
                                     rows={3}
                                   />
                                 </div>
                               </div>
                             </div>
                           </div>
                         )) || []}
                     </div>
                   )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary syncStatus={syncStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteContentManager;