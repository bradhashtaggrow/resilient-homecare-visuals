-- Remove the lead generation section for patients
DELETE FROM website_content 
WHERE section_key = 'patients_lead_generation';

-- Create the footer section for patients
INSERT INTO website_content (section_key, title, description, button_text, button_url, is_active)
VALUES (
  'patients_footer',
  'Join 500+ Healthcare Organizations',
  'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
  'Request Demo',
  '/request-demo',
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  updated_at = now();