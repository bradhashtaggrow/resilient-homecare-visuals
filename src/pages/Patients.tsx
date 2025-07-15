import React from 'react';
import { SEOHead, SEO_KEYWORDS } from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Patients = () => {
  const patientsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Patient Care Platform - Remote Healthcare at Home",
    "description": "Comprehensive remote healthcare platform for patients. Access telehealth services, remote monitoring, virtual consultations, and personalized care management from the comfort of home.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Resilient Healthcare Patient Platform",
      "description": "User-friendly patient portal for remote healthcare management, featuring telehealth appointments, health tracking, medication reminders, and secure communication with healthcare providers.",
      "applicationCategory": "HealthApplication",
      "audience": {
        "@type": "Audience",
        "audienceType": "Patients"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Patient Care Platform - Remote Healthcare Services at Home"
        description="Access comprehensive remote healthcare services with Resilient Healthcare's patient platform. Telehealth consultations, remote monitoring, health tracking, medication management, and virtual care from home."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.patients}, patient portal, remote health monitoring, home healthcare technology, patient engagement, telehealth appointments`}
        canonical="/patients"
        ogTitle="Remote Patient Care Platform - Healthcare Technology for Patients at Home"
        ogDescription="Transform your healthcare experience with remote monitoring, virtual consultations, and personalized care management from the comfort of your home."
        schemaData={patientsSchema}
      />
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-20">
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Healthcare <span className="gradient-text">At Home</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Experience the future of healthcare with our comprehensive remote patient care platform. 
                Access quality healthcare services from the comfort and safety of your home.
              </p>
            </div>
          </section>

          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Complete Remote Healthcare Services for Patients
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Virtual Consultations</h3>
                  <p className="text-gray-600">
                    Connect with healthcare providers through secure video consultations, 
                    eliminating travel time and providing convenient access to care.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Remote Health Monitoring</h3>
                  <p className="text-gray-600">
                    Track your health metrics at home with connected devices and 
                    automated monitoring systems that alert your care team when needed.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Personalized Care Plans</h3>
                  <p className="text-gray-600">
                    Receive customized treatment plans, medication reminders, 
                    and health goals tailored to your specific needs and conditions.
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

export default Patients;