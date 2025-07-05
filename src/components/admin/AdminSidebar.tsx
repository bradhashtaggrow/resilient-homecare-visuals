
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Image, 
  Eye, 
  BarChart3, 
  Users, 
  Cog,
  Activity,
  Globe,
  Palette,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  syncStatus = 'disconnected' 
}) => {
  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const contentMenuItems = [
    { id: 'content', label: 'Website Content', icon: FileText },
    { id: 'services', label: 'Service Lines', icon: Activity },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'preview', label: 'Live Preview', icon: Eye },
  ];

  const managementMenuItems = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Cog },
  ];

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

  const renderMenuGroup = (title: string, items: typeof mainMenuItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onSectionChange(item.id)}
                isActive={activeSection === item.id}
                className={`w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Healthcare Admin</h1>
            <p className="text-sm text-gray-500">Management Dashboard</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <Badge variant="outline" className="text-xs">
            {getSyncStatusIcon()}
            <span className="ml-1">
              {syncStatus === 'connected' ? 'Connected' : 
               syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
            </span>
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-6">
        {renderMenuGroup('Overview', mainMenuItems)}
        {renderMenuGroup('Content Management', contentMenuItems)}
        {renderMenuGroup('System', managementMenuItems)}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
