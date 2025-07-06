
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, User, Save, Wifi, WifiOff, LogOut, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { User as UserType } from '@supabase/supabase-js';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminHeaderProps {
  activeSection: string;
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  user?: UserType | null;
  selectedPage?: string;
  onPageChange?: (page: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  activeSection, 
  syncStatus = 'disconnected', 
  user, 
  selectedPage = 'home',
  onPageChange 
}) => {
  const { signOut } = useAuth();

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'care_at_home', label: 'Care at Home' },
    { value: 'clinicians', label: 'Clinicians' },
    { value: 'patients', label: 'Patients' },
    { value: 'news', label: 'News' },
    { value: 'contact', label: 'Contact' }
  ];

  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard Overview',
      content: 'Website Content',
      services: 'Service Lines',
      media: 'Media Library',
      preview: 'Live Preview',
      analytics: 'Analytics & Reports',
      users: 'User Management',
      leads: 'Leads Management',
      settings: 'System Settings'
    };
    return titles[section] || 'Admin Dashboard';
  };

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

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200';
      case 'syncing':
        return 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gradient-to-r from-blue-50 to-slate-50 text-blue-600 border-blue-200';
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-16 border-b border-blue-100 bg-gradient-to-r from-white to-blue-50/50 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {getSectionTitle(activeSection)}
        </h2>
        <Badge variant="outline" className={getSyncStatusColor()}>
          {getSyncStatusIcon()}
          <span className="ml-2">
            {syncStatus === 'connected' ? 'Live' : 
             syncStatus === 'syncing' ? 'Syncing' : 'Offline'}
          </span>
        </Badge>
        
        {/* Pages Dropdown */}
        {activeSection === 'content' && onPageChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
                <span className="mr-2">
                  {pages.find(p => p.value === selectedPage)?.label || 'Home Page'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
              {pages.map((page) => (
                <DropdownMenuItem 
                  key={page.value}
                  onClick={() => onPageChange(page.value)}
                  className="text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                >
                  {page.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 bg-gradient-to-r from-blue-50/50 to-white border-blue-200 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20"
          />
        </div>
        
        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-700">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <DropdownMenuItem onClick={handleLogout} className="text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50">
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
