
import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const Patients = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="patients" />
      <Footer />
    </>
  );
};

export default Patients;
