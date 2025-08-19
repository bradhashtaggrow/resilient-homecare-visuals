-- Create table for managing page visibility
CREATE TABLE public.page_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL UNIQUE,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  display_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view page settings" 
ON public.page_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage page settings" 
ON public.page_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_page_settings_updated_at
BEFORE UPDATE ON public.page_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default page settings
INSERT INTO public.page_settings (page_name, display_name, description, is_enabled) VALUES
('home', 'Home Page', 'Main landing page of the website', true),
('about', 'About Page', 'Company information and team details', true),
('clinicians', 'Clinicians Page', 'Information for healthcare professionals', true),
('patients', 'Patients Page', 'Information for patients and families', true),
('healthsystems', 'Health Systems Page', 'Information for health system partners', true),
('care-at-home', 'Care at Home Page', 'Home care services information', true),
('news', 'News Page', 'Latest news and blog posts', true),
('contact', 'Contact Page', 'Contact information and form', true),
('data-security', 'Data Security Page', 'Security and privacy information', true),
('hipaa-compliance', 'HIPAA Compliance Page', 'HIPAA compliance details', true),
('privacy-policy', 'Privacy Policy Page', 'Privacy policy and terms', true),
('terms-of-service', 'Terms of Service Page', 'Terms of service agreement', true);