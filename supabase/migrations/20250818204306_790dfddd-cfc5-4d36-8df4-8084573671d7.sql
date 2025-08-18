-- Drop existing policies to recreate them more securely
DROP POLICY IF EXISTS "Admins can manage all leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;

-- Create explicit policies for leads table security
-- 1. Only admins can view leads
CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Only admins can update leads
CREATE POLICY "Only admins can update leads" 
ON public.leads
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Only admins can delete leads
CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Anyone can insert leads (for public lead capture forms)
CREATE POLICY "Anyone can create leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Log this security enhancement
SELECT log_system_activity(
  'security_enhancement',
  'Enhanced RLS policies for leads table to prevent unauthorized access to sensitive customer data',
  null,
  jsonb_build_object(
    'table', 'leads',
    'action', 'policy_update',
    'security_level', 'high'
  )
);