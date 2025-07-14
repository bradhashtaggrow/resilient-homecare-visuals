
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, User, Wifi, WifiOff, LogOut, ChevronDown, Menu, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { User as UserType } from '@supabase/supabase-js';
import NotificationDropdown from './NotificationDropdown';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();

  const pages = [
    { id: 'home', label: 'Home Page' },
    { id: 'care-at-home', label: 'Care at Home' },
    { id: 'clinicians', label: 'Clinicians' },
    { id: 'patients', label: 'Patients' },
    { id: 'news', label: 'News' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'privacy-policy', label: 'Privacy Policy' },
    { id: 'terms-of-service', label: 'Terms of Service' }
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
        return <Wifi className="h-3 w-3 text-[#4285F4]" />;
      case 'syncing':
        return <div className="w-3 h-3 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin" />;
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
    <header className="h-14 sm:h-16 border-b border-border bg-background px-3 sm:px-4 lg:px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        {/* Show hamburger menu button when needed */}
        {onSidebarToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSidebarToggle}
            className="p-2 flex-shrink-0"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#1565C0] bg-clip-text text-transparent font-apple truncate">
          {getSectionTitle(activeSection)}
        </h2>
        {activeSection === 'content' && onPageChange && (
          <Select value={selectedPage} onValueChange={onPageChange}>
            <SelectTrigger className="w-32 sm:w-40 lg:w-48 bg-background border-border text-sm">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  <span className="truncate">{page.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <Badge variant="outline" className={`${getSyncStatusColor()} hidden sm:flex`}>
          {getSyncStatusIcon()}
          <span className="ml-2">
            {syncStatus === 'connected' ? 'Live' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </span>
        </Badge>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-foreground hidden sm:flex"
          onClick={() => window.open('/', '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          <span className="hidden lg:inline">Visit Site</span>
        </Button>
        
        <NotificationDropdown />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#4285F4] to-[#1565C0] rounded-full flex items-center justify-center">
                <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-foreground font-apple hidden md:inline truncate max-w-20 lg:max-w-none">
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
