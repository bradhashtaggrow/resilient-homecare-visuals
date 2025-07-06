-- Update the footer content with the correct information
UPDATE website_content 
SET 
  title = 'Resilient Healthcare',
  subtitle = 'Extending care beyond the hospital', 
  description = 'Contact us to learn how our hospital-at-home platform can revolutionize patient care in your organization.',
  button_text = 'Contact Us',
  button_url = '#contact',
  updated_at = now()
WHERE section_key = 'footer';