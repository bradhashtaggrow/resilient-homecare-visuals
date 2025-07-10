-- Enable RLS
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_activity ENABLE ROW LEVEL SECURITY;

-- Create policies for system_config
CREATE POLICY "Admins can manage system config" 
ON public.system_config 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users with settings permissions can view config" 
ON public.system_config 
FOR SELECT 
USING (has_permission(auth.uid(), 'system_settings_view'::permission_type));

-- Create policies for security_settings
CREATE POLICY "Admins can manage security settings" 
ON public.security_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users with settings permissions can view security" 
ON public.security_settings 
FOR SELECT 
USING (has_permission(auth.uid(), 'system_settings_view'::permission_type));

-- Create policies for system_metrics
CREATE POLICY "Admins can manage system metrics" 
ON public.system_metrics 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users with settings permissions can view metrics" 
ON public.system_metrics 
FOR SELECT 
USING (has_permission(auth.uid(), 'system_settings_view'::permission_type));

-- Create policies for system_activity
CREATE POLICY "Admins can view all system activity" 
ON public.system_activity 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert activity logs" 
ON public.system_activity 
FOR INSERT 
WITH CHECK (true);