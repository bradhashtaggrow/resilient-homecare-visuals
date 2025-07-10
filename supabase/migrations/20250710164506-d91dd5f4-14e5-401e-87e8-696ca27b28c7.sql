-- Create employee types enum
CREATE TYPE public.employee_type AS ENUM (
  'admin',
  'manager', 
  'content_editor',
  'marketing_specialist',
  'customer_service',
  'demo_coordinator'
);

-- Create permissions enum for different pages/sections
CREATE TYPE public.permission_type AS ENUM (
  'dashboard_view',
  'analytics_view',
  'leads_view',
  'leads_manage',
  'content_view',
  'content_edit',
  'blog_view', 
  'blog_edit',
  'preview_view',
  'user_management_view',
  'user_management_edit',
  'system_settings_view',
  'system_settings_edit'
);

-- Add employee_type to user_roles table
ALTER TABLE public.user_roles 
ADD COLUMN employee_type employee_type DEFAULT 'customer_service';

-- Create user_permissions table for granular permissions
CREATE TABLE public.user_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  permission permission_type NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, permission)
);

-- Enable RLS on user_permissions
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_permissions
CREATE POLICY "Admins can manage all permissions" 
ON public.user_permissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own permissions" 
ON public.user_permissions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Update user_roles policies to handle employee types
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

CREATE POLICY "Admins can manage all roles and employee types" 
ON public.user_roles 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to get user permissions
CREATE OR REPLACE FUNCTION public.has_permission(_user_id uuid, _permission permission_type)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_permissions
    WHERE user_id = _user_id
      AND permission = _permission
  ) OR has_role(_user_id, 'admin'::app_role)
$$;

-- Create function to get default permissions by employee type
CREATE OR REPLACE FUNCTION public.get_default_permissions(_employee_type employee_type)
RETURNS permission_type[]
LANGUAGE sql
STABLE
AS $$
  SELECT CASE _employee_type
    WHEN 'admin' THEN ARRAY[
      'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
      'content_view', 'content_edit', 'blog_view', 'blog_edit', 
      'preview_view', 'user_management_view', 'user_management_edit',
      'system_settings_view', 'system_settings_edit'
    ]::permission_type[]
    WHEN 'manager' THEN ARRAY[
      'dashboard_view', 'analytics_view', 'leads_view', 'leads_manage',
      'content_view', 'content_edit', 'blog_view', 'blog_edit', 'preview_view'
    ]::permission_type[]
    WHEN 'content_editor' THEN ARRAY[
      'dashboard_view', 'content_view', 'content_edit', 
      'blog_view', 'blog_edit', 'preview_view'
    ]::permission_type[]
    WHEN 'marketing_specialist' THEN ARRAY[
      'dashboard_view', 'analytics_view', 'content_view', 
      'blog_view', 'blog_edit', 'preview_view'
    ]::permission_type[]
    WHEN 'customer_service' THEN ARRAY[
      'dashboard_view', 'leads_view'
    ]::permission_type[]
    WHEN 'demo_coordinator' THEN ARRAY[
      'dashboard_view', 'leads_view', 'leads_manage'
    ]::permission_type[]
    ELSE ARRAY[]::permission_type[]
  END
$$;