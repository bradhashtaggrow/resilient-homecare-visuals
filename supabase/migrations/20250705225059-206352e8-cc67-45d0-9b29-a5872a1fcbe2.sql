-- Update the value_proposition section's content_data with features from the value_proposition_features table
UPDATE website_content 
SET content_data = (
  SELECT jsonb_build_object(
    'features', 
    jsonb_agg(
      jsonb_build_object(
        'title', title,
        'subtitle', subtitle,
        'subtitle2', subtitle2,
        'description', description,
        'icon', icon_name
      ) ORDER BY display_order
    )
  )
  FROM value_proposition_features
)
WHERE section_key = 'value_proposition';

-- If the value_proposition section doesn't exist, create it
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
SELECT 
  'value_proposition',
  'We manage the work. You own the program.',
  '',
  '',
  jsonb_build_object(
    'features', 
    jsonb_agg(
      jsonb_build_object(
        'title', title,
        'subtitle', subtitle,
        'subtitle2', subtitle2,
        'description', description,
        'icon', icon_name
      ) ORDER BY display_order
    )
  ),
  true
FROM value_proposition_features
WHERE NOT EXISTS (
  SELECT 1 FROM website_content WHERE section_key = 'value_proposition'
);