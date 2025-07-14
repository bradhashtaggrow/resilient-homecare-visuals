-- Update the footer section with image upload capability and contact info
UPDATE public.website_content 
SET 
  title = 'Logo Upload',
  description = 'info@resilienthc.com
+1 888-874-0852
Dallas, TX',
  content_data = '{
    "logo": {
      "url": "/lovable-uploads/968ec75e-f823-449b-a633-9ca2ec166c66.png",
      "alt": "Resilient Healthcare Logo",
      "uploadEnabled": true
    },
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
      "address": "Dallas, TX",
      "phone": "+1 888-874-0852",
      "email": "info@resilienthc.com"
    },
    "copyright": "© 2024 Resilient Healthcare. All rights reserved."
  }'::jsonb,
  updated_at = now()
WHERE section_key = 'footer';