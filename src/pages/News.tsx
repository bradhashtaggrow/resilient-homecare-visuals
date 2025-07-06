
import React from 'react';
import Navigation from '@/components/Navigation';
import PageContent from '@/components/content/PageContent';
import Footer from '@/components/Footer';

const News = () => {
  return (
    <>
      <Navigation />
      <PageContent pageKey="news" />
      <Footer />
    </>
  );
};

export default News;
