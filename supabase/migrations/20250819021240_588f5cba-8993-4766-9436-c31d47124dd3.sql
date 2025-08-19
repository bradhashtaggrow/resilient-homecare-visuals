-- Add display_order column to page_settings
ALTER TABLE public.page_settings ADD COLUMN display_order INTEGER DEFAULT 0;

-- Update existing records with proper ordering and fix healthsystems route name
UPDATE public.page_settings SET display_order = 1 WHERE page_name = 'home';
UPDATE public.page_settings SET display_order = 2 WHERE page_name = 'care-at-home';
UPDATE public.page_settings SET display_order = 3, page_name = 'health-systems' WHERE page_name = 'healthsystems';
UPDATE public.page_settings SET display_order = 4 WHERE page_name = 'clinicians';
UPDATE public.page_settings SET display_order = 5 WHERE page_name = 'patients';
UPDATE public.page_settings SET display_order = 6 WHERE page_name = 'news';
UPDATE public.page_settings SET display_order = 7 WHERE page_name = 'about';
UPDATE public.page_settings SET display_order = 8 WHERE page_name = 'contact';
UPDATE public.page_settings SET display_order = 9 WHERE page_name = 'data-security';
UPDATE public.page_settings SET display_order = 10 WHERE page_name = 'hipaa-compliance';
UPDATE public.page_settings SET display_order = 11 WHERE page_name = 'privacy-policy';
UPDATE public.page_settings SET display_order = 12 WHERE page_name = 'terms-of-service';