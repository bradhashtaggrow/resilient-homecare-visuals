-- Add dedicated hero section for Care at Home page
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'care_at_home_hero',
  'What is',
  'Resilient Community?',
  'Connecting healthcare professionals and agencies with hospitals to deliver patient-centered care at home.',
  'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  true
);

-- Add dedicated footer section for Care at Home page
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_image_url,
  is_active
) VALUES (
  'care_at_home_footer',
  'Resilient Healthcare',
  'Leading Innovation in Healthcare Solutions',
  'Transforming healthcare delivery through innovative technology and patient-centered care.',
  '/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png',
  true
);