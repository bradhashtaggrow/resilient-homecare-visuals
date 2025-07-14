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
  const [uploadingServiceImage, setUploadingServiceImage] = useState<number | null>(null);
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

  const SECTION_LABELS = {
    'hero': 'Hero Section',
    'service_lines': 'Services Section',
    'mobile_showcase': 'Mobile Section', 
    'value_proposition': 'Value Proposition - We Manage the Work',
    'admin_dashboard': 'Laptop Section',
    'founder': 'Founder Section',
    'stats': 'What Does the Research Say',
    'lead_generation': 'Join 500+ Hospitals'
  };

  useEffect(() => {
    loadContent();
    
    const channel = supabase
      .channel('website-content-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content'
      }, (payload) => {
        console.log('Real-time content change:', payload);
        
        // Handle different event types
        if (payload.eventType === 'UPDATE' && payload.new) {
          // Update specific record in state immediately
          setContent(prevContent => 
            prevContent.map(item => 
              item.id === payload.new.id ? { ...item, ...payload.new } : item
            )
          );
          
          // Also update editForm if we're currently editing this section
          if (editingSection === payload.new.section_key) {
            setEditForm(prev => ({ ...prev, ...payload.new }));
          }
        } else {
          // For INSERT/DELETE, reload all content
          loadContent();
        }
        
        toast({
          title: "Content synced",
          description: "Website content updated in real-time",
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
    const index = HOME_PAGE_SECTIONS.indexOf(sectionKey);
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
        .in('section_key', HOME_PAGE_SECTIONS);

      if (error) throw error;
      
      // Sort by home page order and ONLY show home page sections
      const sortedData = (data || [])
        .filter(item => HOME_PAGE_SECTIONS.includes(item.section_key))
        .sort((a, b) => getSectionOrder(a.section_key) - getSectionOrder(b.section_key));
      
      setContent(sortedData);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load home page content",
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

      // Include content_data for service_lines and mobile_showcase sections
      if ((editingSection === 'service_lines' || editingSection === 'mobile_showcase') && editForm.content_data) {
        updateData.content_data = editForm.content_data;
      }

      const { error } = await supabase
        .from('website_content')
        .update(updateData)
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

  const handleServiceImageUpload = async (file: File, serviceIndex: number) => {
    try {
      setUploadingServiceImage(serviceIndex);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `service-${serviceIndex}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `website-content/services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Update the service image URL in the form
      const newServices = [...(editForm.content_data?.services || [])];
      newServices[serviceIndex] = { ...newServices[serviceIndex], patient_image_url: data.publicUrl };
      
      const updatedContentData = {
        ...editForm.content_data,
        services: newServices
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
        description: "Service image uploaded and saved in real-time",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading service image:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload service image",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingServiceImage(null);
    }
  };

  const handleServiceImageChange = async (e: React.ChangeEvent<HTMLInputElement>, serviceIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleServiceImageUpload(file, serviceIndex);
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Home Page Content Manager</h2>
          <p className="text-gray-600">Manage home page sections in real-time sync with database</p>
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

                    {/* Mobile Features Editor for mobile_showcase section */}
                    {section.section_key === 'mobile_showcase' && (
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-900">Mobile Section Features</h4>
                        {editForm.content_data?.features?.map((feature: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium text-gray-700">Feature {index + 1}</h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newFeatures = [...(editForm.content_data?.features || [])];
                                  newFeatures.splice(index, 1);
                                  setEditForm({
                                    ...editForm,
                                    content_data: {
                                      ...editForm.content_data,
                                      features: newFeatures
                                    }
                                  });
                                }}
                              >
                                Remove Feature
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <Select
                                  value={feature.icon || ''}
                                  onValueChange={(value) => {
                                    const newFeatures = [...(editForm.content_data?.features || [])];
                                    newFeatures[index] = { ...feature, icon: value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        features: newFeatures
                                      }
                                    });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Shield">Shield - Security</SelectItem>
                                    <SelectItem value="BarChart3">BarChart3 - Analytics</SelectItem>
                                    <SelectItem value="Users">Users - Multi-Tenant</SelectItem>
                                    <SelectItem value="Zap">Zap - API/Platform</SelectItem>
                                    <SelectItem value="Database">Database - Infrastructure</SelectItem>
                                    <SelectItem value="Lock">Lock - Access Control</SelectItem>
                                    <SelectItem value="Activity">Activity - Monitoring</SelectItem>
                                    <SelectItem value="Cpu">Cpu - Performance</SelectItem>
                                    <SelectItem value="Globe">Globe - Network</SelectItem>
                                    <SelectItem value="Settings">Settings - Configuration</SelectItem>
                                    <SelectItem value="Heart">Heart - Healthcare</SelectItem>
                                    <SelectItem value="CheckCircle">CheckCircle - Reliability</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Feature Title</label>
                                <Input
                                  value={feature.title || ''}
                                  onChange={(e) => {
                                    const newFeatures = [...(editForm.content_data?.features || [])];
                                    newFeatures[index] = { ...feature, title: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        features: newFeatures
                                      }
                                    });
                                  }}
                                  placeholder="Enter feature title"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <Textarea
                                  value={feature.description || ''}
                                  onChange={(e) => {
                                    const newFeatures = [...(editForm.content_data?.features || [])];
                                    newFeatures[index] = { ...feature, description: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        features: newFeatures
                                      }
                                    });
                                  }}
                                  placeholder="Enter feature description"
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const defaultFeatures = [
                              { icon: 'Shield', title: 'Enterprise Security', description: 'Bank-grade encryption with HIPAA compliance built-in' },
                              { icon: 'BarChart3', title: 'Real-Time Analytics', description: 'Live dashboard with predictive insights and KPI tracking' },
                              { icon: 'Users', title: 'Multi-Tenant Architecture', description: 'Scalable infrastructure supporting unlimited organizations' },
                              { icon: 'Zap', title: 'API-First Platform', description: 'Seamless integration with existing healthcare systems' },
                              { icon: 'Database', title: 'Cloud Infrastructure', description: '99.9% uptime with automatic scaling and backup' },
                              { icon: 'Lock', title: 'Access Control', description: 'Granular permissions with role-based authentication' }
                            ];
                            
                            const currentFeatures = editForm.content_data?.features || [];
                            if (currentFeatures.length === 0) {
                              // Initialize with all default features if none exist
                              setEditForm({
                                ...editForm,
                                content_data: {
                                  ...editForm.content_data,
                                  features: defaultFeatures
                                }
                              });
                            } else {
                              // Add a new blank feature
                              const newFeature = {
                                icon: 'Shield',
                                title: 'New Feature',
                                description: 'Feature description'
                              };
                              setEditForm({
                                ...editForm,
                                content_data: {
                                  ...editForm.content_data,
                                  features: [...currentFeatures, newFeature]
                                }
                              });
                            }
                          }}
                        >
                          {(!editForm.content_data?.features || editForm.content_data.features.length === 0) 
                            ? 'Initialize Default Features' 
                            : 'Add New Feature'
                          }
                        </Button>
                      </div>
                    )}
                    
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

                    {/* Tab Editor for service_lines section */}
                    {section.section_key === 'service_lines' && (
                      <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-medium text-gray-900">Service Lines Tabs</h4>
                        {editForm.content_data?.services?.map((service: any, index: number) => (
                          <div key={service.id || index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
                            <div className="flex justify-between items-center">
                              <h5 className="font-medium text-gray-700">Tab {index + 1}</h5>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newServices = [...(editForm.content_data?.services || [])];
                                  newServices.splice(index, 1);
                                  setEditForm({
                                    ...editForm,
                                    content_data: {
                                      ...editForm.content_data,
                                      services: newServices
                                    }
                                  });
                                }}
                              >
                                Remove Tab
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tab Title</label>
                                <Input
                                  value={service.title || ''}
                                  onChange={(e) => {
                                    const newServices = [...(editForm.content_data?.services || [])];
                                    newServices[index] = { ...service, title: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        services: newServices
                                      }
                                    });
                                  }}
                                  placeholder="Enter tab title"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                <Input
                                  value={service.subtitle || ''}
                                  onChange={(e) => {
                                    const newServices = [...(editForm.content_data?.services || [])];
                                    newServices[index] = { ...service, subtitle: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        services: newServices
                                      }
                                    });
                                  }}
                                  placeholder="Enter subtitle"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Textarea
                                value={service.description || ''}
                                onChange={(e) => {
                                  const newServices = [...(editForm.content_data?.services || [])];
                                  newServices[index] = { ...service, description: e.target.value };
                                  setEditForm({
                                    ...editForm,
                                    content_data: {
                                      ...editForm.content_data,
                                      services: newServices
                                    }
                                  });
                                }}
                                placeholder="Enter description"
                                rows={3}
                              />
                            </div>
                            
                            {/* Service Benefits */}
                            <div className="space-y-3">
                              <h6 className="font-medium text-gray-700">Service Benefits</h6>
                              {(service.benefits || []).map((benefit: string, benefitIndex: number) => (
                                <div key={benefitIndex} className="flex items-center gap-2">
                                  <Input
                                    value={benefit}
                                    onChange={(e) => {
                                      const newServices = [...(editForm.content_data?.services || [])];
                                      const newBenefits = [...(service.benefits || [])];
                                      newBenefits[benefitIndex] = e.target.value;
                                      newServices[index] = { ...service, benefits: newBenefits };
                                      setEditForm({
                                        ...editForm,
                                        content_data: {
                                          ...editForm.content_data,
                                          services: newServices
                                        }
                                      });
                                    }}
                                    placeholder="Enter benefit (e.g., Generate new outpatient therapy revenue)"
                                    className="flex-1"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newServices = [...(editForm.content_data?.services || [])];
                                      const newBenefits = [...(service.benefits || [])];
                                      newBenefits.splice(benefitIndex, 1);
                                      newServices[index] = { ...service, benefits: newBenefits };
                                      setEditForm({
                                        ...editForm,
                                        content_data: {
                                          ...editForm.content_data,
                                          services: newServices
                                        }
                                      });
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newServices = [...(editForm.content_data?.services || [])];
                                    const newBenefits = [...(service.benefits || []), ''];
                                    newServices[index] = { ...service, benefits: newBenefits };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        services: newServices
                                      }
                                    });
                                  }}
                                >
                                  Add Benefit
                                </Button>
                                {(!service.benefits || service.benefits.length === 0) && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const defaultBenefits = index === 0 ? [
                                        'Generate new outpatient therapy revenue',
                                        'Reduce costly post-acute placements',
                                        'Improve patient outcomes with early intervention',
                                        'Prepare for value-based care programs'
                                      ] : index === 1 ? [
                                        'Extend primary care reach to rural communities',
                                        'Support aging in place initiatives',
                                        'Reduce emergency department visits',
                                        'Improve chronic disease management'
                                      ] : [
                                        'Provide 24/7 acute-level care at home',
                                        'Reduce hospital readmissions',
                                        'Lower healthcare costs significantly',
                                        'Improve patient satisfaction scores'
                                      ];
                                      
                                      const newServices = [...(editForm.content_data?.services || [])];
                                      newServices[index] = { ...service, benefits: defaultBenefits };
                                      setEditForm({
                                        ...editForm,
                                        content_data: {
                                          ...editForm.content_data,
                                          services: newServices
                                        }
                                      });
                                    }}
                                  >
                                    Initialize Default Benefits
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <Select
                                  value={service.icon_name || ''}
                                  onValueChange={(value) => {
                                    const newServices = [...(editForm.content_data?.services || [])];
                                    newServices[index] = { ...service, icon_name: value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: {
                                        ...editForm.content_data,
                                        services: newServices
                                      }
                                    });
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Activity">Activity - Healthcare</SelectItem>
                                    <SelectItem value="Heart">Heart - Health/Care</SelectItem>
                                    <SelectItem value="Stethoscope">Stethoscope - Medical</SelectItem>
                                    <SelectItem value="Hospital">Hospital - Facility</SelectItem>
                                    <SelectItem value="Ambulance">Ambulance - Emergency</SelectItem>
                                    <SelectItem value="Users">Users - Community</SelectItem>
                                    <SelectItem value="Home">Home - Home Care</SelectItem>
                                    <SelectItem value="Shield">Shield - Protection</SelectItem>
                                    <SelectItem value="Phone">Phone - Telemedicine</SelectItem>
                                    <SelectItem value="Monitor">Monitor - Monitoring</SelectItem>
                                    <SelectItem value="Clock">Clock - Time/Schedule</SelectItem>
                                    <SelectItem value="MapPin">MapPin - Location</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  <Image className="h-4 w-4 inline mr-1" />
                                  Service Image
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleServiceImageChange(e, index)}
                                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {uploadingServiceImage === index && (
                                  <div className="mt-2 text-sm text-blue-600 flex items-center">
                                    <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                                    Uploading image...
                                  </div>
                                )}
                                {service.patient_image_url && (
                                  <div className="mt-2 space-y-2">
                                    <div className="text-sm text-green-600">✓ Image available</div>
                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border">
                                      <img 
                                        src={service.patient_image_url}
                                        alt={`${service.title} preview`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                        }}
                                      />
                                      <div className="absolute top-1 right-1 bg-black/50 rounded px-1">
                                        <Image className="h-3 w-3 text-white" />
                                      </div>
                                    </div>
                                    <div className="text-xs text-gray-500 break-all">
                                      {service.patient_image_url.split('/').pop()}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            const newTab = {
                              id: `service-${Date.now()}`,
                              title: 'New Service',
                              subtitle: 'Service Subtitle',
                              description: 'Service description',
                              icon_name: 'Activity',
                              color: 'blue',
                              patient_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
                            };
                            setEditForm({
                              ...editForm,
                              content_data: {
                                ...editForm.content_data,
                                services: [...(editForm.content_data?.services || []), newTab]
                              }
                            });
                          }}
                        >
                          Add New Tab
                        </Button>
                      </div>
                    )}

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
                            {(editForm.background_image_url || section.background_image_url) && (
                              <div className="mt-2 space-y-2">
                                <div className="text-sm text-green-600">✓ Image available</div>
                                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border">
                                  <img 
                                    src={editForm.background_image_url || section.background_image_url}
                                    alt="Background image preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                  <div className="absolute top-1 right-1 bg-black/50 rounded px-1">
                                    <Image className="h-3 w-3 text-white" />
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 break-all">
                                  {(editForm.background_image_url || section.background_image_url)?.split('/').pop()}
                                </div>
                              </div>
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
                            {(() => {
                              const videoUrl = editForm.background_video_url || section.background_video_url || 
                                (section.section_key === 'hero' ? 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4' : null);
                              
                              if (!videoUrl) return null;
                              
                              const isCustom = editForm.background_video_url || section.background_video_url;
                              
                              return (
                                <div className="mt-2 space-y-2">
                                  <div className="text-sm text-green-600">
                                    ✓ Video available {!isCustom && '(using fallback)'}
                                  </div>
                                  <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100 border">
                                    <video 
                                      src={videoUrl}
                                      className="w-full h-full object-cover"
                                      muted
                                      preload="metadata"
                                      onError={(e) => {
                                        const target = e.target as HTMLVideoElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      <Video className="h-6 w-6 text-white" />
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500 break-all">
                                    {videoUrl.split('/').pop()}
                                  </div>
                                  {!isCustom && (
                                    <div className="text-xs text-amber-600">
                                      Fallback video - upload custom video to replace
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
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
