-- Clean up database to match reverted code state
-- Remove website content entries that are no longer needed
DELETE FROM website_content WHERE section_key IN (
  'lead_generation',
  'hero_section', 
  'service_lines',
  'mobile_showcase',
  'value_proposition',
  'admin_dashboard',
  'founder_section',
  'stats_section'
);

-- Keep the core tables but remove the content management data
-- This restores the database to match the reverted codebase