-- Insert HIPAA Compliance page content sections
INSERT INTO public.website_content (section_key, title, subtitle, description, background_video_url, content_data, is_active)
VALUES 
  (
    'hipaa_hero',
    'HIPAA Compliance',
    NULL,
    NULL,
    'https://iwgtwzpygoyohocbgqgm.supabase.co/storage/v1/object/public/media/backgrounds/0.14291029046511074.mp4',
    '{}',
    true
  ),
  (
    'hipaa_body',
    'HIPAA Compliance Content',
    'Effective Date: July 14, 2025',
    'Effective Date: July 14, 2025

1. Our Commitment to HIPAA Compliance
Resilient Healthcare is committed to maintaining the highest standards of data protection and privacy in accordance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996 and its implementing regulations.

2. Protected Health Information (PHI)
We understand that Protected Health Information (PHI) is any information that can identify an individual and relates to their health condition, healthcare provision, or payment for healthcare services. This includes:

• Medical records and clinical data
• Billing and payment information
• Patient demographics and contact details
• Health plan enrollment information
• Electronic health records (EHR) data

3. Administrative Safeguards
Our administrative safeguards include:

• Designated HIPAA Security Officer responsible for developing and implementing security policies
• Regular workforce training on HIPAA compliance and data protection
• Assigned security responsibilities to all workforce members
• Information access management procedures
• Regular security evaluations and risk assessments
• Incident response and breach notification procedures

4. Physical Safeguards
We implement physical safeguards to protect electronic PHI:

• Secure facility access controls and visitor management
• Workstation and device access controls
• Secure disposal of PHI-containing media
• Assigned workstation use policies
• Environmental controls for server rooms and data centers

5. Technical Safeguards
Our technical safeguards include:

• Access control systems with unique user identification
• Role-based access controls and audit logs
• Encryption of PHI in transit and at rest
• Multi-factor authentication for system access
• Regular software updates and security patching
• Automatic logoff procedures for inactive sessions

6. Business Associate Agreements
We maintain Business Associate Agreements (BAAs) with all third-party vendors and partners who may have access to PHI. These agreements ensure that all business associates comply with HIPAA requirements and maintain appropriate safeguards.

7. Risk Assessment and Management
We conduct regular risk assessments to:

• Identify potential vulnerabilities in our systems
• Evaluate the likelihood and impact of potential threats
• Implement appropriate security measures to mitigate risks
• Monitor and review security controls effectiveness
• Update policies and procedures as needed

8. Breach Notification
In the event of a breach involving PHI, we follow strict protocols:

• Immediate containment and assessment of the breach
• Notification to affected individuals within 60 days
• Notification to the Department of Health and Human Services
• Documentation and analysis for prevention measures
• Implementation of corrective actions

9. Employee Training and Awareness
All Resilient Healthcare employees receive comprehensive HIPAA training that covers:

• Understanding of PHI and its protection requirements
• Proper handling and disposal of sensitive information
• Recognizing and reporting potential security incidents
• Understanding penalties for HIPAA violations
• Regular updates on policy changes and best practices

10. Patient Rights
Under HIPAA, patients have specific rights regarding their PHI:

• Right to access their own health information
• Right to request amendments to their records
• Right to request restrictions on PHI use and disclosure
• Right to receive an accounting of PHI disclosures
• Right to request alternative communication methods

11. Compliance Monitoring
We maintain ongoing compliance through:

• Regular internal audits and assessments
• Third-party security evaluations
• Continuous monitoring of access logs and system activities
• Review and update of policies and procedures
• Staff compliance monitoring and corrective actions

12. Contact Information
For questions about our HIPAA compliance practices or to report potential violations, please contact:

HIPAA Privacy Officer
Resilient Healthcare
Email: privacy@resilienthc.com
Phone: +1 888-874-0852
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