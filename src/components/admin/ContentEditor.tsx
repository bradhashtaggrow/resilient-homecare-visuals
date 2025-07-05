
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
import { Save, Upload, Image, Video, Type, Globe, Zap, Eye } from 'lucide-react';

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

interface ContentEditorProps {
  content: WebsiteContent[];
  onContentChange: (content: WebsiteContent[]) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ content, onContentChange }) => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<WebsiteContent>>({});
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Auto-save draft every 30 seconds if there are changes
    const autoSaveInterval = setInterval(() => {
      if (editingSection && formData && Object.keys(formData).length > 1) {
        handleAutoSave();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [editingSection, formData]);

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.id);
    setFormData(section);
  };

  const handleAutoSave = async () => {
    if (!editingSection || !formData) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingSection);

      if (error) throw error;

      // Update local state
      const updatedContent = content.map(item => 
        item.id === editingSection ? { ...item, ...formData } : item
      );
      onContentChange(updatedContent);
      setLastSaved(new Date());

    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleSave = async () => {
    if (!editingSection || !formData) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from('website_content')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingSection);

      if (error) throw error;

      // Update local state
      const updatedContent = content.map(item => 
        item.id === editingSection ? { ...item, ...formData } : item
      );
      onContentChange(updatedContent);

      toast({
        title: "Content updated successfully",
        description: "Changes are now live on the website",
      });

      setEditingSection(null);
      setFormData({});
      setLastSaved(new Date());
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Failed to update content",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const handlePreview = () => {
    // Open the main website in a new tab to preview changes
    window.open(window.location.origin, '_blank');
  };

  const getSectionDisplayName = (sectionKey: string) => {
    const names: Record<string, string> = {
      'hero': 'Hero Section',
      'services_header': 'Services Header',
      'value_prop': 'Value Proposition',
      'about': 'About Section',
      'contact': 'Contact Section',
      'footer': 'Footer',
      'navigation': 'Navigation'
    };
    return names[sectionKey] || sectionKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSectionIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case 'hero': return <Globe className="h-5 w-5" />;
      case 'services_header': return <Type className="h-5 w-5" />;
      default: return <Type className="h-5 w-5" />;
    }
  };

  const getSectionDescription = (sectionKey: string) => {
    const descriptions: Record<string, string> = {
      'hero': 'Main landing section with primary messaging',
      'services_header': 'Introduction to your service offerings',
      'value_prop': 'Key value propositions and benefits',
      'about': 'Company information and background',
      'contact': 'Contact information and forms'
    };
    return descriptions[sectionKey] || 'Content section configuration';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-gray-600">Edit and manage your website content with real-time sync</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Real-time sync active
          </Badge>
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Website
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {content.map((section) => (
          <Card key={section.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSectionIcon(section.section_key)}
                  <div>
                    <CardTitle>{getSectionDisplayName(section.section_key)}</CardTitle>
                    <CardDescription>{getSectionDescription(section.section_key)}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {section.section_key}
                  </Badge>
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(section)}
                    disabled={editingSection === section.id}
                  >
                    {editingSection === section.id ? 'Editing...' : 'Edit Content'}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {editingSection === section.id ? (
                <div className="space-y-6">
                  {/* Text Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="Enter subtitle"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="button_url">Button URL</Label>
                      <Input
                        id="button_url"
                        value={formData.button_url || ''}
                        onChange={(e) => setFormData({ ...formData, button_url: e.target.value })}
                        placeholder="Enter button URL"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Media Content */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Background Media
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="background_image_url">Desktop Background</Label>
                        <Input
                          id="background_image_url"
                          value={formData.background_image_url || ''}
                          onChange={(e) => setFormData({ ...formData, background_image_url: e.target.value })}
                          placeholder="Image URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobile_background_url">Mobile Background</Label>
                        <Input
                          id="mobile_background_url"
                          value={formData.mobile_background_url || ''}
                          onChange={(e) => setFormData({ ...formData, mobile_background_url: e.target.value })}
                          placeholder="Mobile image URL"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="laptop_background_url">Laptop Background</Label>
                        <Input
                          id="laptop_background_url"
                          value={formData.laptop_background_url || ''}
                          onChange={(e) => setFormData({ ...formData, laptop_background_url: e.target.value })}
                          placeholder="Laptop image URL"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="background_video_url" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Background Video URL
                      </Label>
                      <Input
                        id="background_video_url"
                        value={formData.background_video_url || ''}
                        onChange={(e) => setFormData({ ...formData, background_video_url: e.target.value })}
                        placeholder="Video URL"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleCancel} disabled={saving}>
                      Cancel
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-500 ml-auto">
                      <Zap className="h-4 w-4" />
                      Auto-saving every 30 seconds
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                  {section.description && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description:</span>
                      <p className="text-gray-900">{section.description}</p>
                    </div>
                  )}
                  {(section.button_text || section.button_url) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.button_text && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Button Text:</span>
                          <p className="text-gray-900">{section.button_text}</p>
                        </div>
                      )}
                      {section.button_url && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Button URL:</span>
                          <p className="text-gray-900">{section.button_url}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {(section.background_image_url || section.background_video_url) && (
                    <div className="pt-4 border-t">
                      <span className="text-sm font-medium text-gray-500">Media Assets:</span>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        {section.background_image_url && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Image className="h-4 w-4" />
                            Desktop background set
                          </div>
                        )}
                        {section.mobile_background_url && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Image className="h-4 w-4" />
                            Mobile background set
                          </div>
                        )}
                        {section.background_video_url && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Video className="h-4 w-4" />
                            Background video set
                          </div>
                        )}
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
        <Card>
          <CardContent className="py-12 text-center">
            <Type className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content sections found</h3>
            <p className="text-gray-600">Content sections will appear here once they're added to the database</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentEditor;
