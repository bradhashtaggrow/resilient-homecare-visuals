
-- Delete the duplicate Leading Hospitals section
DELETE FROM website_content WHERE section_key = 'care_at_home_hospitals';

-- Delete the individual sections that are now consolidated into tabs
DELETE FROM website_content WHERE section_key IN (
  'care_at_home_referrals',
  'care_at_home_delivery', 
  'care_at_home_workflows',
  'care_at_home_payment'
);
