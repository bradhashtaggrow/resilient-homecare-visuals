-- Add dedicated hero section for Clinicians page
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'clinicians_hero',
  'Enabling',
  'seamless referrals',
  'Partner with leading hospitals and expand your practice through our innovative platform.',
  'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  true
);

-- Add dedicated footer section for Clinicians page
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  background_image_url,
  is_active
) VALUES (
  'clinicians_footer',
  'Resilient Healthcare',
  'Empowering Clinicians Everywhere',
  'Join our network of healthcare professionals dedicated to improving patient outcomes.',
  '/lovable-uploads/06ab3abd-d10d-4743-8d6c-c0704b9ecf95.png',
  true
);