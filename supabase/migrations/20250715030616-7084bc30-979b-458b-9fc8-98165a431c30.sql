-- Manually create admin user in auth.users and set up permissions
-- This migration directly creates the admin user in Supabase Auth

-- First clean up any existing admin data
DELETE FROM public.user_permissions WHERE permission IN (
  'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
  'content_view', 'content_edit', 'blog_view', 'blog_edit', 
  'preview_view', 'user_management_view', 'user_management_edit',
  'system_settings_view', 'system_settings_edit'
);
DELETE FROM public.user_roles WHERE role = 'admin';
DELETE FROM public.profiles WHERE email = 'admin@resilienthc.com';

-- Insert admin user directly into auth.users
-- Password: Admin123! (hashed with bcrypt)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@resilienthc.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Resilient Healthcare Admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Get the user ID we just created
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Get the admin user ID
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'admin@resilienthc.com' 
  LIMIT 1;

  -- Create profile for admin user
  INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
  VALUES (
    admin_user_id,
    'admin@resilienthc.com',
    'Resilient Healthcare Admin',
    now(),
    now()
  );

  -- Assign admin role
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (admin_user_id, 'admin', now());

  -- Grant all admin permissions
  INSERT INTO public.user_permissions (user_id, permission, created_at)
  SELECT 
    admin_user_id,
    unnest(ARRAY[
      'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
      'content_view', 'content_edit', 'blog_view', 'blog_edit', 
      'preview_view', 'user_management_view', 'user_management_edit',
      'system_settings_view', 'system_settings_edit'
    ]::permission_type[]),
    now();
    
END $$;