-- Add Health Systems page content sections to website_content table
INSERT INTO public.website_content (section_key, title, subtitle, description, button_text, button_url, is_active) VALUES
(
  'health_systems_hero',
  'Revolutionize Patient Care with Advanced Technology Solutions',
  'Partner with health systems and hospitals to deliver patient-centered, technology-driven care at home.',
  'Our platform grows your program through a consistent stream of patients for providers, ensuring patients receive top-quality care where they are most comfortable.',
  'Schedule a Demo',
  '/request-demo',
  true
),
(
  'health_systems_burning_platform',
  'The Challenge Health Systems Face Today',
  'Traditional healthcare delivery models are under unprecedented pressure',
  'Rising costs, staff shortages, and patient demands for convenient care create an urgent need for innovative solutions.',
  null,
  null,
  true
),
(
  'health_systems_benefits',
  'Why Leading Health Systems Choose Resilient Healthcare',
  'Transform your care delivery with our comprehensive platform',
  'Join the healthcare revolution and deliver exceptional patient outcomes while reducing costs and improving efficiency.',
  'Learn More',
  '/about',
  true
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  is_active = EXCLUDED.is_active,
  updated_at = now();