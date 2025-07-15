-- Add missing news page content section

-- News hero content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, background_video_url)
VALUES 
('news_hero', 'Latest Healthcare', 'News', 'Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare.', true, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4')
ON CONFLICT (section_key) DO UPDATE SET 
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  is_active = EXCLUDED.is_active,
  background_video_url = EXCLUDED.background_video_url;