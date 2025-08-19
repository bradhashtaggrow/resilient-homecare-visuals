-- Insert the missing patients_footer section for the Patients page CMS
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  description,
  button_text,
  button_url,
  is_active,
  content_data
) VALUES (
  'patients_footer',
  'Ready to Transform Your Care Experience?',
  'Join thousands of patients who are already benefiting from hospital-at-home care',
  'Experience the future of healthcare from the comfort of your own home. Our platform connects you with top-quality medical professionals and cutting-edge technology.',
  'Get Started Today',
  '/request-demo',
  true,
  jsonb_build_object(
    'features', jsonb_build_array(
      jsonb_build_object(
        'title', '24/7 Medical Support',
        'description', 'Round-the-clock access to healthcare professionals',
        'icon', 'Clock'
      ),
      jsonb_build_object(
        'title', 'Advanced Monitoring',
        'description', 'State-of-the-art medical devices and remote monitoring',
        'icon', 'Activity'
      ),
      jsonb_build_object(
        'title', 'Personalized Care',
        'description', 'Customized treatment plans tailored to your needs',
        'icon', 'Heart'
      )
    ),
    'stats', jsonb_build_array(
      jsonb_build_object(
        'number', '95%',
        'label', 'Patient Satisfaction',
        'description', 'of patients prefer care at home'
      ),
      jsonb_build_object(
        'number', '50%',
        'label', 'Faster Recovery',
        'description', 'compared to traditional hospital stays'
      ),
      jsonb_build_object(
        'number', '24/7',
        'label', 'Support Available',
        'description', 'continuous medical monitoring'
      )
    )
  )
);