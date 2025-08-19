import React from 'react';
import PageContentManager from '@/components/admin/PageContentManager';

const HealthSystemsManager = () => {
  return <PageContentManager syncStatus="connected" selectedPage="health-systems" />;
};

export default HealthSystemsManager;