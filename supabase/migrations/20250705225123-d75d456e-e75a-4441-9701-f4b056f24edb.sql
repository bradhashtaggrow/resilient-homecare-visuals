-- Update the existing value_proposition section's content_data with features from the value_proposition_features table
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