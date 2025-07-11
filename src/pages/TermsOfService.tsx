
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Terms of"
        highlightedText="Service"
        useVideo={false}
      />

      <main className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <p className="text-gray-600 text-lg">
                <strong>Effective Date:</strong> {currentDate}
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using Resilient Healthcare's services, website, or platform ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Resilient Healthcare provides healthcare technology solutions, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Care coordination and management platforms</li>
                <li>Healthcare data analytics and reporting</li>
                <li>Patient engagement tools</li>
                <li>Clinical workflow optimization</li>
                <li>Telehealth and remote monitoring solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update your account information as needed</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use our Services to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Attempt to gain unauthorized access to systems or data</li>
                <li>Share, distribute, or misuse protected health information</li>
                <li>Impersonate others or provide false information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Healthcare Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services are designed to comply with applicable healthcare regulations, including HIPAA. Users must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Comply with all applicable healthcare laws and regulations</li>
                <li>Properly handle and protect patient health information</li>
                <li>Obtain necessary patient consents and authorizations</li>
                <li>Report any suspected security incidents promptly</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Services and all related content, features, and functionality are owned by Resilient Healthcare and are protected by intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Copy, modify, or distribute our proprietary technology</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use our trademarks or branding without permission</li>
                <li>Create derivative works based on our Services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data and Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. You retain ownership of your data, and we process it only as necessary to provide our Services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive to provide reliable service, we do not guarantee that our Services will be available at all times. We may experience downtime for maintenance, updates, or technical issues. We will make reasonable efforts to minimize service interruptions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, Resilient Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services. Our total liability shall not exceed the amount paid by you for the Services in the twelve months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify and hold harmless Resilient Healthcare from any claims, damages, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may suspend or terminate your access to our Services at any time for violation of these Terms or other reasonable grounds. You may terminate your account at any time by contacting us. Upon termination, your right to use the Services will cease immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website or through other appropriate means. Your continued use of the Services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of San Francisco County, California.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Resilient Healthcare</strong></p>
                <p className="text-gray-700 mb-2">Email: info@resilienthc.com</p>
                <p className="text-gray-700 mb-2">Phone: +1 888-874-0852</p>
                <p className="text-gray-700">Address: Dallas, TX</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
