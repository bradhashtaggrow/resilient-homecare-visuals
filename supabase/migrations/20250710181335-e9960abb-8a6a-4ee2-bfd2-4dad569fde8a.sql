-- Create system configuration table
CREATE TABLE public.system_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Healthcare Platform',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  debug_mode BOOLEAN NOT NULL DEFAULT false,
  cache_enabled BOOLEAN NOT NULL DEFAULT true,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  backup_frequency TEXT NOT NULL DEFAULT 'daily' CHECK (backup_frequency IN ('daily', 'weekly', 'monthly')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create security settings table
CREATE TABLE public.security_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  password_min_length INTEGER NOT NULL DEFAULT 8,
  require_special_chars BOOLEAN NOT NULL DEFAULT true,
  require_numbers BOOLEAN NOT NULL DEFAULT true,
  session_timeout INTEGER NOT NULL DEFAULT 30,
  max_login_attempts INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create system metrics table for monitoring
CREATE TABLE public.system_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metric_name, DATE(recorded_at))
);

-- Create system activity logs
CREATE TABLE public.system_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_type TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

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

-- Insert default configuration
INSERT INTO public.system_config (site_name, maintenance_mode, debug_mode, cache_enabled, email_notifications, backup_frequency) 
VALUES ('Healthcare Platform', false, false, true, true, 'daily')
ON CONFLICT DO NOTHING;

-- Insert default security settings
INSERT INTO public.security_settings (two_factor_enabled, password_min_length, require_special_chars, require_numbers, session_timeout, max_login_attempts)
VALUES (false, 8, true, true, 30, 5)
ON CONFLICT DO NOTHING;

-- Create triggers for updated_at
CREATE TRIGGER update_system_config_updated_at
BEFORE UPDATE ON public.system_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_security_settings_updated_at
BEFORE UPDATE ON public.security_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to log system activities
CREATE OR REPLACE FUNCTION log_system_activity(
  activity_type TEXT,
  activity_description TEXT,
  user_id UUID DEFAULT auth.uid(),
  metadata JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.system_activity (activity_type, activity_description, user_id, metadata)
  VALUES (activity_type, activity_description, user_id, metadata)
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$;

-- Function to record system metrics
CREATE OR REPLACE FUNCTION record_system_metric(
  metric_name TEXT,
  metric_value JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  metric_id UUID;
BEGIN
  INSERT INTO public.system_metrics (metric_name, metric_value)
  VALUES (metric_name, metric_value)
  ON CONFLICT (metric_name, DATE(recorded_at))
  DO UPDATE SET 
    metric_value = EXCLUDED.metric_value,
    recorded_at = now()
  RETURNING id INTO metric_id;
  
  RETURN metric_id;
END;
$$;