
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Upload, 
  Image, 
  Video, 
  Type, 
  Globe, 
  Eye,
  Wifi,
  WifiOff,
  ChevronDown,
  ChevronRight,
  Activity,
  Download,
  Play,
  Navigation,
  Users,
  Mail,
  Info,
  Trash2,
  Plus,
  Link,
  Zap
} from 'lucide-react';

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
  icon_name: string;
  color: string;
  patient_image_url?: string;
  display_order: number;
}

interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size: number | null;
  url: string;
  alt_text: string | null;
  created_at: string;
}

interface UnifiedContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const UnifiedContentManager: React.FC<UnifiedContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero'])); // Auto-expand hero section
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<WebsiteContent>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { toast } = useToast();

  // Complete list of all website sections
  const allSections = [
    'navigation',
    'hero', 
    'services_header',
    'services',
    'mobile_showcase',
    'value_proposition',
    'admin_dashboard',
    'founder',
    'stats',
    'lead_generation',
    'footer'
  ];

  useEffect(() => {
    loadAllData();
    setupRealtimeSubscriptions();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Load website content
      const { data: contentData, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('section_key');

      if (contentError) throw contentError;

      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('display_order');

      if (servicesError) throw servicesError;

      // Load media files
      const { data: mediaData, error: mediaError } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (mediaError) throw mediaError;

      setContent(contentData || []);
      setServices(servicesData || []);
      setMediaFiles(mediaData || []);
      
      console.log('Loaded content data:', contentData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load content data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    const contentChannel = supabase
      .channel('unified-content-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website_content' }, (payload) => {
        console.log('Real-time content update:', payload);
        setLastUpdate(new Date());
        loadAllData();
        
        toast({
          title: "Content updated",
          description: "Website content updated in real-time",
          duration: 2000,
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => {
        console.log('Real-time services update:', payload);
        setLastUpdate(new Date());
        loadAllData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media_library' }, (payload) => {
        console.log('Real-time media update:', payload);
        setLastUpdate(new Date());
        loadAllData();
      })
      .subscribe();

    return () => supabase.removeChannel(contentChannel);
  };

  const toggleSection = (sectionKey: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionKey)) {
      newExpanded.delete(sectionKey);
    } else {
      newExpanded.add(sectionKey);
    }
    setExpandedSections(newExpanded);
  };

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.id);
    setFormData(section);
  };

  const handleSave = async () => {
    if (!editingSection || !formData) return;

    try {
      console.log('Saving content:', formData);
      
      const { error } = await supabase
        .from('website_content')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingSection);

      if (error) throw error;

      toast({
        title: "Content updated successfully",
        description: "Changes are now live on the website",
        duration: 3000,
      });

      setEditingSection(null);
      setFormData({});
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error saving",
        description: "Failed to save changes",
        variant: "destructive"
      });
    }
  };

  const handleCreateSection = async (sectionKey: string) => {
    try {
      const insertData: {
        section_key: string;
        title?: string;
        subtitle?: string;
        description?: string;
        button_text?: string;
        button_url?: string;
        background_video_url?: string;
      } = {
        section_key: sectionKey,
        title: `${getSectionDisplayName(sectionKey)} Title`,
        subtitle: `${getSectionDisplayName(sectionKey)} Subtitle`,
        description: `${getSectionDisplayName(sectionKey)} description content.`,
        button_text: 'Learn More',
        button_url: '#'
      };

      // Special case for hero section - include the current video that's already being used
      if (sectionKey === 'hero') {
        insertData.title = 'The Future of Healthcare';
        insertData.description = 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.';
        insertData.button_text = 'Request Demo';
        insertData.button_url = '#contact';
        insertData.background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4';
      }

      const { data, error } = await supabase
        .from('website_content')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Section created successfully",
        description: `${getSectionDisplayName(sectionKey)} section has been created with default content`,
        duration: 3000,
      });

      loadAllData();
    } catch (error) {
      console.error('Error creating section:', error);
      toast({
        title: "Error creating section",
        description: "Failed to create section",
        variant: "destructive"
      });
    }
  };

  const handleSetVideoAsBackground = async (videoUrl: string, sectionKey: string) => {
    try {
      const section = content.find(c => c.section_key === sectionKey);
      if (!section) return;

      const { error } = await supabase
        .from('website_content')
        .update({ 
          background_video_url: videoUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', section.id);

      if (error) throw error;

      toast({
        title: "Video background updated",
        description: `Video is now the background for ${getSectionDisplayName(sectionKey)}`,
        duration: 3000,
      });

      loadAllData();
    } catch (error) {
      console.error('Error setting video background:', error);
      toast({
        title: "Error updating background",
        description: "Failed to set video as background",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, sectionKey: string, fileType: 'image' | 'video' = 'image') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(`${sectionKey}-${fileType}`);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${sectionKey}_${Date.now()}.${fileExt}`;
      const filePath = `media/${fileName}`;

      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Add to media library
      await supabase
        .from('media_library')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_type: file.type,
          file_size: file.size,
          url: publicUrl,
          alt_text: `${sectionKey} - ${file.name.split('.')[0]}`
        });

      // Auto-assign to section if it's a background
      const section = content.find(c => c.section_key === sectionKey);
      if (section) {
        const updateField = fileType === 'video' ? 'background_video_url' : 'background_image_url';
        await supabase
          .from('website_content')
          .update({ 
            [updateField]: publicUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', section.id);
      }

      toast({
        title: "File uploaded successfully",
        description: `${file.name} uploaded and assigned to ${getSectionDisplayName(sectionKey)}`,
        duration: 3000,
      });

      event.target.value = '';
      loadAllData();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(null);
    }
  };

  const handleDeleteMedia = async (mediaId: string, filename: string) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('media')
        .remove([`media/${filename}`]);

      // Delete from database
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', mediaId);

      if (error) throw error;

      toast({
        title: "Media deleted",
        description: "File has been removed",
      });

      loadAllData();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete file",
        variant: "destructive"
      });
    }
  };

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

  const getSectionDisplayName = (sectionKey: string) => {
    const names: Record<string, string> = {
      'navigation': 'Navigation Bar',
      'hero': 'Hero Section',
      'services_header': 'Services Header',
      'services': 'Service Lines',
      'mobile_showcase': 'Mobile Showcase',
      'value_proposition': 'Value Proposition',
      'admin_dashboard': 'Admin Dashboard Preview',
      'founder': 'Founder Section',
      'stats': 'Statistics Section',
      'lead_generation': 'Lead Generation',
      'footer': 'Footer'
    };
    return names[sectionKey] || sectionKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSectionIcon = (sectionKey: string) => {
    const icons: Record<string, React.ReactNode> = {
      'navigation': <Navigation className="h-5 w-5" />,
      'hero': <Globe className="h-5 w-5" />,
      'services_header': <Type className="h-5 w-5" />,
      'services': <Activity className="h-5 w-5" />,
      'mobile_showcase': <Image className="h-5 w-5" />,
      'value_proposition': <Type className="h-5 w-5" />,
      'admin_dashboard': <Activity className="h-5 w-5" />,
      'founder': <Users className="h-5 w-5" />,
      'stats': <Activity className="h-5 w-5" />,
      'lead_generation': <Mail className="h-5 w-5" />,
      'footer': <Info className="h-5 w-5" />
    };
    return icons[sectionKey] || <Type className="h-5 w-5" />;
  };

  const getSectionDescription = (sectionKey: string) => {
    const descriptions: Record<string, string> = {
      'navigation': 'Main navigation menu and branding',
      'hero': 'Primary landing section with hero messaging',
      'services_header': 'Introduction to healthcare services',
      'services': 'Detailed service offerings and specialties',
      'mobile_showcase': 'Mobile app demonstration and features',
      'value_proposition': 'Key benefits and value statements',
      'admin_dashboard': 'Admin dashboard preview and features',
      'founder': 'Founder information and credentials',
      'stats': 'Key statistics and achievements',
      'lead_generation': 'Contact forms and lead capture',
      'footer': 'Footer content and legal information'
    };
    return descriptions[sectionKey] || 'Website section configuration';
  };

  const getMediaForSection = (sectionKey: string) => {
    return mediaFiles.filter(file => 
      file.alt_text?.toLowerCase().includes(sectionKey.toLowerCase()) ||
      file.original_name.toLowerCase().includes(sectionKey.toLowerCase()) ||
      file.filename.toLowerCase().includes(sectionKey.toLowerCase())
    );
  };

  const renderMediaDisplay = (section: WebsiteContent) => {
    const sectionMedia = getMediaForSection(section.section_key);
    
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Media & Assets</h4>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="file"
                id={`image-upload-${section.section_key}`}
                className="hidden"
                onChange={(e) => handleFileUpload(e, section.section_key, 'image')}
                accept="image/*"
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                disabled={uploading === `${section.section_key}-image`}
              >
                <label htmlFor={`image-upload-${section.section_key}`} className="cursor-pointer">
                  <Image className="h-3 w-3 mr-2" />
                  {uploading === `${section.section_key}-image` ? 'Uploading...' : 'Add Image'}
                </label>
              </Button>
            </div>
            <div className="relative">
              <input
                type="file"
                id={`video-upload-${section.section_key}`}
                className="hidden"
                onChange={(e) => handleFileUpload(e, section.section_key, 'video')}
                accept="video/*"
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                disabled={uploading === `${section.section_key}-video`}
              >
                <label htmlFor={`video-upload-${section.section_key}`} className="cursor-pointer">
                  <Video className="h-3 w-3 mr-2" />
                  {uploading === `${section.section_key}-video` ? 'Uploading...' : 'Add Video'}
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Current Background Display - Show what's actually in the database */}
        {(section.background_image_url || section.background_video_url) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-medium text-gray-600">Current Background (Live on Website)</h5>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                <Zap className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
            <div className="relative w-full h-32 rounded-lg overflow-hidden border">
              {section.background_video_url ? (
                <div className="relative w-full h-full">
                  <video 
                    src={section.background_video_url} 
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-8 w-8 text-white mx-auto mb-1" />
                      <span className="text-white text-sm font-medium">Background Video</span>
                      <p className="text-white text-xs opacity-80 mt-1 max-w-xs truncate">
                        {section.background_video_url}
                      </p>
                    </div>
                  </div>
                </div>
              ) : section.background_image_url ? (
                <img
                  src={section.background_image_url}
                  alt={`${section.section_key} background`}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        )}

        {/* Media Library Files for this Section */}
        {sectionMedia.length > 0 ? (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-2">Uploaded Media Files</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectionMedia.map((file) => (
                <div key={file.id} className="relative group border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {file.file_type.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.alt_text || file.original_name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.file_type.startsWith('video/') ? (
                      <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                        <Play className="h-6 w-6 text-gray-400 absolute z-10" />
                        <video className="w-full h-full object-cover" preload="metadata">
                          <source src={file.url} type={file.file_type} />
                        </video>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <Image className="h-4 w-4 mx-auto mb-1" />
                        <span className="text-xs">{file.file_type}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-3 w-3" />
                        </a>
                      </Button>
                      {file.file_type.startsWith('video/') && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleSetVideoAsBackground(file.url, section.section_key)}
                        >
                          <Link className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteMedia(file.id, file.filename)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium truncate">{file.original_name}</p>
                    <span className="text-xs text-gray-500">
                      {Math.round((file.file_size || 0) / 1024)}KB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-2">Uploaded Media Files</h5>
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <Image className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No uploaded media files for this section</p>
              <p className="text-xs">Upload images or videos to manage them here</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderServicesSection = () => {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Service Lines ({services.length})</h4>
          <Badge variant="secondary" className="text-xs">
            Live Services Data
          </Badge>
        </div>
        <div className="grid gap-3">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-sm">{service.title}</h5>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
                    {service.icon_name}
                  </Badge>
                  <span className="text-xs text-gray-500">Order: {service.display_order}</span>
                </div>
              </div>
              {service.subtitle && (
                <p className="text-xs text-gray-600 mb-1">{service.subtitle}</p>
              )}
              {service.description && (
                <p className="text-xs text-gray-500 line-clamp-2">{service.description}</p>
              )}
              {service.patient_image_url && (
                <div className="mt-2">
                  <img 
                    src={service.patient_image_url} 
                    alt={service.title}
                    className="w-16 h-16 rounded object-cover border"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Create comprehensive sections data including those not in database
  const sectionsData = allSections.map(sectionKey => {
    const existing = content.find(c => c.section_key === sectionKey);
    return existing || {
      id: `placeholder-${sectionKey}`,
      section_key: sectionKey,
      title: '',
      subtitle: '',
      description: '',
      button_text: '',
      button_url: ''
    } as WebsiteContent;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Content Management</h2>
          <p className="text-gray-600">Complete website content control with real-time sync and media management</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>{syncStatus === 'connected' ? 'Live Sync Active' : syncStatus === 'syncing' ? 'Syncing Changes' : 'Sync Offline'}</span>
          </Badge>
          {lastUpdate && (
            <span className="text-sm text-gray-500">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <Button variant="outline" onClick={() => window.open(window.location.origin, '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Live Website
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sectionsData.map((section) => {
          const isPlaceholder = section.id.startsWith('placeholder-');
          
          return (
            <Card key={section.section_key} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleSection(section.section_key)}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    {expandedSections.has(section.section_key) ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                    {getSectionIcon(section.section_key)}
                    <div>
                      <CardTitle className="text-lg">{getSectionDisplayName(section.section_key)}</CardTitle>
                      <CardDescription>{getSectionDescription(section.section_key)}</CardDescription>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Badge variant={isPlaceholder ? "destructive" : "secondary"} className="text-xs">
                      {isPlaceholder ? 'Not Created' : 'Live'}
                    </Badge>
                    {expandedSections.has(section.section_key) && (
                      <>
                        {isPlaceholder ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCreateSection(section.section_key)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Section
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(section)}
                            disabled={editingSection === section.id}
                          >
                            {editingSection === section.id ? 'Editing...' : 'Edit Content'}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>

              {expandedSections.has(section.section_key) && !isPlaceholder && (
                <CardContent className="pt-0">
                  {editingSection === section.id ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={formData.title || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Enter title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subtitle">Subtitle</Label>
                          <Input
                            id="subtitle"
                            value={formData.subtitle || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                            placeholder="Enter subtitle"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter description"
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="button_text">Button Text</Label>
                          <Input
                            id="button_text"
                            value={formData.button_text || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, button_text: e.target.value }))}
                            placeholder="Enter button text"
                          />
                        </div>
                      <div className="space-y-2">
                        <Label htmlFor="button_url">Button URL</Label>
                        <Input
                          id="button_url"
                          value={formData.button_url || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, button_url: e.target.value }))}
                          placeholder="Enter button URL"
                        />
                      </div>
                    </div>

                    {/* Logo URL field for footer section */}
                    {formData.section_key === 'footer' && (
                      <div className="space-y-2">
                        <Label htmlFor="background_image_url">Logo URL</Label>
                        <Input
                          id="background_image_url"
                          value={formData.background_image_url || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, background_image_url: e.target.value }))}
                          placeholder="Enter logo image URL or upload via Media section below"
                        />
                      </div>
                    )}

                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Button onClick={handleSave} className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Save & Sync to Website
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSection(null)}>
                          Cancel
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
                          <Zap className="h-4 w-4" />
                          Real-time sync enabled
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
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
                          <p className="text-gray-900 text-sm">{section.description}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Special sections */}
                  {section.section_key === 'services' && renderServicesSection()}
                  
                  {/* Media section for all sections */}
                  {renderMediaDisplay(section)}
                </CardContent>
              )}

              {expandedSections.has(section.section_key) && isPlaceholder && (
                <CardContent className="pt-0">
                  <div className="text-center py-8 text-gray-500">
                    <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Section Not Created</h3>
                    <p className="text-gray-600 mb-4">
                      This section hasn't been created yet. Click "Create Section" to add it to your website.
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UnifiedContentManager;
