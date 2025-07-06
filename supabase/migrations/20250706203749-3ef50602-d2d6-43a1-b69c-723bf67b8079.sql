-- Insert sample page-specific content for all pages
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, background_video_url) VALUES
-- About page content
('about_hero', 'About Resilient Healthcare', 'Our Mission & Vision', 'We are transforming healthcare delivery by bringing hospital-quality care directly to patients'' homes, improving outcomes while reducing costs.', 'Learn Our Story', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('about_services', 'Our Comprehensive Services', 'Three Pillars of Excellence', 'From outpatient therapy to acute hospital-at-home care, we provide the full spectrum of home-based healthcare services.', null, null, true, null),
('about_mobile', 'Technology That Connects', 'Seamless Integration Platform', 'Our mobile-first platform ensures seamless communication between patients, providers, and care teams.', null, null, true, null),
('about_value_prop', 'Why Choose Resilient Healthcare', 'Proven Results, Trusted Partnership', 'We deliver measurable outcomes through evidence-based care models and cutting-edge technology solutions.', null, null, true, null),
('about_lead_gen', 'Ready to Transform Care?', 'Partner with Healthcare Leaders', 'Join leading health systems already transforming patient care with our proven home-based solutions.', 'Schedule Consultation', '#', true, null),

-- News page content
('news_hero', 'Healthcare News & Insights', 'Latest Industry Updates', 'Stay informed with the latest developments in home-based healthcare, policy changes, and industry innovations.', 'View All Articles', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('news_services', 'Featured Stories', 'Breaking Healthcare News', 'Discover the latest trends, research findings, and success stories from the world of healthcare innovation.', null, null, true, null),
('news_mobile', 'Digital Health Revolution', 'Technology Transforming Care', 'Explore how mobile health technologies are revolutionizing patient care and improving health outcomes.', null, null, true, null),
('news_value_prop', 'Industry Insights', 'Expert Analysis & Trends', 'Get expert perspectives on healthcare policy, market trends, and emerging technologies shaping the future.', null, null, true, null),
('news_lead_gen', 'Stay Connected', 'Subscribe to Our Newsletter', 'Get the latest healthcare news and insights delivered directly to your inbox every week.', 'Subscribe Now', '#', true, null),

-- Contact page content
('contact_hero', 'Get In Touch', 'Connect With Our Team', 'Ready to explore how Resilient Healthcare can transform your organization? Let''s start the conversation.', 'Contact Us Today', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('contact_services', 'How We Can Help', 'Comprehensive Support Services', 'From initial consultation to full implementation, our team provides end-to-end support for your success.', null, null, true, null),
('contact_mobile', 'Multiple Ways to Connect', 'Choose Your Preferred Method', 'Whether you prefer phone, email, or in-person meetings, we''re here to accommodate your communication style.', null, null, true, null),
('contact_value_prop', 'Why Partner With Us', 'Trusted Healthcare Partner', 'We understand the unique challenges facing healthcare organizations and provide tailored solutions for lasting success.', null, null, true, null),
('contact_lead_gen', 'Let''s Get Started', 'Schedule Your Consultation', 'Take the first step toward transforming your healthcare delivery with a free consultation from our experts.', 'Schedule Now', '#', true, null),

-- Patients page content
('patients_hero', 'Care Comes to You', 'Hospital-Quality Care at Home', 'Experience the comfort and convenience of receiving professional healthcare services in your own home.', 'Learn More', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('patients_services', 'Our Patient Services', 'Comprehensive Home Care Solutions', 'From physical therapy to primary care visits, we bring expert healthcare directly to your doorstep.', null, null, true, null),
('patients_mobile', 'Stay Connected', 'Patient Mobile App', 'Manage your care, communicate with providers, and track your progress with our easy-to-use mobile application.', null, null, true, null),
('patients_value_prop', 'Benefits of Home Care', 'Better Outcomes, Greater Comfort', 'Research shows that home-based care leads to faster recovery, reduced infections, and improved patient satisfaction.', null, null, true, null),
('patients_lead_gen', 'Ready to Get Started?', 'Your Health Journey Begins Here', 'Discover how our home-based care services can improve your health outcomes and quality of life.', 'Find Care Near You', '#', true, null),

-- Care At Home page content
('care_at_home_hero', 'Advanced Care at Home', 'Hospital-Level Care in Comfort', 'Receive sophisticated medical care in the familiar surroundings of your own home with our comprehensive care programs.', 'Explore Programs', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('care_at_home_services', 'Care at Home Programs', 'Comprehensive Home-Based Solutions', 'From acute care to ongoing chronic disease management, our programs deliver exceptional outcomes in your home.', null, null, true, null),
('care_at_home_mobile', 'Connected Care Technology', 'Remote Monitoring & Communication', 'Advanced telehealth technology keeps you connected to your care team 24/7 for continuous support and monitoring.', null, null, true, null),
('care_at_home_value_prop', 'Why Choose Home Care', 'Superior Outcomes & Experience', 'Studies consistently show better patient outcomes, reduced readmissions, and higher satisfaction with home-based care.', null, null, true, null),
('care_at_home_lead_gen', 'Discover Care at Home', 'Transform Your Care Experience', 'Learn how our innovative care-at-home programs can provide you with better health outcomes and peace of mind.', 'Get Started Today', '#', true, null)

ON CONFLICT (section_key) DO UPDATE SET
title = EXCLUDED.title,
subtitle = EXCLUDED.subtitle,
description = EXCLUDED.description,
button_text = EXCLUDED.button_text,
button_url = EXCLUDED.button_url,
background_video_url = EXCLUDED.background_video_url,
updated_at = now();