-- Create leads table for capturing demo requests and form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information (Step 1)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  
  -- Company Information (Step 2)
  company_size TEXT,
  industry TEXT,
  current_solution TEXT,
  annual_revenue TEXT,
  
  -- Requirements (Step 3)
  primary_challenge TEXT,
  interested_services TEXT[],
  timeline TEXT,  
  budget_range TEXT,
  decision_maker BOOLEAN DEFAULT false,
  
  -- Scheduling (Step 4)
  preferred_date DATE,
  preferred_time TEXT,
  timezone TEXT,
  demo_type TEXT DEFAULT 'virtual',
  
  -- Metadata
  form_source TEXT DEFAULT 'website',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',
  lead_score INTEGER DEFAULT 0,
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage all leads" 
ON public.leads 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_status ON public.leads(status);

-- Enable realtime for the table
ALTER TABLE public.leads REPLICA IDENTITY FULL;