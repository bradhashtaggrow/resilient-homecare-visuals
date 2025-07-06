-- Insert clinicians page content
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, background_video_url) VALUES
-- Clinicians page content
('clinicians_hero', 'Join Our Clinical Team', 'Shape the Future of Healthcare', 'Be part of a revolutionary approach to healthcare delivery that puts both patients and clinicians first.', 'Apply Now', '#', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'),
('clinicians_services', 'Clinical Opportunities', 'Diverse Practice Settings', 'From home visits to telehealth consultations, expand your clinical practice across multiple care settings and specialties.', null, null, true, null),
('clinicians_mobile', 'Advanced Clinical Tools', 'Technology-Enhanced Practice', 'Work with cutting-edge medical devices, telehealth platforms, and clinical decision support tools designed for home-based care.', null, null, true, null),
('clinicians_value_prop', 'Why Clinicians Choose Us', 'Rewarding Career Opportunities', 'Enjoy competitive compensation, flexible schedules, and the satisfaction of providing personalized patient care in home settings.', null, null, true, null),
('clinicians_lead_gen', 'Ready to Make a Difference?', 'Start Your Journey With Us', 'Join thousands of healthcare professionals already transforming patient care through our innovative home-based programs.', 'Join Our Team', '#', true, null)

ON CONFLICT (section_key) DO UPDATE SET
title = EXCLUDED.title,
subtitle = EXCLUDED.subtitle,
description = EXCLUDED.description,
button_text = EXCLUDED.button_text,
button_url = EXCLUDED.button_url,
background_video_url = EXCLUDED.background_video_url,
updated_at = now();