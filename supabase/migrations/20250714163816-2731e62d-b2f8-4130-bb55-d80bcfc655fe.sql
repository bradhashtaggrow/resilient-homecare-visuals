-- Create the footer section for the website content
INSERT INTO public.website_content (
  section_key,
  title,
  description,
  is_active,
  content_data
) VALUES (
  'footer',
  'Footer',
  'Website footer content',
  true,
  '{
    "links": [
      {
        "title": "Company", 
        "items": [
          {"name": "About Us", "url": "/about"},
          {"name": "Contact", "url": "/contact"},
          {"name": "News", "url": "/news"}
        ]
      },
      {
        "title": "Services",
        "items": [
          {"name": "Care at Home", "url": "/care-at-home"},
          {"name": "For Clinicians", "url": "/clinicians"},
          {"name": "For Patients", "url": "/patients"}
        ]
      },
      {
        "title": "Legal",
        "items": [
          {"name": "Privacy Policy", "url": "/privacy-policy"},
          {"name": "Terms of Service", "url": "/terms-of-service"},
          {"name": "HIPAA Compliance", "url": "/hipaa-compliance"}
        ]
      }
    ],
    "social": [
      {"name": "LinkedIn", "url": "#", "icon": "Linkedin"},
      {"name": "Twitter", "url": "#", "icon": "Twitter"}
    ],
    "contact": {
      "address": "123 Healthcare St, Medical City, MC 12345",
      "phone": "(555) 123-4567",
      "email": "info@resilienthealthcare.com"
    },
    "copyright": "© 2024 Resilient Healthcare. All rights reserved."
  }'::jsonb
) ON CONFLICT (section_key) DO UPDATE SET
  updated_at = now();