-- Delete the stock Care at Home sections from CMS
DELETE FROM website_content 
WHERE section_key IN ('care_at_home_features', 'care_at_home_benefits');