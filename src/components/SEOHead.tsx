import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schemaData?: any;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/lovable-uploads/3e279b72-925a-4bb7-b13f-66705bd48399.png',
  ogType = 'website',
  twitterTitle,
  twitterDescription,
  twitterImage,
  schemaData,
  noindex = false,
}) => {
  const fullTitle = `${title} | Resilient Healthcare - Advanced Remote Healthcare Technology`;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://resilienthealthcare.com';
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:site_name" content="Resilient Healthcare" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@resilient_hc" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || fullTitle} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={`${baseUrl}${twitterImage || ogImage}`} />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Resilient Healthcare" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

// Common schema templates
export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Resilient Healthcare",
  "description": "Advanced remote healthcare technology platform providing value-based care at home with AI-powered solutions, secure patient data management, and innovative telehealth services.",
  "url": "https://resilienthealthcare.com",
  "logo": "https://resilienthealthcare.com/lovable-uploads/3e279b72-925a-4bb7-b13f-66705bd48399.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-RESILIENT",
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://linkedin.com/company/resilient-healthcare",
    "https://twitter.com/resilient_hc"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  }
});

export const createMedicalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Resilient Healthcare",
  "description": "Leading provider of remote healthcare technology, telehealth platforms, and value-based care at home solutions for healthcare providers and patients.",
  "url": "https://resilienthealthcare.com",
  "logo": "https://resilienthealthcare.com/lovable-uploads/3e279b72-925a-4bb7-b13f-66705bd48399.png",
  "medicalSpecialty": [
    "Telemedicine",
    "Remote Patient Monitoring",
    "Home Healthcare",
    "Value-Based Care"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "United States"
  }
});

export const createSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Resilient Healthcare Platform",
  "description": "Comprehensive remote healthcare technology platform with AI-powered diagnostics, secure patient data management, and integrated telehealth solutions.",
  "url": "https://resilienthealthcare.com",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web-based",
  "offers": {
    "@type": "Offer",
    "price": "Contact for pricing",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Resilient Healthcare"
  }
});

// SEO Keywords for different page types
export const SEO_KEYWORDS = {
  primary: "resilient healthcare, remote healthcare, value-based care at home, telehealth platform, healthcare technology",
  home: "healthcare technology platform, remote patient monitoring, telehealth solutions, AI healthcare, digital health, virtual care, home healthcare technology, medical device integration, patient care management, healthcare analytics",
  about: "healthcare innovation, remote care providers, telehealth company, healthcare technology leaders, medical technology solutions, digital health transformation",
  services: "telehealth services, remote patient monitoring, home health technology, virtual care solutions, healthcare AI, medical device connectivity, patient engagement platform",
  clinicians: "clinician dashboard, healthcare provider tools, medical practice management, telehealth for doctors, physician remote monitoring, clinical decision support",
  patients: "patient portal, remote health monitoring, home healthcare technology, patient engagement, telehealth appointments, health tracking, virtual consultations",
  contact: "healthcare technology support, telehealth implementation, remote care consultation, healthcare IT services, medical technology partner",
  demo: "healthcare platform demo, telehealth demonstration, remote care technology trial, healthcare software preview, medical platform evaluation"
};