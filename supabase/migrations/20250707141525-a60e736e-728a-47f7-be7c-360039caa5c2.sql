-- Add website content entries for all pages with exact same structure as home page
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active) VALUES
-- About Us page sections
('about_hero', 'Transforming Healthcare Through Innovation', 'Dedicated to improving patient outcomes with cutting-edge technology', 'Our mission is to revolutionize healthcare delivery through innovative solutions that empower both patients and healthcare providers.', 'Learn More', '/contact', true),
('about_values', 'Our Core Values', 'What drives us every day', 'We believe in putting patients first, embracing innovation, and maintaining the highest standards of care.', null, null, true),
('about_team', 'Meet Our Team', 'The experts behind our success', 'Our team of healthcare professionals and technology experts work together to deliver exceptional solutions.', null, null, true),

-- Clinicians page sections  
('clinicians_hero', 'Empowering Healthcare Professionals', 'Advanced tools for modern clinicians', 'Streamline your workflow with our comprehensive suite of clinical tools designed to enhance patient care.', 'Get Started', '/request-demo', true),
('clinicians_tools', 'Clinical Tools & Features', 'Everything you need in one platform', 'From patient management to clinical decision support, our platform provides all the tools you need.', null, null, true),
('clinicians_benefits', 'Why Clinicians Choose Us', 'Proven results for healthcare providers', 'Join thousands of healthcare professionals who trust our platform for their daily practice.', null, null, true),

-- Care at Home page sections
('care_at_home_hero', 'Bringing Quality Care Home', 'Comprehensive home healthcare solutions', 'Enable safe, effective care delivery in the comfort of patients homes with our advanced monitoring and communication tools.', 'Explore Solutions', '/contact', true),
('care_at_home_services', 'Home Care Services', 'Complete care in familiar surroundings', 'Remote monitoring, telemedicine, and care coordination all in one integrated platform.', null, null, true),
('care_at_home_technology', 'Advanced Technology', 'Innovation that travels with you', 'State-of-the-art medical devices and software that bring hospital-quality care to any location.', null, null, true),

-- Patients page sections
('patients_hero', 'Your Health, Your Way', 'Personalized healthcare at your fingertips', 'Take control of your health journey with our patient-centered platform designed for convenience and better outcomes.', 'Get Started', '/request-demo', true),
('patients_features', 'Patient Features', 'Tools designed for you', 'Easy appointment scheduling, secure messaging with providers, and access to your complete health records.', null, null, true),
('patients_support', 'Support & Resources', '24/7 help when you need it', 'Round-the-clock support and educational resources to help you make informed healthcare decisions.', null, null, true),

-- News page sections
('news_hero', 'Latest Healthcare News', 'Stay informed with industry updates', 'Get the latest news, insights, and developments in healthcare technology and innovation.', null, null, true),
('news_featured', 'Featured Articles', 'Top stories in healthcare', 'Discover the most important stories shaping the future of healthcare delivery.', null, null, true),
('news_insights', 'Industry Insights', 'Expert analysis and commentary', 'Deep-dive articles from healthcare leaders and technology experts.', null, null, true),

-- Contact page sections
('contact_hero', 'Get in Touch', 'Ready to transform your healthcare experience?', 'Contact our team to learn more about our solutions and how we can help improve your healthcare delivery.', 'Send Message', null, true),
('contact_form', 'Contact Information', 'Multiple ways to reach us', 'Choose the best way to connect with our team for support, sales, or partnership opportunities.', null, null, true),
('contact_locations', 'Our Locations', 'Find us near you', 'With offices across the country, we are here to provide local support for your healthcare needs.', null, null, true);