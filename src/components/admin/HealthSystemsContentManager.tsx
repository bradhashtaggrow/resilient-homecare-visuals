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
  Upload,
  Building2,
  TrendingUp,
  Shield,
  Users,
  Award,
  Zap
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

interface HealthSystemsContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const HealthSystemsContentManager: React.FC<HealthSystemsContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WebsiteContent>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingFeatureImage, setUploadingFeatureImage] = useState<number | null>(null);
  const { toast } = useToast();

  // Define the Health Systems page sections in the correct order
  const HEALTH_SYSTEMS_SECTIONS = [
    'health_systems_hero',
    'health_systems_why_transform',
    'health_systems_benefits', 
    'health_systems_features',
    'health_systems_values'
  ];

  const SECTION_LABELS = {
    'health_systems_hero': 'Hero Section',
    'health_systems_why_transform': 'Why Transform Your Health System (3 Feature Cards)',
    'health_systems_benefits': 'For Health Systems (Benefits)', 
    'health_systems_features': 'Platform Features',
    'health_systems_values': 'Our Commitment (4 Values Cards)'
  };

  const ICON_MAP = {
    TrendingUp,
    Building2,
    Shield,
    Users,
    Award,
    Zap
  };

  useEffect(() => {
    loadContent();
    
    const channel = supabase
      .channel('health-systems-content-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: `section_key.in.(${HEALTH_SYSTEMS_SECTIONS.join(',')})`
      }, (payload) => {
        console.log('Real-time Health Systems content change:', payload);
        
        if (payload.eventType === 'UPDATE' && payload.new) {
          setContent(prevContent => 
            prevContent.map(item => 
              item.id === payload.new.id ? { ...item, ...payload.new } : item
            )
          );
          
          if (editingSection === payload.new.section_key) {
            setEditForm(prev => ({ ...prev, ...payload.new }));
          }
        } else {
          loadContent();
        }
        
        toast({
          title: "Content synced",
          description: "Health Systems page content updated in real-time",
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [editingSection]);

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
    const index = HEALTH_SYSTEMS_SECTIONS.indexOf(sectionKey);
    return index !== -1 ? index : 999;
  };

  const getSectionDisplayName = (key: string) => {
    return SECTION_LABELS[key as keyof typeof SECTION_LABELS] || key;
  };

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .in('section_key', HEALTH_SYSTEMS_SECTIONS);

      if (error) throw error;
      
      const sortedData = (data || [])
        .filter(item => HEALTH_SYSTEMS_SECTIONS.includes(item.section_key))
        .sort((a, b) => getSectionOrder(a.section_key) - getSectionOrder(b.section_key));
      
      setContent(sortedData);
    } catch (error) {
      console.error('Error loading Health Systems content:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load Health Systems page content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.section_key);
    setEditForm(section);
  };

  const handleSave = async () => {
    if (!editingSection || !editForm.id) return;

    try {
      const updateData: any = {
        title: editForm.title?.trim() || null,
        subtitle: editForm.subtitle?.trim() || null,
        description: editForm.description?.trim() || null,
        background_image_url: editForm.background_image_url || null,
        background_video_url: editForm.background_video_url || null,
        is_active: editForm.is_active ?? true
      };

      // Include content_data for sections that use it
      if (editForm.content_data) {
        updateData.content_data = editForm.content_data;
      }

      const { error } = await supabase
        .from('website_content')
        .update(updateData)
        .eq('id', editForm.id);

      if (error) throw error;

      toast({
        title: "Content updated",
        description: `${getSectionDisplayName(editingSection)} content saved successfully`,
      });

      setEditingSection(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save failed",
        description: "Failed to save Health Systems content",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditForm({});
  };

  const hasBackgroundMedia = (section: WebsiteContent) => {
    return section.section_key === 'health_systems_hero';
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `health-systems-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/health-systems/${fileName}`;

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
      
      const maxSize = 1024 * 1024 * 1024; // 1GB
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: "Video file must be smaller than 1GB",
          variant: "destructive"
        });
        return null;
      }

      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type", 
          description: "Please select a video file",
          variant: "destructive"
        });
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `health-systems-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/health-systems/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          duplex: 'half'
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

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
      setEditForm({
        ...editForm,
        [type === 'image' ? 'background_image_url' : 'background_video_url']: url
      });
      
      toast({
        title: "Upload successful",
        description: `Background ${type} uploaded successfully`,
      });
    }
    
    e.target.value = '';
  };

  const handleFeatureImageUpload = async (file: File, featureIndex: number) => {
    try {
      setUploadingFeatureImage(featureIndex);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `feature-${featureIndex}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/health-systems/features/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Update the feature image URL in the form
      const newFeatures = [...(editForm.content_data?.features || [])];
      newFeatures[featureIndex] = { ...newFeatures[featureIndex], image_url: data.publicUrl };
      
      const updatedContentData = {
        ...editForm.content_data,
        features: newFeatures
      };

      // Immediately save to database for real-time sync
      const { error: updateError } = await supabase
        .from('website_content')
        .update({ content_data: updatedContentData })
        .eq('id', editForm.id);

      if (updateError) throw updateError;

      setEditForm({
        ...editForm,
        content_data: updatedContentData
      });

      toast({
        title: "Upload successful",
        description: "Feature image uploaded and saved in real-time",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading feature image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload feature image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingFeatureImage(null);
    }
  };

  const handleFeatureImageChange = async (e: React.ChangeEvent<HTMLInputElement>, featureIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleFeatureImageUpload(file, featureIndex);
  };

  const renderIconForFeature = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP] || TrendingUp;
    return <IconComponent className="h-5 w-5 text-blue-600" />;
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Systems Page Content Manager</h2>
          <p className="text-gray-600">Manage Health Systems page sections in real-time sync with database</p>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncStatusIcon()}
          <span className="text-sm text-gray-600">
            {syncStatus === 'connected' ? 'Real-time sync active' : 
             syncStatus === 'syncing' ? 'Syncing...' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {content.map((section) => (
          <Card key={section.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CardTitle className="text-xl text-gray-900">
                    {getSectionDisplayName(section.section_key)}
                  </CardTitle>
                  <Badge variant={section.is_active ? "default" : "secondary"}>
                    {section.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <Button
                  onClick={() => handleEdit(section)}
                  disabled={editingSection === section.section_key}
                  variant="outline"
                  size="sm"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {editingSection === section.section_key ? 'Editing...' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {editingSection === section.section_key ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                        placeholder="Section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <Input
                        value={editForm.subtitle || ''}
                        onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                        placeholder="Section subtitle"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <Textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Section description"
                      rows={3}
                    />
                  </div>

                  {/* Hero section background media */}
                  {hasBackgroundMedia(section) && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-900">Background Media</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, 'image')}
                              className="hidden"
                              id="bg-image-upload"
                            />
                            <label htmlFor="bg-image-upload" className="cursor-pointer">
                              <Button type="button" variant="outline" size="sm" disabled={uploadingImage}>
                                {uploadingImage ? (
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Image className="h-4 w-4" />
                                )}
                                <span className="ml-2">Upload Image</span>
                              </Button>
                            </label>
                          </div>
                          {editForm.background_image_url && (
                            <div className="mt-2 text-xs text-gray-500 break-all">
                              {editForm.background_image_url.split('/').pop()}
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Background Video</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleFileChange(e, 'video')}
                              className="hidden"
                              id="bg-video-upload"
                            />
                            <label htmlFor="bg-video-upload" className="cursor-pointer">
                              <Button type="button" variant="outline" size="sm" disabled={uploadingVideo}>
                                {uploadingVideo ? (
                                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Video className="h-4 w-4" />
                                )}
                                <span className="ml-2">Upload Video</span>
                              </Button>
                            </label>
                          </div>
                          {editForm.background_video_url && (
                            <div className="mt-2 text-xs text-gray-500 break-all">
                              {editForm.background_video_url.split('/').pop()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Why Transform Features with Images */}
                  {section.section_key === 'health_systems_why_transform' && editForm.content_data?.features && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-900">Feature Cards (3 Cards with Images)</h4>
                      <div className="space-y-4">
                        {editForm.content_data.features.map((feature: any, index: number) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                            <div className="flex items-center space-x-2 mb-3">
                              {renderIconForFeature(feature.icon)}
                              <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                  value={feature.title || ''}
                                  onChange={(e) => {
                                    const newFeatures = [...editForm.content_data.features];
                                    newFeatures[index] = { ...feature, title: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, features: newFeatures }
                                    });
                                  }}
                                  placeholder="Feature title"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <Select
                                  value={feature.icon || 'TrendingUp'}
                                  onValueChange={(value) => {
                                    const newFeatures = [...editForm.content_data.features];
                                    newFeatures[index] = { ...feature, icon: value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, features: newFeatures }
                                    });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="TrendingUp">TrendingUp</SelectItem>
                                    <SelectItem value="Building2">Building2</SelectItem>
                                    <SelectItem value="Shield">Shield</SelectItem>
                                    <SelectItem value="Users">Users</SelectItem>
                                    <SelectItem value="Award">Award</SelectItem>
                                    <SelectItem value="Zap">Zap</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Textarea
                                value={feature.description || ''}
                                onChange={(e) => {
                                  const newFeatures = [...editForm.content_data.features];
                                  newFeatures[index] = { ...feature, description: e.target.value };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { ...editForm.content_data, features: newFeatures }
                                  });
                                }}
                                placeholder="Feature description"
                                rows={3}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Feature Image</label>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFeatureImageChange(e, index)}
                                  className="hidden"
                                  id={`feature-image-${index}`}
                                />
                                <label htmlFor={`feature-image-${index}`} className="cursor-pointer">
                                  <Button type="button" variant="outline" size="sm" disabled={uploadingFeatureImage === index}>
                                    {uploadingFeatureImage === index ? (
                                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                      <Upload className="h-4 w-4" />
                                    )}
                                    <span className="ml-2">Upload Image</span>
                                  </Button>
                                </label>
                              </div>
                              {feature.image_url && (
                                <div className="mt-2">
                                  <img src={feature.image_url} alt={feature.title} className="w-20 h-20 object-cover rounded" />
                                  <div className="text-xs text-gray-500 break-all mt-1">
                                    {feature.image_url.split('/').pop()}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits and Features Lists */}
                  {(section.section_key === 'health_systems_benefits' || section.section_key === 'health_systems_features') && editForm.content_data && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-900">
                        {section.section_key === 'health_systems_benefits' ? 'Benefits List' : 'Features List'}
                      </h4>
                      <div className="space-y-2">
                        {(editForm.content_data?.benefits || editForm.content_data?.features)?.map((item: string, index: number) => (
                          <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              {section.section_key === 'health_systems_benefits' ? 'Benefit' : 'Feature'} {index + 1}
                            </label>
                            <Textarea
                              value={item || ''}
                              onChange={(e) => {
                                const listKey = section.section_key === 'health_systems_benefits' ? 'benefits' : 'features';
                                const newList = [...(editForm.content_data?.[listKey] || [])];
                                newList[index] = e.target.value;
                                setEditForm({
                                  ...editForm,
                                  content_data: { ...editForm.content_data, [listKey]: newList }
                                });
                              }}
                              rows={2}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Image for benefits and features sections */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={editForm.content_data?.image_url || ''}
                            onChange={(e) => setEditForm({
                              ...editForm,
                              content_data: { ...editForm.content_data, image_url: e.target.value }
                            })}
                            placeholder="Image URL"
                          />
                        </div>
                        {editForm.content_data?.image_url && (
                          <div className="mt-2">
                            <img src={editForm.content_data.image_url} alt="Section" className="w-20 h-20 object-cover rounded" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Values Cards */}
                  {section.section_key === 'health_systems_values' && editForm.content_data?.values && (
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-900">Values Cards (4 Cards)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {editForm.content_data.values.map((value: any, index: number) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                            <div className="flex items-center space-x-2 mb-3">
                              {renderIconForFeature(value.icon_name)}
                              <h5 className="font-medium text-gray-900">Value {index + 1}</h5>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                  value={value.title || ''}
                                  onChange={(e) => {
                                    const newValues = [...editForm.content_data.values];
                                    newValues[index] = { ...value, title: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, values: newValues }
                                    });
                                  }}
                                  placeholder="Value title"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <Select
                                  value={value.icon_name || 'Shield'}
                                  onValueChange={(iconValue) => {
                                    const newValues = [...editForm.content_data.values];
                                    newValues[index] = { ...value, icon_name: iconValue };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, values: newValues }
                                    });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Shield">Shield</SelectItem>
                                    <SelectItem value="TrendingUp">TrendingUp</SelectItem>
                                    <SelectItem value="Users">Users</SelectItem>
                                    <SelectItem value="Award">Award</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Textarea
                                  value={value.description || ''}
                                  onChange={(e) => {
                                    const newValues = [...editForm.content_data.values];
                                    newValues[index] = { ...value, description: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, values: newValues }
                                    });
                                  }}
                                  placeholder="Value description"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
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

                  {section.content_data && (
                    <div className="pt-3 border-t">
                      <span className="text-sm font-medium text-gray-500">Content Data:</span>
                      <div className="mt-2 text-sm text-gray-600">
                        {section.section_key === 'health_systems_why_transform' && 
                          `${section.content_data.features?.length || 0} feature cards configured`}
                        {section.section_key === 'health_systems_benefits' && 
                          `${section.content_data.benefits?.length || 0} benefits configured`}
                        {section.section_key === 'health_systems_features' && 
                          `${section.content_data.features?.length || 0} features configured`}
                        {section.section_key === 'health_systems_values' && 
                          `${section.content_data.values?.length || 0} values configured`}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthSystemsContentManager;