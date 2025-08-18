-- Update the footer title to "Resilient Healthcare Corp"
UPDATE website_content 
SET title = 'Resilient Healthcare Corp',
    updated_at = now()
WHERE section_key = 'footer' AND is_active = true;