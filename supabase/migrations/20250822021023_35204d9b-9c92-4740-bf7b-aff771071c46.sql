UPDATE website_content 
SET description = REPLACE(description, 'privacy@resilienthc.org', 'info@ResilientHC.org'),
    updated_at = now()
WHERE section_key = 'hipaa_body' AND description LIKE '%privacy@resilienthc.org%';