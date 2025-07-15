import React from 'react';
import { SEOHead, createSoftwareApplicationSchema, SEO_KEYWORDS } from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Clinicians = () => {
  const cliniciansSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Healthcare Provider Solutions - Clinician Platform",
    "description": "Advanced remote healthcare technology platform designed for clinicians. Streamline patient care, remote monitoring, and telehealth services with AI-powered tools and integrated EMR systems.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Resilient Healthcare Clinician Platform",
      "description": "Comprehensive remote healthcare management platform for healthcare providers, featuring AI-powered diagnostics, patient monitoring, and integrated telehealth solutions.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web-based",
      "audience": {
        "@type": "Audience",
        "audienceType": "Healthcare Providers"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Healthcare Provider Platform - Remote Patient Management for Clinicians"
        description="Empower healthcare providers with Resilient Healthcare's advanced clinician platform. Remote patient monitoring, AI-powered diagnostics, integrated EMR, telehealth solutions, and value-based care management tools."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.clinicians}, healthcare provider software, clinician dashboard, medical practice management, telehealth for doctors, physician remote monitoring`}
        canonical="/clinicians"
        ogTitle="Advanced Healthcare Provider Platform - Resilient Healthcare for Clinicians"
        ogDescription="Transform your healthcare practice with our comprehensive remote patient monitoring, AI-powered diagnostics, and integrated telehealth platform designed for modern clinicians."
        schemaData={cliniciansSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Advanced Healthcare Provider <span className="gradient-text">Platform</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Empower your healthcare practice with cutting-edge remote patient monitoring, 
                AI-powered diagnostics, and comprehensive telehealth solutions designed for modern clinicians.
              </p>
            </div>
          </section>

          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Complete Remote Healthcare Solution for Providers
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Remote Patient Monitoring</h3>
                  <p className="text-gray-600">
                    Monitor patients at home with real-time vital signs, medication adherence tracking, 
                    and automated alert systems for early intervention.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Diagnostics</h3>
                  <p className="text-gray-600">
                    Leverage artificial intelligence for accurate diagnosis support, 
                    predictive analytics, and personalized treatment recommendations.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Integrated EMR Systems</h3>
                  <p className="text-gray-600">
                    Seamlessly integrate with existing electronic medical records 
                    for comprehensive patient data management and workflow optimization.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Clinicians;