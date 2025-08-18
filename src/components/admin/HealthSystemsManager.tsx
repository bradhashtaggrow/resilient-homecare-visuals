import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Save, Video, Image } from 'lucide-react';

interface HealthSystemsItem {
  id: string;
  section_type: string;
  title: string;
  description: string;
  icon_name: string;
  gradient_class: string;
  display_order: number;
  is_active: boolean;
}

interface WebsiteContent {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  background_video_url: string;
  background_image_url: string;
}

const HealthSystemsManager = () => {
  const [heroContent, setHeroContent] = useState<WebsiteContent | null>(null);
  const [sectionContent, setSectionContent] = useState<WebsiteContent[]>([]);
  const [burningPlatformItems, setBurningPlatformItems] = useState<HealthSystemsItem[]>([]);
  const [benefitItems, setBenefitItems] = useState<HealthSystemsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<HealthSystemsItem | null>(null);
  const [editingSection, setEditingSection] = useState<WebsiteContent | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showSectionDialog, setShowSectionDialog] = useState(false);

  const iconOptions = [
    'TrendingUp', 'Building', 'DollarSign', 'Zap', 'CheckCircle', 'Target', 
    'Activity', 'Award', 'BarChart', 'Users', 'Heart', 'Shield'
  ];

  const gradientOptions = [
    'from-blue-500 to-blue-600',
    'from-blue-400 to-blue-500', 
    'from-blue-600 to-blue-700',
    'from-blue-500 to-cyan-500',
    'from-blue-400 to-blue-600'
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      // Load hero content
      const { data: hero } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'health_systems_hero')
        .eq('is_active', true)
        .single();

      if (hero) setHeroContent(hero);

      // Load section content
      const { data: sections } = await supabase
        .from('website_content')
        .select('*')
        .in('section_key', ['health_systems_burning_platform', 'health_systems_benefits', 'health_systems_cta'])
        .eq('is_active', true);

      if (sections) setSectionContent(sections);

      // Load health systems items
      const { data: items } = await supabase
        .from('health_systems_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (items) {
        setBurningPlatformItems(items.filter(item => item.section_type === 'burning_platform'));
        setBenefitItems(items.filter(item => item.section_type === 'benefit'));
      }

    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const saveHeroContent = async () => {
    if (!heroContent) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          ...heroContent,
          section_key: 'health_systems_hero',
          is_active: true
        });

      if (error) throw error;
      toast.success('Hero content saved successfully');
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast.error('Failed to save hero content');
    }
  };

  const saveSection = async () => {
    if (!editingSection) return;

    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          ...editingSection,
          is_active: true
        });

      if (error) throw error;
      toast.success('Section saved successfully');
      setShowSectionDialog(false);
      setEditingSection(null);
      loadContent();
    } catch (error) {
      console.error('Error saving section:', error);
      toast.error('Failed to save section');
    }
  };

  const saveItem = async () => {
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from('health_systems_items')
        .upsert({
          ...editingItem,
          is_active: true
        });

      if (error) throw error;
      toast.success('Item saved successfully');
      setShowItemDialog(false);
      setEditingItem(null);
      loadContent();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save item');
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('health_systems_items')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      toast.success('Item deleted successfully');
      loadContent();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Health Systems Page Management</h1>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="burning-platform">Burning Platform</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="sections">Section Content</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Hero Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {heroContent && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hero-title">Title</Label>
                      <Input
                        id="hero-title"
                        value={heroContent.title || ''}
                        onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                        placeholder="Transform Your Health System"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hero-subtitle">Subtitle</Label>
                      <Input
                        id="hero-subtitle"
                        value={heroContent.subtitle || ''}
                        onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                        placeholder="Health System"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      value={heroContent.description || ''}
                      onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                      placeholder="Partner with us to expand care delivery..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero-video">Background Video URL</Label>
                    <Input
                      id="hero-video"
                      value={heroContent.background_video_url || ''}
                      onChange={(e) => setHeroContent({...heroContent, background_video_url: e.target.value})}
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>

                  <Button onClick={saveHeroContent} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Hero Content
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burning-platform">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Burning Platform Items
                <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingItem({
                        id: '',
                        section_type: 'burning_platform',
                        title: '',
                        description: '',
                        icon_name: 'TrendingUp',
                        gradient_class: 'from-blue-500 to-blue-600',
                        display_order: burningPlatformItems.length + 1,
                        is_active: true
                      });
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Burning Platform Item</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                      <div className="space-y-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Icon</Label>
                            <Select value={editingItem.icon_name} onValueChange={(value) => setEditingItem({...editingItem, icon_name: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {iconOptions.map(icon => (
                                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Gradient</Label>
                            <Select value={editingItem.gradient_class} onValueChange={(value) => setEditingItem({...editingItem, gradient_class: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {gradientOptions.map(gradient => (
                                  <SelectItem key={gradient} value={gradient}>{gradient}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label>Display Order</Label>
                          <Input
                            type="number"
                            value={editingItem.display_order}
                            onChange={(e) => setEditingItem({...editingItem, display_order: parseInt(e.target.value)})}
                          />
                        </div>
                        <Button onClick={saveItem}>Save Item</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {burningPlatformItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{item.icon_name}</Badge>
                        <Badge variant="outline">Order: {item.display_order}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingItem(item);
                          setShowItemDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Benefits Items
                <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
                  <DialogTrigger asChild>
                    <Button onClick={() => {
                      setEditingItem({
                        id: '',
                        section_type: 'benefit',
                        title: '',
                        description: '',
                        icon_name: 'CheckCircle',
                        gradient_class: 'from-blue-400 to-blue-600',
                        display_order: benefitItems.length + 1,
                        is_active: true
                      });
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benefitItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{item.icon_name}</Badge>
                        <Badge variant="outline">Order: {item.display_order}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingItem(item);
                          setShowItemDialog(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Section Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectionContent.map((section) => (
                  <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      <Badge variant="outline">{section.section_key}</Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setEditingSection(section);
                        setShowSectionDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={showSectionDialog} onOpenChange={setShowSectionDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Section Content</DialogTitle>
              </DialogHeader>
              {editingSection && (
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={editingSection.title}
                      onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={editingSection.description}
                      onChange={(e) => setEditingSection({...editingSection, description: e.target.value})}
                    />
                  </div>
                  <Button onClick={saveSection}>Save Section</Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthSystemsManager;