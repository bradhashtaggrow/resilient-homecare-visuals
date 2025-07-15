-- Create admin user and update existing profile
-- First remove the old placeholder profile completely
DELETE FROM public.user_permissions WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM public.user_roles WHERE user_id = '00000000-0000-0000-0000-000000000001';
DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000001';

-- Set a specific UUID for the admin user to make it predictable
DO $$
DECLARE
  admin_user_id uuid := '11111111-1111-1111-1111-111111111111';
BEGIN
  -- Insert into auth.users with the specific UUID
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
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
    admin_user_id,
    'authenticated',
    'authenticated',
    'admin@resilienthc.com',
    crypt('Admin123!', gen_salt('bf')),
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

  -- The trigger will create the profile automatically, so we just need to add roles/permissions
  
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