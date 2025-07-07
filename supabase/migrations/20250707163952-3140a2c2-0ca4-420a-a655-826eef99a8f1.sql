-- Delete the "Partner with Leading Hospitals" and "Healthcare Excellence Metrics" sections completely
DELETE FROM website_content 
WHERE section_key IN ('care_at_home_value_prop', 'care_at_home_stats');