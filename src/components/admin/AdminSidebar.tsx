
import React from 'react';
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
    <div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {title}
      </div>
      <div className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-left ${
              activeSection === item.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-full">
            <img 
              src="/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png" 
              alt="Resilient Healthcare" 
              className="h-16 w-auto"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 overflow-y-auto bg-white h-full">
        {renderMenuGroup('Overview', mainMenuItems)}
        {renderMenuGroup('Content Management', contentMenuItems)}
        {renderMenuGroup('System', managementMenuItems)}
        {renderMenuGroup('Account', accountMenuItems)}
      </div>
    </div>
  );
};

export default AdminSidebar;
