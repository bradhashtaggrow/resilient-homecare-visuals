-- Fix security vulnerability: Restrict security_settings access to admins only
-- Drop the policy that allows users with system_settings_view permission to read security settings
DROP POLICY IF EXISTS "Users with settings permissions can view security" ON public.security_settings;

-- Create a more restrictive policy that only allows admins to view security settings
CREATE POLICY "Only admins can view security settings"
ON public.security_settings
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Ensure the admin management policy covers all operations
DROP POLICY IF EXISTS "Admins can manage security settings" ON public.security_settings;

CREATE POLICY "Only admins can manage security settings"
ON public.security_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Log this critical security enhancement
SELECT log_system_activity(
  'critical_security_fix',
  'Restricted security_settings table access to admins only to prevent exposure of security policy details',
  null,
  jsonb_build_object(
    'table', 'security_settings',
    'vulnerability', 'exposed_security_policies',
    'action', 'access_restriction',
    'security_level', 'critical'
  )
);