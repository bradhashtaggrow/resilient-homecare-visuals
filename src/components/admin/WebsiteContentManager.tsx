import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Navigation,
  Users,
  Mail,
  Info,
  Trash2,
  Plus,
  Link,
  Zap,
  Award,
  Heart,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Users2,
  Building,
  Stethoscope,
  Home,
  Calendar
} from 'lucide-react';
import MediaLibrary from './MediaLibrary';

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
  content_data?: any;
}

interface WebsiteContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const WebsiteContentManager: React.FC<WebsiteContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [content, setContent] = useState<WebsiteContent[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['hero']));
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<WebsiteContent>>({});
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
    loadContent();
    setupRealtimeSubscriptions();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      const { data: contentData, error: contentError } = await supabase
        .from('website_content')
        .select('*')
        .order('section_key');

      if (contentError) throw contentError;

      setContent(contentData || []);
      
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
      .channel('website-content-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website_content' }, (payload) => {
        console.log('Real-time content update:', payload);
        setLastUpdate(new Date());
        loadContent();
        
        toast({
          title: "Content updated",
          description: "Website content updated in real-time",
          duration: 2000,
        });
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
    setEditingSection(section.section_key);
    setEditForm(section);
  };

  const handleSave = async () => {
    if (!editingSection || !editForm) return;

    try {
      console.log('Saving content:', editForm);
      
      const { error } = await supabase
        .from('website_content')
        .update({ ...editForm, updated_at: new Date().toISOString() })
        .eq('section_key', editingSection);

      if (error) throw error;

      toast({
        title: "Content updated successfully",
        description: "Changes are now live on the website",
        duration: 3000,
      });

      setEditingSection(null);
      setEditForm({});
      setLastUpdate(new Date());
      loadContent();
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
      const insertData: any = {
        section_key: sectionKey,
        title: `${getSectionDisplayName(sectionKey)} Title`,
        subtitle: `${getSectionDisplayName(sectionKey)} Subtitle`,
        description: `${getSectionDisplayName(sectionKey)} description content.`,
        button_text: 'Learn More',
        button_url: '#',
        content_data: {}
      };

      // Special case for hero section
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

      loadContent();
    } catch (error) {
      console.error('Error creating section:', error);
      toast({
        title: "Error creating section",
        description: "Failed to create section",
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

      // Auto-assign to section if it's a background or founder image
      const section = content.find(c => c.section_key === sectionKey);
      if (section) {
        let updateData: any = { updated_at: new Date().toISOString() };
        
        if (sectionKey === 'founder') {
          // For founder section, store image in content_data
          updateData.content_data = {
            ...section.content_data,
            founder_image: publicUrl
          };
        } else {
          // For other sections, use background fields
          const updateField = fileType === 'video' ? 'background_video_url' : 'background_image_url';
          updateData[updateField] = publicUrl;
        }
        
        await supabase
          .from('website_content')
          .update(updateData)
          .eq('id', section.id);
      }

      toast({
        title: "File uploaded successfully",
        description: `${file.name} uploaded and assigned to ${getSectionDisplayName(sectionKey)}`,
        duration: 3000,
      });

      event.target.value = '';
      loadContent();
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

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Award': <Award className="h-4 w-4 text-blue-600" />,
      'Heart': <Heart className="h-4 w-4 text-red-600" />,
      'Target': <Target className="h-4 w-4 text-green-600" />,
      'TrendingUp': <TrendingUp className="h-4 w-4 text-blue-600" />,
      'Clock': <Clock className="h-4 w-4 text-orange-600" />,
      'CheckCircle': <CheckCircle className="h-4 w-4 text-green-600" />,
      'Star': <Star className="h-4 w-4 text-yellow-600" />,
      'Users2': <Users2 className="h-4 w-4 text-purple-600" />,
      'Building': <Building className="h-4 w-4 text-gray-600" />,
      'Stethoscope': <Stethoscope className="h-4 w-4 text-blue-600" />,
      'Home': <Home className="h-4 w-4 text-green-600" />,
      'Calendar': <Calendar className="h-4 w-4 text-indigo-600" />
    };
    return iconMap[iconName] || <Activity className="h-4 w-4 text-gray-600" />;
  };

  const renderStatsEditor = (section: WebsiteContent) => {
    const stats = (editForm.content_data as any)?.stats || [];
    
    const updateStat = (index: number, field: string, value: string) => {
      const updatedStats = [...stats];
      updatedStats[index] = { ...updatedStats[index], [field]: value };
      setEditForm(prev => ({
        ...prev,
        content_data: {
          ...(prev.content_data || {}),
          stats: updatedStats
        }
      }));
    };

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Statistics Details</h4>
        {stats.map((stat: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-gray-900">Stat {index + 1}: {stat.label}</h5>
              <Badge variant="outline">{stat.value}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`stat-${index}-label`}>Label</Label>
                <Input
                  id={`stat-${index}-label`}
                  value={stat.label || ''}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="Stat label"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`stat-${index}-value`}>Value</Label>
                <Input
                  id={`stat-${index}-value`}
                  value={stat.value || ''}
                  onChange={(e) => updateStat(index, 'value', e.target.value)}
                  placeholder="Stat value"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`stat-${index}-description`}>Description</Label>
              <Textarea
                id={`stat-${index}-description`}
                value={stat.description || ''}
                onChange={(e) => updateStat(index, 'description', e.target.value)}
                placeholder="Detailed description of this statistic"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`stat-${index}-source`}>Source</Label>
              <Input
                id={`stat-${index}-source`}
                value={stat.source || ''}
                onChange={(e) => updateStat(index, 'source', e.target.value)}
                placeholder="Source of this statistic"
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderStatsDisplay = (section: WebsiteContent) => {
    const stats = (section.content_data as any)?.stats || [];
    
    if (stats.length === 0) {
      return <p className="text-gray-500 text-sm">No detailed statistics available</p>;
    }

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Detailed Statistics ({stats.length})</h4>
        <div className="grid gap-4">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-gray-900">{stat.label}</h5>
                <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{stat.description}</p>
              <p className="text-xs text-gray-500 font-medium">Source: {stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFounderEditor = (section: WebsiteContent) => {
    const founderData = editForm.content_data || {};
    
    const updateFounderData = (field: string, value: any) => {
      setEditForm(prev => ({
        ...prev,
        content_data: {
          ...(prev.content_data || {}),
          [field]: value
        }
      }));
    };

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Founder Details</h4>
        
        <div className="space-y-2">
          <Label htmlFor="founder-quote">Quote</Label>
          <Textarea
            id="founder-quote"
            value={founderData.quote || ''}
            onChange={(e) => updateFounderData('quote', e.target.value)}
            placeholder="Founder's inspirational quote"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founder-story">Story</Label>
          <Textarea
            id="founder-story"
            value={founderData.story?.[0] || ''}
            onChange={(e) => updateFounderData('story', [e.target.value])}
            placeholder="Founder's background story"
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="founder-closing">Closing Statement</Label>
          <Textarea
            id="founder-closing"
            value={founderData.closing || ''}
            onChange={(e) => updateFounderData('closing', e.target.value)}
            placeholder="Closing statement from founder"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <h5 className="font-medium text-gray-900">Achievements</h5>
          {(founderData.achievements || []).map((achievement: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-3 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={achievement.title || ''}
                    onChange={(e) => {
                      const updatedAchievements = [...(founderData.achievements || [])];
                      updatedAchievements[index] = { ...achievement, title: e.target.value };
                      updateFounderData('achievements', updatedAchievements);
                    }}
                    placeholder="Achievement title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtitle</Label>
                  <Input
                    value={achievement.subtitle || ''}
                    onChange={(e) => {
                      const updatedAchievements = [...(founderData.achievements || [])];
                      updatedAchievements[index] = { ...achievement, subtitle: e.target.value };
                      updateFounderData('achievements', updatedAchievements);
                    }}
                    placeholder="Achievement subtitle"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFounderDisplay = (section: WebsiteContent) => {
    const founderData = section.content_data || {};
    
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Founder Information</h4>
        
        {founderData.founder_image && (
          <div>
            <span className="text-sm font-medium text-gray-500">Founder Image:</span>
            <img
              src={founderData.founder_image}
              alt="Founder"
              className="w-full h-48 object-contain rounded border bg-gray-100 mt-2"
            />
          </div>
        )}
        
        {founderData.quote && (
          <div>
            <span className="text-sm font-medium text-gray-500">Quote:</span>
            <p className="text-gray-900 italic mt-1">"{founderData.quote}"</p>
          </div>
        )}
        
        {founderData.story?.[0] && (
          <div>
            <span className="text-sm font-medium text-gray-500">Story:</span>
            <p className="text-gray-900 mt-1 text-sm leading-relaxed">{founderData.story[0]}</p>
          </div>
        )}
        
        {founderData.achievements && (
          <div>
            <span className="text-sm font-medium text-gray-500">Achievements:</span>
            <div className="grid gap-2 mt-2">
              {founderData.achievements.map((achievement: any, index: number) => (
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
        
        {founderData.closing && (
          <div>
            <span className="text-sm font-medium text-gray-500">Closing:</span>
            <p className="text-gray-900 font-medium">{founderData.closing}</p>
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
      button_url: '',
      content_data: {}
    } as WebsiteContent;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Content Management</h2>
          <p className="text-gray-600">Complete website content control with real-time sync</p>
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

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Website Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
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
                                disabled={editingSection === section.section_key}
                              >
                                {editingSection === section.section_key ? 'Editing...' : 'Edit Content'}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  {expandedSections.has(section.section_key) && !isPlaceholder && (
                    <CardContent className="pt-0">
                      {editingSection === section.section_key ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="title">Title</Label>
                              <Input
                                id="title"
                                value={editForm.title || ''}
                                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter title"
                              />
                            </div>
                            {section.section_key !== 'stats' && (
                              <div className="space-y-2">
                                <Label htmlFor="subtitle">Subtitle</Label>
                                <Input
                                  id="subtitle"
                                  value={editForm.subtitle || ''}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, subtitle: e.target.value }))}
                                  placeholder="Enter subtitle"
                                />
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={editForm.description || ''}
                              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Enter description"
                              rows={4}
                            />
                          </div>

                          {!['stats', 'founder'].includes(section.section_key) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="button_text">Button Text</Label>
                                <Input
                                  id="button_text"
                                  value={editForm.button_text || ''}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, button_text: e.target.value }))}
                                  placeholder="Enter button text"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="button_url">Button URL</Label>
                                <Input
                                  id="button_url"
                                  value={editForm.button_url || ''}
                                  onChange={(e) => setEditForm(prev => ({ ...prev, button_url: e.target.value }))}
                                  placeholder="Enter button URL"
                                />
                              </div>
                            </div>
                          )}

                          {/* Special section editors */}
                          {section.section_key === 'stats' && renderStatsEditor(section)}
                          {section.section_key === 'founder' && renderFounderEditor(section)}

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
                          {section.subtitle && section.section_key !== 'stats' && (
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

                          {/* Special section displays */}
                          {section.section_key === 'stats' && renderStatsDisplay(section)}
                          {section.section_key === 'founder' && renderFounderDisplay(section)}
                        </div>
                      )}

                      {/* File upload section for founder */}
                      {section.section_key === 'founder' && (
                        <div className="mt-6 pt-4 border-t">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium text-gray-700">Founder Image</h4>
                            <div className="relative">
                              <input
                                type="file"
                                id={`founder-image-upload`}
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, 'founder', 'image')}
                                accept="image/*"
                              />
                              <Button 
                                variant="outline" 
                                size="sm" 
                                asChild 
                                disabled={uploading === 'founder-image'}
                              >
                                <label htmlFor="founder-image-upload" className="cursor-pointer">
                                  <Image className="h-3 w-3 mr-2" />
                                  {uploading === 'founder-image' ? 'Uploading...' : 'Upload Image'}
                                </label>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
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
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary syncStatus={syncStatus} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteContentManager;