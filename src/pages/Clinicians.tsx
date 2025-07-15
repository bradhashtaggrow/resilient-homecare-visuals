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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Advanced Healthcare Provider <span className="gradient-text">Platform</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                Empower your healthcare practice with cutting-edge remote patient monitoring, 
                AI-powered diagnostics, and comprehensive telehealth solutions designed for modern clinicians.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Free Trial
                </button>
                <button className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Remote Healthcare Solution for Providers
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Streamline your practice with our comprehensive platform that integrates seamlessly with your existing workflow
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-8 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Remote Patient Monitoring</h3>
                  <p className="text-muted-foreground">
                    Monitor patients at home with real-time vital signs, medication adherence tracking, 
                    and automated alert systems for early intervention.
                  </p>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Diagnostics</h3>
                  <p className="text-muted-foreground">
                    Leverage artificial intelligence for accurate diagnosis support, 
                    predictive analytics, and personalized treatment recommendations.
                  </p>
                </div>
                <div className="bg-card p-8 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Integrated EMR Systems</h3>
                  <p className="text-muted-foreground">
                    Seamlessly integrate with existing electronic medical records 
                    for comprehensive patient data management and workflow optimization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Transform Your Healthcare Practice
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Improve Patient Outcomes</h3>
                        <p className="text-muted-foreground">Continuous monitoring and early intervention capabilities lead to better health outcomes and reduced hospital readmissions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Increase Efficiency</h3>
                        <p className="text-muted-foreground">Streamline workflows, reduce administrative burden, and focus more time on patient care with automated systems.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Reduce Costs</h3>
                        <p className="text-muted-foreground">Lower operational costs through remote monitoring, reduced office visits, and preventive care management.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Key Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">89%</div>
                        <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">45%</div>
                        <div className="text-sm text-muted-foreground">Cost Reduction</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">67%</div>
                        <div className="text-sm text-muted-foreground">Time Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">92%</div>
                        <div className="text-sm text-muted-foreground">Provider Adoption</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Practice?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of healthcare providers who trust our platform to deliver exceptional patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
                  Get Started Today
                </button>
                <button className="border border-primary-foreground/20 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Contact Sales
                </button>
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