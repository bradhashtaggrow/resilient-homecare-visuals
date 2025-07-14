-- Insert Terms of Service page content sections
INSERT INTO public.website_content (section_key, title, subtitle, description, background_video_url, content_data, is_active)
VALUES 
  (
    'terms_hero',
    'Terms of Service',
    NULL,
    NULL,
    'https://iwgtwzpygoyohocbgqgm.supabase.co/storage/v1/object/public/media/backgrounds/0.14291029046511074.mp4',
    '{}',
    true
  ),
  (
    'terms_body',
    'Terms of Service Content',
    'Effective Date: July 14, 2025',
    'Effective Date: July 14, 2025

1. Acceptance of Terms
By accessing and using Resilient Healthcare services, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily access Resilient Healthcare services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.

3. Disclaimer
The materials on Resilient Healthcare are provided on an "as is" basis. Resilient Healthcare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall Resilient Healthcare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Resilient Healthcare, even if Resilient Healthcare or a Resilient Healthcare authorized representative has been notified orally or in writing of the possibility of such damage.

5. Accuracy of Materials
The materials appearing on Resilient Healthcare could include technical, typographical, or photographic errors. Resilient Healthcare does not warrant that any of the materials on its website are accurate, complete, or current.

6. Links
Resilient Healthcare has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Resilient Healthcare of the site.

7. Modifications
Resilient Healthcare may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Texas and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

9. Medical Disclaimer
The information provided by Resilient Healthcare is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.

10. Privacy Policy
Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.

11. Contact Information
Questions about the Terms of Service should be sent to us at info@resilienthc.com.',
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