-- Enable real-time for all tables used by the website
-- This ensures the website gets real-time updates even when Lovable is not running

-- Enable REPLICA IDENTITY FULL for complete row data during updates
ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER TABLE public.value_proposition_features REPLICA IDENTITY FULL;
ALTER TABLE public.service_benefits REPLICA IDENTITY FULL;
ALTER TABLE public.media_library REPLICA IDENTITY FULL;

-- Add tables to the supabase_realtime publication for real-time functionality
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.value_proposition_features;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_benefits;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_library;