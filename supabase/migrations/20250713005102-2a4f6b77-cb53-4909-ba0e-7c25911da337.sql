
-- Revert database to match the restored code state
-- Remove all About page CMS content that was added

DELETE FROM website_content WHERE section_key IN (
  'about_hero',
  'about_why_choose', 
  'about_for_hospitals',
  'about_for_clinicians',
  'about_values',
  'about_footer'
);

-- This removes all the About page CMS content sections that were added
-- and restores the database to match the reverted codebase state
