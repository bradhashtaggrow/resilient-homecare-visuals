-- Restore database to match reverted code state at commit 92e7de5
-- This migration resets the database to a clean state matching the restored codebase

-- Clear all website content to reset to basic state
DELETE FROM website_content;

-- Reset website_content to match the restored codebase
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('hero', 'The Future of Healthcare', 'Advanced Technology Solutions', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true);

-- Reset any problematic RSS post data
UPDATE blog_posts 
SET 
  is_published = false,
  published_at = null,
  featured_image_url = null
WHERE source = 'rss';

-- Reset RSS feed fetch timestamps
UPDATE rss_feeds 
SET last_fetched_at = null;

-- Clean up any orphaned blog post data
DELETE FROM blog_posts 
WHERE source = 'rss' 
  AND (title = '' OR title IS NULL OR content = '' OR content IS NULL);

-- Clean up any problematic notifications that might be causing issues
DELETE FROM public.notifications 
WHERE type = 'lead' 
AND message LIKE '%demo request has been submitted by%';

-- Ensure realtime functionality is properly configured
ALTER TABLE public.website_content REPLICA IDENTITY DEFAULT;