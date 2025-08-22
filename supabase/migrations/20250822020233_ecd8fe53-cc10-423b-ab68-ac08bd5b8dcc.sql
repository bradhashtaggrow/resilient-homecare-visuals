UPDATE website_content 
SET content_data = jsonb_set(
  content_data,
  '{benefits}',
  '["Expand patient capacity with efficient home-based care delivery.", "Reduce operational costs while improving patient satisfaction and outcomes.", "Integrate seamlessly with existing workflows and technology infrastructure.", "Access on-demand clinical workforce to meet fluctuating care demands."]'::jsonb
),
updated_at = now()
WHERE section_key = 'health_systems_benefits';