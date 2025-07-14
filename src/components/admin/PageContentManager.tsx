import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  BookOpen,
  Lightbulb
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

interface PageContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  selectedPage: string;
}

const PageContentManager: React.FC<PageContentManagerProps> = ({ 
  syncStatus = 'disconnected',
  selectedPage 
}) => {
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
    BookOpen,
    Lightbulb
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Activity className="h-5 w-5" />;
  };

  const getPagePrefix = (page: string) => {
    const prefixes: Record<string, string> = {
      'home': '',
      'about': 'about_',
      'clinicians': 'clinicians_',
      'care-at-home': 'care_at_home_',
      'patients': 'patients_',
      'news': 'news_',
      'contact': '' // No prefix for contact, use specific sections
    };
    return prefixes[page] || '';
  };

  const getSectionOrder = (sectionKey: string, page: string) => {
    const prefix = getPagePrefix(page);
    const baseKey = sectionKey.replace(prefix, '');
    
    const order = {
      'navigation': 1,
      'hero': 2,
      'mobile': 3,
      'services': 4,
      'mobile_showcase': 5,
      'value_proposition': 6,
      'value_prop': 6,
      'admin_dashboard': 7,
      'founder': 8,
      'stats': 9,
      'lead_generation': 10,
      'lead_gen': 10,
      // Page specific sections
      'why_choose': 3,
      'for_hospitals': 4,
      'for_clinicians': 5,
      'core_values': 6,
      'footer': 7,
      'team': 8,
      'tools': 3,
      'benefits': 4,
      'services_grid': 3,
      'technology': 4,
      'features': 3,
      'support': 4,
      'patient_tabs': 3,
      'featured': 3,
      'insights': 4,
      'articles': 3,
      'content': 3,
      'form': 3,
      'locations': 4,
      'get_in_touch': 2
    };
    return order[baseKey as keyof typeof order] || 999;
  };

  useEffect(() => {
    loadContent();
    
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
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'media_library'
      }, (payload) => {
        console.log('Real-time media change:', payload);
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedPage]);

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

  const loadContent = async () => {
    try {
      setLoading(true);
      const prefix = getPagePrefix(selectedPage);
      
      let query = supabase.from('website_content').select('*');
      
      if (selectedPage === 'home') {
        // For home page, get sections without prefixes and common sections
        query = query.or(`section_key.eq.hero,section_key.eq.patient_tabs,section_key.eq.services,section_key.eq.mobile_showcase,section_key.eq.value_proposition,section_key.eq.admin_dashboard,section_key.eq.founder,section_key.eq.stats,section_key.eq.lead_generation,section_key.eq.navigation,section_key.eq.footer`);
      } else if (selectedPage === 'contact') {
        // For contact page, show hero section first then footer
        query = query.or(`section_key.eq.contact_hero,section_key.eq.footer`);
      } else {
        // For other pages, get sections with the page prefix
        query = query.like('section_key', `${prefix}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Sort by the defined order
      const sortedData = (data || []).sort((a, b) => 
        getSectionOrder(a.section_key, selectedPage) - getSectionOrder(b.section_key, selectedPage)
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

      // Force reload content to ensure real-time sync
      await loadContent();

      toast({
        title: "Content updated",
        description: "Website content has been saved successfully",
      });

      setEditingSection(null);
      setEditForm({});
      setHasNewVideoUpload(false);
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
    const nameMap: Record<string, string> = {
      // Care at Home
      'care_at_home_hero': 'Hero Section',
      'care_at_home_future': 'The Future of Care',
      'care_at_home_hospitals': 'Leading Hospitals',
      'care_at_home_referrals': 'Patient Referrals',
      'care_at_home_delivery': 'Care Delivery',
      'care_at_home_workflows': 'Simplified Workflows',
      'care_at_home_payment': 'Per-Visit Payment',
      'care_at_home_mobile': 'The Future of Care',
      'care_at_home_services': 'Our Care Solutions',
      'care_at_home_value_prop': 'Partner with Leading Hospitals',
      'care_at_home_stats': 'Healthcare Excellence Metrics',
      'care_at_home_footer': 'Footer',
      
      // Clinicians
      'clinicians_hero': 'Hero Section',
      'clinicians_hospitals': 'Work with Leading Hospitals',
      'clinicians_referrals': 'Patient Referrals',
      'clinicians_delivery': 'Care Delivery',
      'clinicians_workflows': 'Simplified Workflows',
      'clinicians_payment': 'Per-Visit Payment',
      'clinicians_join': 'Join Our Network',
      'clinicians_tools': 'Clinical Tools & Features',
      'clinicians_benefits': 'Why Clinicians Choose Us',
      'clinicians_footer': 'Footer',
      
      // About
      'about_hero': 'Hero Section',
      'about_why_choose_header': 'Why Choose Resilient Header',
      'about_why_choose_rain': 'RAIN-Powered AI Infrastructure',
      'about_why_choose_integrated': 'Fully Integrated With Hospital Systems',
      'about_why_choose_workforce': 'Flexible Workforce Model',
      'about_for_hospitals': 'For Hospitals',
      'about_for_clinicians': 'For Clinicians',
      'about_core_values': 'Our Core Values',
      'about_footer': 'Footer',
      
      // Patients
      'patients_hero': 'Hero Section',
      'patients_footer': 'Footer',
      
      // News
      'news_hero': 'Hero Section',
      'news_featured': 'Featured Articles',
      'news_insights': 'Industry Insights',
      'news_footer': 'Footer',
      
      // Contact
      'get_in_touch': 'Get in Touch Section',
      'footer': 'Footer'
    };
    
    return nameMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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

      // Handle both services (for other sections) and tabs (for care_at_home_mobile)
      if ((editForm.content_data as any)?.services) {
        const newServices = [...((editForm.content_data as any)?.services || [])];
        newServices[serviceIndex] = { ...newServices[serviceIndex], patient_image_url: data.publicUrl };
        setEditForm({
          ...editForm,
          content_data: { ...editForm.content_data, services: newServices }
        });
      } else if ((editForm.content_data as any)?.tabs) {
        const newTabs = [...((editForm.content_data as any)?.tabs || [])];
        newTabs[serviceIndex] = { ...newTabs[serviceIndex], image_url: data.publicUrl };
        setEditForm({
          ...editForm,
          content_data: { ...editForm.content_data, tabs: newTabs }
        });
      }

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
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">
            {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1).replace('-', ' ')} Page Content
          </h2>
          <p className="text-lg text-muted-foreground">Manage content sections, media, and settings</p>
        </div>
        <div className="flex items-center space-x-2">
          {getSyncStatusIcon()}
          <Badge variant="outline" className="text-sm">
            {syncStatus === 'connected' ? 'Live Updates' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </Badge>
        </div>
      </div>

      <div className="w-full">

        <div className="space-y-6 admin-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto bg-white p-4 rounded-lg">
          <div className="grid gap-6">
            {content.map((section) => (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader className="bg-white border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-1">
                        <CardTitle className="text-black">
                          {formatSectionName(section.section_key)}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          Section: {section.section_key}
                        </p>
                        {section.title && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {section.title}
                          </p>
                        )}
                        {/* Show media type indicator */}
                        <div className="flex items-center gap-2 mt-2">
                          {section.section_key.includes('hero') && section.background_video_url && (
                            <Badge variant="outline" className="text-xs">
                              <Video className="h-3 w-3 mr-1" />
                              Video
                            </Badge>
                          )}
                          {(section.background_image_url || section.mobile_background_url || section.laptop_background_url) && (
                            <Badge variant="outline" className="text-xs">
                              <Image className="h-3 w-3 mr-1" />
                              Image
                            </Badge>
                          )}
                        </div>
                      </div>
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
                      {/* Universal form fields for all sections */}
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
                          Subtitle
                        </label>
                        <Input
                          value={editForm.subtitle || ''}
                          onChange={(e) => setEditForm({...editForm, subtitle: e.target.value})}
                          placeholder="Section subtitle"
                        />
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

                      {/* Only show button fields for non-hero sections and non-mobile */}
                      {!section.section_key.includes('hero') && !section.section_key.includes('mobile') && (
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
                      )}

                      {/* Background media uploads - hide for mobile sections */}
                      {!section.section_key.includes('mobile') && (
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
                          {uploadingImage && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                          {editForm.background_image_url && (
                            <div className="mt-2">
                              <img 
                                src={editForm.background_image_url} 
                                alt="Background preview" 
                                className="w-full h-32 object-cover rounded border"
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
                          {uploadingVideo && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                          {editForm.background_video_url && (
                            <div className="mt-2">
                              <video 
                                src={editForm.background_video_url} 
                                className="w-full h-60 object-cover rounded border"
                                controls
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      )}

                      {/* Tabs management for care_at_home_mobile, clinicians_mobile, and patients_mobile sections */}
                      {(section.section_key === 'care_at_home_mobile' || section.section_key === 'clinicians_mobile' || section.section_key === 'patients_mobile') && (
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="text-lg font-semibold text-gray-900">Future of Care Tabs</h4>
                          {((editForm.content_data as any)?.tabs || []).map((tab: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-800">Tab {index + 1}</h5>
                                <Badge variant="outline">{tab.display_order}</Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tab Title
                                  </label>
                                  <Input
                                    value={tab.title || ''}
                                    onChange={(e) => {
                                      const newTabs = [...((editForm.content_data as any)?.tabs || [])];
                                      newTabs[index] = { ...newTabs[index], title: e.target.value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, tabs: newTabs }
                                      });
                                    }}
                                    placeholder="Tab title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                  </label>
                                  <Input
                                    value={tab.subtitle || ''}
                                    onChange={(e) => {
                                      const newTabs = [...((editForm.content_data as any)?.tabs || [])];
                                      newTabs[index] = { ...newTabs[index], subtitle: e.target.value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, tabs: newTabs }
                                      });
                                    }}
                                    placeholder="Tab subtitle"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <Textarea
                                  value={tab.description || ''}
                                  onChange={(e) => {
                                    const newTabs = [...((editForm.content_data as any)?.tabs || [])];
                                    newTabs[index] = { ...newTabs[index], description: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, tabs: newTabs }
                                    });
                                  }}
                                  placeholder="Tab description"
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon
                                  </label>
                                  <Select
                                    value={tab.icon_name || 'Activity'}
                                    onValueChange={(value) => {
                                      const newTabs = [...((editForm.content_data as any)?.tabs || [])];
                                      newTabs[index] = { ...newTabs[index], icon_name: value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, tabs: newTabs }
                                      });
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue>
                                        <div className="flex items-center gap-2">
                                          {getIconComponent(tab.icon_name || 'Activity')}
                                          <span>{tab.icon_name || 'Activity'}</span>
                                        </div>
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.keys(availableIcons).map((iconName) => (
                                        <SelectItem key={iconName} value={iconName}>
                                          <div className="flex items-center gap-2">
                                            {getIconComponent(iconName)}
                                            <span>{iconName}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tab Image
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handlePatientImageChange(e, index)}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    disabled={uploadingPatientImage[index]}
                                  />
                                  {uploadingPatientImage[index] && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                                  {tab.image_url && (
                                    <div className="mt-2">
                                      <img 
                                        src={tab.image_url} 
                                        alt="Tab preview" 
                                        className="w-full h-32 object-cover rounded border"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pillars management for about_why_choose section */}
                      {section.section_key === 'about_why_choose' && (
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="text-lg font-semibold text-gray-900">Why Choose Resilient Pillars</h4>
                          {((editForm.content_data as any)?.pillars || []).map((pillar: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-800">Pillar {index + 1}</h5>
                                <Badge variant="outline">{pillar.id}</Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pillar Title
                                  </label>
                                  <Input
                                    value={pillar.title || ''}
                                    onChange={(e) => {
                                      const newPillars = [...((editForm.content_data as any)?.pillars || [])];
                                      newPillars[index] = { ...newPillars[index], title: e.target.value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, pillars: newPillars }
                                      });
                                    }}
                                    placeholder="Pillar title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                  </label>
                                  <Input
                                    value={pillar.subtitle || ''}
                                    onChange={(e) => {
                                      const newPillars = [...((editForm.content_data as any)?.pillars || [])];
                                      newPillars[index] = { ...newPillars[index], subtitle: e.target.value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, pillars: newPillars }
                                      });
                                    }}
                                    placeholder="Pillar subtitle"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <Textarea
                                  value={pillar.description || ''}
                                  onChange={(e) => {
                                    const newPillars = [...((editForm.content_data as any)?.pillars || [])];
                                    newPillars[index] = { ...newPillars[index], description: e.target.value };
                                    setEditForm({
                                      ...editForm,
                                      content_data: { ...editForm.content_data, pillars: newPillars }
                                    });
                                  }}
                                  placeholder="Pillar description"
                                  rows={3}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon
                                  </label>
                                  <Select
                                    value={pillar.icon_name || 'Activity'}
                                    onValueChange={(value) => {
                                      const newPillars = [...((editForm.content_data as any)?.pillars || [])];
                                      newPillars[index] = { ...newPillars[index], icon_name: value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, pillars: newPillars }
                                      });
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue>
                                        <div className="flex items-center gap-2">
                                          {getIconComponent(pillar.icon_name || 'Activity')}
                                          <span>{pillar.icon_name || 'Activity'}</span>
                                        </div>
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.keys(availableIcons).map((iconName) => (
                                        <SelectItem key={iconName} value={iconName}>
                                          <div className="flex items-center gap-2">
                                            {getIconComponent(iconName)}
                                            <span>{iconName}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pillar Image
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      
                                      // Handle pillar image upload
                                      const handlePillarImageUpload = async (file: File, pillarIndex: number) => {
                                        try {
                                          const fileExt = file.name.split('.').pop();
                                          const fileName = `${Math.random()}.${fileExt}`;
                                          const filePath = `pillar-images/${fileName}`;

                                          const { error: uploadError } = await supabase.storage
                                            .from('media')
                                            .upload(filePath, file);

                                          if (uploadError) throw uploadError;

                                          const { data } = supabase.storage
                                            .from('media')
                                            .getPublicUrl(filePath);

                                          const newPillars = [...((editForm.content_data as any)?.pillars || [])];
                                          newPillars[pillarIndex] = { ...newPillars[pillarIndex], image_url: data.publicUrl };
                                          setEditForm({
                                            ...editForm,
                                            content_data: { ...editForm.content_data, pillars: newPillars }
                                          });

                                          toast({
                                            title: "Upload successful",
                                            description: "Pillar image uploaded successfully",
                                          });
                                        } catch (error) {
                                          console.error('Error uploading pillar image:', error);
                                          toast({
                                            title: "Upload failed",
                                            description: "Failed to upload pillar image",
                                            variant: "destructive"
                                          });
                                        }
                                      };
                                      
                                      handlePillarImageUpload(file, index);
                                    }}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                  />
                                  {pillar.image_url && (
                                    <div className="mt-2">
                                      <img 
                                        src={pillar.image_url} 
                                        alt="Pillar preview" 
                                        className="w-full h-32 object-cover rounded border"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                       )}

                      {/* Values management for about_core_values section */}
                      {section.section_key === 'about_core_values' && (
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="text-lg font-semibold text-gray-900">Core Values</h4>
                          {((editForm.content_data as any)?.values || []).map((value: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium text-gray-800">Value {index + 1}</h5>
                                <Badge variant="outline">{value.id}</Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Value Title
                                  </label>
                                  <Input
                                    value={value.title || ''}
                                    onChange={(e) => {
                                      const newValues = [...((editForm.content_data as any)?.values || [])];
                                      newValues[index] = { ...newValues[index], title: e.target.value };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, values: newValues }
                                      });
                                    }}
                                    placeholder="Value title"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icon
                                  </label>
                                  <Select
                                    value={value.icon_name || 'Activity'}
                                    onValueChange={(value_icon) => {
                                      const newValues = [...((editForm.content_data as any)?.values || [])];
                                      newValues[index] = { ...newValues[index], icon_name: value_icon };
                                      setEditForm({
                                        ...editForm,
                                        content_data: { ...editForm.content_data, values: newValues }
                                      });
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue>
                                        <div className="flex items-center gap-2">
                                          {getIconComponent(value.icon_name || 'Activity')}
                                          <span>{value.icon_name || 'Activity'}</span>
                                        </div>
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.keys(availableIcons).map((iconName) => (
                                        <SelectItem key={iconName} value={iconName}>
                                          <div className="flex items-center gap-2">
                                            {getIconComponent(iconName)}
                                            <span>{iconName}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Description
                                </label>
                                <Textarea
                                  value={value.description || ''}
                                  onChange={(e) => {
                                    const newValues = [...((editForm.content_data as any)?.values || [])];
                                    newValues[index] = { ...newValues[index], description: e.target.value };
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
                          ))}
                        </div>
                      )}

                      {/* Contact Information management for get_in_touch section */}
                      {section.section_key === 'get_in_touch' && (
                        <div className="space-y-6 border-t pt-4">
                          <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
                          
                          {/* Headquarters */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Headquarters Text
                            </label>
                            <Input
                              value={((editForm.content_data as any)?.contact_info?.headquarters) || ''}
                              onChange={(e) => {
                                const newContactInfo = {
                                  ...((editForm.content_data as any)?.contact_info || {}),
                                  headquarters: e.target.value
                                };
                                setEditForm({
                                  ...editForm,
                                  content_data: { 
                                    ...editForm.content_data, 
                                    contact_info: newContactInfo 
                                  }
                                });
                              }}
                              placeholder="📍 Resilient Healthcare Headquarters"
                            />
                          </div>

                          {/* Phone */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Label
                              </label>
                              <Input
                                value={((editForm.content_data as any)?.contact_info?.phone?.label) || ''}
                                onChange={(e) => {
                                  const newContactInfo = {
                                    ...((editForm.content_data as any)?.contact_info || {}),
                                    phone: {
                                      ...((editForm.content_data as any)?.contact_info?.phone || {}),
                                      label: e.target.value
                                    }
                                  };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { 
                                      ...editForm.content_data, 
                                      contact_info: newContactInfo 
                                    }
                                  });
                                }}
                                placeholder="📞 Call"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                              </label>
                              <Input
                                value={((editForm.content_data as any)?.contact_info?.phone?.number) || ''}
                                onChange={(e) => {
                                  const newContactInfo = {
                                    ...((editForm.content_data as any)?.contact_info || {}),
                                    phone: {
                                      ...((editForm.content_data as any)?.contact_info?.phone || {}),
                                      number: e.target.value
                                    }
                                  };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { 
                                      ...editForm.content_data, 
                                      contact_info: newContactInfo 
                                    }
                                  });
                                }}
                                placeholder="(732) 429-2102"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Label
                              </label>
                              <Input
                                value={((editForm.content_data as any)?.contact_info?.email?.label) || ''}
                                onChange={(e) => {
                                  const newContactInfo = {
                                    ...((editForm.content_data as any)?.contact_info || {}),
                                    email: {
                                      ...((editForm.content_data as any)?.contact_info?.email || {}),
                                      label: e.target.value
                                    }
                                  };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { 
                                      ...editForm.content_data, 
                                      contact_info: newContactInfo 
                                    }
                                  });
                                }}
                                placeholder="✉️ Email"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                              </label>
                              <Input
                                value={((editForm.content_data as any)?.contact_info?.email?.address) || ''}
                                onChange={(e) => {
                                  const newContactInfo = {
                                    ...((editForm.content_data as any)?.contact_info || {}),
                                    email: {
                                      ...((editForm.content_data as any)?.contact_info?.email || {}),
                                      address: e.target.value
                                    }
                                  };
                                  setEditForm({
                                    ...editForm,
                                    content_data: { 
                                      ...editForm.content_data, 
                                      contact_info: newContactInfo 
                                    }
                                  });
                                }}
                                placeholder="jackleen@resilienthc.org"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Active toggle */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_active"
                          checked={editForm.is_active || false}
                          onChange={(e) => setEditForm({...editForm, is_active: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                          Active Section
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.title && (
                        <div>
                          <span className="text-sm font-medium text-blue-600">Title:</span>
                          <p className="text-black">{section.title}</p>
                        </div>
                      )}
                      {section.description && (
                        <div>
                          <span className="text-sm font-medium text-blue-600">Description:</span>
                          <p className="text-black">{section.description}</p>
                        </div>
                      )}
                      {section.background_image_url && (
                        <div>
                          <span className="text-sm font-medium text-blue-600">Background Image:</span>
                          <img 
                            src={section.background_image_url} 
                            alt="Background" 
                            className="mt-1 w-full h-32 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {content.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Edit3 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">No content sections found</h3>
                <p className="text-blue-600">Content sections for this page will appear here once they're added to the database</p>
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

export default PageContentManager;