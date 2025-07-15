-- Insert HIPAA compliance hero section
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'hipaa_hero',
  'HIPAA Compliance',
  'Healthcare Information Protection',
  'Resilient Healthcare is committed to maintaining the highest standards of HIPAA compliance and data security.',
  null,
  true
);

-- Insert HIPAA compliance body content
INSERT INTO public.website_content (
  section_key,
  title,
  description,
  is_active
) VALUES (
  'hipaa_body',
  'HIPAA Compliance Content',
  'At Resilient Healthcare, we understand the critical importance of protecting patient health information (PHI) and maintaining compliance with the Health Insurance Portability and Accountability Act (HIPAA).

1. Our HIPAA Commitment
We are committed to maintaining the confidentiality, integrity, and availability of all electronic protected health information (ePHI) that we create, receive, maintain, or transmit on behalf of our clients.

2. Administrative Safeguards
We have implemented comprehensive administrative safeguards including:
• Designated HIPAA Security Officer responsible for developing and implementing security policies
• Workforce training and access management procedures
• Information access management controls
• Security awareness and training programs
• Contingency planning and emergency access procedures
• Regular security evaluations and risk assessments

3. Physical Safeguards
Our physical safeguards protect against unauthorized access to ePHI:
• Secure data centers with controlled access
• Workstation security and device controls
• Media disposal and re-use procedures
• Environmental protections and monitoring systems

4. Technical Safeguards
We employ robust technical safeguards to secure ePHI:
• Access control systems with unique user identification
• Automatic logoff and encryption mechanisms
• Audit controls and integrity monitoring
• Person or entity authentication protocols
• Transmission security for data in transit

5. Business Associate Agreements (BAAs)
We maintain appropriate Business Associate Agreements with all covered entities, clearly defining:
• Permitted uses and disclosures of PHI
• Safeguarding obligations and responsibilities
• Reporting requirements for security incidents
• Termination procedures and data return obligations

6. Risk Assessment and Management
We conduct regular risk assessments to:
• Identify potential threats and vulnerabilities
• Assess current security measures
• Implement appropriate risk mitigation strategies
• Monitor and update security controls as needed

7. Employee Training and Awareness
All employees receive comprehensive HIPAA training covering:
• HIPAA privacy and security requirements
• Proper handling of PHI and ePHI
• Incident reporting procedures
• Ongoing security awareness updates

8. Incident Response
We maintain a robust incident response program including:
• 24/7 monitoring and detection capabilities
• Immediate incident containment procedures
• Thorough investigation and documentation
• Timely breach notification when required

9. Data Encryption and Security
We implement industry-standard encryption for:
• Data at rest using AES-256 encryption
• Data in transit using TLS 1.3 protocols
• Database encryption and key management
• Secure backup and recovery procedures

10. Audit and Monitoring
Our comprehensive audit program includes:
• Continuous monitoring of system access and activities
• Regular security assessments and penetration testing
• Third-party security certifications and compliance audits
• Detailed logging and audit trail maintenance

11. Ongoing Compliance
We maintain HIPAA compliance through:
• Regular policy reviews and updates
• Continuous staff training and education
• Technology updates and security enhancements
• Collaboration with industry experts and legal counsel

12. Your Role in HIPAA Compliance
As our client, you play a crucial role in maintaining HIPAA compliance:
• Ensure proper user access controls and permissions
• Report any suspected security incidents immediately
• Follow established procedures for handling PHI
• Participate in required training and awareness programs

For questions about our HIPAA compliance program or to report a security incident, please contact:

Resilient Healthcare HIPAA Security Officer
Email: hipaa@resilienthc.com
Phone: +1 888-874-0852 (Emergency Hotline)
Address: Dallas, TX',
  true
);