-- Fix common Supabase warnings by adding missing triggers and constraints

-- Add missing updated_at triggers for tables that have updated_at columns but no triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add missing triggers for tables with updated_at columns
CREATE TRIGGER update_analytics_page_views_updated_at
    BEFORE UPDATE ON public.analytics_page_views
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analytics_sessions_updated_at
    BEFORE UPDATE ON public.analytics_sessions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
    BEFORE UPDATE ON public.notifications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_notifications_updated_at();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rss_feeds_updated_at
    BEFORE UPDATE ON public.rss_feeds
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_security_settings_updated_at
    BEFORE UPDATE ON public.security_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_config_updated_at
    BEFORE UPDATE ON public.system_config
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_value_proposition_features_updated_at
    BEFORE UPDATE ON public.value_proposition_features
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_content_updated_at
    BEFORE UPDATE ON public.website_content
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add missing lead notification trigger
CREATE TRIGGER create_lead_notification_trigger
    AFTER INSERT ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.create_lead_notification();

-- Add user creation trigger if not exists
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Add admin user update trigger
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_admin_user_id();

-- Enable realtime for key tables
ALTER publication supabase_realtime ADD TABLE public.leads;
ALTER publication supabase_realtime ADD TABLE public.notifications;
ALTER publication supabase_realtime ADD TABLE public.website_content;
ALTER publication supabase_realtime ADD TABLE public.blog_posts;

-- Add missing indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_session_id ON public.analytics_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read_at ON public.notifications(read_at);

-- Set REPLICA IDENTITY FULL for realtime tables
ALTER TABLE public.leads REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER TABLE public.blog_posts REPLICA IDENTITY FULL;