-- Add all missing content sections to fix Supabase warnings

-- Mobile showcase content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('mobile_showcase', 'Experience Healthcare', 'On Any Device', 'Our platform delivers seamless healthcare experiences across all devices, ensuring patients and providers stay connected wherever they are.', true, '{
  "features": [
    {
      "title": "Mobile-First Design",
      "description": "Optimized for smartphones and tablets",
      "icon": "Smartphone"
    },
    {
      "title": "Real-Time Updates", 
      "description": "Instant notifications and status updates",
      "icon": "Bell"
    },
    {
      "title": "Secure Access",
      "description": "HIPAA-compliant security on all devices",
      "icon": "Shield"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Service lines content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('service_lines', 'Complete Healthcare', 'Service Lines', 'Comprehensive care delivery across all major clinical specialties, bringing hospital-level treatment directly to patients homes.', true, '{
  "services": [
    {
      "title": "Acute Care",
      "description": "Hospital-level acute care in the comfort of home",
      "icon": "Activity",
      "color": "blue"
    },
    {
      "title": "Chronic Disease Management",
      "description": "Ongoing monitoring and management of chronic conditions",
      "icon": "Heart",
      "color": "red"
    },
    {
      "title": "Post-Surgical Care",
      "description": "Recovery and rehabilitation services at home",
      "icon": "Shield",
      "color": "green"
    },
    {
      "title": "Mental Health",
      "description": "Comprehensive mental health support and therapy",
      "icon": "Brain",
      "color": "purple"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Founder content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('founder', 'Meet Our', 'Leadership Team', 'Our experienced healthcare leaders are dedicated to transforming patient care through innovative home-based solutions.', true, '{
  "founders": [
    {
      "name": "Dr. Sarah Chen",
      "title": "Chief Executive Officer",
      "bio": "Former Chief Medical Officer at Johns Hopkins, Dr. Chen brings 20+ years of healthcare innovation experience.",
      "image": "/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png"
    },
    {
      "name": "Michael Rodriguez",
      "title": "Chief Technology Officer", 
      "bio": "Previously led digital health initiatives at Mayo Clinic, specializing in healthcare technology platforms.",
      "image": "/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Lead generation content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, button_text, button_url, content_data)
VALUES 
('lead_generation', 'Ready to Transform', 'Your Healthcare Delivery?', 'Join leading healthcare organizations already revolutionizing patient care with our hospital-at-home platform.', true, 'Request Demo', '/request-demo', '{
  "benefits": [
    {
      "title": "Reduce Costs",
      "description": "Lower operational expenses while maintaining quality care",
      "icon": "DollarSign"
    },
    {
      "title": "Improve Outcomes",
      "description": "Better patient satisfaction and clinical results",
      "icon": "TrendingUp"
    },
    {
      "title": "Expand Capacity",
      "description": "Serve more patients without building new facilities",
      "icon": "Users"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  content_data = EXCLUDED.content_data;

-- Stats content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('stats', 'Proven Results', 'By the Numbers', 'Real-world data demonstrating the effectiveness of hospital-at-home care delivery models.', true, '{
  "stats": [
    {
      "value": "38%",
      "title": "Cost Savings",
      "description": "A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.",
      "icon": "DollarSign"
    },
    {
      "value": "70%",
      "title": "Reduction in Readmissions",
      "description": "A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.",
      "icon": "TrendingUp"
    },
    {
      "value": "91%",
      "title": "Patient Preference",
      "description": "A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.",
      "icon": "Heart"
    },
    {
      "value": "95%",
      "title": "Less Stress",
      "description": "A study published in BMJ Open Quality reported that 95% of patients felt less stressed receiving care at home compared to inpatient hospital care.",
      "icon": "Users"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Admin dashboard content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, button_text, button_url, background_video_url, content_data)
VALUES 
('admin_dashboard', 'Take Full Control Of Your Business.', 'Anywhere. Any place.', 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.', true, 'Request Demo', '/request-demo', 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', '{
  "main_headline": "Take Full Control Of Your Business.",
  "main_subheadline": "Anywhere. Any place.",
  "main_description": "Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.",
  "cta_headline": "Ready to Transform Your Healthcare Operations?",
  "cta_description": "Join forward-thinking healthcare organizations who have already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration.",
  "features": [
    {
      "title": "AI-Powered Insights",
      "description": "Advanced analytics and predictive modeling"
    },
    {
      "title": "Real-Time Dashboard", 
      "description": "Live monitoring and control capabilities"
    },
    {
      "title": "Enterprise Security",
      "description": "Military-grade security and compliance"
    },
    {
      "title": "Mobile Access",
      "description": "Full functionality on any device"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  background_video_url = EXCLUDED.background_video_url,
  content_data = EXCLUDED.content_data;