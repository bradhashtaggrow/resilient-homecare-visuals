-- Insert Health Systems page content sections
INSERT INTO public.website_content (
  section_key, 
  title, 
  subtitle, 
  description, 
  is_active,
  content_data
) VALUES 
-- Health Systems Hero Section
(
  'health_systems_hero',
  'Transform Your Health System',
  '',
  'We partner with progressive health systems and hospitals to transform patient care through cutting-edge technology and seamless care coordination. Our comprehensive platform enables you to expand services, improve outcomes, and prepare for the future of healthcare while maintaining the highest standards of clinical excellence.',
  true,
  '{}'::jsonb
),

-- Why Transform Section with 3 features and images
(
  'health_systems_why_transform',
  'Why Transform Your Health System?',
  'Three critical factors driving the future of healthcare delivery',
  '',
  true,
  '{
    "features": [
      {
        "title": "Growing Patient Demand",
        "description": "Patients increasingly prefer receiving care in their homes, driving demand for comprehensive home-based healthcare solutions.",
        "icon": "TrendingUp",
        "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        "title": "Operational Excellence", 
        "description": "Streamline care coordination and reduce costs while maintaining the highest quality standards for patient outcomes.",
        "icon": "Building2",
        "image_url": "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        "title": "Future-Ready Technology",
        "description": "Stay competitive with cutting-edge healthcare technology that adapts to evolving industry needs and regulations.",
        "icon": "Shield", 
        "image_url": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  }'::jsonb
),

-- Health System Benefits Section
(
  'health_systems_benefits',
  'For Health Systems',
  'Scale Home-Based Care Without Compromising Quality',
  '',
  true,
  '{
    "benefits": [
      "Expand patient capacity by 40-60% with efficient home-based care delivery.",
      "Reduce operational costs while improving patient satisfaction and outcomes.",
      "Integrate seamlessly with existing workflows and technology infrastructure.",
      "Access on-demand clinical workforce to meet fluctuating care demands."
    ],
    "image_url": "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }'::jsonb
),

-- Health System Features Section  
(
  'health_systems_features',
  'Platform Features',
  'Comprehensive Technology Suite for Modern Healthcare',
  '',
  true,
  '{
    "features": [
      "AI-powered patient-clinician matching for optimal care coordination.",
      "Real-time monitoring and analytics dashboard for operational insights.",
      "Seamless integration with existing EMR and healthcare management systems.",
      "Automated scheduling, billing, and compliance management tools."
    ],
    "image_url": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }'::jsonb
),

-- Health System Values Section
(
  'health_systems_values',
  'Our Commitment to Health Systems',
  'The principles that guide our partnership approach to transforming healthcare delivery',
  '',
  true,
  '{
    "values": [
      {
        "title": "Security & Compliance",
        "description": "HIPAA-compliant platform with enterprise-grade security to protect patient data and organizational integrity.",
        "icon_name": "Shield"
      },
      {
        "title": "Scalable Growth",
        "description": "Technology that grows with your organization, supporting expansion without compromising performance or quality.",
        "icon_name": "TrendingUp"
      },
      {
        "title": "Partnership Focus",
        "description": "We work as an extension of your team, providing dedicated support throughout implementation and beyond.",
        "icon_name": "Users"
      },
      {
        "title": "Proven Excellence",
        "description": "Track record of successful implementations with measurable improvements in patient outcomes and satisfaction.",
        "icon_name": "Award"
      }
    ]
  }'::jsonb
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle, 
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  updated_at = now();