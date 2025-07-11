
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
  Wifi,
  WifiOff,
  UserCheck,
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

  const accountMenuItems = [
    { id: 'logout', label: 'Log Out', icon: LogOut },
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

  const handleMenuClick = async (itemId: string) => {
    if (itemId === 'logout') {
      await signOut();
    } else {
      onSectionChange(itemId);
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
                onClick={() => handleMenuClick(item.id)}
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
    <Sidebar className="border-r border-border bg-background w-full h-full">
      <SidebarHeader className="p-6 border-b border-border bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center flex-1">
            <img 
              src="/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png" 
              alt="Resilient Healthcare" 
              className="h-10 w-auto"
            />
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

      <SidebarContent className="px-4 py-6 space-y-6 overflow-y-auto bg-background">
        {renderMenuGroup('Overview', mainMenuItems)}
        {renderMenuGroup('Content Management', contentMenuItems)}
        {renderMenuGroup('System', managementMenuItems)}
        {renderMenuGroup('Account', accountMenuItems)}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
