-- Insert missing home page sections
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('service_lines', 'Our Services', 'Comprehensive Healthcare Solutions', 'We provide comprehensive healthcare services designed to improve patient outcomes.', true),
('mobile_showcase', 'Mobile Platform', 'Healthcare Technology', 'Advanced mobile solutions for modern healthcare delivery.', true),
('value_proposition', 'We Manage the Work', 'Focus on Care, Not Administration', 'Let us handle the complexity while you focus on what matters most - patient care.', true),
('admin_dashboard', 'Advanced Dashboard', 'Powerful Analytics Platform', 'Comprehensive insights and analytics to drive better healthcare decisions.', true),
('founder', 'Our Leadership', 'Meet Our Founder', 'Learn about the vision and experience driving our healthcare innovation.', true),
('stats', 'What Does the Research Say', 'Evidence-Based Results', 'Data-driven insights that demonstrate the impact of our healthcare solutions.', true),
('lead_generation', 'Join 500+ Hospitals', 'Become Part of Our Network', 'Join hundreds of healthcare institutions already transforming patient care.', true)
ON CONFLICT (section_key) DO NOTHING;