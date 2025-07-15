-- Update admin user to admin@resilienthc.com and ensure it's the only admin

-- First, let's check if we have any existing admin users and update them
-- Update the email in profiles table for any existing admin users
UPDATE public.profiles 
SET email = 'admin@resilienthc.com'
WHERE id IN (
  SELECT ur.user_id 
  FROM public.user_roles ur 
  WHERE ur.role = 'admin'
);

-- Remove all existing admin roles to ensure clean state
DELETE FROM public.user_roles WHERE role = 'admin';

-- Remove all admin permissions to ensure clean state  
DELETE FROM public.user_permissions 
WHERE permission IN (
  'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
  'content_view', 'content_edit', 'blog_view', 'blog_edit', 
  'preview_view', 'user_management_view', 'user_management_edit',
  'system_settings_view', 'system_settings_edit'
);

-- Create or update the profile for the new admin user
-- Note: This assumes the user will be created in Supabase Auth separately
-- We'll use a placeholder UUID that should be replaced when the actual user signs up
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001', -- Placeholder UUID
  'admin@resilienthc.com',
  'Resilient Healthcare Admin',
  now(),
  now()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  updated_at = now();

-- Assign admin role to the new admin user
INSERT INTO public.user_roles (user_id, role, created_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin',
  now()
) ON CONFLICT (user_id, role) DO NOTHING;

-- Grant all admin permissions to the new admin user
INSERT INTO public.user_permissions (user_id, permission, created_at)
SELECT 
  '00000000-0000-0000-0000-000000000001',
  unnest(ARRAY[
    'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
    'content_view', 'content_edit', 'blog_view', 'blog_edit', 
    'preview_view', 'user_management_view', 'user_management_edit',
    'system_settings_view', 'system_settings_edit'
  ]::permission_type[]),
  now()
ON CONFLICT (user_id, permission) DO NOTHING;

-- Create a function to update admin user ID when they actually sign up
CREATE OR REPLACE FUNCTION public.update_admin_user_id()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- If the new user email is admin@resilienthc.com, update all references
  IF NEW.email = 'admin@resilienthc.com' THEN
    -- Update user_roles
    UPDATE public.user_roles 
    SET user_id = NEW.id 
    WHERE user_id = '00000000-0000-0000-0000-000000000001';
    
    -- Update user_permissions  
    UPDATE public.user_permissions 
    SET user_id = NEW.id 
    WHERE user_id = '00000000-0000-0000-0000-000000000001';
    
    -- Update profiles (this will be handled by the existing handle_new_user trigger)
    DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000001';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically update admin references when admin signs up
DROP TRIGGER IF EXISTS on_admin_user_signup ON auth.users;
CREATE TRIGGER on_admin_user_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.update_admin_user_id();