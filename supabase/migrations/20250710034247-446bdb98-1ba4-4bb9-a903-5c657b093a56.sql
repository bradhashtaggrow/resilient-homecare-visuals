-- Update About sections with proper images and enhanced content

-- Update Why Choose Resilient Section with images
UPDATE website_content 
SET content_data = '{
  "pillars": [
    {
      "id": "rain-ai",
      "title": "RAIN-Powered AI Infrastructure",
      "subtitle": "RAIN-Powered AI Infrastructure",
      "description": "Reducing inefficiencies in care management through smart automation.",
      "icon_name": "Zap",
      "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "hospital-integration",
      "title": "Fully Integrated With Hospital Systems",
      "subtitle": "Fully Integrated With Hospital Systems", 
      "description": "Seamless connection to EHRs, scheduling, and billing workflows.",
      "icon_name": "Building2",
      "image_url": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "workforce-model",
      "title": "Flexible Workforce Model",
      "subtitle": "Flexible Workforce Model",
      "description": "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
      "icon_name": "Users",
      "image_url": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}'::jsonb
WHERE section_key = 'about_why_choose';

-- Update For Hospitals Section with images
UPDATE website_content 
SET content_data = '{
  "benefits": [
    "Reduce readmissions by 25-40% while optimizing care efficiency.",
    "Scale hospital-at-home services with on-demand contract clinicians.",
    "Maintain profitability with AI-driven automation that reduces overhead."
  ],
  "main_image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  "secondary_image": "https://images.unsplash.com/photo-1581091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
}',
background_image_url = 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'
WHERE section_key = 'about_for_hospitals';

-- Update For Clinicians Section with images
UPDATE website_content 
SET content_data = '{
  "benefits": [
    "Work on your schedule—join the home healthcare gig economy.",
    "RAIN automates scheduling, payments, and records management for a seamless experience.",
    "Deliver high-quality, patient-centered care with less bureaucracy."
  ],
  "main_image": "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
  "secondary_image": "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
}',
background_image_url = 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'
WHERE section_key = 'about_for_clinicians';

-- Update Core Values Section with enhanced icons and images
UPDATE website_content 
SET content_data = '{
  "values": [
    {
      "id": "compassionate-care",
      "title": "Compassionate Care",
      "description": "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
      "icon_name": "Heart",
      "image_url": "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "excellence", 
      "title": "Excellence",
      "description": "We maintain the highest standards in everything we do, from clinical care to customer service.",
      "icon_name": "Award",
      "image_url": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "innovation",
      "title": "Innovation", 
      "description": "Continuously improving healthcare delivery through technology and creative solutions.",
      "icon_name": "Zap",
      "image_url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}'::jsonb
WHERE section_key = 'about_values';

-- Add hero background image
UPDATE website_content 
SET background_image_url = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80'
WHERE section_key = 'about_hero';