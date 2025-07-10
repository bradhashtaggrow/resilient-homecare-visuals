-- Remove all existing about page sections
DELETE FROM website_content WHERE section_key LIKE 'about_%';

-- Create About Hero Section
INSERT INTO website_content (section_key, title, subtitle, description, is_active)
VALUES (
  'about_hero',
  'About',
  'Resilient Healthcare',
  'Revolutionizing Home-Based Healthcare with RAIN. Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption.',
  true
);

-- Create Why Choose Resilient Section
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
VALUES (
  'about_why_choose',
  'Why Choose Resilient?',
  'Three core pillars that make us the leader in home-based healthcare solutions',
  '',
  '{
    "pillars": [
      {
        "id": "rain-ai",
        "title": "RAIN-Powered AI Infrastructure",
        "subtitle": "RAIN-Powered AI Infrastructure",
        "description": "Reducing inefficiencies in care management through smart automation.",
        "icon_name": "Zap"
      },
      {
        "id": "hospital-integration",
        "title": "Fully Integrated With Hospital Systems",
        "subtitle": "Fully Integrated With Hospital Systems", 
        "description": "Seamless connection to EHRs, scheduling, and billing workflows.",
        "icon_name": "Building2"
      },
      {
        "id": "workforce-model",
        "title": "Flexible Workforce Model",
        "subtitle": "Flexible Workforce Model",
        "description": "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
        "icon_name": "Users"
      }
    ]
  }'::jsonb,
  true
);

-- Create For Hospitals Section
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
VALUES (
  'about_for_hospitals',
  'For Hospitals',
  'Expand Home-Based Care Without Disrupting Workflows',
  '',
  '{
    "benefits": [
      "Reduce readmissions by 25-40% while optimizing care efficiency.",
      "Scale hospital-at-home services with on-demand contract clinicians.",
      "Maintain profitability with AI-driven automation that reduces overhead."
    ],
    "images": [
      "Hospital technology",
      "Healthcare professional"
    ]
  }'::jsonb,
  true
);

-- Create For Clinicians Section  
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
VALUES (
  'about_for_clinicians',
  'For Clinicians',
  'More Flexibility, More Earnings, More Patient Impact',
  '',
  '{
    "benefits": [
      "Work on your schedule—join the home healthcare gig economy.",
      "RAIN automates scheduling, payments, and records management for a seamless experience.",
      "Deliver high-quality, patient-centered care with less bureaucracy."
    ]
  }'::jsonb,
  true
);

-- Create Core Values Section
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
VALUES (
  'about_values',
  'Our Core Values',
  'The principles that guide everything we do in transforming healthcare delivery',
  '',
  '{
    "values": [
      {
        "id": "compassionate-care",
        "title": "Compassionate Care",
        "description": "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
        "icon_name": "Heart"
      },
      {
        "id": "excellence", 
        "title": "Excellence",
        "description": "We maintain the highest standards in everything we do, from clinical care to customer service.",
        "icon_name": "Award"
      },
      {
        "id": "innovation",
        "title": "Innovation", 
        "description": "Continuously improving healthcare delivery through technology and creative solutions.",
        "icon_name": "Lightbulb"
      }
    ]
  }'::jsonb,
  true
);

-- Create Footer Section
INSERT INTO website_content (section_key, title, description, button_text, button_url, is_active)
VALUES (
  'about_footer',
  'Join 500+ Healthcare Organizations',
  'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
  'Request Demo',
  '/request-demo',
  true
);