-- Create notifications table for real-time push notifications
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  source_table TEXT,
  source_id UUID,
  user_id UUID,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE POLICY "Admins can view all notifications" 
ON public.notifications 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "System can insert notifications" 
ON public.notifications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can update notifications" 
ON public.notifications 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_notifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_notifications_updated_at
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_notifications_updated_at();

-- Create function to automatically create notifications for new leads
CREATE OR REPLACE FUNCTION public.create_lead_notification()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (
    type,
    title,
    message,
    source_table,
    source_id,
    metadata
  ) VALUES (
    'lead',
    'New Demo Request',
    'A new demo request has been submitted by ' || NEW.first_name || ' ' || NEW.last_name || ' from ' || COALESCE(NEW.company, 'Unknown Company'),
    'leads',
    NEW.id,
    jsonb_build_object(
      'lead_id', NEW.id,
      'company', NEW.company,
      'email', NEW.email,
      'demo_type', NEW.demo_type,
      'form_source', NEW.form_source
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create notifications when new leads are inserted
CREATE TRIGGER create_lead_notification_trigger
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.create_lead_notification();

-- Enable real-time for notifications table
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;