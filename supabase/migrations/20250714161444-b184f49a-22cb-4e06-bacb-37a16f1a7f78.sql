UPDATE website_content 
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'),
  '{founder_image}',
  '"/lovable-uploads/e8457cba-5dca-4b79-9948-541a9c24b983.png"'
),
updated_at = now()
WHERE section_key = 'founder' AND is_active = true;