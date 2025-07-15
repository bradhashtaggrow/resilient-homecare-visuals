-- Check and create only missing triggers and configurations

-- Create triggers only if they don't exist
DO $$
BEGIN
    -- Check and create missing triggers for updated_at columns
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_analytics_page_views_updated_at') THEN
        CREATE TRIGGER update_analytics_page_views_updated_at
            BEFORE UPDATE ON public.analytics_page_views
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_analytics_sessions_updated_at') THEN
        CREATE TRIGGER update_analytics_sessions_updated_at
            BEFORE UPDATE ON public.analytics_sessions
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_updated_at') THEN
        CREATE TRIGGER update_blog_posts_updated_at
            BEFORE UPDATE ON public.blog_posts
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_leads_updated_at') THEN
        CREATE TRIGGER update_leads_updated_at
            BEFORE UPDATE ON public.leads
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_profiles_updated_at') THEN
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON public.profiles
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_rss_feeds_updated_at') THEN
        CREATE TRIGGER update_rss_feeds_updated_at
            BEFORE UPDATE ON public.rss_feeds
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_security_settings_updated_at') THEN
        CREATE TRIGGER update_security_settings_updated_at
            BEFORE UPDATE ON public.security_settings
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at') THEN
        CREATE TRIGGER update_services_updated_at
            BEFORE UPDATE ON public.services
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_system_config_updated_at') THEN
        CREATE TRIGGER update_system_config_updated_at
            BEFORE UPDATE ON public.system_config
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_value_proposition_features_updated_at') THEN
        CREATE TRIGGER update_value_proposition_features_updated_at
            BEFORE UPDATE ON public.value_proposition_features
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_website_content_updated_at') THEN
        CREATE TRIGGER update_website_content_updated_at
            BEFORE UPDATE ON public.website_content
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    -- Create lead notification trigger if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'create_lead_notification_trigger') THEN
        CREATE TRIGGER create_lead_notification_trigger
            AFTER INSERT ON public.leads
            FOR EACH ROW
            EXECUTE FUNCTION public.create_lead_notification();
    END IF;
END
$$;