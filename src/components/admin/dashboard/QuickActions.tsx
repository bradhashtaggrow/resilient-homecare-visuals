import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Eye, 
  Plus, 
  Settings,
  RefreshCw
} from 'lucide-react';

interface QuickActionsProps {
  onSectionChange: (section: string) => void;
  onRefresh: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSectionChange, onRefresh }) => {
  const actions = [
    {
      icon: FileText,
      title: 'Manage Content',
      description: 'Edit website sections and pages',
      action: () => onSectionChange('content'),
      color: 'primary'
    },
    {
      icon: Users,
      title: 'View Leads',
      description: 'Manage customer inquiries',
      action: () => onSectionChange('leads'),
      color: 'chart-1'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'View performance metrics',
      action: () => onSectionChange('analytics'),
      color: 'chart-2'
    },
    {
      icon: Eye,
      title: 'Preview Site',
      description: 'See live website changes',
      action: () => onSectionChange('preview'),
      color: 'success'
    }
  ];

  return (
    <Card className="glass border-0 shadow-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <LayoutDashboard className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.action}
              className="w-full glass border-0 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 cursor-pointer group text-left"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br from-${action.color}/10 to-${action.color}/20 group-hover:from-${action.color}/20 group-hover:to-${action.color}/30 transition-all duration-300`}>
                  <Icon className={`h-5 w-5 text-${action.color}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
        
        <div className="pt-2 border-t border-border/50">
          <button
            onClick={() => onSectionChange('users')}
            className="w-full glass border-0 p-4 rounded-xl hover:bg-warning/5 transition-all duration-300 cursor-pointer group text-left border-warning/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-warning/10 to-warning/20 group-hover:from-warning/20 group-hover:to-warning/30 transition-all duration-300">
                <Settings className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground group-hover:text-warning transition-colors">
                  User Management
                </p>
                <p className="text-sm text-muted-foreground">
                  Manage system users and permissions
                </p>
              </div>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};