-- Clean up duplicate care-at-home entries and ensure consistent naming
DELETE FROM website_content WHERE section_key LIKE 'care-at-home%';

-- Make sure we have the correct page keys consistent with the routing
UPDATE website_content SET section_key = 'care_at_home_hero' WHERE section_key = 'care-at-home_hero';
UPDATE website_content SET section_key = 'care_at_home_services' WHERE section_key = 'care-at-home_services';
UPDATE website_content SET section_key = 'care_at_home_mobile' WHERE section_key = 'care-at-home_mobile';
UPDATE website_content SET section_key = 'care_at_home_value_prop' WHERE section_key = 'care-at-home_value_prop';
UPDATE website_content SET section_key = 'care_at_home_lead_gen' WHERE section_key = 'care-at-home_lead_gen';