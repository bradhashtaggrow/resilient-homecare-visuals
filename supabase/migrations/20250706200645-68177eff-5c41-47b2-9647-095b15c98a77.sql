-- Remove duplicate clinicians sections with double prefix
DELETE FROM website_content WHERE section_key LIKE 'clinicians_clinicians_%'