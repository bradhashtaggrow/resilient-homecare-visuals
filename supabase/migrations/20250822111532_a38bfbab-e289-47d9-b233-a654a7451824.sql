UPDATE website_content 
SET content_data = jsonb_set(
    content_data,
    '{benefits,2}',
    '"Maintain/improve profitability with AI-driven automation"'
),
    updated_at = now()
WHERE section_key = 'about_for_hospitals';