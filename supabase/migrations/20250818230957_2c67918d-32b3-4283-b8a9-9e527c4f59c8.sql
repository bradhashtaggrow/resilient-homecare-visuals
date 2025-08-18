-- Create table for health systems burning platform items
CREATE TABLE public.health_systems_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_type TEXT NOT NULL, -- 'burning_platform' or 'benefit'
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT NOT NULL DEFAULT 'TrendingUp',
  gradient_class TEXT NOT NULL DEFAULT 'from-blue-500 to-blue-600',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.health_systems_items ENABLE ROW LEVEL SECURITY;

-- Create policies for health systems items
CREATE POLICY "Public can view active health systems items"
ON public.health_systems_items
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage health systems items"
ON public.health_systems_items
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_health_systems_items_updated_at
BEFORE UPDATE ON public.health_systems_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default burning platform items
INSERT INTO public.health_systems_items (section_type, title, description, icon_name, gradient_class, display_order) VALUES
('burning_platform', 'Improving Outcomes', 'Deliver evidence-based care at home that improves patient satisfaction and clinical outcomes while reducing readmission rates.', 'TrendingUp', 'from-blue-500 to-blue-600', 1),
('burning_platform', 'Expanding Services', 'Scale your care delivery beyond hospital walls to reach more patients in their preferred care setting - their homes.', 'Building', 'from-blue-400 to-blue-500', 2),
('burning_platform', 'Growing Revenue', 'Create new revenue streams while reducing operational costs through efficient home-based care delivery models.', 'DollarSign', 'from-blue-600 to-blue-700', 3),
('burning_platform', 'Preparing for Shifting Payment Models', 'Position your health system ahead of evolving payment structures with flexible, outcome-driven care delivery.', 'Zap', 'from-blue-500 to-cyan-500', 4);

-- Insert default benefit items
INSERT INTO public.health_systems_items (section_type, title, description, icon_name, gradient_class, display_order) VALUES
('benefit', 'Seamless integration with existing workflows', '', 'CheckCircle', 'from-blue-400 to-blue-600', 1),
('benefit', 'Comprehensive clinical oversight and support', '', 'CheckCircle', 'from-blue-400 to-blue-600', 2),
('benefit', 'Advanced technology platform for care coordination', '', 'CheckCircle', 'from-blue-400 to-blue-600', 3),
('benefit', 'Proven outcomes and patient satisfaction metrics', '', 'CheckCircle', 'from-blue-400 to-blue-600', 4),
('benefit', 'Flexible deployment options to meet your needs', '', 'CheckCircle', 'from-blue-400 to-blue-600', 5),
('benefit', 'Dedicated partnership and support team', '', 'CheckCircle', 'from-blue-400 to-blue-600', 6);

-- Insert health systems sections content
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active) VALUES
('health_systems_burning_platform', 'Why Partner with Us?', '', 'Healthcare is evolving rapidly. Position your health system for success with our comprehensive platform.', true),
('health_systems_benefits', 'Built for Success', '', 'Our platform is designed specifically for health systems looking to expand their reach and improve patient outcomes through innovative care delivery models.', true),
('health_systems_cta', 'Ready to Transform Healthcare Delivery?', '', 'Join leading health systems already using our platform to deliver exceptional care at home and improve patient outcomes.', true);