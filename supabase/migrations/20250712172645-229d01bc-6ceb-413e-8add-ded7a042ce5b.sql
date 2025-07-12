-- Revert database to match code restore point 32dfa3b
-- Remove all website_content data and reset to basic state

-- Clear all existing website content
DELETE FROM website_content;

-- Reset website_content to basic state for restore point 32dfa3b
-- Only essential content without any new features
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('hero', 'The Future of Healthcare', '', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true);

-- Ensure no realtime functionality is enabled
ALTER TABLE public.website_content REPLICA IDENTITY DEFAULT;

-- Remove from realtime publication if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'website_content') THEN
        ALTER publication supabase_realtime DROP TABLE public.website_content;
    END IF;
END $$;

-- Clean up any test notifications
DELETE FROM public.notifications 
WHERE type = 'lead' 
AND message LIKE '%demo request has been submitted by%';