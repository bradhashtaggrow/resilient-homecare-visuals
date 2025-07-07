-- Delete all existing care at home sections first
DELETE FROM website_content WHERE section_key LIKE 'care_at_home%';

-- Insert the correct sections in the right order based on the actual website
-- Section 1: Header (What is Resilient Community?)
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, background_image_url, is_active) 
VALUES ('care_at_home_lead_gen', 'What is Resilient Community?', 'Connecting Healthcare Professionals', 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.', 'Learn More', '/contact', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', true);

-- Section 2: The Future of Care
INSERT INTO website_content (section_key, title, subtitle, description, is_active) 
VALUES ('care_at_home_mobile', 'The Future of Care', 'Experience healthcare like never before', 'Every interaction reimagined.', true);

-- Section 3: Services Grid (with the cards: Partner with, Consistent Patient, Complete Home, Streamlined Platform, Simple Per-Visit)
INSERT INTO website_content (section_key, title, subtitle, description, is_active) 
VALUES ('care_at_home_services', 'Our Care Solutions', 'Comprehensive Healthcare Services', 'Partner with leading hospitals, ensure consistent patient outcomes, provide complete home care, access our streamlined platform, and enjoy simple per-visit pricing.', true);

-- Section 4: Partner with Leading Hospitals
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, background_image_url, is_active) 
VALUES ('care_at_home_value_prop', 'Partner with Leading Hospitals', 'Hospital Network Excellence', 'Connect with top healthcare institutions to expand your reach and impact through our comprehensive network of trusted hospital partners.', 'Experience Now', '/request-demo', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', true);

-- Section 5: Stats section (Response Time < 2min, Satisfaction 99.8%, Availability 24/7)
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active) 
VALUES ('care_at_home_stats', 'Healthcare Excellence Metrics', 'Proven Results', 'Our commitment to quality care delivery is reflected in our outstanding performance metrics.', '{"stats": [{"label": "Response Time", "value": "< 2min"}, {"label": "Satisfaction", "value": "99.8%"}, {"label": "Availability", "value": "24/7"}]}', true);

-- Section 6: Footer
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active) 
VALUES ('care_at_home_footer', 'Join 500+ Healthcare Organizations', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', null, 'Request Demo', '/request-demo', true);