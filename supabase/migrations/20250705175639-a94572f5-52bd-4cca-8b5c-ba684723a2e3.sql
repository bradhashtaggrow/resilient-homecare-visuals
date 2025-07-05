
-- Insert a default admin user with predefined credentials
-- Email: admin@healthcare.com
-- Password: Admin123!
-- Note: This will create the auth user and automatically trigger the profile creation

-- First, let's insert the admin user directly into auth.users
-- We'll use a specific UUID for consistency
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  '00000000-0000-0000-0000-000000000000'::uuid,
  'authenticated',
  'authenticated',
  'admin@healthcare.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Healthcare Admin"}',
  false,
  '',
  '',
  '',
  ''
);

-- Insert the admin role for this user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('00000000-0000-0000-0000-000000000001', 'admin');

-- Insert the profile for this user (in case the trigger doesn't fire)
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@healthcare.com',
  'Healthcare Admin',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;
