-- Deactivate the "Partner with Leading Hospitals" and "Healthcare Excellence Metrics" sections on care at home page
UPDATE website_content 
SET is_active = false, updated_at = now()
WHERE section_key IN ('care_at_home_value_prop', 'care_at_home_stats');