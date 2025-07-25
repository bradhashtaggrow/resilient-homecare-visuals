import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Key, Clock, AlertTriangle, CheckCircle, Users, Eye } from 'lucide-react';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
  };
  sessionTimeout: number;
  loginAttempts: number;
}

interface SecurityPanelProps {
  security: SecuritySettings;
  onSecurityUpdate: (newSecurity: Partial<SecuritySettings>) => void;
}

export const SecurityPanel: React.FC<SecurityPanelProps> = ({ security, onSecurityUpdate }) => {
  const securityFeatures = [
    {
      title: 'Two-Factor Authentication',
      description: 'Require secondary authentication for enhanced security',
      enabled: security.twoFactorEnabled,
      critical: true,
      onToggle: (enabled: boolean) => onSecurityUpdate({ twoFactorEnabled: enabled })
    },
    {
      title: 'Password Requirements',
      description: 'Enforce strong password policies',
      enabled: security.passwordPolicy.requireSpecialChars && security.passwordPolicy.requireNumbers,
      critical: true,
      onToggle: (enabled: boolean) => onSecurityUpdate({
        passwordPolicy: {
          ...security.passwordPolicy,
          requireSpecialChars: enabled,
          requireNumbers: enabled
        }
      })
    }
  ];

  const securityMetrics = [
    {
      title: 'Session Timeout',
      value: `${security.sessionTimeout} min`,
      icon: Clock,
      status: security.sessionTimeout >= 30 ? 'good' : 'warning',
      description: 'Automatic logout after inactivity'
    },
    {
      title: 'Login Attempts',
      value: security.loginAttempts.toString(),
      icon: Lock,
      status: security.loginAttempts <= 5 ? 'good' : 'warning',
      description: 'Failed attempts before lockout'
    },
    {
      title: 'Password Length',
      value: `${security.passwordPolicy.minLength} chars`,
      icon: Key,
      status: security.passwordPolicy.minLength >= 8 ? 'good' : 'critical',
      description: 'Minimum password requirements'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <Eye className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="glass border-0 shadow-glow">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Security Center</CardTitle>
              <p className="text-sm text-muted-foreground">Manage authentication and access controls</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="glass border-0 shadow-glow hover:shadow-primary/25 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    </div>
                    {getStatusIcon(metric.status)}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Security Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0 shadow-glow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Authentication Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="p-4 glass border-0 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">{feature.title}</Label>
                      {feature.critical && (
                        <Badge variant="outline" className="text-xs bg-warning/10 text-warning border-warning/20">
                          Critical
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                  <Switch
                    checked={feature.enabled}
                    onCheckedChange={feature.onToggle}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-glow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Access Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 glass border-0 rounded-xl">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => onSecurityUpdate({ sessionTimeout: parseInt(e.target.value) || 30 })}
                  min={5}
                  max={180}
                />
                <p className="text-xs text-muted-foreground">
                  Users will be logged out after this period of inactivity
                </p>
              </div>
            </div>

            <div className="p-4 glass border-0 rounded-xl">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Maximum Login Attempts</Label>
                <Input
                  type="number"
                  value={security.loginAttempts}
                  onChange={(e) => onSecurityUpdate({ loginAttempts: parseInt(e.target.value) || 5 })}
                  min={3}
                  max={10}
                />
                <p className="text-xs text-muted-foreground">
                  Account locks after this many failed login attempts
                </p>
              </div>
            </div>

            <div className="p-4 glass border-0 rounded-xl">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Minimum Password Length</Label>
                <Input
                  type="number"
                  value={security.passwordPolicy.minLength}
                  onChange={(e) => onSecurityUpdate({
                    passwordPolicy: {
                      ...security.passwordPolicy,
                      minLength: parseInt(e.target.value) || 8
                    }
                  })}
                  min={6}
                  max={32}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum characters required for user passwords
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Recommendations */}
      <Card className="glass border-0 shadow-glow border-primary/20 bg-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Security Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security for admin accounts</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium">Regular Password Updates</p>
                <p className="text-xs text-muted-foreground">Encourage users to update passwords regularly</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium">Monitor Login Activity</p>
                <p className="text-xs text-muted-foreground">Review access logs and suspicious activities</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};