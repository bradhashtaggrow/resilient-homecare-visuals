-- Insert terms of service hero section
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'terms_hero',
  'Terms of Service',
  'Effective Date: July 14, 2025',
  'Please read these terms carefully before using our healthcare technology services.',
  null,
  true
);

-- Insert terms of service body content
INSERT INTO public.website_content (
  section_key,
  title,
  description,
  is_active
) VALUES (
  'terms_body',
  'Terms of Service Content',
  '1. Acceptance of Terms
By accessing and using Resilient Healthcare''s services, you agree to be bound by these Terms of Service and all applicable laws and regulations.

2. Service Description
Resilient Healthcare provides healthcare technology solutions including but not limited to patient management systems, clinical decision support tools, and healthcare analytics platforms.

3. User Responsibilities
You agree to:
• Use our services in compliance with all applicable laws and regulations
• Maintain the confidentiality of your account credentials
• Provide accurate and complete information
• Not use our services for any unlawful or prohibited purpose
• Respect the privacy and rights of other users

4. Privacy and Data Protection
Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.

5. HIPAA Compliance
Our services are designed to comply with HIPAA regulations. As a covered entity or business associate, you agree to use our services in accordance with applicable HIPAA requirements.

6. Intellectual Property
All content, features, and functionality of our services are owned by Resilient Healthcare and are protected by copyright, trademark, and other intellectual property laws.

7. Service Availability
We strive to maintain continuous service availability but do not guarantee uninterrupted access. We may perform maintenance, updates, or modifications that may temporarily affect service availability.

8. Limitation of Liability
To the maximum extent permitted by law, Resilient Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.

9. Indemnification
You agree to indemnify and hold harmless Resilient Healthcare from any claims, damages, or expenses arising from your use of our services or violation of these Terms.

10. Termination
We may terminate or suspend your access to our services at any time for violation of these Terms or for any other reason at our sole discretion.

11. Governing Law
These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions.

12. Changes to Terms
We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website with an updated effective date.

13. Contact Information
If you have questions about these Terms of Service, please contact us at:

Resilient Healthcare
Email: info@resilienthc.com
Phone: +1 888-874-0852
Address: Dallas, TX',
  true
);