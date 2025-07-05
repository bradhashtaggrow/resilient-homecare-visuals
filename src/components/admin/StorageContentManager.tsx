
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
  Play,
  Navigation,
  Users,
  Mail,
  Info,
  Trash2,
  Plus,
  Link,
  Zap,
  FileText
} from 'lucide-react';

interface StorageFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: {
    eTag: string;
    size: number;
    mimetype: string;
    cacheControl: string;
    lastModified: string;
    contentLength: number;
    httpStatusCode: number;
  };
}

interface ContentData {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_video_url?: string;
  background_image_url?: string;
}

interface StorageContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const StorageContentManager: React.FC<StorageContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [storageFiles, setStorageFiles] = useState<StorageFile[]>([]);
  const [contentData, setContentData] = useState<Record<string, ContentData>>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero']));
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentData>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const { toast } = useToast();

  const websiteSections = [
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
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      setLoading(true);
      
      // Load all files from the media storage bucket
      const { data: files, error } = await supabase.storage
        .from('media')
        .list('website-content', {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;

      setStorageFiles(files || []);

      // Load content configuration files
      await loadContentConfigurations();
      
    } catch (error) {
      console.error('Error loading storage data:', error);
      toast({
        title: "Error loading content",
        description: "Failed to load website content from storage",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadContentConfigurations = async () => {
    const configs: Record<string, ContentData> = {};
    
    for (const section of websiteSections) {
      try {
        const { data, error } = await supabase.storage
          .from('media')
          .download(`website-content/${section}-config.json`);

        if (data && !error) {
          const text = await data.text();
          configs[section] = JSON.parse(text);
        } else {
          // Create default config if it doesn't exist
          configs[section] = getDefaultSectionConfig(section);
        }
      } catch (error) {
        console.log(`No config found for ${section}, using defaults`);
        configs[section] = getDefaultSectionConfig(section);
      }
    }
    
    setContentData(configs);
  };

  const getDefaultSectionConfig = (sectionKey: string): ContentData => {
    const defaults: Record<string, ContentData> = {
      hero: {
        title: 'The Future of Healthcare',
        description: 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
        button_text: 'Request Demo',
        button_url: '#contact',
        background_video_url: 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
      },
      services_header: {
        title: 'Our Healthcare Services',
        subtitle: 'Comprehensive Care Solutions',
        description: 'Delivering exceptional healthcare services with cutting-edge technology and compassionate care.'
      }
    };
    
    return defaults[sectionKey] || {
      title: `${getSectionDisplayName(sectionKey)} Title`,
      subtitle: `${getSectionDisplayName(sectionKey)} Subtitle`,
      description: `${getSectionDisplayName(sectionKey)} description content.`,
      button_text: 'Learn More',
      button_url: '#'
    };
  };

  const saveContentConfiguration = async (sectionKey: string, data: ContentData) => {
    try {
      const configBlob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });

      const { error } = await supabase.storage
        .from('media')
        .upload(`website-content/${sectionKey}-config.json`, configBlob, {
          upsert: true
        });

      if (error) throw error;

      // Update local state
      setContentData(prev => ({
        ...prev,
        [sectionKey]: data
      }));

      setLastUpdate(new Date());
      
      toast({
        title: "Configuration saved",
        description: `${getSectionDisplayName(sectionKey)} settings saved to storage`,
      });

    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Save failed",
        description: "Failed to save configuration",
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
      const fileName = `${sectionKey}-${fileType}-${Date.now()}.${fileExt}`;
      const filePath = `website-content/${fileName}`;

      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Auto-assign to section configuration
      const currentConfig = contentData[sectionKey] || {};
      const updateField = fileType === 'video' ? 'background_video_url' : 'background_image_url';
      const updatedConfig = {
        ...currentConfig,
        [updateField]: publicUrl
      };

      await saveContentConfiguration(sectionKey, updatedConfig);

      toast({
        title: "File uploaded successfully",
        description: `${file.name} uploaded and assigned to ${getSectionDisplayName(sectionKey)}`,
        duration: 3000,
      });

      event.target.value = '';
      loadStorageData();
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

  const handleDeleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('media')
        .remove([`website-content/${fileName}`]);

      if (error) throw error;

      toast({
        title: "File deleted",
        description: "File has been removed from storage",
      });

      loadStorageData();
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "Failed to delete file",
        variant: "destructive"
      });
    }
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

  const handleEdit = (sectionKey: string) => {
    setEditingSection(sectionKey);
    setFormData(contentData[sectionKey] || {});
  };

  const handleSave = async () => {
    if (!editingSection) return;

    await saveContentConfiguration(editingSection, formData);
    setEditingSection(null);
    setFormData({});
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
    return descriptions[sectionKey] || 'Website section stored in file-based configuration';
  };

  const getMediaForSection = (sectionKey: string) => {
    return storageFiles.filter(file => 
      file.name.toLowerCase().includes(sectionKey.toLowerCase())
    );
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const renderMediaDisplay = (sectionKey: string) => {
    const sectionMedia = getMediaForSection(sectionKey);
    const sectionConfig = contentData[sectionKey] || {};
    
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Storage Files & Assets</h4>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="file"
                id={`image-upload-${sectionKey}`}
                className="hidden"
                onChange={(e) => handleFileUpload(e, sectionKey, 'image')}
                accept="image/*"
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                disabled={uploading === `${sectionKey}-image`}
              >
                <label htmlFor={`image-upload-${sectionKey}`} className="cursor-pointer">
                  <Image className="h-3 w-3 mr-2" />
                  {uploading === `${sectionKey}-image` ? 'Uploading...' : 'Add Image'}
                </label>
              </Button>
            </div>
            <div className="relative">
              <input
                type="file"
                id={`video-upload-${sectionKey}`}
                className="hidden"
                onChange={(e) => handleFileUpload(e, sectionKey, 'video')}
                accept="video/*"
              />
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                disabled={uploading === `${sectionKey}-video`}
              >
                <label htmlFor={`video-upload-${sectionKey}`} className="cursor-pointer">
                  <Video className="h-3 w-3 mr-2" />
                  {uploading === `${sectionKey}-video` ? 'Uploading...' : 'Add Video'}
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Current Background Display */}
        {(sectionConfig.background_image_url || sectionConfig.background_video_url) && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-medium text-gray-600">Current Background (Live on Website)</h5>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                <Zap className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="relative w-full h-32 rounded-lg overflow-hidden border">
              {sectionConfig.background_video_url ? (
                <div className="relative w-full h-full">
                  <video 
                    src={sectionConfig.background_video_url} 
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-8 w-8 text-white mx-auto mb-1" />
                      <span className="text-white text-sm font-medium">Background Video</span>
                    </div>
                  </div>
                </div>
              ) : sectionConfig.background_image_url ? (
                <img
                  src={sectionConfig.background_image_url}
                  alt={`${sectionKey} background`}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </div>
        )}

        {/* Storage Files for this Section */}
        {sectionMedia.length > 0 ? (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-2">Uploaded Storage Files ({sectionMedia.length})</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sectionMedia.map((file) => (
                <div key={file.name} className="relative group border rounded-lg overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {file.metadata.mimetype.startsWith('image/') ? (
                      <img
                        src={`${supabase.storage.from('media').getPublicUrl(`website-content/${file.name}`).data.publicUrl}`}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.metadata.mimetype.startsWith('video/') ? (
                      <div className="relative w-full h-full bg-gray-200 flex items-center justify-center">
                        <Play className="h-6 w-6 text-gray-400 absolute z-10" />
                        <video className="w-full h-full object-cover" preload="metadata">
                          <source src={`${supabase.storage.from('media').getPublicUrl(`website-content/${file.name}`).data.publicUrl}`} type={file.metadata.mimetype} />
                        </video>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <FileText className="h-4 w-4 mx-auto mb-1" />
                        <span className="text-xs">{file.metadata.mimetype}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center space-x-2">
                      <Button variant="secondary" size="sm" asChild>
                        <a href={`${supabase.storage.from('media').getPublicUrl(`website-content/${file.name}`).data.publicUrl}`} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-3 w-3" />
                        </a>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteFile(file.name)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 bg-white">
                    <p className="text-xs font-medium truncate" title={file.name}>{file.name}</p>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.metadata.size)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h5 className="text-xs font-medium text-gray-600 mb-2">Uploaded Storage Files</h5>
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <Image className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No storage files for this section</p>
              <p className="text-xs">Upload images or videos to manage them here</p>
            </div>
          </div>
        )}
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Storage-Based Content Management</h2>
          <p className="text-gray-600">File-based website content management using Supabase Storage</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className={`flex items-center gap-2 ${
            syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
            syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            {getSyncStatusIcon()}
            <span>Storage Sync {syncStatus === 'connected' ? 'Active' : syncStatus === 'syncing' ? 'Processing' : 'Offline'}</span>
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
        {websiteSections.map((sectionKey) => {
          const sectionData = contentData[sectionKey] || {};
          
          return (
            <Card key={sectionKey} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="flex items-center gap-3 text-left flex-1"
                  >
                    {expandedSections.has(sectionKey) ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                    {getSectionIcon(sectionKey)}
                    <div>
                      <CardTitle className="text-lg">{getSectionDisplayName(sectionKey)}</CardTitle>
                      <CardDescription>{getSectionDescription(sectionKey)}</CardDescription>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      File-Based
                    </Badge>
                    {expandedSections.has(sectionKey) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(sectionKey)}
                        disabled={editingSection === sectionKey}
                      >
                        {editingSection === sectionKey ? 'Editing...' : 'Edit Content'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              {expandedSections.has(sectionKey) && (
                <CardContent className="pt-0">
                  {editingSection === sectionKey ? (
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
                          Save to Storage
                        </Button>
                        <Button variant="outline" onClick={() => setEditingSection(null)}>
                          Cancel
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
                          <Zap className="h-4 w-4" />
                          File-based storage
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sectionData.title && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Title:</span>
                          <p className="text-gray-900">{sectionData.title}</p>
                        </div>
                      )}
                      {sectionData.subtitle && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Subtitle:</span>
                          <p className="text-gray-900">{sectionData.subtitle}</p>
                        </div>
                      )}
                      {sectionData.description && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Description:</span>
                          <p className="text-gray-900 text-sm">{sectionData.description}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Media section */}
                  {renderMediaDisplay(sectionKey)}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StorageContentManager;
