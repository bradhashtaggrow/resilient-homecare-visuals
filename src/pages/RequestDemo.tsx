import React from 'react';
import { SEOHead, SEO_KEYWORDS } from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RequestDemo = () => {
  const demoSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Request Demo - Resilient Healthcare Platform",
    "description": "Schedule a personalized demo of Resilient Healthcare's remote monitoring platform. See how our value-based care at home technology can transform your healthcare delivery.",
    "mainEntity": {
      "@type": "Service",
      "name": "Healthcare Platform Demo",
      "description": "Personalized demonstration of remote healthcare technology platform featuring AI-powered diagnostics, patient monitoring, and telehealth solutions.",
      "provider": {
        "@type": "Organization",
        "name": "Resilient Healthcare"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Request Demo - See Resilient Healthcare's Remote Monitoring Platform"
        description="Schedule a personalized demo of Resilient Healthcare's advanced remote monitoring platform. Experience value-based care at home technology, AI-powered diagnostics, and comprehensive telehealth solutions."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.demo}, healthcare platform demo, telehealth demonstration, remote care technology trial, healthcare software preview`}
        canonical="/request-demo"
        ogTitle="Request Healthcare Platform Demo - See Remote Monitoring Technology in Action"
        ogDescription="Experience the future of healthcare with our personalized platform demonstration. See how remote monitoring and value-based care at home can transform your practice."
        schemaData={demoSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Experience the Future of <span className="gradient-text">Healthcare</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Schedule a personalized demo of our comprehensive remote healthcare platform 
                and see how value-based care at home can transform your healthcare delivery.
              </p>
            </div>
          </section>

          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                See Our Healthcare Technology Platform in Action
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">What You'll See in Your Demo</h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>Live demonstration of remote patient monitoring capabilities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>AI-powered diagnostic tools and predictive analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>Integrated telehealth platform and virtual consultation features</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>Value-based care management and outcome tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>EMR integration and workflow optimization tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3">✓</span>
                      <span>Custom implementation roadmap for your organization</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6">Schedule Your Demo</h3>
                  <p className="text-gray-600 mb-6">
                    Get a personalized demonstration tailored to your healthcare organization's 
                    specific needs and requirements.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold">Duration:</span> 45-60 minutes
                    </div>
                    <div>
                      <span className="font-semibold">Format:</span> Virtual or In-Person
                    </div>
                    <div>
                      <span className="font-semibold">Includes:</span> Q&A and Implementation Planning
                    </div>
                  </div>
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

export default RequestDemo;