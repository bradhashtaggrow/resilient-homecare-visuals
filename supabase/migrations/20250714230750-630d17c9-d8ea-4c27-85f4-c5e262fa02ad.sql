-- Insert Data Security page content sections
INSERT INTO public.website_content (section_key, title, subtitle, description, background_video_url, content_data, is_active)
VALUES 
  (
    'security_hero',
    'Data Security',
    NULL,
    NULL,
    'https://iwgtwzpygoyohocbgqgm.supabase.co/storage/v1/object/public/media/backgrounds/0.14291029046511074.mp4',
    '{}',
    true
  ),
  (
    'security_body',
    'Data Security Content',
    'Effective Date: July 14, 2025',
    'Effective Date: July 14, 2025

1. Our Commitment to Data Security
Resilient Healthcare is committed to implementing and maintaining the highest standards of data security to protect sensitive healthcare information and ensure the confidentiality, integrity, and availability of all data entrusted to us.

2. Data Classification and Handling
We classify data based on sensitivity levels and apply appropriate security controls:

• Public Data - Information available to the general public
• Internal Data - Information intended for internal use within the organization
• Confidential Data - Sensitive business information requiring protection
• Restricted Data - Highly sensitive data including PHI requiring the highest level of protection

3. Encryption Standards
We employ industry-leading encryption technologies to protect data:

• AES-256 encryption for data at rest
• TLS 1.3 encryption for data in transit
• End-to-end encryption for sensitive communications
• Hardware Security Modules (HSMs) for key management
• Regular encryption key rotation and management
• Zero-knowledge architecture for maximum privacy

4. Access Controls and Authentication
Our access control framework includes:

• Multi-factor authentication (MFA) for all user accounts
• Role-based access control (RBAC) with principle of least privilege
• Just-in-time access provisioning for temporary elevated permissions
• Continuous authentication monitoring and anomaly detection
• Regular access reviews and certification processes
• Automated account deprovisioning for terminated users

5. Network Security
We maintain robust network security measures:

• Next-generation firewalls with deep packet inspection
• Network segmentation and micro-segmentation
• Intrusion detection and prevention systems (IDS/IPS)
• DDoS protection and traffic analysis
• Virtual private networks (VPNs) for secure remote access
• Network monitoring and threat intelligence integration

6. Vulnerability Management
Our vulnerability management program includes:

• Continuous vulnerability scanning and assessment
• Regular penetration testing by certified security professionals
• Automated patch management and testing
• Security configuration management
• Threat modeling and risk assessment
• Bug bounty programs for external security research

7. Incident Response and Recovery
We maintain a comprehensive incident response capability:

• 24/7 security operations center (SOC) monitoring
• Incident response team with defined roles and responsibilities
• Automated threat detection and response capabilities
• Forensic analysis and evidence preservation procedures
• Business continuity and disaster recovery planning
• Regular incident response drills and tabletop exercises

8. Data Backup and Recovery
Our data protection strategy includes:

• Automated daily backups with multiple retention periods
• Geographically distributed backup storage locations
• Regular backup testing and restoration procedures
• Point-in-time recovery capabilities
• Immutable backup storage to prevent ransomware attacks
• Recovery time objectives (RTO) and recovery point objectives (RPO)

9. Security Monitoring and Analytics
We employ advanced security monitoring:

• Security Information and Event Management (SIEM) systems
• User and Entity Behavior Analytics (UEBA)
• Machine learning-based threat detection
• Real-time security alerting and notification
• Compliance monitoring and reporting
• Integration with threat intelligence feeds

10. Compliance and Auditing
We maintain compliance with security standards:

• SOC 2 Type II compliance and annual audits
• HIPAA Security Rule compliance
• Regular internal and external security assessments
• Compliance monitoring and reporting dashboards
• Evidence collection and audit trail maintenance
• Third-party security certifications and validations

11. Employee Security Training
All employees receive comprehensive security training:

• Security awareness training upon hiring
• Annual security training updates and refreshers
• Phishing simulation and testing programs
• Role-specific security training for technical staff
• Incident reporting and escalation procedures
• Security policy acknowledgment and compliance

12. Contact Information
For security-related inquiries or to report security incidents, please contact:

Chief Information Security Officer
Resilient Healthcare
Email: security@resilienthc.com
Phone: +1 888-874-0852
Security Hotline: Available 24/7
Address: Dallas, TX',
    NULL,
    '{}',
    true
  )
ON CONFLICT (section_key) 
DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  background_video_url = EXCLUDED.background_video_url,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();