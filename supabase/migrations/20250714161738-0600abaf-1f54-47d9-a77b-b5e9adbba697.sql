UPDATE website_content 
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'),
  '{founder_image}',
  '"/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png"'
),
updated_at = now()
WHERE section_key = 'founder' AND is_active = true;