import React from 'react';
import { SEOHead, SEO_KEYWORDS } from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Resilient Healthcare",
    "description": "Get in touch with Resilient Healthcare for remote healthcare technology solutions, telehealth implementation, and value-based care at home services.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Resilient Healthcare",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-RESILIENT",
          "contactType": "customer service",
          "availableLanguage": "English"
        },
        {
          "@type": "ContactPoint",
          "email": "info@resilienthealthcare.com",
          "contactType": "customer service"
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Resilient Healthcare - Remote Healthcare Technology Support"
        description="Contact Resilient Healthcare for remote healthcare technology solutions, telehealth platform implementation, value-based care at home services, and healthcare IT support. Get expert consultation today."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.contact}, healthcare technology support, telehealth implementation, remote care consultation, healthcare IT services`}
        canonical="/contact"
        ogTitle="Contact Resilient Healthcare - Expert Remote Healthcare Technology Solutions"
        ogDescription="Get expert consultation for remote healthcare technology, telehealth platform implementation, and value-based care at home solutions from our healthcare IT specialists."
        schemaData={contactSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Contact <span className="gradient-text">Resilient Healthcare</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Ready to transform your healthcare delivery with remote monitoring technology? 
                Get expert consultation and support for implementing value-based care at home solutions.
              </p>
            </div>
          </section>

          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Expert Healthcare Technology Support
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Get Started Today</h3>
                  <p className="text-gray-600 mb-6">
                    Our healthcare technology specialists are ready to help you implement 
                    comprehensive remote care solutions tailored to your organization's needs.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Phone:</span>
                      <a href="tel:+1-800-RESILIENT" className="text-primary hover:underline">
                        +1-800-RESILIENT
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold w-20">Email:</span>
                      <a href="mailto:info@resilienthealthcare.com" className="text-primary hover:underline">
                        info@resilienthealthcare.com
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Services & Support</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Remote Healthcare Technology Implementation</li>
                    <li>• Telehealth Platform Setup & Training</li>
                    <li>• Value-Based Care at Home Solutions</li>
                    <li>• Healthcare IT Integration Support</li>
                    <li>• 24/7 Technical Support & Maintenance</li>
                    <li>• Custom Healthcare Software Development</li>
                  </ul>
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

export default Contact;