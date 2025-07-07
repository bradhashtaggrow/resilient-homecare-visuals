-- Update the care_at_home_lead_gen section to be renamed as Hero Section
UPDATE website_content 
SET section_key = 'care_at_home_hero'
WHERE section_key = 'care_at_home_lead_gen';