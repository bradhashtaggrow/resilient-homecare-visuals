-- Update hero section description to change "care-at-home" to "care at home"
UPDATE website_content 
SET description = REPLACE(description, 'care-at-home', 'care at home'),
    updated_at = NOW()
WHERE section_key = 'hero' 
AND description ILIKE '%care-at-home%';

-- Update mobile showcase title to change "Care-At-Home" to "Care at Home"
UPDATE website_content 
SET title = REPLACE(title, 'Care-At-Home', 'Care at Home'),
    updated_at = NOW()
WHERE section_key = 'mobile_showcase' 
AND title ILIKE '%Care-At-Home%';