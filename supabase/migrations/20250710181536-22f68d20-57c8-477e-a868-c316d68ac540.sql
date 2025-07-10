-- Insert default configuration
INSERT INTO public.system_config (site_name, maintenance_mode, debug_mode, cache_enabled, email_notifications, backup_frequency) 
VALUES ('Healthcare Platform', false, false, true, true, 'daily');

-- Insert default security settings
INSERT INTO public.security_settings (two_factor_enabled, password_min_length, require_special_chars, require_numbers, session_timeout, max_login_attempts)
VALUES (false, 8, true, true, 30, 5);

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
  INSERT INTO public.system_metrics (metric_name, metric_value, metric_date)
  VALUES (metric_name, metric_value, CURRENT_DATE)
  ON CONFLICT (metric_name, metric_date)
  DO UPDATE SET 
    metric_value = EXCLUDED.metric_value,
    recorded_at = now()
  RETURNING id INTO metric_id;
  
  RETURN metric_id;
END;
$$;