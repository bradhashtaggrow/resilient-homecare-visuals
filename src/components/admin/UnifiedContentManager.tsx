
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Upload, 
  Image, 
  Video, 
  Type, 
  Globe, 
  Zap, 
  Eye,
  Wifi,
  WifiOff,
  ChevronDown,
  ChevronRight,
  Activity,
  Trash2,
  Download,
  Play
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<WebsiteContent>>({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
      .channel('unified-content-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website_content' }, loadAllData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, loadAllData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media_library' }, loadAllData)
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
      const { error } = await supabase
        .from('website_content')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingSection);

      if (error) throw error;

      toast({
        title: "Content updated",
        description: "Changes saved successfully",
      });

      setEditingSection(null);
      setFormData({});
    } catch (error) {
      toast({
        title: "Error saving",
        description: "Failed to save changes",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, sectionKey: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `media/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

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

      toast({
        title: "File uploaded",
        description: `${file.name} uploaded successfully`,
      });

      event.target.value = '';
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
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
      'hero': 'Hero Section',
      'services_header': 'Services Header',
      'services': 'Services',
      'value_prop': 'Value Proposition',
      'about': 'About Section',
      'contact': 'Contact Section',
      'footer': 'Footer',
      'navigation': 'Navigation'
    };
    return names[sectionKey] || sectionKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSectionIcon = (sectionKey: string) => {
    const icons: Record<string, React.ReactNode> = {
      'hero': <Globe className="h-5 w-5" />,
      'services_header': <Type className="h-5 w-5" />,
      'services': <Activity className="h-5 w-5" />,
      'value_prop': <Zap className="h-5 w-5" />,
      'about': <Type className="h-5 w-5" />,
      'contact': <Type className="h-5 w-5" />,
      'footer': <Type className="h-5 w-5" />,
      'navigation': <Type className="h-5 w-5" />
    };
    return icons[sectionKey] || <Type className="h-5 w-5" />;
  };

  const getMediaForSection = (sectionKey: string) => {
    return mediaFiles.filter(file => 
      file.alt_text?.toLowerCase().includes(sectionKey.toLowerCase()) ||
      file.original_name.toLowerCase().includes(sectionKey.toLowerCase())
    );
  };

  const renderMediaSection = (sectionKey: string) => {
    const sectionMedia = getMediaForSection(sectionKey);
    
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Media Files</h4>
          <div className="relative">
            <input
              type="file"
              id={`file-upload-${sectionKey}`}
              className="hidden"
              onChange={(e) => handleFileUpload(e, sectionKey)}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              disabled={uploading}
            >
              <label htmlFor={`file-upload-${sectionKey}`} className="cursor-pointer">
                <Upload className="h-3 w-3 mr-2" />
                {uploading ? 'Uploading...' : 'Upload'}
              </label>
            </Button>
          </div>
        </div>

        {sectionMedia.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sectionMedia.map((file) => (
              <div key={file.id} className="relative group border rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  {file.file_type.startsWith('image/') ? (
                    <img
                      src={file.url}
                      alt={file.alt_text || file.original_name}
                      className="w-full h-full object-cover"
                    />
                  ) : file.file_type.startsWith('video/') ? (
                    <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                      <Play className="h-8 w-8 text-gray-400" />
                      <video className="w-full h-full object-cover absolute inset-0" preload="metadata">
                        <source src={file.url} type={file.file_type} />
                      </video>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Image className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-xs">{file.file_type}</span>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium truncate">{file.original_name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {Math.round((file.file_size || 0) / 1024)}KB
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-3 w-3" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={file.url} download={file.original_name}>
                          <Download className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No media files for this section</p>
            <p className="text-xs">Upload images or videos to get started</p>
          </div>
        )}
      </div>
    );
  };

  const renderServicesSection = () => {
    return (
      <div className="mt-6 space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Service Lines</h4>
        <div className="grid gap-4">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{service.title}</h5>
                <Badge variant="secondary" style={{ backgroundColor: `${service.color}20`, color: service.color }}>
                  {service.icon_name}
                </Badge>
              </div>
              {service.subtitle && (
                <p className="text-sm text-gray-600 mb-1">{service.subtitle}</p>
              )}
              {service.description && (
                <p className="text-sm text-gray-500">{service.description}</p>
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

  // Create a comprehensive list of all sections including those that might not be in the database yet
  const allSections = [
    'hero',
    'services_header', 
    'services',
    'value_prop',
    'about',
    'contact',
    'footer',
    'navigation'
  ];

  const sectionsData = allSections.map(sectionKey => {
    const existing = content.find(c => c.section_key === sectionKey);
    return existing || {
      id: `temp-${sectionKey}`,
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
          <p className="text-gray-600">Manage all your website content, services, and media in one place</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>{syncStatus === 'connected' ? 'Live Sync' : syncStatus === 'syncing' ? 'Syncing' : 'Offline'}</span>
          </Badge>
          <Button variant="outline" onClick={() => window.open(window.location.origin, '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Website
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sectionsData.map((section) => (
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
                    <CardDescription>
                      {section.section_key === 'services' ? 'Service offerings and features' :
                       section.section_key === 'hero' ? 'Main landing section with primary messaging' :
                       'Content section configuration'}
                    </CardDescription>
                  </div>
                </button>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {section.section_key}
                  </Badge>
                  {expandedSections.has(section.section_key) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(section)}
                      disabled={editingSection === section.id}
                    >
                      {editingSection === section.id ? 'Editing...' : 'Edit'}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedSections.has(section.section_key) && (
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

                    <div className="flex items-center gap-4 pt-4 border-t">
                      <Button onClick={handleSave} className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingSection(null)}>
                        Cancel
                      </Button>
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
                {renderMediaSection(section.section_key)}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnifiedContentManager;
