UPDATE website_content 
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'),
  '{founder_image}',
  '"/lovable-uploads/6bbbcb74-14c2-446e-8045-368ff2cba29f.png"'
),
updated_at = now()
WHERE section_key = 'founder' AND is_active = true;