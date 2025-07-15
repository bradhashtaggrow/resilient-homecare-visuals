-- Update the section keys to match what the system expects
UPDATE public.website_content 
SET section_key = 'security_hero'
WHERE section_key = 'data_security_hero';

UPDATE public.website_content 
SET section_key = 'security_body'
WHERE section_key = 'data_security_body';