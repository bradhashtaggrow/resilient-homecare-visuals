-- Restore all necessary website content sections that pages need
-- Insert missing content sections with proper default values

-- Care at Home page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('care_at_home_hero', 'Care at Home', 'Advanced Technology Solutions', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true, '{}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Care at Home mobile content (tabs section)
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('care_at_home_mobile', 'Our Services', '', 'Comprehensive healthcare solutions delivered to your home', true, '{
  "tabs": [
    {
      "id": "chronic-care",
      "title": "Chronic Care Management",
      "subtitle": "Ongoing Support",
      "description": "Comprehensive monitoring and support for patients with chronic conditions, ensuring better outcomes and quality of life.",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png"
    },
    {
      "id": "post-acute",
      "title": "Post-Acute Care",
      "subtitle": "Recovery at Home",
      "description": "Specialized care following hospital discharge, helping patients recover safely and comfortably in their own homes.",
      "icon_name": "Home",
      "color": "green",
      "image_url": "/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png"
    },
    {
      "id": "remote-monitoring",
      "title": "Remote Patient Monitoring",
      "subtitle": "24/7 Monitoring",
      "description": "Advanced technology that tracks vital signs and health metrics, providing real-time insights to healthcare providers.",
      "icon_name": "Activity",
      "color": "purple",
      "image_url": "/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Clinicians page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active)
VALUES 
('clinicians_hero', 'For Clinicians', 'Extend Your Practice Beyond Hospital Walls', 'Partner with us to deliver comprehensive care at home, improving patient outcomes while creating new revenue opportunities.', true)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

-- About page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active)
VALUES 
('about_hero', 'About Resilient Healthcare', 'Transforming Healthcare Delivery', 'We are dedicated to revolutionizing healthcare by bringing hospital-quality care directly to patients\' homes, improving outcomes and reducing costs.', true)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

-- About why choose content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('about_why_choose', 'Why Choose Resilient Healthcare?', 'Leading the Future of Home Healthcare', 'Our innovative approach combines cutting-edge technology with compassionate care to deliver exceptional results.', true, '{
  "features": [
    {
      "title": "Advanced Technology",
      "description": "State-of-the-art remote monitoring and telehealth solutions",
      "icon": "Smartphone"
    },
    {
      "title": "Expert Care Team",
      "description": "Experienced healthcare professionals dedicated to patient outcomes",
      "icon": "Users"
    },
    {
      "title": "Proven Results",
      "description": "Demonstrated improvements in patient satisfaction and clinical outcomes",
      "icon": "TrendingUp"
    }
  ]
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;

-- Contact page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active)
VALUES 
('contact_hero', 'Contact Us', 'Get in Touch', 'Ready to transform healthcare delivery? Let\s discuss how we can help extend your clinical services into the home.', true)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active;

-- Footer content (restore if missing)
INSERT INTO website_content (section_key, title, description, is_active, content_data)
VALUES 
('footer', 'Resilient Healthcare', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true, '{
  "logo": {
    "url": "/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png",
    "alt": "Resilient Healthcare Logo"
  },
  "links": [
    {
      "title": "Company", 
      "items": [
        {"name": "About Us", "url": "/about"},
        {"name": "Contact", "url": "/contact"},
        {"name": "News", "url": "/news"}
      ]
    },
    {
      "title": "Services",
      "items": [
        {"name": "Care at Home", "url": "/care-at-home"},
        {"name": "For Clinicians", "url": "/clinicians"},
        {"name": "For Patients", "url": "/patients"}
      ]
    },
    {
      "title": "Legal",
      "items": [
        {"name": "Privacy Policy", "url": "/privacy-policy"},
        {"name": "Terms of Service", "url": "/terms-of-service"},
        {"name": "HIPAA Compliance", "url": "/hipaa-compliance"}
      ]
    }
  ],
  "social": [
    {"name": "LinkedIn", "url": "#", "icon": "Linkedin"},
    {"name": "Twitter", "url": "#", "icon": "Twitter"}
  ],
  "contact": {
    "address": "Dallas, TX",
    "phone": "+1 888-874-0852",
    "email": "info@resilienthc.com"
  },
  "copyright": "© 2024 Resilient Healthcare. All rights reserved."
}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  content_data = EXCLUDED.content_data;