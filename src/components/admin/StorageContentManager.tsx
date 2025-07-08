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
import { Save, Upload, Image, Video, Type, Globe, Zap, Eye, Wifi, WifiOff } from 'lucide-react';

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

interface StorageContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const StorageContentManager: React.FC<StorageContentManagerProps> = ({ syncStatus = 'disconnected' }) => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
    setupRealtimeSubscription();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('website_content')
        .select('*');

      if (error) throw error;

      const initialContent: Record<string, any> = {};
      data.forEach(item => {
        initialContent[item.section_key] = item;
      });

      setContent(initialContent);
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

  const saveContent = async (sectionKey: string, updatedContent: any) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          id: content[sectionKey]?.id,
          section_key: sectionKey,
          ...updatedContent,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section_key' });

      if (error) throw error;

      toast({
        title: "Content updated",
        description: `${sectionKey} section has been updated`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error saving content",
        description: "Failed to update website content",
        variant: "destructive"
      });
    }
  };

  const handleContentUpdate = (sectionKey: string, updatedContent: any) => {
    setContent(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...updatedContent
      }
    }));
    saveContent(sectionKey, updatedContent);
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

  const getDefaultContent = (sectionKey: string) => {
    const defaults: Record<string, any> = {
      'clinicians_hero': {
        title: 'Enabling',
        subtitle: 'seamless referrals',
        description: 'Transform healthcare delivery with our comprehensive referral platform designed for clinicians and healthcare agencies.',
        button_text: 'Learn More',
        button_url: '#services'
      },
      'clinicians_services': {
        title: 'Clinicians',
        subtitle: '',
        description: 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
        content_data: {
          tabs: [
            {
              id: 'work-with-hospitals',
              icon_name: 'Building2',
              title: 'Work with leading hospitals',
              subtitle: 'Partnership Excellence',
              description: 'Partner with top healthcare institutions to expand your reach and provide exceptional patient care through our referral network.',
              image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            },
            {
              id: 'patient-referrals',
              icon_name: 'Users',
              title: 'Get access to a consistent stream of patient referrals',
              subtitle: 'Steady Patient Flow',
              description: 'Receive steady patient referrals to scale your billing and services to healthcare providers through our streamlined platform.',
              image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            },
            {
              id: 'care-delivery',
              icon_name: 'Heart',
              title: 'Support care delivery for inpatient at home and outpatient at home services',
              subtitle: 'Comprehensive Care',
              description: 'Comprehensive support for both inpatient and outpatient care services delivered directly in the home environment.',
              image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            },
            {
              id: 'simplified-workflows',
              icon_name: 'Zap',
              title: 'Simplified workflows and credentialing through our platform',
              subtitle: 'Streamlined Operations',
              description: 'Streamline your operations with simplified workflows, credentialing processes, and administrative support through our comprehensive platform.',
              image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            },
            {
              id: 'payment-model',
              icon_name: 'CheckCircle',
              title: 'We pay you per visit so no need to worry about administrative burden',
              subtitle: 'Simple Payment Model',
              description: 'Simple per-visit payment structure that eliminates administrative burden and allows you to focus on delivering exceptional patient care.',
              image_url: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            }
          ]
        }
      },
      'clinicians_footer': {
        title: 'Join 500+ Healthcare Organizations',
        subtitle: 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
        description: '',
        button_text: 'Contact Us',
        button_url: '/contact'
      }
    };
    return defaults[sectionKey] || {};
  };

  const renderBasicEditor = (sectionKey: string, content: any) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{getSectionDisplayName(sectionKey)}</h3>
      <p className="text-sm text-gray-500">{getSectionDescription(sectionKey)}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${sectionKey}-title`}>Title</Label>
          <Input
            type="text"
            id={`${sectionKey}-title`}
            value={content.title || ''}
            onChange={(e) => handleContentUpdate(sectionKey, { ...content, title: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`${sectionKey}-subtitle`}>Subtitle</Label>
          <Input
            type="text"
            id={`${sectionKey}-subtitle`}
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate(sectionKey, { ...content, subtitle: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor={`${sectionKey}-description`}>Description</Label>
        <Textarea
          id={`${sectionKey}-description`}
          value={content.description || ''}
          onChange={(e) => handleContentUpdate(sectionKey, { ...content, description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${sectionKey}-button_text`}>Button Text</Label>
          <Input
            type="text"
            id={`${sectionKey}-button_text`}
            value={content.button_text || ''}
            onChange={(e) => handleContentUpdate(sectionKey, { ...content, button_text: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor={`${sectionKey}-button_url`}>Button URL</Label>
          <Input
            type="text"
            id={`${sectionKey}-button_url`}
            value={content.button_url || ''}
            onChange={(e) => handleContentUpdate(sectionKey, { ...content, button_url: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  const renderCliniciansServicesEditor = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleContentUpdate('clinicians_services', { ...content, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate('clinicians_services', { ...content, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate('clinicians_services', { ...content, description: e.target.value })}
          placeholder="Enter section description"
          rows={3}
        />
      </div>

      <Separator />
      
      <div className="space-y-8">
        <h4 className="text-lg font-semibold">Service Tabs</h4>
        {content.content_data?.tabs?.map((tab: any, index: number) => (
          <Card key={tab.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-md font-semibold">Tab {index + 1}: {tab.title}</h5>
                <Badge variant="outline">{tab.icon_name}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tab Title</Label>
                  <Input
                    value={tab.title || ''}
                    onChange={(e) => {
                      const updatedTabs = [...(content.content_data?.tabs || [])];
                      updatedTabs[index] = { ...tab, title: e.target.value };
                      const updatedContentData = { ...content.content_data, tabs: updatedTabs };
                      handleContentUpdate('clinicians_services', { ...content, content_data: updatedContentData });
                    }}
                    placeholder="Tab title"
                  />
                </div>
                <div>
                  <Label>Tab Subtitle</Label>
                  <Input
                    value={tab.subtitle || ''}
                    onChange={(e) => {
                      const updatedTabs = [...(content.content_data?.tabs || [])];
                      updatedTabs[index] = { ...tab, subtitle: e.target.value };
                      const updatedContentData = { ...content.content_data, tabs: updatedTabs };
                      handleContentUpdate('clinicians_services', { ...content, content_data: updatedContentData });
                    }}
                    placeholder="Tab subtitle"
                  />
                </div>
              </div>

              <div>
                <Label>Tab Description</Label>
                <Textarea
                  value={tab.description || ''}
                  onChange={(e) => {
                    const updatedTabs = [...(content.content_data?.tabs || [])];
                    updatedTabs[index] = { ...tab, description: e.target.value };
                    const updatedContentData = { ...content.content_data, tabs: updatedTabs };
                    handleContentUpdate('clinicians_services', { ...content, content_data: updatedContentData });
                  }}
                  placeholder="Tab description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Icon Name</Label>
                  <Input
                    value={tab.icon_name || ''}
                    onChange={(e) => {
                      const updatedTabs = [...(content.content_data?.tabs || [])];
                      updatedTabs[index] = { ...tab, icon_name: e.target.value };
                      const updatedContentData = { ...content.content_data, tabs: updatedTabs };
                      handleContentUpdate('clinicians_services', { ...content, content_data: updatedContentData });
                    }}
                    placeholder="Lucide icon name (e.g., Building2)"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={tab.image_url || ''}
                    onChange={(e) => {
                      const updatedTabs = [...(content.content_data?.tabs || [])];
                      updatedTabs[index] = { ...tab, image_url: e.target.value };
                      const updatedContentData = { ...content.content_data, tabs: updatedTabs };
                      handleContentUpdate('clinicians_services', { ...content, content_data: updatedContentData });
                    }}
                    placeholder="Image URL"
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

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
      'clinicians_hero': 'Clinicians Hero Section',
      'clinicians_services': 'Clinicians Services Section',
      'clinicians_footer': 'Clinicians Footer Section'
    };
    return names[sectionKey] || sectionKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSectionDescription = (sectionKey: string) => {
    const descriptions: Record<string, string> = {
      'clinicians_hero': 'Main hero section for clinicians page',
      'clinicians_services': 'Services tabs section for clinicians',
      'clinicians_footer': 'Footer section for clinicians page'
    };
    return descriptions[sectionKey] || 'Content section configuration';
  };

  const renderContentEditor = (sectionKey: string, content: any) => {
    switch (sectionKey) {
      case 'clinicians_services':
        return renderCliniciansServicesEditor(content);
      default:
        return renderBasicEditor(sectionKey, content);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filter to show only clinicians sections
  const cliniciansContent = Object.entries(content).filter(([key]) => 
    key.startsWith('clinicians_')
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Clinicians Page Content</h2>
          <p className="text-gray-600">Manage content for the clinicians page</p>
        </div>
        <div className="flex items-center space-x-4">
          {getSyncStatusIcon()}
          <Badge variant="outline" className="text-sm">
            {syncStatus === 'connected' ? 'Live Sync' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </Badge>
        </div>
      </div>

      {cliniciansContent.map(([sectionKey, sectionContent]) => (
        <Card key={sectionKey}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getSectionDisplayName(sectionKey)}
            </CardTitle>
            <CardDescription>{getSectionDescription(sectionKey)}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderContentEditor(sectionKey, sectionContent)}
          </CardContent>
        </Card>
      ))}

      {cliniciansContent.length === 0 && (
        <div className="text-center py-12">
          <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clinicians content available</h3>
          <p className="text-gray-500">Add clinicians content to the database to see it here</p>
        </div>
      )}
    </div>
  );
};

export default StorageContentManager;
