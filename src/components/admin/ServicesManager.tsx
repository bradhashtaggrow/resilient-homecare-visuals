
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash2, Edit3, Activity, Heart, Building2, User, Stethoscope } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: string;
  icon_name: string;
  patient_image_url?: string;
  display_order: number;
}

interface ServiceBenefit {
  id: string;
  service_id: string;
  benefit_text: string;
  icon_name: string;
  display_order: number;
}

interface ServicesManagerProps {
  services: Service[];
  onServicesChange: (services: Service[]) => void;
}

const iconMap = {
  Activity: Activity,
  Heart: Heart,
  Building2: Building2,
  User: User,
  Stethoscope: Stethoscope,
};

const ServicesManager: React.FC<ServicesManagerProps> = ({ services, onServicesChange }) => {
  const [editingService, setEditingService] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});
  const [benefits, setBenefits] = useState<ServiceBenefit[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBenefits();
  }, []);

  const loadBenefits = async () => {
    try {
      const { data, error } = await supabase
        .from('service_benefits')
        .select('*')
        .order('service_id, display_order');

      if (error) throw error;
      if (data) setBenefits(data);
    } catch (error) {
      console.error('Error loading benefits:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service.id);
    setFormData(service);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingService('new');
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      color: 'blue',
      icon_name: 'Activity',
      display_order: services.length + 1
    });
  };

  const handleSave = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      if (isCreating) {
        const { data, error } = await supabase
          .from('services')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          onServicesChange([...services, data]);
        }
      } else {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService);

        if (error) throw error;

        const updatedServices = services.map(service => 
          service.id === editingService ? { ...service, ...formData } : service
        );
        onServicesChange(updatedServices);
      }

      toast({
        title: "Service saved",
        description: "Changes are now live on the website",
      });

      setEditingService(null);
      setFormData({});
      setIsCreating(false);
    } catch (error) {
      toast({
        title: "Error saving service",
        description: "Failed to save service",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      const updatedServices = services.filter(service => service.id !== serviceId);
      onServicesChange(updatedServices);

      toast({
        title: "Service deleted",
        description: "Service has been removed from the website",
      });
    } catch (error) {
      toast({
        title: "Error deleting service",
        description: "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    setFormData({});
    setIsCreating(false);
  };

  const getServiceBenefits = (serviceId: string) => {
    return benefits.filter(benefit => benefit.service_id === serviceId);
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Activity;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-6">
        {isCreating && editingService === 'new' && (
          <Card className="border-dashed border-2 border-blue-300">
            <CardHeader>
              <CardTitle>Create New Service</CardTitle>
              <CardDescription>Add a new service to your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter service title"
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
                  placeholder="Enter service description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="color">Color Theme</Label>
                  <Select
                    value={formData.color || 'blue'}
                    onValueChange={(value) => setFormData({ ...formData, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="cyan">Cyan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon</Label>
                  <Select
                    value={formData.icon_name || 'Activity'}
                    onValueChange={(value) => setFormData({ ...formData, icon_name: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activity">Activity</SelectItem>
                      <SelectItem value="Heart">Heart</SelectItem>
                      <SelectItem value="Building2">Building</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Stethoscope">Stethoscope</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="display_order">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order || 1}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient_image_url">Patient Image URL</Label>
                <Input
                  id="patient_image_url"
                  value={formData.patient_image_url || ''}
                  onChange={(e) => setFormData({ ...formData, patient_image_url: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="flex items-center gap-4">
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Create Service
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {services.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${service.color}-100`}>
                    {renderIcon(service.icon_name)}
                  </div>
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.subtitle}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Order: {service.display_order}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                    disabled={editingService === service.id}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {editingService === service.id ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Service Title</Label>
                      <Input
                        id="title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={formData.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Color Theme</Label>
                      <Select
                        value={formData.color || service.color}
                        onValueChange={(value) => setFormData({ ...formData, color: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue">Blue</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="purple">Purple</SelectItem>
                          <SelectItem value="cyan">Cyan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Select
                        value={formData.icon_name || service.icon_name}
                        onValueChange={(value) => setFormData({ ...formData, icon_name: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activity">Activity</SelectItem>
                          <SelectItem value="Heart">Heart</SelectItem>
                          <SelectItem value="Building2">Building</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Stethoscope">Stethoscope</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Display Order</Label>
                      <Input
                        type="number"
                        value={formData.display_order || service.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Patient Image URL</Label>
                    <Input
                      value={formData.patient_image_url || ''}
                      onChange={(e) => setFormData({ ...formData, patient_image_url: e.target.value })}
                    />
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
                  <p className="text-gray-700">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Color:</span> {service.color}
                    </div>
                    <div>
                      <span className="font-medium">Icon:</span> {service.icon_name}
                    </div>
                  </div>

                  {service.patient_image_url && (
                    <div className="mt-4">
                      <img 
                        src={service.patient_image_url} 
                        alt={service.title}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <span className="font-medium text-sm">Benefits:</span>
                    <div className="space-y-1">
                      {getServiceBenefits(service.id).map((benefit) => (
                        <div key={benefit.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {benefit.benefit_text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
