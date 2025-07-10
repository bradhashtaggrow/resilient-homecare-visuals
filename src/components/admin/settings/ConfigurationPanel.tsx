import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Globe, Database, Zap, Mail, Shield } from 'lucide-react';

interface SystemConfiguration {
  siteName: string;
  maintenance: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  emailNotifications: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

interface ConfigurationPanelProps {
  config: SystemConfiguration;
  onConfigUpdate: (newConfig: Partial<SystemConfiguration>) => void;
  onRefreshSystem: () => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ 
  config, 
  onConfigUpdate,
  onRefreshSystem 
}) => {
  const configSections = [
    {
      title: 'General Settings',
      icon: Settings,
      color: 'primary',
      settings: [
        {
          key: 'siteName' as keyof SystemConfiguration,
          label: 'Site Name',
          type: 'text',
          description: 'Display name for the healthcare platform'
        },
        {
          key: 'maintenance' as keyof SystemConfiguration,
          label: 'Maintenance Mode',
          type: 'boolean',
          description: 'Enable to temporarily disable user access'
        }
      ]
    },
    {
      title: 'Performance',
      icon: Zap,
      color: 'chart-2',
      settings: [
        {
          key: 'cacheEnabled' as keyof SystemConfiguration,
          label: 'Enable Caching',
          type: 'boolean',
          description: 'Improve performance with intelligent caching'
        },
        {
          key: 'debugMode' as keyof SystemConfiguration,
          label: 'Debug Mode',
          type: 'boolean',
          description: 'Enable detailed logging for troubleshooting'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Mail,
      color: 'chart-3',
      settings: [
        {
          key: 'emailNotifications' as keyof SystemConfiguration,
          label: 'Email Notifications',
          type: 'boolean',
          description: 'Send email alerts for system events'
        }
      ]
    },
    {
      title: 'Backup & Recovery',
      icon: Database,
      color: 'chart-4',
      settings: [
        {
          key: 'backupFrequency' as keyof SystemConfiguration,
          label: 'Backup Frequency',
          type: 'select',
          description: 'Automated backup schedule',
          options: [
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]
        }
      ]
    }
  ];

  const renderSetting = (setting: any) => {
    const value = config[setting.key];

    switch (setting.type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">{setting.label}</Label>
              <p className="text-xs text-muted-foreground">{setting.description}</p>
            </div>
            <Switch
              checked={value as boolean}
              onCheckedChange={(checked) => onConfigUpdate({ [setting.key]: checked })}
            />
          </div>
        );
      
      case 'text':
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{setting.label}</Label>
            <Input
              value={value as string}
              onChange={(e) => onConfigUpdate({ [setting.key]: e.target.value })}
              placeholder={setting.description}
            />
            <p className="text-xs text-muted-foreground">{setting.description}</p>
          </div>
        );
      
      case 'select':
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{setting.label}</Label>
            <Select
              value={value as string}
              onValueChange={(newValue) => onConfigUpdate({ [setting.key]: newValue })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {setting.options?.map((option: any) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{setting.description}</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status Bar */}
      <Card className="glass border-0 shadow-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">System Status</CardTitle>
                <p className="text-sm text-muted-foreground">Real-time system configuration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {config.maintenance && (
                <Badge variant="destructive" className="animate-pulse">
                  <Shield className="h-3 w-3 mr-1" />
                  Maintenance Mode
                </Badge>
              )}
              <Button onClick={onRefreshSystem} variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-2" />
                Refresh System
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {configSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="glass border-0 shadow-glow h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${section.color}/10`}>
                      <Icon className={`h-5 w-5 text-${section.color}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.settings.map((setting) => (
                    <div key={setting.key} className="p-4 glass border-0 rounded-xl">
                      {renderSetting(setting)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};