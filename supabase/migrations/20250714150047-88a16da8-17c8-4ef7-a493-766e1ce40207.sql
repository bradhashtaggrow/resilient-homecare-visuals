-- Insert the missing Value Proposition section into website_content
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  is_active,
  content_data
) VALUES (
  'value_proposition',
  'We Manage The Work.',
  'You Own The Program.',
  'Our comprehensive approach delivers measurable outcomes for hospitals, patients, and communities.',
  true,
  '{}'::jsonb
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  updated_at = now();