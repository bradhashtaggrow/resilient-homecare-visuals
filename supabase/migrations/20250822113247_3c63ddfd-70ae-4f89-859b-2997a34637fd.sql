UPDATE website_content 
SET content_data = jsonb_set(
    content_data,
    '{benefits,0}',
    '"Work on your schedule—join the home healthcare revolution"'
),
    updated_at = now()
WHERE section_key = 'about_for_clinicians';