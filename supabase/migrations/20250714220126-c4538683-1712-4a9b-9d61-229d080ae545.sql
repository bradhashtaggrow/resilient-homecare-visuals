-- Delete the Featured Articles section from website_content
DELETE FROM public.website_content 
WHERE section_key = 'news_featured';