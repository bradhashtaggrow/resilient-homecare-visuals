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
  metric_date DATE NOT NULL DEFAULT CURRENT_DATE,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metric_name, metric_date)
);

-- Create system activity logs
CREATE TABLE public.system_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_type TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  user_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);