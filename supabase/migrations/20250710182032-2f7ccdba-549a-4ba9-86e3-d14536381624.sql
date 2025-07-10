-- Add site_logo column to system_config table
ALTER TABLE public.system_config 
ADD COLUMN site_logo TEXT DEFAULT '/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png';

-- Update the existing config record if it exists
UPDATE public.system_config 
SET site_logo = '/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png'
WHERE site_logo IS NULL;