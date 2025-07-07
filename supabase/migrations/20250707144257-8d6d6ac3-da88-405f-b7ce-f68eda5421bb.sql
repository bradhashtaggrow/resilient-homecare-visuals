-- Update care at home hero section: remove buttons, remove stock image, add video
UPDATE website_content 
SET 
  button_text = null,
  button_url = null,
  background_image_url = null,
  background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
WHERE section_key = 'care_at_home_hero';