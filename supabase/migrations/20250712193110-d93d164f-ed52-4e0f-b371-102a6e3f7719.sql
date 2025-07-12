
-- Insert the hero section for the About page
INSERT INTO website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'about_hero',
  'About',
  'Resilient Healthcare',
  'Revolutionizing Home-Based Healthcare with RAIN. Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption.',
  'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  background_video_url = EXCLUDED.background_video_url,
  updated_at = now();
