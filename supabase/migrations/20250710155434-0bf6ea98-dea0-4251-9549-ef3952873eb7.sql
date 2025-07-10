-- Revert database to match restored code state
-- Clean up any problematic RSS post data that might be causing issues

-- Reset all RSS posts to unpublished state and clear problematic image URLs
UPDATE blog_posts 
SET 
  is_published = false,
  published_at = null,
  featured_image_url = null
WHERE source = 'rss';

-- Reset RSS feed fetch timestamps to force fresh fetch
UPDATE rss_feeds 
SET last_fetched_at = null;

-- Clean up any orphaned or problematic blog post data
DELETE FROM blog_posts 
WHERE source = 'rss' 
  AND (title = '' OR title IS NULL OR content = '' OR content IS NULL);

-- Ensure database is in a clean state for RSS functionality