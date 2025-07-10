
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Save, Wifi, WifiOff, LogOut, ChevronDown, Menu, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { User as UserType } from '@supabase/supabase-js';
import NotificationDropdown from './NotificationDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AdminHeaderProps {
  activeSection: string;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  user?: UserType | null;
  selectedPage?: string;
  onPageChange?: (page: string) => void;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  activeSection, 
  syncStatus = 'disconnected', 
  user,
  selectedPage = 'home',
  onPageChange,
  sidebarOpen = true,
  onSidebarToggle
}) => {
  const { signOut } = useAuth();

  const pages = [
    { id: 'home', label: 'Home Page' },
    { id: 'care-at-home', label: 'Care at Home' },
    { id: 'clinicians', label: 'Clinicians' },
    { id: 'patients', label: 'Patients' },
    { id: 'news', label: 'News' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Overview',
      analytics: 'Overview',
      leads: 'Overview',
      content: 'Content Management',
      services: 'Content Management',
      media: 'Content Management',
      preview: 'Content Management',
      blog: 'Content Management',
      users: 'System Management',
      settings: 'System Management'
    };
    return titles[section] || 'Admin Dashboard';
  };

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

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'bg-white text-foreground border-border';
      case 'syncing':
        return 'bg-white text-foreground border-border';
      default:
        return 'bg-white text-muted-foreground border-border';
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {!sidebarOpen && onSidebarToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSidebarToggle}
            className="p-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-2xl font-bold text-foreground font-apple">
          {getSectionTitle(activeSection)}
        </h2>
        {activeSection === 'content' && onPageChange && (
          <Select value={selectedPage} onValueChange={onPageChange}>
            <SelectTrigger className="w-48 bg-background border-border">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Badge variant="outline" className={getSyncStatusColor()}>
          {getSyncStatusIcon()}
          <span className="ml-2">
            {syncStatus === 'connected' ? 'Live' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </span>
        </Badge>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-foreground"
          onClick={() => window.open('/', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Site
        </Button>
        
        <NotificationDropdown />
        
        <Button size="sm" className="btn-3d-gradient font-apple">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-foreground font-apple">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-border bg-background">
            <DropdownMenuItem onClick={handleLogout} className="text-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
