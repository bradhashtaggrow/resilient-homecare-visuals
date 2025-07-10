-- Update the fetch-rss-posts function to create posts as unpublished by default
-- This ensures RSS posts require manual approval before being published

-- First, let's update any existing RSS posts that might be auto-published to unpublished
UPDATE blog_posts 
SET is_published = false, published_at = null
WHERE source = 'rss' AND is_published = true;

-- Add a comment to document the RSS workflow change
COMMENT ON COLUMN blog_posts.is_published IS 'RSS posts are created as unpublished and require manual approval before going live';