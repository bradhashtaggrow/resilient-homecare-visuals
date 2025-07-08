-- Restore database to match reverted codebase
-- Remove all care_at_home website content sections that were added in recent migrations
DELETE FROM website_content 
WHERE section_key LIKE 'care_at_home%';

-- Remove clinicians website content sections that were modified
DELETE FROM website_content 
WHERE section_key LIKE 'clinicians%';

-- Remove any other website content sections that were added by recent migrations
DELETE FROM website_content 
WHERE section_key IN (
  'about_lead_gen', 'about_mobile', 'about_footer',
  'patients_lead_gen', 'patients_mobile', 'patients_footer', 
  'news_lead_gen', 'news_mobile', 'news_footer',
  'contact_lead_gen', 'contact_mobile', 'contact_footer'
);

-- This restores the database to a clean state matching the reverted codebase