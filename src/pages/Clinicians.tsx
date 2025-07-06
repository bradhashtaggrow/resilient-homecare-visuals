
import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const Clinicians = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="clinicians" />
      <Footer />
    </>
  );
};

export default Clinicians;
