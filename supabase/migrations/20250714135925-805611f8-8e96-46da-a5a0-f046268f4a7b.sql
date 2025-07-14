-- Add the current fallback video to hero, mobile, and laptop sections for real-time sync
UPDATE website_content 
SET background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
WHERE section_key IN ('hero', 'mobile_showcase', 'admin_dashboard') AND is_active = true;