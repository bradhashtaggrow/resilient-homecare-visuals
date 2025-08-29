UPDATE website_content 
SET content_data = jsonb_set(
  content_data,
  '{benefits}',
  '["Reduce readmissions while optimizing care efficiency", "Scale hospital-at-home services with on-demand contract clinicians", "Maintain/improve profitability with AI-driven automation"]'::jsonb
)
WHERE section_key = 'about_for_hospitals' AND is_active = true;