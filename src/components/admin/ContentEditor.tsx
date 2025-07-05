
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Image, Video, Type, Globe } from 'lucide-react';

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
  const { toast } = useToast();

  const handleEdit = (section: WebsiteContent) => {
    setEditingSection(section.id);
    setFormData(section);
  };

  const handleSave = async () => {
    if (!editingSection || !formData) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .update(formData)
        .eq('id', editingSection);

      if (error) throw error;

      // Update local state
      const updatedContent = content.map(item => 
        item.id === editingSection ? { ...item, ...formData } : item
      );
      onContentChange(updatedContent);

      toast({
        title: "Content updated",
        description: "Changes are now live on the website",
      });

      setEditingSection(null);
      setFormData({});
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Failed to update content",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingSection(null);
    setFormData({});
  };

  const getSectionDisplayName = (sectionKey: string) => {
    const names: Record<string, string> = {
      'hero': 'Hero Section',
      'services_header': 'Services Header',
      'value_prop': 'Value Proposition',
      'about': 'About Section',
      'contact': 'Contact Section'
    };
    return names[sectionKey] || sectionKey;
  };

  const getSectionIcon = (sectionKey: string) => {
    switch (sectionKey) {
      case 'hero': return <Globe className="h-5 w-5" />;
      case 'services_header': return <Type className="h-5 w-5" />;
      default: return <Type className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Real-time sync enabled
        </Badge>
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
                    <CardDescription>Section: {section.section_key}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleEdit(section)}
                  disabled={editingSection === section.id}
                >
                  Edit Content
                </Button>
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

                  <div className="flex items-center gap-4">
                    <Button onClick={handleSave} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
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
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentEditor;
