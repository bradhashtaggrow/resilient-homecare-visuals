-- Update the admin_dashboard section with the CTA content
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  button_text,
  button_url,
  is_active,
  content_data
) VALUES (
  'admin_dashboard',
  'Take Full Control Of Your Business 2',
  'Comprehensive Management Tools',
  'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.',
  'Request Demo',
  '#',
  true,
  jsonb_build_object(
    'cta_headline', 'Ready to Transform Your Healthcare Operations?',
    'cta_description', 'Join forward-thinking healthcare organizations who''ve already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration.'
  )
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();