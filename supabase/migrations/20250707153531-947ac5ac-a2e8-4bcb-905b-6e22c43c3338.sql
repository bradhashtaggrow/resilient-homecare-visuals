-- Remove the non-existent "Our Care Solutions" section from care at home page
DELETE FROM website_content 
WHERE section_key = 'care_at_home_services';