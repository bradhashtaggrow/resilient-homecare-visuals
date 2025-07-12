-- Revert database to match code restore point 820ff6a
-- Remove recent video and content additions

-- Remove video URLs from website_content
UPDATE website_content SET 
  background_video_url = NULL
WHERE section_key IN ('hero', 'mobile', 'admin_dashboard');

-- Remove content_data from mobile and admin_dashboard sections
UPDATE website_content SET 
  content_data = '{}'::jsonb
WHERE section_key IN ('mobile', 'admin_dashboard');

-- Remove realtime from website_content table  
ALTER publication supabase_realtime DROP TABLE public.website_content;
ALTER TABLE public.website_content REPLICA IDENTITY DEFAULT;

-- Clean up any test notifications that were added
DELETE FROM public.notifications 
WHERE type = 'lead' 
AND message LIKE '%demo request has been submitted by%'
AND (
  message LIKE '%John Smith%' 
  OR message LIKE '%Sarah Johnson%' 
  OR message LIKE '%Michael Davis%'
);