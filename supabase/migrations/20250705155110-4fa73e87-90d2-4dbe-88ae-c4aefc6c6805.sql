
-- Create content management tables
CREATE TABLE public.website_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  button_text TEXT,
  button_url TEXT,
  background_video_url TEXT,
  background_image_url TEXT,
  mobile_background_url TEXT,
  laptop_background_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for service lines section
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  color TEXT NOT NULL DEFAULT 'blue',
  icon_name TEXT NOT NULL DEFAULT 'Activity',
  patient_image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service benefits table
CREATE TABLE public.service_benefits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  benefit_text TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'CheckCircle',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create media library table
CREATE TABLE public.media_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (website needs to read this)
CREATE POLICY "Public can view website content" ON public.website_content FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can view service benefits" ON public.service_benefits FOR SELECT USING (true);
CREATE POLICY "Public can view media" ON public.media_library FOR SELECT USING (true);

-- Create policies for admin management (you'll need authentication later)
CREATE POLICY "Admins can manage website content" ON public.website_content FOR ALL USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (true);
CREATE POLICY "Admins can manage service benefits" ON public.service_benefits FOR ALL USING (true);
CREATE POLICY "Admins can manage media" ON public.media_library FOR ALL USING (true);

-- Insert default content
INSERT INTO public.website_content (section_key, title, subtitle, description, button_text, button_url) VALUES
('hero', 'The Future of Healthcare', '', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', 'Request Demo', '#contact'),
('services_header', 'Fully Streamlined,', 'Uncompromisingly Simple', 'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.', '', ''),
('value_prop', 'Why Choose Resilient Healthcare', 'Proven Results', 'Our platform delivers measurable outcomes for healthcare organizations.', 'Learn More', '#features');

-- Insert default services
INSERT INTO public.services (title, subtitle, description, color, icon_name, patient_image_url, display_order) VALUES
('Outpatient PT Anywhere', 'Home-Based Therapy & Recovery', 'Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.', 'blue', 'Activity', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 1),
('Primary Care at Home', 'Transitional & Rural Care Extension', 'Physician and advanced practice providers delivering seamless care transitions and rural health services.', 'red', 'Heart', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 2),
('Acute Hospital-at-Home', 'CMS-Compliant Inpatient Care at Home', 'Full implementation support for hospital-level care delivery in the home environment.', 'cyan', 'Building2', 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 3);

-- Enable realtime
ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;
ALTER TABLE public.service_benefits REPLICA IDENTITY FULL;
ALTER TABLE public.media_library REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.website_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_benefits;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_library;

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Create storage policies
CREATE POLICY "Public can view media files" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Admins can update media files" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
CREATE POLICY "Admins can delete media files" ON storage.objects FOR DELETE USING (bucket_id = 'media');
