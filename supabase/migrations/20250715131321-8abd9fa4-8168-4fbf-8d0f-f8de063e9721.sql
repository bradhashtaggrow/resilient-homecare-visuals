UPDATE public.website_content 
SET content_data = content_data || '{"order": "2"}'::jsonb
WHERE section_key = 'home_service_lines'