-- Insert Our Core Values sections into website_content table
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
(
  'about_core_values_header',
  'Our Core Values',
  'The principles that guide everything we do in transforming healthcare delivery',
  NULL,
  true,
  '{}'::jsonb
),
(
  'about_core_values_compassionate_care',
  'Compassionate Care',
  NULL,
  'Every interaction is guided by empathy, respect, and genuine concern for patient well-being.',
  true,
  '{"icon": "Heart"}'::jsonb
),
(
  'about_core_values_excellence',
  'Excellence',
  NULL,
  'We maintain the highest standards in everything we do, from clinical care to customer service.',
  true,
  '{"icon": "Award"}'::jsonb
),
(
  'about_core_values_innovation',
  'Innovation',
  NULL,
  'Continuously improving healthcare delivery through technology and creative solutions.',
  true,
  '{"icon": "Lightbulb"}'::jsonb
);