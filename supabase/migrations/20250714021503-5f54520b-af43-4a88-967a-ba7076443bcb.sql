-- Update hero section to have the same video background as other sections
UPDATE website_content 
SET background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4' 
WHERE section_key = 'hero';