
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, User, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AdminHeaderProps {
  activeSection: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeSection }) => {
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

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {getSectionTitle(activeSection)}
        </h2>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
          Live
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
