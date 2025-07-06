
import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="about" />
      <Footer />
    </>
  );
};

export default About;
