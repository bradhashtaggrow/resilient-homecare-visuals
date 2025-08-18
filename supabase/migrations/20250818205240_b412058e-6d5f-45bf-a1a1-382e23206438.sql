-- Update Data Security page email to info@resilienthc.org
UPDATE website_content 
SET description = REPLACE(description, 'security@resilienthc.com', 'info@resilienthc.org'),
    updated_at = now()
WHERE section_key = 'data_security_body' AND is_active = true;