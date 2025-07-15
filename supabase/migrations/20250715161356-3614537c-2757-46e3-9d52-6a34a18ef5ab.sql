-- Add About Us sections for CMS management
INSERT INTO public.website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
-- Revolutionizing Home-Based Healthcare with RAIN section
('about_rain_section', 'Revolutionizing Home-Based Healthcare with RAIN', NULL, 'Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption.', true, '{}'),

-- Why Choose Resilient header section
('about_why_choose_resilient', 'Why Choose Resilient?', 'Three core pillars that make us the leader in home-based healthcare solutions', NULL, true, '{}'),

-- For Hospitals section
('about_for_hospitals', 'For Hospitals', 'Expand Home-Based Care Without Disrupting Workflows', 'Reduce readmissions by 25-40% while optimizing care efficiency.

Scale hospital-at-home services with on-demand contract clinicians.

Maintain profitability with AI-driven automation that reduces overhead.', true, '{
  "icon": "Building2",
  "benefits": [
    "Reduce readmissions by 25-40% while optimizing care efficiency",
    "Scale hospital-at-home services with on-demand contract clinicians", 
    "Maintain profitability with AI-driven automation that reduces overhead"
  ],
  "image_description": "Hospital technology"
}'),

-- For Clinicians section  
('about_for_clinicians', 'For Clinicians', 'More Flexibility, More Earnings, More Patient Impact', 'Work on your schedule—join the home healthcare gig economy.

RAIN automates scheduling, payments, and records management for a seamless experience.

Deliver high-quality, patient-centered care with less bureaucracy.', true, '{
  "icon": "Heart",
  "benefits": [
    "Work on your schedule—join the home healthcare gig economy",
    "RAIN automates scheduling, payments, and records management for a seamless experience",
    "Deliver high-quality, patient-centered care with less bureaucracy"
  ],
  "image_description": "Healthcare professional"
}'),

-- Our Core Values header section
('about_core_values_header', 'Our Core Values', 'The principles that guide everything we do in transforming healthcare delivery', NULL, true, '{}'),

-- Core Values individual items
('about_core_values_compassionate', 'Compassionate Care', NULL, 'Every interaction is guided by empathy, respect, and genuine concern for patient well-being.', true, '{
  "icon": "Heart",
  "value_type": "compassionate_care"
}'),

('about_core_values_excellence', 'Excellence', NULL, 'We maintain the highest standards in everything we do, from clinical care to customer service.', true, '{
  "icon": "Award", 
  "value_type": "excellence"
}'),

('about_core_values_innovation', 'Innovation', NULL, 'Continuously improving healthcare delivery through technology and creative solutions.', true, '{
  "icon": "Lightbulb",
  "value_type": "innovation"
}');