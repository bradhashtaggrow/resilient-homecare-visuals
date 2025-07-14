-- Restore footer sections to match reverted code state
-- Add back the footer sections for Care at Home and Clinicians pages

INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('care_at_home_footer', 'Ready to Transform Healthcare Delivery?', 'Partner with us to extend your clinical excellence into the home', 'Contact us today to learn how our technology platform can help you deliver better patient outcomes while capturing new revenue opportunities.', true),
('clinicians_footer', 'Join the Future of Healthcare', 'Be part of the team transforming patient care', 'Ready to make a meaningful impact in healthcare? Join our network of dedicated clinicians delivering exceptional care in the home setting.', true)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  updated_at = now();