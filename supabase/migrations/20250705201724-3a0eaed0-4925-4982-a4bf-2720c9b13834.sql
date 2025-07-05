-- Delete existing website_content table and recreate with proper structure
DROP TABLE IF EXISTS public.website_content CASCADE;

-- Create comprehensive website content table
CREATE TABLE public.website_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  button_text TEXT,
  button_url TEXT,
  background_image_url TEXT,
  background_video_url TEXT,
  mobile_background_url TEXT,
  laptop_background_url TEXT,
  content_data JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.website_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read and admin write
CREATE POLICY "Public can view website content" 
ON public.website_content 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Admins can manage website content" 
ON public.website_content 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_website_content_updated_at
BEFORE UPDATE ON public.website_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for all sections
INSERT INTO public.website_content (section_key, title, subtitle, description, button_text, button_url, background_video_url, content_data) VALUES
('hero', 'The Future of Healthcare', '', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', 'Request Demo', '#', 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', '{}'),

('services', 'Fully Streamlined, Uncompromisingly Simple', '', 'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.', 'Learn More', '#', '', '{
  "services": [
    {
      "id": "outpatient-pt",
      "icon": "Activity",
      "title": "Outpatient PT Anywhere",
      "subtitle": "Home-Based Therapy & Recovery",
      "description": "Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.",
      "color": "blue",
      "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Generate new outpatient therapy revenue", "icon": "TrendingUp"},
        {"text": "Reduce costly post-acute placements", "icon": "Shield"},
        {"text": "Improve patient outcomes with early intervention", "icon": "Target"},
        {"text": "Prepare for value-based care programs", "icon": "Award"}
      ]
    },
    {
      "id": "primary-care",
      "icon": "Heart",
      "title": "Primary Care at Home",
      "subtitle": "Transitional & Rural Care Extension",
      "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      "color": "red",
      "patient_image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Extend transitional care management for high-risk patients", "icon": "Users"},
        {"text": "Expand rural health clinic reach into underserved areas", "icon": "MapPin"},
        {"text": "Reduce readmissions with targeted follow-up visits", "icon": "CheckCircle"}
      ]
    },
    {
      "id": "hospital-at-home",
      "icon": "Building2",
      "title": "Acute Hospital-at-Home",
      "subtitle": "CMS-Compliant Inpatient Care at Home",
      "description": "Full implementation support for hospital-level care delivery in the home environment.",
      "color": "cyan",
      "patient_image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Complete workflow design & policy development", "icon": "Zap"},
        {"text": "Staff training & education programs", "icon": "Users"},
        {"text": "Medicare waiver submission support", "icon": "Clock"}
      ],
      "note": "CMS waiver extended through September 2025. We help hospitals prepare for future program versions."
    }
  ]
}'),

('mobile_showcase', 'Go Mobile With Your Patients This Year', '', 'Enterprise-grade mobile platform that connects your entire healthcare ecosystem with military-grade security and real-time insights.', 'Get Started', '#', 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', '{
  "features": [
    {"icon": "Shield", "title": "Enterprise Security", "description": "Bank-grade encryption with HIPAA compliance built-in"},
    {"icon": "BarChart3", "title": "Real-Time Analytics", "description": "Live dashboard with predictive insights and KPI tracking"},
    {"icon": "Users", "title": "Multi-Tenant Architecture", "description": "Scalable infrastructure supporting unlimited organizations"},
    {"icon": "Zap", "title": "API-First Platform", "description": "Seamless integration with existing healthcare systems"},
    {"icon": "Database", "title": "Cloud Infrastructure", "description": "99.9% uptime with automatic scaling and backup"},
    {"icon": "Lock", "title": "Access Control", "description": "Granular permissions with role-based authentication"}
  ]
}'),

('value_proposition', 'We manage the work. You own the program.', '', '', 'Learn More', '#', '', '{
  "propositions": [
    {
      "icon": "Target",
      "title": "Expand Care Anywhere.",
      "subtitle": "Improve Outcomes.",
      "subtitle2": "Capture Revenue.",
      "description": "Resilient partners with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue."
    },
    {
      "icon": "Building2",
      "title": "You Keep the Brand.",
      "subtitle": "The Data.",
      "subtitle2": "The Relationship.",
      "description": "You Keep the Brand. The Data. The Relationship. We operate behind the scenes—white-labeled under your hospital''s brand and integrated into your workflows."
    },
    {
      "icon": "TrendingUp",
      "title": "Extend Your Hospital.",
      "subtitle": "Power Your Value-Based",
      "subtitle2": "Future.",
      "description": "Launch service lines beyond your four walls with Resilient—and get in the game for value-based care and risk-based contracts without the overhead."
    }
  ]
}'),

('admin_dashboard', 'Built for Healthcare IT Teams', 'Enterprise-Grade Admin Tools', 'Comprehensive dashboard for managing your healthcare platform with advanced security and compliance features.', 'View Dashboard', '/admin', '', '{
  "features": [
    {"icon": "Shield", "title": "Security Center", "description": "HIPAA compliance monitoring and threat detection"},
    {"icon": "Users", "title": "User Management", "description": "Role-based access control and audit logs"},
    {"icon": "BarChart3", "title": "Analytics Suite", "description": "Real-time insights and performance metrics"},
    {"icon": "Database", "title": "Data Management", "description": "Secure data storage and backup solutions"},
    {"icon": "Zap", "title": "API Gateway", "description": "Integration management and monitoring"},
    {"icon": "Settings", "title": "System Config", "description": "Platform settings and customization"}
  ]
}'),

('founder', 'Founder''s Story', 'from Dr. Jackleen Samuel, PT, DPT | Founder & CEO', 'Personal journey and mission behind Resilient Healthcare.', 'Learn More', '#', '', '{
  "founder_image": "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png",
  "quote": "Dad''s in the hospital, again...",
  "quote_subtitle": "That call became all too familiar.",
  "story": [
    "Over the last four years of my dad''s life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn''t return home at all.",
    "As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.",
    "I built this company because families—and hospitals—deserve better.",
    "At Resilient, we partner with hospitals to extend their care into the home. Whether it''s primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.",
    "Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both."
  ],
  "closing": "We are Resilient. And so are you.",
  "achievements": [
    {"icon": "BookOpen", "title": "PT, DPT", "subtitle": "Physical Therapist"},
    {"icon": "Users", "title": "Founder", "subtitle": "& CEO"},
    {"icon": "Award", "title": "Healthcare", "subtitle": "Innovation Leader"}
  ]
}'),

('stats', 'What Does The Research Say?', '', 'Evidence-based outcomes from hospital-at-home care delivery.', 'View Research', '#', '', '{
  "stats": [
    {
      "icon": "DollarSign",
      "value": "38%",
      "label": "Cost Savings",
      "description": "A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.",
      "source": "JAMA Internal Medicine"
    },
    {
      "icon": "TrendingUp",
      "value": "70%",
      "label": "Reduction in Readmissions",
      "description": "A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.",
      "source": "30-day readmissions"
    },
    {
      "icon": "Heart",
      "value": "91%",
      "label": "Patient Preference",
      "description": "A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.",
      "source": "Annals of Internal Medicine"
    },
    {
      "icon": "Users",
      "value": "95%",
      "label": "Less Stress",
      "description": "A study published in BMJ Open Quality reported that 95% of patients felt less stressed receiving care at home compared to inpatient hospital care.",
      "source": "BMJ Open Quality"
    }
  ]
}'),

('lead_generation', 'Join 500+ Healthcare Organizations', '', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', 'Request Demo', '#', '', '{}');

-- Enable real-time updates
ALTER TABLE public.website_content REPLICA IDENTITY FULL;