UPDATE website_content 
SET description = REPLACE(
  REPLACE(description, '(Security Hotline)', ''),
  'Emergency Security Incidents: info@ResilientHC.org', ''
),
    updated_at = now()
WHERE section_key = 'security_body';