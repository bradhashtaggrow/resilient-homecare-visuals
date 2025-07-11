
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';

const HIPAACompliance = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="HIPAA"
        highlightedText="Compliance"
        useVideo={false}
      />

      <main className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <p className="text-gray-600 text-lg">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Our Commitment to HIPAA Compliance
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Resilient Healthcare is committed to protecting the privacy and security of Protected Health Information (PHI) 
                  in accordance with the Health Insurance Portability and Accountability Act (HIPAA) and its implementing regulations. 
                  This HIPAA Compliance Agreement outlines our policies, procedures, and safeguards to ensure the confidentiality, 
                  integrity, and availability of all PHI we create, receive, maintain, or transmit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Business Associate Agreement
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When Resilient Healthcare provides services to covered entities, we enter into Business Associate Agreements 
                  that establish our responsibilities for protecting PHI. These agreements include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Use and disclosure limitations for PHI</li>
                  <li>Appropriate safeguards to prevent unauthorized use or disclosure</li>
                  <li>Reporting procedures for security incidents</li>
                  <li>Return or destruction of PHI upon contract termination</li>
                  <li>Compliance with HIPAA Security Rule requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Administrative Safeguards
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Security Officer</h3>
                    <p>We have designated a Security Officer responsible for developing and implementing security policies and procedures.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Workforce Training</h3>
                    <p>All workforce members receive HIPAA training upon hire and annually thereafter, covering privacy and security requirements.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Access Management</h3>
                    <p>We implement unique user identification, emergency access procedures, automatic logoff, and encryption controls.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Physical Safeguards
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Controlled facility access with authorized personnel only</li>
                  <li>Workstation security controls to restrict access to PHI</li>
                  <li>Media controls for electronic media containing PHI</li>
                  <li>Secure disposal and reuse of electronic media</li>
                  <li>Environmental controls to protect systems and equipment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Technical Safeguards
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Access Control</h3>
                    <p>Implementation of technical policies and procedures that allow only authorized persons access to PHI.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Controls</h3>
                    <p>Hardware, software, and procedural mechanisms for recording access to PHI systems.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Integrity Controls</h3>
                    <p>Measures to ensure PHI is not improperly altered or destroyed.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Transmission Security</h3>
                    <p>Technical controls to guard against unauthorized access to PHI transmitted over networks.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Data Encryption and Security
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Resilient Healthcare employs industry-standard security measures to protect PHI:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 encryption for data in transit</li>
                  <li>Multi-factor authentication for system access</li>
                  <li>Regular security assessments and penetration testing</li>
                  <li>Continuous monitoring and logging of system activities</li>
                  <li>Secure backup and disaster recovery procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Incident Response
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In the event of a security incident involving PHI:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Immediate containment and assessment of the incident</li>
                  <li>Notification to affected covered entities within 24 hours</li>
                  <li>Documentation of the incident and response actions</li>
                  <li>Implementation of corrective measures to prevent recurrence</li>
                  <li>Cooperation with regulatory investigations as required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Employee Responsibilities
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All Resilient Healthcare employees and contractors must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Complete HIPAA training and acknowledge understanding of policies</li>
                  <li>Use PHI only for authorized purposes</li>
                  <li>Report suspected security incidents immediately</li>
                  <li>Maintain confidentiality of login credentials</li>
                  <li>Follow minimum necessary standards when accessing PHI</li>
                  <li>Securely dispose of PHI when no longer needed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Third-Party Vendors
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We ensure that all third-party vendors who may have access to PHI sign appropriate Business Associate Agreements 
                  and maintain HIPAA-compliant security measures. Regular assessments are conducted to verify ongoing compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Compliance Monitoring
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Resilient Healthcare maintains ongoing compliance through:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Regular risk assessments and security evaluations</li>
                  <li>Annual policy reviews and updates</li>
                  <li>Continuous workforce training and education</li>
                  <li>Third-party security audits and certifications</li>
                  <li>Documentation of all compliance activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about our HIPAA compliance program or to report a security incident, please contact:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>HIPAA Security Officer</strong><br />
                    Resilient Healthcare<br />
                    Email: info@resilienthc.com<br />
                    Phone: +1 888-874-0852<br />
                    Address: Dallas, TX
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Updates to This Agreement
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  This HIPAA Compliance Agreement may be updated periodically to reflect changes in regulations, 
                  technology, or our business practices. We will notify covered entities of any material changes 
                  that may affect their PHI protection.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HIPAACompliance;
