UPDATE website_content 
SET title = 'Join Our Healthcare Organization Network', 
    updated_at = NOW() 
WHERE section_key = 'lead_generation' AND is_active = true;