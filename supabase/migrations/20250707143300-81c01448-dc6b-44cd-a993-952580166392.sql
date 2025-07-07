-- Update all footer sections with the correct content
UPDATE website_content 
SET 
  title = 'Join 500+ Healthcare Organizations',
  subtitle = 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
  description = null,
  button_text = 'Request Demo',
  button_url = '/request-demo'
WHERE section_key LIKE '%_footer';

-- Also update the care at home footer we just created
UPDATE website_content 
SET 
  title = 'Join 500+ Healthcare Organizations',
  subtitle = 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
  description = null,
  button_text = 'Request Demo',
  button_url = '/request-demo'
WHERE section_key = 'care_at_home_footer';