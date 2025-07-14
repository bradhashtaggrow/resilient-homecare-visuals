-- Update existing privacy policy sections or insert if they don't exist
INSERT INTO public.website_content (section_key, title, subtitle, description, background_video_url, content_data, is_active)
VALUES 
  (
    'privacy_hero',
    'Privacy Policy',
    NULL,
    NULL,
    'https://iwgtwzpygoyohocbgqgm.supabase.co/storage/v1/object/public/media/backgrounds/0.14291029046511074.mp4',
    '{}',
    true
  ),
  (
    'privacy_body',
    'Privacy Policy Content',
    'Effective Date: July 14, 2025',
    'Effective Date: July 14, 2025

1. Introduction
Resilient Healthcare ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our healthcare technology services.

2. Information We Collect
Personal Information
We may collect personal information that you provide directly to us, including:

• Name, email address, and contact information
• Professional information (job title, organization)
• Demo requests and inquiry details
• Account credentials and preferences

Usage Information
We automatically collect certain information about your use of our services:

• Device information and browser type
• IP address and location data
• Pages visited and time spent on our website
• Referral sources and search terms

3. How We Use Your Information
We use the information we collect to:

• Provide and improve our healthcare technology services
• Respond to your inquiries and demo requests
• Send relevant updates and communications
• Analyze usage patterns to enhance user experience
• Comply with legal and regulatory requirements
• Protect against fraud and security threats

4. HIPAA Compliance
As a healthcare technology provider, Resilient Healthcare is committed to maintaining HIPAA compliance. We implement appropriate administrative, physical, and technical safeguards to protect protected health information (PHI) in accordance with HIPAA regulations.

5. Information Sharing
We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:

• With your explicit consent
• To comply with legal obligations
• With trusted service providers who assist in our operations
• To protect our rights, privacy, safety, or property
• In connection with a business transfer or merger

6. Data Security
We implement industry-standard security measures to protect your information, including:

• Encryption of data in transit and at rest
• Regular security assessments and audits
• Access controls and authentication protocols
• SOC 2 compliance and monitoring

7. Your Rights
You have the right to:

• Access and review your personal information
• Request corrections to inaccurate data
• Request deletion of your personal information
• Opt-out of marketing communications
• Request data portability

8. Cookies and Tracking
We use cookies and similar technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.

9. Third-Party Links
Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.

10. Changes to This Policy
We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated effective date.

11. Contact Us
If you have questions about this Privacy Policy or our privacy practices, please contact us at:

Resilient Healthcare
Email: info@resilienthc.com
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