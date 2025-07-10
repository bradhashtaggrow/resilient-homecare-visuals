
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
  Eye, 
  BarChart3, 
  Users, 
  Cog,
  Globe,
  Wifi,
  WifiOff,
  UserCheck,
  Rss,
  Edit3,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  syncStatus = 'disconnected',
  onClose
}) => {
  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const contentMenuItems = [
    { id: 'content', label: 'Website Content', icon: FileText },
    { id: 'blog', label: 'Blog Management', icon: Edit3 },
    { id: 'leads', label: 'Demo Requests', icon: UserCheck },
    { id: 'preview', label: 'Live Preview', icon: Eye },
  ];

  const managementMenuItems = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Cog },
  ];

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-blue-600" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-blue-400" />;
    }
  };

  const renderMenuGroup = (title: string, items: typeof mainMenuItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
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
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-800'
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
    <Sidebar className="border-r border-blue-100 bg-gradient-to-b from-white to-blue-50/50">
      <SidebarHeader className="p-6 border-b border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Healthcare Admin</h1>
              <p className="text-sm text-blue-600">Content Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-blue-600" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200">
            {getSyncStatusIcon()}
            <span className="ml-1">
              {syncStatus === 'connected' ? 'Connected' : 
               syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
            </span>
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-6 sidebar-scrollbar overflow-y-auto">
        {renderMenuGroup('Overview', mainMenuItems)}
        {renderMenuGroup('Content Management', contentMenuItems)}
        {renderMenuGroup('System', managementMenuItems)}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
