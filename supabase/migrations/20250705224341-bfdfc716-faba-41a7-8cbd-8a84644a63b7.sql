-- Create value proposition features table
CREATE TABLE public.value_proposition_features (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  subtitle2 TEXT,
  description TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Target',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.value_proposition_features ENABLE ROW LEVEL SECURITY;

-- Create policies for public viewing
CREATE POLICY "Public can view value proposition features" 
ON public.value_proposition_features 
FOR SELECT 
USING (true);

-- Create policies for admin management
CREATE POLICY "Admins can manage value proposition features" 
ON public.value_proposition_features 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_value_proposition_features_updated_at
BEFORE UPDATE ON public.value_proposition_features
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default value proposition features
INSERT INTO public.value_proposition_features (title, subtitle, subtitle2, description, icon_name, display_order) VALUES
('Expand Care Anywhere.', 'Improve Outcomes.', 'Capture Revenue.', 'Resilient partners with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', 'Target', 1),
('You Keep the Brand.', 'The Data.', 'The Relationship.', 'You Keep the Brand. The Data. The Relationship. We operate behind the scenes—white-labeled under your hospital''s brand and integrated into your workflows.', 'Building2', 2),
('Extend Your Hospital.', 'Power Your Value-Based', 'Future.', 'Launch service lines beyond your four walls with Resilient—and get in the game for value-based care and risk-based contracts without the overhead.', 'TrendingUp', 3);