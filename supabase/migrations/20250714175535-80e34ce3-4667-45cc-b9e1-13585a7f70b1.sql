-- Remove the footer sections for Care at Home and Clinicians pages
DELETE FROM public.website_content 
WHERE section_key IN ('care_at_home_footer', 'clinicians_footer');