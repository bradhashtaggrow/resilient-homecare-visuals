-- Delete the duplicate about_values section if it exists
DELETE FROM website_content WHERE section_key = 'about_values';