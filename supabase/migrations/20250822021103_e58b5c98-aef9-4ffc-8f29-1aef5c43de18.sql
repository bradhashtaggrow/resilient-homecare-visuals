UPDATE website_content 
SET description = REPLACE(
  REPLACE(description, 'security@resilienthc.org', 'info@ResilientHC.org'),
  'Security Hotline: Available 24/7 - ', ''
),
    updated_at = now()
WHERE section_key = 'hipaa_body' AND (description LIKE '%security@resilienthc.org%' OR description LIKE '%Security Hotline%');