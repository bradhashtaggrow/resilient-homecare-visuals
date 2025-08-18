-- Enable real-time functionality for website_content table
-- This ensures that changes made in admin panel are immediately reflected on the website

-- First, ensure the table has full replica identity for complete row data during updates
ALTER TABLE public.website_content REPLICA IDENTITY FULL;

-- Add the website_content table to the realtime publication
-- This allows real-time subscriptions to receive change events
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;

-- Also ensure media_library is set up for real-time (used in admin)
ALTER TABLE public.media_library REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_library;

-- Ensure other content tables are also real-time enabled
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;

ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;

-- Add notification for real-time updates
INSERT INTO public.system_activity (activity_type, activity_description, metadata)
VALUES ('system_update', 'Enabled real-time synchronization for content management', '{"tables": ["website_content", "media_library", "services", "blog_posts"]}');