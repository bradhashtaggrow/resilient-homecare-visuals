import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="contact" />
      <Footer />
    </>
  );
};

export default Contact;