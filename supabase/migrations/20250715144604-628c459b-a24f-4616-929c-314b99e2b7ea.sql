-- Enable realtime for website_content table
ALTER TABLE public.website_content REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;