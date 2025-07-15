-- Create trigger to automatically create notifications when new leads are inserted
CREATE TRIGGER trigger_create_lead_notification
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION create_lead_notification();