
import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const CareAtHome = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="care_at_home" />
      <Footer />
    </>
  );
};

export default CareAtHome;
