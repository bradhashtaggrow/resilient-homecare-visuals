-- Delete existing about sections except hero
DELETE FROM public.website_content 
WHERE section_key LIKE 'about_%' AND section_key != 'about_hero';

-- Create the main content section
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active) VALUES
('about_content', 'Revolutionizing Home-Based Healthcare with RAIN', '', 'We are dedicated to revolutionizing healthcare by bringing hospital-quality care directly to patients homes through innovative technology and expert clinical teams.', true);

-- Create the Why Choose Resilient section
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('about_why_choose', 'Why Choose Resilient?', 'Three core pillars that make us the leader in home-based healthcare solutions', '', true, 
jsonb_build_object(
  'features', jsonb_build_array(
    jsonb_build_object(
      'title', 'RAIN-Powered AI Infrastructure',
      'subtitle', 'RAIN-Powered AI Infrastructure',
      'description', 'Reducing inefficiencies in care management through smart automation.',
      'icon', 'Brain'
    ),
    jsonb_build_object(
      'title', 'Fully Integrated With Hospital Systems',
      'subtitle', 'Fully Integrated With Hospital Systems', 
      'description', 'Seamless connection to EHRs, scheduling, and billing workflows.',
      'icon', 'Hospital'
    ),
    jsonb_build_object(
      'title', 'Flexible Workforce Model',
      'subtitle', 'Flexible Workforce Model',
      'description', 'On-demand contract clinicians that expand hospital capacity without adding full-time costs.',
      'icon', 'Users'
    )
  )
));

-- Create the For Hospitals section
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('about_for_hospitals', 'For Hospitals', 'Expand Home-Based Care Without Disrupting Workflows', '', true,
jsonb_build_object(
  'benefits', jsonb_build_array(
    'Reduce readmissions by 25-40% while optimizing care efficiency.',
    'Scale hospital-at-home services with on-demand contract clinicians.',
    'Maintain profitability with AI-driven automation that reduces overhead.'
  )
));

-- Create the For Clinicians section  
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('about_for_clinicians', 'For Clinicians', 'More Flexibility, More Earnings, More Patient Impact', '', true,
jsonb_build_object(
  'benefits', jsonb_build_array(
    'Work on your schedule—join the home healthcare gig economy.',
    'RAIN automates scheduling, payments, and records management for a seamless experience.',
    'Deliver high-quality, patient-centered care with less bureaucracy.'
  )
));

-- Create the Core Values section
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('about_core_values', 'Our Core Values', 'The principles that guide everything we do in transforming healthcare delivery', '', true,
jsonb_build_object(
  'values', jsonb_build_array(
    jsonb_build_object(
      'title', 'Compassionate Care',
      'description', 'Every interaction is guided by empathy, respect, and genuine concern for patient well-being.',
      'icon', 'Heart'
    ),
    jsonb_build_object(
      'title', 'Excellence', 
      'description', 'We maintain the highest standards in everything we do, from clinical care to customer service.',
      'icon', 'Award'
    ),
    jsonb_build_object(
      'title', 'Innovation',
      'description', 'Continuously improving healthcare delivery through technology and creative solutions.',
      'icon', 'Lightbulb'
    )
  )
));