-- Create analytics events table
CREATE TABLE public.analytics_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  user_id UUID,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics sessions table
CREATE TABLE public.analytics_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  page_count INTEGER DEFAULT 1,
  duration_seconds INTEGER,
  entry_page TEXT,
  exit_page TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  is_bounce BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page views aggregation table for faster queries
CREATE TABLE public.analytics_page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_url TEXT NOT NULL,
  view_date DATE NOT NULL,
  view_count INTEGER DEFAULT 1,
  unique_visitors INTEGER DEFAULT 1,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  avg_session_duration INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_url, view_date)
);

-- Enable RLS on analytics tables
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics tables
CREATE POLICY "Anyone can insert analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events" 
ON public.analytics_events 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_permission(auth.uid(), 'analytics_view'::permission_type));

CREATE POLICY "Anyone can insert analytics sessions" 
ON public.analytics_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update analytics sessions" 
ON public.analytics_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Admins can view all analytics sessions" 
ON public.analytics_sessions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_permission(auth.uid(), 'analytics_view'::permission_type));

CREATE POLICY "Admins can view all page views analytics" 
ON public.analytics_page_views 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_permission(auth.uid(), 'analytics_view'::permission_type));

-- Create indexes for better performance
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_event_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_page_url ON public.analytics_events(page_url);
CREATE INDEX idx_analytics_events_session_id ON public.analytics_events(session_id);

CREATE INDEX idx_analytics_sessions_started_at ON public.analytics_sessions(started_at DESC);
CREATE INDEX idx_analytics_sessions_session_id ON public.analytics_sessions(session_id);

CREATE INDEX idx_analytics_page_views_date ON public.analytics_page_views(view_date DESC);
CREATE INDEX idx_analytics_page_views_url ON public.analytics_page_views(page_url);

-- Create function to get analytics summary
CREATE OR REPLACE FUNCTION public.get_analytics_summary(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE(
  total_page_views BIGINT,
  unique_visitors BIGINT,
  total_sessions BIGINT,
  avg_session_duration DECIMAL,
  bounce_rate DECIMAL,
  top_pages JSON,
  traffic_sources JSON,
  device_breakdown JSON
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  WITH page_views AS (
    SELECT COUNT(*) as total_views,
           COUNT(DISTINCT session_id) as unique_sessions
    FROM analytics_events 
    WHERE event_type = 'page_view' 
    AND created_at::date BETWEEN start_date AND end_date
  ),
  sessions_data AS (
    SELECT COUNT(*) as total_sessions,
           AVG(duration_seconds) as avg_duration,
           AVG(CASE WHEN is_bounce THEN 1 ELSE 0 END) * 100 as bounce_rate
    FROM analytics_sessions
    WHERE started_at::date BETWEEN start_date AND end_date
  ),
  top_pages AS (
    SELECT json_agg(
      json_build_object(
        'page', page_url,
        'views', view_count
      ) ORDER BY view_count DESC
    ) as pages
    FROM (
      SELECT page_url, COUNT(*) as view_count
      FROM analytics_events
      WHERE event_type = 'page_view'
      AND created_at::date BETWEEN start_date AND end_date
      GROUP BY page_url
      ORDER BY view_count DESC
      LIMIT 10
    ) t
  ),
  traffic_sources AS (
    SELECT json_agg(
      json_build_object(
        'source', COALESCE(referrer, 'Direct'),
        'sessions', session_count
      ) ORDER BY session_count DESC
    ) as sources
    FROM (
      SELECT COALESCE(referrer, 'Direct') as referrer, COUNT(*) as session_count
      FROM analytics_sessions
      WHERE started_at::date BETWEEN start_date AND end_date
      GROUP BY referrer
      ORDER BY session_count DESC
      LIMIT 10
    ) t
  ),
  device_data AS (
    SELECT json_agg(
      json_build_object(
        'device', device_type,
        'sessions', session_count
      )
    ) as devices
    FROM (
      SELECT COALESCE(device_type, 'Unknown') as device_type, COUNT(*) as session_count
      FROM analytics_sessions
      WHERE started_at::date BETWEEN start_date AND end_date
      GROUP BY device_type
    ) t
  )
  SELECT 
    pv.total_views,
    pv.unique_sessions,
    sd.total_sessions,
    sd.avg_duration,
    sd.bounce_rate,
    tp.pages,
    ts.sources,
    dd.devices
  FROM page_views pv
  CROSS JOIN sessions_data sd
  CROSS JOIN top_pages tp
  CROSS JOIN traffic_sources ts
  CROSS JOIN device_data dd;
$$;

-- Create trigger to update updated_at column
CREATE TRIGGER update_analytics_sessions_updated_at
BEFORE UPDATE ON public.analytics_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analytics_page_views_updated_at
BEFORE UPDATE ON public.analytics_page_views
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();