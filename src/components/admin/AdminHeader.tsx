
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, User, Save, Wifi, WifiOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdminHeaderProps {
  activeSection: string;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeSection, syncStatus = 'disconnected' }) => {
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard Overview',
      content: 'Website Content',
      services: 'Service Lines',
      media: 'Media Library',
      preview: 'Live Preview',
      analytics: 'Analytics & Reports',
      users: 'User Management',
      settings: 'System Settings'
    };
    return titles[section] || 'Admin Dashboard';
  };

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-green-600" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-red-600" />;
    }
  };

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'syncing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {getSectionTitle(activeSection)}
        </h2>
        <Badge variant="outline" className={getSyncStatusColor()}>
          {getSyncStatusIcon()}
          <span className="ml-2">
            {syncStatus === 'connected' ? 'Live' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </span>
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
        
        <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>

        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
