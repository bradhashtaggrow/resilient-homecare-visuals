import React from 'react';
import PageContentManager from './PageContentManager';

interface WebsiteContentManagerProps {
  syncStatus?: 'connected' | 'disconnected' | 'syncing';
  selectedPage?: string;
}

const WebsiteContentManager: React.FC<WebsiteContentManagerProps> = ({ 
  syncStatus = 'disconnected', 
  selectedPage = 'home' 
}) => {
  return <PageContentManager syncStatus={syncStatus} selectedPage={selectedPage} />;
};

export default WebsiteContentManager;