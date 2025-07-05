import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Settings
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
  const { toast } = useToast();

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
      'stats': 7,
      'founder': 8,
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
  };

  const formatSectionName = (key: string) => {
    return key.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6">
            {content.map((section) => (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50">
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
                
                <CardContent className="p-6 space-y-4">
                  {editingSection === section.section_key ? (
                    <div className="grid gap-4">
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