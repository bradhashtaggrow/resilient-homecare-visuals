-- Delete all existing news-related sections
DELETE FROM website_content WHERE section_key LIKE 'news_%';

-- Add the new News Hero section
INSERT INTO website_content (section_key, title, subtitle, description)
VALUES (
  'news_hero',
  'Healthcare News & Updates',
  'News',
  'Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare.'
);

-- Add the News Footer section
INSERT INTO website_content (section_key, title, description, button_text, content_data)
VALUES (
  'news_footer',
  'Join 500+ Healthcare Organizations',
  'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
  'Request Demo',
  '{
    "cta": {
      "title": "Join 500+ Healthcare Organizations",
      "description": "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
      "button_text": "Request Demo"
    }
  }'
);