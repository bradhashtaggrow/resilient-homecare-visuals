-- Restore database to match current working state after revert
-- Clean up any problematic content that might be causing issues

-- Reset website_content to clean working state
DELETE FROM website_content WHERE section_key NOT IN ('hero', 'footer');

-- Ensure hero section is properly configured
UPDATE website_content 
SET 
  title = 'The Future of Healthcare',
  subtitle = 'Advanced Technology Solutions',
  description = 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.',
  is_active = true,
  background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  content_data = '{}'::jsonb,
  button_text = null,
  button_url = null,
  background_image_url = null,
  laptop_background_url = null,
  mobile_background_url = null
WHERE section_key = 'hero';

-- Insert hero section if it doesn't exist
INSERT INTO website_content (section_key, title, subtitle, description, is_active, background_video_url)
SELECT 'hero', 'The Future of Healthcare', 'Advanced Technology Solutions', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
WHERE NOT EXISTS (SELECT 1 FROM website_content WHERE section_key = 'hero');

-- Clean up any problematic blog posts
UPDATE blog_posts 
SET 
  is_published = false,
  published_at = null
WHERE source = 'rss' AND (content = '' OR content IS NULL OR title = '' OR title IS NULL);

-- Clean up notifications
DELETE FROM notifications 
WHERE type = 'lead' 
AND message LIKE '%demo request has been submitted by%';

-- Ensure realtime is properly configured
ALTER TABLE public.website_content REPLICA IDENTITY FULL;

-- Add to realtime publication if not already added
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND tablename = 'website_content'
    AND schemaname = 'public'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;
  END IF;
END $$;