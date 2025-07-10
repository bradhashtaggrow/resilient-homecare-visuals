
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
  X,
  LogOut
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

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
  const { signOut } = useAuth();

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leads', label: 'Demo Requests', icon: UserCheck },
  ];

  const contentMenuItems = [
    { id: 'content', label: 'Website Content', icon: FileText },
    { id: 'blog', label: 'Blog Management', icon: Edit3 },
    { id: 'preview', label: 'Live Preview', icon: Eye },
  ];

  const managementMenuItems = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Cog },
  ];

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-3 w-3 text-primary" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderMenuGroup = (title: string, items: typeof mainMenuItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-foreground uppercase tracking-wider font-apple">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => onSectionChange(item.id)}
                isActive={activeSection === item.id}
                className={`w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 font-apple ${
                  activeSection === item.id
                    ? 'btn-3d-gradient text-white'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium font-apple">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarHeader className="p-6 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground font-apple">Healthcare Admin</h1>
              <p className="text-sm text-muted-foreground font-apple">Content Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <Badge variant="outline" className="text-xs bg-background text-foreground border-border">
            {getSyncStatusIcon()}
            <span className="ml-1 font-apple">
              {syncStatus === 'connected' ? 'Connected' : 
               syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
            </span>
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-6 overflow-y-auto bg-background flex flex-col">
        <div className="space-y-6 flex-1">
          {renderMenuGroup('Overview', mainMenuItems)}
          {renderMenuGroup('Content Management', contentMenuItems)}
          {renderMenuGroup('System', managementMenuItems)}
        </div>
        
        {/* Logout Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full justify-start px-3 py-2.5 rounded-lg transition-all duration-200 font-apple text-foreground hover:bg-gradient-to-r hover:from-primary hover:to-primary-light hover:text-white group"
                >
                  <LogOut className="h-5 w-5 mr-3 group-hover:text-white" />
                  <span className="font-medium font-apple group-hover:text-white">Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
