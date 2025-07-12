
-- Insert the hero section for the News page
INSERT INTO website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'news_hero',
  'Healthcare',
  'News & Updates',
  'Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare.',
  'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  background_video_url = EXCLUDED.background_video_url,
  updated_at = now();
