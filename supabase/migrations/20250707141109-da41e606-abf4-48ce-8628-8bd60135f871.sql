
-- Revert database to match the restored version
-- Remove all website content entries that were added for page CMS functionality

DELETE FROM website_content WHERE section_key IN (
  -- About page sections
  'about_hero',
  'about_content', 
  'about_why_resilient',
  'about_hospital_benefits',
  'about_clinician_benefits',
  'about_values',
  
  -- Clinicians page sections
  'clinicians_hero',
  'clinicians_content',
  'clinicians_services',
  
  -- Care At Home page sections
  'care_at_home_hero',
  'care_at_home_content',
  'care_at_home_services',
  
  -- Home page sections
  'home_hero',
  'home_service_lines',
  'home_value_proposition',
  'home_stats',
  'home_mobile_showcase',
  'home_founder',
  'home_admin_dashboard',
  'home_lead_generation',
  
  -- Contact page sections
  'contact_hero',
  'contact_content',
  'contact_form'
);

-- This restores the database to the state it was in before the page CMS additions
