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

interface PageContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  selectedPage?: string;
}

const PageContentManager: React.FC<PageContentManagerProps> = ({ 
  syncStatus = 'disconnected', 
  selectedPage = 'home' 
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
    BookOpen
  };

  // Page-specific section mappings based on actual database sections
  const pageSections = {
    'home': ['navigation', 'hero', 'services', 'mobile_showcase', 'value_proposition', 'admin_dashboard', 'founder', 'stats', 'lead_generation', 'footer'],
    'about': ['about_navigation', 'about_hero', 'about_content', 'about_why_resilient', 'about_hospital_benefits', 'about_clinician_benefits', 'about_values', 'about_lead_generation', 'about_footer'],
    'care-at-home': ['care-at-home_navigation', 'care-at-home_hero', 'care-at-home_content', 'care-at-home_tabs', 'care-at-home_lead_generation', 'care-at-home_footer'],
    'clinicians': ['clinicians_navigation', 'clinicians_hero', 'clinicians_content', 'clinicians_services_grid', 'clinicians_lead_generation', 'clinicians_footer'],
    'patients': ['patients_navigation', 'patients_hero', 'patients_content', 'patients_patient_tabs', 'patients_lead_generation', 'patients_footer'],
    'news': ['news_navigation', 'news_hero', 'news_content', 'news_articles', 'news_lead_generation', 'news_footer'],
    'contact': ['contact_navigation', 'contact_hero', 'contact_content', 'contact_form', 'contact_lead_generation', 'contact_footer']
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : <Activity className="h-5 w-5" />;
  };

  useEffect(() => {
    loadContent();
    setupRealtimeSubscription();
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

  const getSectionOrder = (sectionKey: string) => {
    const currentPageSections = pageSections[selectedPage as keyof typeof pageSections] || pageSections.home;
    const index = currentPageSections.indexOf(sectionKey);
    return index !== -1 ? index : 999;
  };

  const loadContent = async () => {
    try {
      const currentPageSections = pageSections[selectedPage as keyof typeof pageSections] || pageSections.home;
      
      // Load existing content based on the exact section keys defined for each page
      const { data: existingData, error: fetchError } = await supabase
        .from('website_content')
        .select('*')
        .in('section_key', currentPageSections);

      if (fetchError) throw fetchError;

      // Create missing sections for pages that don't have all their sections yet
      const existingSectionKeys = existingData?.map(item => item.section_key) || [];
      const missingSections = currentPageSections.filter(key => !existingSectionKeys.includes(key));

      if (missingSections.length > 0) {
        const newSections = missingSections.map(sectionKey => {
          // Set appropriate default content based on section type
          const sectionType = sectionKey.split('_').pop() || sectionKey;
          let defaultTitle = formatSectionName(sectionKey);
          let defaultDescription = `${formatSectionName(sectionKey)} content for ${selectedPage} page`;
          
          // Customize based on section type
          switch (sectionType) {
            case 'hero':
              defaultTitle = selectedPage === 'home' ? 'The Future of Healthcare' : `${selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Hero`;
              defaultDescription = `Main hero section for ${selectedPage} page`;
              break;
            case 'navigation':
              defaultTitle = 'Navigation';
              defaultDescription = `Navigation bar content for ${selectedPage} page`;
              break;
            case 'footer':
              defaultTitle = 'Footer';
              defaultDescription = `Footer content for ${selectedPage} page`;
              break;
            default:
              break;
          }

          return {
            section_key: sectionKey,
            title: defaultTitle,
            subtitle: `${formatSectionName(sectionKey)} Subtitle`,
            description: defaultDescription,
            button_text: 'Learn More',
            button_url: '#',
            is_active: true,
            content_data: {}
          };
        });

        const { error: insertError } = await supabase
          .from('website_content')
          .insert(newSections);

        if (insertError) throw insertError;

        // Reload content after creating missing sections
        const { data: refreshedData, error: refreshError } = await supabase
          .from('website_content')
          .select('*')
          .in('section_key', currentPageSections);

        if (refreshError) throw refreshError;
        
        // Sort by the defined order
        const sortedData = (refreshedData || []).sort((a, b) => 
          getSectionOrder(a.section_key) - getSectionOrder(b.section_key)
        );
        
        setContent(sortedData);
      } else {
        // Sort by the defined order
        const sortedData = (existingData || []).sort((a, b) => 
          getSectionOrder(a.section_key) - getSectionOrder(b.section_key)
        );
        
        setContent(sortedData);
      }
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
      .channel('page-content-changes')
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
    // Handle specific section name mappings for better display
    const sectionMappings: Record<string, string> = {
      'hero': 'Hero Section',
      'navigation': 'Navigation Bar',
      'footer': 'Footer',
      'lead_generation': 'Lead Generation',
      'mobile_showcase': 'Mobile Showcase',
      'value_proposition': 'Value Proposition',
      'admin_dashboard': 'Admin Dashboard',
      'founder': 'Founder Story',
      'stats': 'Statistics',
      'services': 'Service Lines',
      'why_resilient': 'Why Resilient',
      'hospital_benefits': 'Hospital Benefits',
      'clinician_benefits': 'Clinician Benefits',
      'values': 'Values',
      'content': 'Content Section',
      'tabs': 'Tabs Section',
      'services_grid': 'Services Grid',
      'patient_tabs': 'Patient Tabs',
      'news_articles': 'News Articles',
      'contact_form': 'Contact Form'
    };

    // Remove page prefix if present (e.g., 'about_hero' -> 'hero')
    const cleanKey = key.includes('_') ? key.split('_').slice(1).join('_') : key;
    
    // Use mapping if available, otherwise format the key
    return sectionMappings[cleanKey] || cleanKey.split('_').map(word => 
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
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedPage === 'home' ? 'Home Page' : 
             selectedPage === 'care-at-home' ? 'Care at Home Page' :
             selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1) + ' Page'} Content Manager
          </h2>
          <p className="text-gray-600">Manage all sections, content, and media for this page</p>
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
                      {/* Basic form fields for all sections */}
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

                      {/* File upload sections */}
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
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={uploadingImage}
                          />
                          {uploadingImage && <p className="text-sm text-blue-600">Uploading...</p>}
                          {editForm.background_image_url && (
                            <div className="mt-2">
                              <img src={editForm.background_image_url} alt="Background preview" className="w-full h-32 object-cover rounded" />
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
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={uploadingVideo}
                          />
                          {uploadingVideo && <p className="text-sm text-blue-600">Uploading...</p>}
                          {editForm.background_video_url && (
                            <div className="mt-2">
                              <video src={editForm.background_video_url} className="w-full h-32 object-cover rounded" muted />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {section.title && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Title:</span>
                          <p className="text-gray-900">{section.title}</p>
                        </div>
                      )}
                      {section.subtitle && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Subtitle:</span>
                          <p className="text-gray-900">{section.subtitle}</p>
                        </div>
                      )}
                      {section.description && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Description:</span>
                          <p className="text-gray-900">{section.description}</p>
                        </div>
                      )}
                      {section.button_text && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Button:</span>
                          <p className="text-gray-900">{section.button_text} ({section.button_url})</p>
                        </div>
                      )}
                      {section.background_image_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Background Image:</span>
                          <img src={section.background_image_url} alt="Background" className="w-full h-32 object-cover rounded mt-2" />
                        </div>
                      )}
                      {section.background_video_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Background Video:</span>
                          <video src={section.background_video_url} className="w-full h-32 object-cover rounded mt-2" muted />
                        </div>
                      )}
                      {section.content_data && Object.keys(section.content_data).length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-600">Complex Content Data:</span>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
                              {JSON.stringify(section.content_data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {content.length === 0 && (
            <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Edit3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">No content sections found</h3>
                <p className="text-blue-600">Content sections will be created automatically for this page</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <MediaLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageContentManager;