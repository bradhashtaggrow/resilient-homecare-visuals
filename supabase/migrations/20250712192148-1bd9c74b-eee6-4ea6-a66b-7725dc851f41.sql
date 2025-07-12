
-- Insert the hero section for the Patients page
INSERT INTO website_content (
  section_key,
  title,
  subtitle,
  description,
  background_video_url,
  is_active
) VALUES (
  'patients_hero',
  'Patient-centered',
  'care at home',
  'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
  'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4',
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  background_video_url = EXCLUDED.background_video_url,
  updated_at = now();
