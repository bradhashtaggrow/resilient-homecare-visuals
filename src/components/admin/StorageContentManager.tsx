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
        loadContent(); // Reload content when changes occur
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const getDefaultContent = (sectionKey: string) => {
    const defaults: Record<string, any> = {
      'hero': {
        title: 'Hospital-at-Home Services',
        subtitle: 'Transform Healthcare Delivery',
        description: 'Comprehensive care solutions that extend your hospital\'s reach while improving patient outcomes and reducing costs.',
        button_text: 'Learn More',
        button_url: '#services'
      },
      'service_lines': {
        title: 'Fully Streamlined, Uncompromisingly Simple',
        subtitle: '',
        description: 'Three core service lines designed to extend your hospital\'s reach and improve patient outcomes.',
        services: [
          {
            id: 'outpatient-pt',
            icon: 'Activity',
            title: 'Outpatient PT Anywhere',
            subtitle: 'Home-Based Therapy & Recovery',
            description: 'Hospital-branded physical therapy delivered directly to patients\' homes with full technology integration.',
            benefits: [
              { text: 'Generate new outpatient therapy revenue', icon: 'TrendingUp' },
              { text: 'Reduce costly post-acute placements', icon: 'Shield' },
              { text: 'Improve patient outcomes with early intervention', icon: 'Target' },
              { text: 'Prepare for value-based care programs', icon: 'Award' }
            ],
            color: 'blue',
            patient_image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
          },
          {
            id: 'primary-care',
            icon: 'Heart',
            title: 'Primary Care at Home',
            subtitle: 'Transitional & Rural Care Extension',
            description: 'Physician and advanced practice providers delivering seamless care transitions and rural health services.',
            benefits: [
              { text: 'Extend transitional care management for high-risk patients', icon: 'Users' },
              { text: 'Expand rural health clinic reach into underserved areas', icon: 'MapPin' },
              { text: 'Reduce readmissions with targeted follow-up visits', icon: 'CheckCircle' }
            ],
            color: 'red',
            patient_image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
          },
          {
            id: 'hospital-at-home',
            icon: 'Building2',
            title: 'Acute Hospital-at-Home',
            subtitle: 'CMS-Compliant Inpatient Care at Home',
            description: 'Full implementation support for hospital-level care delivery in the home environment.',
            benefits: [
              { text: 'Complete workflow design & policy development', icon: 'Zap' },
              { text: 'Staff training & education programs', icon: 'Users' },
              { text: 'Medicare waiver submission support', icon: 'Clock' }
            ],
            note: 'CMS waiver extended through September 2025. We help hospitals prepare for future program versions.',
            color: 'cyan',
            patient_image_url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
          }
        ]
      },
      'value_proposition': {
        title: 'Why Choose Our Hospital-at-Home Solutions',
        subtitle: 'Proven Results That Transform Healthcare Delivery',
        description: 'Our comprehensive approach delivers measurable outcomes for hospitals, patients, and communities.',
        propositions: [
          {
            icon: 'TrendingUp',
            title: 'Revenue Growth',
            description: 'Generate new revenue streams while optimizing existing resources'
          },
          {
            icon: 'Users',
            title: 'Patient Satisfaction',
            description: 'Deliver care in the comfort of patients\' homes with better outcomes'
          },
          {
            icon: 'Shield',
            title: 'Risk Reduction',
            description: 'Reduce readmissions and post-acute placement costs'
          }
        ]
      },
      'stats': {
        title: 'Proven Impact Across Healthcare Systems',
        subtitle: 'Real Results from Real Implementations',
        description: 'Our solutions deliver measurable outcomes that transform healthcare delivery and improve patient experiences.',
        stats: [
          { number: '85%', label: 'Patient Satisfaction Rate', description: 'Patients prefer home-based care' },
          { number: '40%', label: 'Cost Reduction', description: 'Average savings vs traditional care' },
          { number: '92%', label: 'Readmission Prevention', description: 'Successful care transitions' },
          { number: '50+', label: 'Healthcare Partners', description: 'Hospitals using our solutions' }
        ]
      },
      'lead_generation': {
        title: 'Ready to Transform Your Healthcare Delivery?',
        subtitle: 'Partner with Us Today',
        description: 'Join leading healthcare systems in delivering exceptional patient care at home. Contact us to learn how we can help extend your hospital\'s reach.',
        form_title: 'Get Started Today',
        form_subtitle: 'Tell us about your needs and we\'ll be in touch within 24 hours.',
        button_text: 'Contact Us Now',
        success_message: 'Thank you for your interest! We\'ll be in touch soon.'
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

  const renderValuePropositionEditor = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleContentUpdate('value_proposition', { ...content, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate('value_proposition', { ...content, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate('value_proposition', { ...content, description: e.target.value })}
          placeholder="Enter section description"
          rows={3}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Propositions</h4>
        {content.propositions?.map((proposition: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Proposition Title</Label>
                <Input
                  value={proposition.title || ''}
                  onChange={(e) => {
                    const updatedPropositions = [...(content.propositions || [])];
                    updatedPropositions[index] = { ...proposition, title: e.target.value };
                    handleContentUpdate('value_proposition', { ...content, propositions: updatedPropositions });
                  }}
                  placeholder="Proposition title"
                />
              </div>
              <div>
                <Label>Proposition Icon</Label>
                <Input
                  value={proposition.icon || ''}
                  onChange={(e) => {
                    const updatedPropositions = [...(content.propositions || [])];
                    updatedPropositions[index] = { ...proposition, icon: e.target.value };
                    handleContentUpdate('value_proposition', { ...content, propositions: updatedPropositions });
                  }}
                  placeholder="Proposition icon"
                />
              </div>
            </div>
            <div>
              <Label>Proposition Description</Label>
              <Textarea
                value={proposition.description || ''}
                onChange={(e) => {
                  const updatedPropositions = [...(content.propositions || [])];
                  updatedPropositions[index] = { ...proposition, description: e.target.value };
                  handleContentUpdate('value_proposition', { ...content, propositions: updatedPropositions });
                }}
                placeholder="Proposition description"
                rows={2}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStatsEditor = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleContentUpdate('stats', { ...content, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate('stats', { ...content, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate('stats', { ...content, description: e.target.value })}
          placeholder="Enter section description"
          rows={3}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Stats</h4>
        {content.stats?.map((stat: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Stat Number</Label>
                <Input
                  value={stat.number || ''}
                  onChange={(e) => {
                    const updatedStats = [...(content.stats || [])];
                    updatedStats[index] = { ...stat, number: e.target.value };
                    handleContentUpdate('stats', { ...content, stats: updatedStats });
                  }}
                  placeholder="Stat number"
                />
              </div>
              <div>
                <Label>Stat Label</Label>
                <Input
                  value={stat.label || ''}
                  onChange={(e) => {
                    const updatedStats = [...(content.stats || [])];
                    updatedStats[index] = { ...stat, label: e.target.value };
                    handleContentUpdate('stats', { ...content, stats: updatedStats });
                  }}
                  placeholder="Stat label"
                />
              </div>
              <div>
                <Label>Stat Description</Label>
                <Input
                  value={stat.description || ''}
                  onChange={(e) => {
                    const updatedStats = [...(content.stats || [])];
                    updatedStats[index] = { ...stat, description: e.target.value };
                    handleContentUpdate('stats', { ...content, stats: updatedStats });
                  }}
                  placeholder="Stat description"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLeadGenEditor = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleContentUpdate('lead_generation', { ...content, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate('lead_generation', { ...content, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate('lead_generation', { ...content, description: e.target.value })}
          placeholder="Enter section description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="form_title">Form Title</Label>
          <Input
            id="form_title"
            value={content.form_title || ''}
            onChange={(e) => handleContentUpdate('lead_generation', { ...content, form_title: e.target.value })}
            placeholder="Enter form title"
          />
        </div>
        <div>
          <Label htmlFor="form_subtitle">Form Subtitle</Label>
          <Input
            id="form_subtitle"
            value={content.form_subtitle || ''}
            onChange={(e) => handleContentUpdate('lead_generation', { ...content, form_subtitle: e.target.value })}
            placeholder="Enter form subtitle"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="success_message">Success Message</Label>
        <Textarea
          id="success_message"
          value={content.success_message || ''}
          onChange={(e) => handleContentUpdate('lead_generation', { ...content, success_message: e.target.value })}
          placeholder="Enter success message"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="button_text">Button Text</Label>
        <Input
          id="button_text"
          value={content.button_text || ''}
          onChange={(e) => handleContentUpdate('lead_generation', { ...content, button_text: e.target.value })}
          placeholder="Enter button text"
        />
      </div>
    </div>
  );

  const renderServiceLinesEditor = (content: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            value={content.title || ''}
            onChange={(e) => handleContentUpdate('service_lines', { ...content, title: e.target.value })}
            placeholder="Enter section title"
          />
        </div>
        <div>
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            value={content.subtitle || ''}
            onChange={(e) => handleContentUpdate('service_lines', { ...content, subtitle: e.target.value })}
            placeholder="Enter section subtitle"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Section Description</Label>
        <Textarea
          id="description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate('service_lines', { ...content, description: e.target.value })}
          placeholder="Enter section description"
          rows={3}
        />
      </div>

      <Separator />
      
      <div className="space-y-8">
        <h4 className="text-lg font-semibold">Services</h4>
        {content.services?.map((service: any, index: number) => (
          <Card key={service.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-md font-semibold">Service {index + 1}: {service.title}</h5>
                <Badge variant="outline">{service.icon}</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Title</Label>
                  <Input
                    value={service.title || ''}
                    onChange={(e) => {
                      const updatedServices = [...(content.services || [])];
                      updatedServices[index] = { ...service, title: e.target.value };
                      handleContentUpdate('service_lines', { ...content, services: updatedServices });
                    }}
                    placeholder="Service title"
                  />
                </div>
                <div>
                  <Label>Service Subtitle</Label>
                  <Input
                    value={service.subtitle || ''}
                    onChange={(e) => {
                      const updatedServices = [...(content.services || [])];
                      updatedServices[index] = { ...service, subtitle: e.target.value };
                      handleContentUpdate('service_lines', { ...content, services: updatedServices });
                    }}
                    placeholder="Service subtitle"
                  />
                </div>
              </div>

              <div>
                <Label>Service Description</Label>
                <Textarea
                  value={service.description || ''}
                  onChange={(e) => {
                    const updatedServices = [...(content.services || [])];
                    updatedServices[index] = { ...service, description: e.target.value };
                    handleContentUpdate('service_lines', { ...content, services: updatedServices });
                  }}
                  placeholder="Service description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Icon Name</Label>
                  <Input
                    value={service.icon || ''}
                    onChange={(e) => {
                      const updatedServices = [...(content.services || [])];
                      updatedServices[index] = { ...service, icon: e.target.value };
                      handleContentUpdate('service_lines', { ...content, services: updatedServices });
                    }}
                    placeholder="Lucide icon name (e.g., Activity)"
                  />
                </div>
                <div>
                  <Label>Patient Image URL</Label>
                  <Input
                    value={service.patient_image_url || ''}
                    onChange={(e) => {
                      const updatedServices = [...(content.services || [])];
                      updatedServices[index] = { ...service, patient_image_url: e.target.value };
                      handleContentUpdate('service_lines', { ...content, services: updatedServices });
                    }}
                    placeholder="Image URL"
                  />
                </div>
              </div>

              {service.note && (
                <div>
                  <Label>Special Note</Label>
                  <Textarea
                    value={service.note || ''}
                    onChange={(e) => {
                      const updatedServices = [...(content.services || [])];
                      updatedServices[index] = { ...service, note: e.target.value };
                      handleContentUpdate('service_lines', { ...content, services: updatedServices });
                    }}
                    placeholder="Special note for this service"
                    rows={2}
                  />
                </div>
              )}

              <div>
                <Label>Benefits</Label>
                <div className="space-y-2 mt-2">
                  {service.benefits?.map((benefit: any, benefitIndex: number) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <Input
                        value={benefit.text || ''}
                        onChange={(e) => {
                          const updatedServices = [...(content.services || [])];
                          const updatedBenefits = [...(service.benefits || [])];
                          updatedBenefits[benefitIndex] = { ...benefit, text: e.target.value };
                          updatedServices[index] = { ...service, benefits: updatedBenefits };
                          handleContentUpdate('service_lines', { ...content, services: updatedServices });
                        }}
                        placeholder="Benefit description"
                        className="flex-1"
                      />
                      <Input
                        value={benefit.icon || ''}
                        onChange={(e) => {
                          const updatedServices = [...(content.services || [])];
                          const updatedBenefits = [...(service.benefits || [])];
                          updatedBenefits[benefitIndex] = { ...benefit, icon: e.target.value };
                          updatedServices[index] = { ...service, benefits: updatedBenefits };
                          handleContentUpdate('service_lines', { ...content, services: updatedServices });
                        }}
                        placeholder="Icon name"
                        className="w-32"
                      />
                    </div>
                  ))}
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
      'hero': 'Hero Section',
      'service_lines': 'Service Lines Section',
      'value_proposition': 'Value Proposition Section',
      'stats': 'Stats Section',
      'lead_generation': 'Lead Generation Section',
      'about': 'About Section',
      'contact': 'Contact Section',
      'footer': 'Footer',
      'navigation': 'Navigation'
    };
    return names[sectionKey] || sectionKey.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getSectionDescription = (sectionKey: string) => {
    const descriptions: Record<string, string> = {
      'hero': 'Main landing section with primary messaging',
      'service_lines': 'Detailed service offerings',
      'value_proposition': 'Key value propositions and benefits',
      'stats': 'Key statistics and impact metrics',
      'lead_generation': 'Lead capture and contact form',
      'about': 'Company information and background',
      'contact': 'Contact information and forms'
    };
    return descriptions[sectionKey] || 'Content section configuration';
  };

  const renderContentEditor = (sectionKey: string, content: any) => {
    switch (sectionKey) {
      case 'service_lines':
        return renderServiceLinesEditor(content);
      case 'value_proposition':
        return renderValuePropositionEditor(content);
      case 'stats':
        return renderStatsEditor(content);
      case 'lead_generation':
        return renderLeadGenEditor(content);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Website Content Management</h2>
          <p className="text-gray-600">Manage and update content sections of your website</p>
        </div>
        <div className="flex items-center space-x-4">
          {getSyncStatusIcon()}
          <Badge variant="outline" className="text-sm">
            {syncStatus === 'connected' ? 'Live Sync' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </Badge>
        </div>
      </div>

      {Object.entries(content).map(([sectionKey, sectionContent]) => (
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

      {Object.keys(content).length === 0 && (
        <div className="text-center py-12">
          <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
          <p className="text-gray-500">Add content to the database to see it here</p>
        </div>
      )}
    </div>
  );
};

export default StorageContentManager;
