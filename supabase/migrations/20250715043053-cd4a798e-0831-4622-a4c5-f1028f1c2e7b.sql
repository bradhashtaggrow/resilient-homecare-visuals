-- Add missing patients page content sections

-- Patients hero content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, background_video_url)
VALUES 
('patients_hero', 'Patient-centered', 'care at home', 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4')
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  background_video_url = EXCLUDED.background_video_url;

-- Patients mobile content (tabs section)
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data)
VALUES 
('patients_mobile', 'Patient Services', '', 'Comprehensive healthcare solutions delivered to your home', true, '{
  "tabs": [
    {
      "id": "chronic-disease",
      "title": "Chronic Disease Management", 
      "subtitle": "Ongoing Care",
      "description": "Comprehensive monitoring and management of chronic conditions in the comfort of your home, improving quality of life and health outcomes.",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png"
    },
    {
      "id": "recovery-care",
      "title": "Post-Hospital Recovery",
      "subtitle": "Safe Recovery",
      "description": "Professional care and monitoring during your recovery period at home, ensuring a smooth transition from hospital to home.",
      "icon_name": "Shield",
      "color": "green", 
      "image_url": "/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png"
    },
    {
      "id": "wellness-monitoring",
      "title": "Health Monitoring",
      "subtitle": "24/7 Support",
      "description": "Continuous health monitoring with advanced technology, providing peace of mind and early detection of health changes.",
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