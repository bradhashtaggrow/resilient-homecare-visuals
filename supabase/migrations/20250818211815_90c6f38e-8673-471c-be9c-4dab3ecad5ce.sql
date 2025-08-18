-- Ensure tables have full replica identity for complete real-time data
ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER TABLE public.media_library REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;

-- Add notification for real-time sync verification
INSERT INTO public.system_activity (activity_type, activity_description, metadata)
VALUES ('system_update', 'Verified and set REPLICA IDENTITY FULL for real-time synchronization', '{"tables": ["website_content", "media_library", "services", "blog_posts"]}');