import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';

const DataSecurity = () => {
  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Data"
        highlightedText="Security"
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
                  Our Commitment to Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  At Resilient Healthcare, we understand that protecting patient data and sensitive healthcare information 
                  is not just a regulatory requirement—it's fundamental to maintaining trust and ensuring the highest 
                  standards of care. Our comprehensive data security framework implements multiple layers of protection 
                  to safeguard all information entrusted to our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Enterprise-Grade Security Infrastructure
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cloud Security Architecture</h3>
                    <p>Our platform is built on industry-leading cloud infrastructure with enterprise-grade security controls:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>SOC 2 Type II certified data centers</li>
                      <li>Multi-region redundancy and disaster recovery</li>
                      <li>24/7 security monitoring and incident response</li>
                      <li>Regular third-party security audits and penetration testing</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Network Security</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Web Application Firewall (WAF) protection</li>
                      <li>DDoS protection and traffic filtering</li>
                      <li>Virtual Private Cloud (VPC) isolation</li>
                      <li>Network segmentation and microsegmentation</li>
                      <li>Intrusion detection and prevention systems</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Data Encryption and Protection
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Encryption Standards</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li><strong>Data at Rest:</strong> AES-256 encryption for all stored data</li>
                      <li><strong>Data in Transit:</strong> TLS 1.3 encryption for all communications</li>
                      <li><strong>Database Encryption:</strong> Transparent data encryption (TDE)</li>
                      <li><strong>Backup Encryption:</strong> All backups encrypted with separate keys</li>
                      <li><strong>Key Management:</strong> Hardware Security Module (HSM) protected keys</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Data Classification</h3>
                    <p>We implement a comprehensive data classification system:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Protected Health Information (PHI) - Highest security level</li>
                      <li>Personally Identifiable Information (PII) - High security level</li>
                      <li>Business confidential data - Medium security level</li>
                      <li>Public information - Standard security level</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Access Control and Authentication
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Multi-Factor Authentication (MFA)</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Mandatory MFA for all user accounts</li>
                      <li>Support for authenticator apps, SMS, and hardware tokens</li>
                      <li>Adaptive authentication based on risk assessment</li>
                      <li>Single Sign-On (SSO) integration with enterprise systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Role-Based Access Control (RBAC)</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Principle of least privilege access</li>
                      <li>Granular permissions based on job functions</li>
                      <li>Regular access reviews and certifications</li>
                      <li>Automated deprovisioning for inactive accounts</li>
                      <li>Privileged access management for administrative functions</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Security Monitoring and Compliance
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Continuous Monitoring</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>24/7 Security Operations Center (SOC)</li>
                      <li>Real-time threat detection and response</li>
                      <li>Comprehensive audit logging and retention</li>
                      <li>Behavioral analytics and anomaly detection</li>
                      <li>Automated security incident response workflows</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance Certifications</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>HIPAA compliance with Business Associate Agreements</li>
                      <li>SOC 2 Type II certification</li>
                      <li>GDPR compliance for international operations</li>
                      <li>CCPA compliance for California residents</li>
                      <li>FedRAMP authorization in progress</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Application Security
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Development Lifecycle</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Security by design principles</li>
                      <li>Static and dynamic application security testing</li>
                      <li>Code review and vulnerability scanning</li>
                      <li>Dependency management and vulnerability patching</li>
                      <li>Container security and image scanning</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Runtime Protection</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Runtime application self-protection (RASP)</li>
                      <li>API security and rate limiting</li>
                      <li>Input validation and sanitization</li>
                      <li>Cross-site scripting (XSS) protection</li>
                      <li>SQL injection prevention</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Data Backup and Recovery
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Backup Strategy</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Automated daily backups with point-in-time recovery</li>
                      <li>Cross-region replication for disaster recovery</li>
                      <li>Encrypted backup storage with separate access controls</li>
                      <li>Regular backup testing and restoration procedures</li>
                      <li>Long-term archival with immutable storage</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Business Continuity</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>99.9% uptime SLA with automatic failover</li>
                      <li>Disaster recovery testing every quarter</li>
                      <li>Recovery Time Objective (RTO): 4 hours</li>
                      <li>Recovery Point Objective (RPO): 1 hour</li>
                      <li>Comprehensive incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Employee Security Training
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our team undergoes comprehensive security training to ensure they understand their role in maintaining data security:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Annual security awareness training for all employees</li>
                  <li>Specialized HIPAA and PHI handling training</li>
                  <li>Phishing simulation and response training</li>
                  <li>Secure coding practices for development teams</li>
                  <li>Incident response and escalation procedures</li>
                  <li>Regular security updates and threat briefings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Third-Party Security
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We carefully vet all third-party vendors and partners to ensure they meet our security standards:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Comprehensive vendor security assessments</li>
                  <li>Business Associate Agreements with all healthcare vendors</li>
                  <li>Regular security reviews and audits of partners</li>
                  <li>Contractual security requirements and SLAs</li>
                  <li>Continuous monitoring of third-party access</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Incident Response and Breach Notification
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Incident Response Process</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Immediate containment and assessment within 1 hour</li>
                      <li>Forensic investigation and root cause analysis</li>
                      <li>Coordination with law enforcement when required</li>
                      <li>Regular incident response drills and tabletop exercises</li>
                      <li>Post-incident review and improvement process</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Breach Notification</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Customer notification within 24 hours of confirmed breach</li>
                      <li>Regulatory notification as required by applicable laws</li>
                      <li>Transparent communication about impact and remediation</li>
                      <li>Support for affected customers and individuals</li>
                      <li>Credit monitoring services when appropriate</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Data Retention and Disposal
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We maintain strict policies for data retention and secure disposal:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Data retention schedules based on regulatory requirements</li>
                  <li>Automated data lifecycle management</li>
                  <li>Secure data destruction using NIST standards</li>
                  <li>Certificate of destruction for sensitive data disposal</li>
                  <li>Regular purging of temporary and cache data</li>
                  <li>Customer data portability and deletion upon request</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Transparency and Reporting
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We believe in transparency regarding our security practices:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Annual security and compliance reports</li>
                  <li>Real-time security dashboard for enterprise customers</li>
                  <li>Regular security webinars and updates</li>
                  <li>Open communication about security improvements</li>
                  <li>Customer security advisory board participation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contact Our Security Team
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For security-related questions, concerns, or to report a potential security issue:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Security Team</strong><br />
                    Resilient Healthcare<br />
                    Email: security@resilientcare.com<br />
                    Phone: 1-800-RESILIENT (Emergency Line)<br />
                    Address: San Francisco, CA
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    For urgent security matters, please call our 24/7 emergency line. 
                    For non-urgent security questions, email responses are typically provided within 24 hours.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Continuous Improvement
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our data security framework is continuously evolving to address emerging threats and incorporate 
                  industry best practices. We regularly review and update our security policies, conduct risk 
                  assessments, and invest in new technologies to maintain the highest levels of protection for 
                  our customers' data.
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

export default DataSecurity;
