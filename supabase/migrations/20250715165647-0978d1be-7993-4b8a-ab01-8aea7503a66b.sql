-- Enable REPLICA IDENTITY FULL for complete row data during updates
-- This ensures real-time updates include all necessary data

ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;
ALTER TABLE public.value_proposition_features REPLICA IDENTITY FULL;
ALTER TABLE public.service_benefits REPLICA IDENTITY FULL;
ALTER TABLE public.media_library REPLICA IDENTITY FULL;