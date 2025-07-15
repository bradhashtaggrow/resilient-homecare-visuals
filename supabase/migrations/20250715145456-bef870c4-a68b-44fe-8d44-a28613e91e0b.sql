-- Insert data security hero section
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'data_security_hero',
  'Data Security',
  'Enterprise-Grade Protection',
  'Resilient Healthcare employs comprehensive security measures to protect your sensitive healthcare data with industry-leading standards.',
  null,
  true
);

-- Insert data security body content
INSERT INTO public.website_content (
  section_key,
  title,
  description,
  is_active
) VALUES (
  'data_security_body',
  'Data Security Content',
  'At Resilient Healthcare, data security is not just a priority—it''s fundamental to everything we do. We understand that healthcare organizations entrust us with their most sensitive information, and we take that responsibility seriously.

1. Multi-Layered Security Architecture
Our security framework is built on multiple layers of protection:
• Network security with advanced firewalls and intrusion detection
• Application-level security controls and validation
• Database encryption and access monitoring
• Infrastructure hardening and vulnerability management
• Regular security assessments and penetration testing

2. Data Encryption Standards
We implement industry-leading encryption protocols:
• AES-256 encryption for data at rest
• TLS 1.3 encryption for data in transit
• End-to-end encryption for sensitive communications
• Hardware security modules (HSMs) for key management
• Regular encryption key rotation and management

3. Access Control and Authentication
Robust access controls ensure only authorized users can access data:
• Multi-factor authentication (MFA) for all user accounts
• Role-based access control (RBAC) with least privilege principles
• Single sign-on (SSO) integration with enterprise identity providers
• Regular access reviews and user provisioning audits
• Automated account deactivation for terminated users

4. Infrastructure Security
Our cloud infrastructure is built with security as the foundation:
• SOC 2 Type II certified data centers
• 24/7 security monitoring and incident response
• Distributed denial-of-service (DDoS) protection
• Regular security updates and patch management
• Isolated network segments and micro-segmentation

5. Data Loss Prevention
Comprehensive measures to prevent unauthorized data access:
• Data classification and labeling systems
• Endpoint protection and device management
• Email security and content filtering
• USB and removable media restrictions
• Real-time monitoring of data movement and access

6. Backup and Disaster Recovery
Ensuring data availability and business continuity:
• Automated daily backups with multiple retention periods
• Geographically distributed backup storage
• Regular recovery testing and validation
• Recovery time objectives (RTO) of less than 4 hours
• Recovery point objectives (RPO) of less than 1 hour

7. Compliance and Certifications
We maintain industry-standard certifications and compliance:
• HIPAA compliance with Business Associate Agreements
• SOC 2 Type II certification
• HITECH Act compliance
• GDPR compliance for international operations
• Regular third-party security audits and assessments

8. Security Monitoring and Incident Response
Proactive threat detection and response capabilities:
• 24/7 Security Operations Center (SOC) monitoring
• Advanced threat detection using AI and machine learning
• Automated incident response and containment
• Forensic analysis and root cause investigation
• Rapid notification and communication procedures

9. Employee Security Training
Our team is our first line of defense:
• Comprehensive security awareness training programs
• Regular phishing simulation exercises
• Security policy acknowledgment and compliance
• Background checks and security clearances
• Ongoing education on emerging threats and best practices

10. Vendor and Third-Party Security
Extending security to our entire ecosystem:
• Rigorous vendor security assessments
• Contractual security requirements and SLAs
• Regular security reviews of third-party integrations
• Supply chain security monitoring
• Continuous vendor risk assessment and management

11. Data Privacy and Governance
Ensuring proper data handling and governance:
• Data minimization and purpose limitation principles
• Privacy by design in all system architectures
• Data retention and deletion policies
• Regular privacy impact assessments
• User consent management and data subject rights

12. Continuous Improvement
Our security program evolves with emerging threats:
• Regular security posture assessments
• Threat intelligence integration and analysis
• Security technology updates and enhancements
• Industry best practice adoption
• Participation in security research and development

13. Transparency and Reporting
We believe in transparency regarding our security practices:
• Regular security reports and metrics
• Incident disclosure and notification procedures
• Security control documentation and evidence
• Third-party audit results and certifications
• Open communication about security enhancements

For more information about our data security practices or to report a security concern, please contact:

Resilient Healthcare Security Team
Email: security@resilienthc.com
Phone: +1 888-874-0852 (Security Hotline)
Address: Dallas, TX

Emergency Security Incidents: security-emergency@resilienthc.com',
  true
);