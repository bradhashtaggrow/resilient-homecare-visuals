
-- Add website content entries for all pages and their sections
-- This will support the same CMS functionality for all pages

-- About page sections
INSERT INTO website_content (section_key, title, description, is_active) VALUES
('about_hero', 'About Resilient Healthcare', 'Hero section for About page', true),
('about_content', 'Revolutionizing Home-Based Healthcare with RAIN', 'Main content section for About page', true),
('about_why_resilient', 'Why Choose Resilient Healthcare', 'Why Resilient section content', true),
('about_hospital_benefits', 'Hospital Benefits', 'Benefits for hospitals section', true),
('about_clinician_benefits', 'Clinician Benefits', 'Benefits for clinicians section', true),
('about_values', 'Our Values', 'Company values section', true);

-- Clinicians page sections
INSERT INTO website_content (section_key, title, description, is_active) VALUES
('clinicians_hero', 'Enabling seamless referrals', 'Hero section for Clinicians page', true),
('clinicians_content', 'Clinicians', 'Main content section for Clinicians page', true),
('clinicians_services', 'Clinician Services', 'Services grid for clinicians', true);

-- Care At Home page sections
INSERT INTO website_content (section_key, title, description, is_active) VALUES
('care_at_home_hero', 'What is Resilient Community?', 'Hero section for Care At Home page', true),
('care_at_home_content', 'Connecting Healthcare Professionals', 'Main content section for Care At Home page', true),
('care_at_home_services', 'Care At Home Services', 'Services tabs for care at home', true);

-- Home page sections (to match existing structure)
INSERT INTO website_content (section_key, title, description, is_active) VALUES
('home_hero', 'Hospital-at-Home Services', 'Main hero section for home page', true),
('home_service_lines', 'Fully Streamlined, Uncompromisingly Simple', 'Service lines section', true),
('home_value_proposition', 'Why Choose Our Hospital-at-Home Solutions', 'Value proposition section', true),
('home_stats', 'Proven Impact Across Healthcare Systems', 'Statistics section', true),
('home_mobile_showcase', 'Mobile Showcase', 'Mobile app showcase section', true),
('home_founder', 'Meet Our Founder', 'Founder introduction section', true),
('home_admin_dashboard', 'Take Full Control Of Your Business', 'Admin dashboard preview section', true),
('home_lead_generation', 'Ready to Transform Your Healthcare Delivery?', 'Lead generation form section', true);

-- Contact page sections
INSERT INTO website_content (section_key, title, description, is_active) VALUES
('contact_hero', 'Contact Us', 'Hero section for Contact page', true),
('contact_content', 'Get In Touch', 'Main content section for Contact page', true),
('contact_form', 'Contact Form', 'Contact form section', true);

-- Add content_data with default structures for complex sections
UPDATE website_content SET content_data = '{
  "services": [
    {
      "id": "outpatient-pt",
      "icon": "Activity",
      "title": "Outpatient PT Anywhere",
      "subtitle": "Home-Based Therapy & Recovery",
      "description": "Hospital-branded physical therapy delivered directly to patients homes with full technology integration.",
      "color": "blue",
      "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56"
    }
  ]
}' WHERE section_key IN ('home_service_lines', 'clinicians_services', 'care_at_home_services');

UPDATE website_content SET content_data = '{
  "stats": [
    {
      "number": "85%",
      "label": "Patient Satisfaction Rate",
      "description": "Patients prefer home-based care"
    }
  ]
}' WHERE section_key = 'home_stats';

UPDATE website_content SET content_data = '{
  "propositions": [
    {
      "icon": "TrendingUp",
      "title": "Revenue Growth",
      "description": "Generate new revenue streams while optimizing existing resources"
    }
  ]
}' WHERE section_key = 'home_value_proposition';
