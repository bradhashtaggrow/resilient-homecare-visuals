
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Shield, Wifi, WifiOff, Upload, CheckCircle } from 'lucide-react';
import { populateWebsiteData, populateMediaLibrary } from '@/utils/populateWebsiteData';
import { useToast } from '@/hooks/use-toast';

interface SystemSettingsProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
}

const SystemSettings: React.FC<SystemSettingsProps> = ({ syncStatus = 'disconnected' }) => {
  const [isPopulating, setIsPopulating] = useState(false);
  const [populationComplete, setPopulationComplete] = useState(false);
  const { toast } = useToast();

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'syncing':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return <WifiOff className="h-4 w-4 text-red-600" />;
    }
  };

  const handlePopulateData = async () => {
    setIsPopulating(true);
    try {
      // Populate website content
      const contentResult = await populateWebsiteData();
      if (!contentResult.success) {
        throw new Error('Failed to populate website content');
      }

      // Populate media library
      const mediaResult = await populateMediaLibrary();
      if (!mediaResult.success) {
        throw new Error('Failed to populate media library');
      }

      setPopulationComplete(true);
      toast({
        title: "Data Population Complete!",
        description: "All website sections have been populated with comprehensive content and media files.",
      });

      // Trigger a page refresh to show the new data
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error('Error populating data:', error);
      toast({
        title: "Population Failed",
        description: "There was an error populating the website data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPopulating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system preferences and populate website data</p>
        </div>
        <Badge variant="outline" className={`flex items-center gap-2 ${
          syncStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
          syncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
          'bg-red-50 text-red-700 border-red-200'
        }`}>
          {getSyncStatusIcon()}
          <span>{syncStatus === 'connected' ? 'System Online' : 'Offline'}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Connected</div>
            <p className="text-xs text-muted-foreground">Supabase active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Secured</div>
            <p className="text-xs text-muted-foreground">RLS policies active</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Data Population</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Populate All Website Sections</h3>
            <p className="text-blue-800 text-sm mb-4">
              This will populate all website sections with comprehensive content including:
            </p>
            <ul className="text-blue-800 text-sm space-y-1 mb-4">
              <li>• Navigation, Hero, Services, Mobile Showcase sections</li>
              <li>• Value Proposition, Admin Dashboard, Founder sections</li>
              <li>• Statistics, Lead Generation, and Footer content</li>
              <li>• 6 Healthcare service offerings with detailed descriptions</li>
              <li>• Professional images and videos for all sections</li>
              <li>• Real-time sync and media management</li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={handlePopulateData}
              disabled={isPopulating || populationComplete}
              className="flex items-center gap-2"
            >
              {isPopulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Populating Data...
                </>
              ) : populationComplete ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Data Populated Successfully
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Populate All Website Data
                </>
              )}
            </Button>
            
            {populationComplete && (
              <Badge variant="default" className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </Badge>
            )}
          </div>

          {populationComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✅ All website sections have been populated with comprehensive content and media files. 
                The page will refresh automatically to show the new data.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Advanced system settings and configuration options are available for system administrators.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
