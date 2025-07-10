-- Remove the individual core values sections
DELETE FROM website_content WHERE section_key IN (
  'about_core_values_header',
  'about_core_values_compassionate_care', 
  'about_core_values_excellence',
  'about_core_values_innovation'
);

-- Add a single core values section with the values as content_data
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
(
  'about_core_values',
  'Our Core Values',
  'The principles that guide everything we do in transforming healthcare delivery',
  NULL,
  true,
  '{
    "values": [
      {
        "id": "compassionate_care",
        "title": "Compassionate Care",
        "description": "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
        "icon_name": "Heart"
      },
      {
        "id": "excellence", 
        "title": "Excellence",
        "description": "We maintain the highest standards in everything we do, from clinical care to customer service.",
        "icon_name": "Award"
      },
      {
        "id": "innovation",
        "title": "Innovation", 
        "description": "Continuously improving healthcare delivery through technology and creative solutions.",
        "icon_name": "Lightbulb"
      }
    ]
  }'::jsonb
);