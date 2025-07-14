-- Reset footer section to match restored state and fix real-time sync
UPDATE public.website_content 
SET 
  title = 'Resilient Healthcare',
  description = 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
  content_data = '{
    "logo": {
      "url": "/lovable-uploads/968ec75e-f823-449b-a633-9ca2ec166c66.png",
      "alt": "Resilient Healthcare Logo"
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

-- Ensure real-time functionality is enabled for website_content table
ALTER TABLE public.website_content REPLICA IDENTITY FULL;

-- Add table to realtime publication if not already added
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'website_content'
    AND schemaname = 'public'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;
  END IF;
END $$;