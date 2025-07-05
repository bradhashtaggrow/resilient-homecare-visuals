-- Update Founder Section with complete personal story
UPDATE website_content 
SET 
  description = 'Personal journey and mission behind Resilient Healthcare from our founder who experienced the healthcare system''s challenges firsthand.',
  content_data = '{
    "founder_image": "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png",
    "quote": "Dad''s in the hospital, again...",
    "quote_subtitle": "That call became all too familiar.",
    "story": [
      "Over the last four years of my dad''s life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn''t return home at all.",
      "As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.",
      "I built this company because families—and hospitals—deserve better.",
      "At Resilient, we partner with hospitals to extend their care into the home. Whether it''s primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.",
      "Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both."
    ],
    "closing": "We are Resilient. And so are you.",
    "achievements": [
      {"icon": "BookOpen", "title": "PT, DPT", "subtitle": "Physical Therapist"},
      {"icon": "Users", "title": "Founder", "subtitle": "& CEO"},
      {"icon": "Award", "title": "Healthcare", "subtitle": "Innovation Leader"}
    ]
  }'::jsonb
WHERE section_key = 'founder';

-- Update Admin Dashboard Section with complete platform features
UPDATE website_content 
SET 
  title = 'Built for Healthcare IT Teams',
  subtitle = 'Enterprise-Grade Admin Tools',
  description = 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control over their healthcare operations.',
  content_data = '{
    "features": [
      {
        "title": "Take Full Control Of Your Business",
        "subtitle": "Anywhere. Any place.",
        "description": "Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control."
      },
      {
        "title": "Ready to Transform Your Healthcare Operations?",
        "description": "Join forward-thinking healthcare organizations who''ve already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration."
      }
    ],
    "demo_screens": [
      {"title": "Dashboard Overview", "description": "Real-time analytics and KPIs"},
      {"title": "Patient Management", "description": "Comprehensive patient care coordination"},
      {"title": "Staff Analytics", "description": "Performance metrics and scheduling"},
      {"title": "Financial Reports", "description": "Revenue tracking and cost analysis"}
    ]
  }'::jsonb
WHERE section_key = 'admin_dashboard';

-- Update Lead Generation Section with complete trust messaging
UPDATE website_content 
SET description = 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence. Join the healthcare transformation.',
  content_data = '{
    "trust_indicators": [
      {"stat": "500+", "label": "Healthcare Organizations", "description": "Leading hospitals and health systems"},
      {"benefit": "Exceptional Patient Outcomes", "description": "Proven results in patient satisfaction and clinical outcomes"},
      {"benefit": "Operational Excellence", "description": "Streamlined workflows and improved efficiency"}
    ],
    "call_to_action": {
      "headline": "Join 500+ Healthcare Organizations",
      "subheadline": "Transform Your Healthcare Delivery Today",
      "description": "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence."
    }
  }'::jsonb
WHERE section_key = 'lead_generation';

-- Update Mobile Showcase Section with complete feature details
UPDATE website_content 
SET 
  description = 'Enterprise-grade mobile platform that connects your entire healthcare ecosystem with military-grade security and real-time insights.',
  content_data = '{
    "features": [
      {
        "icon": "Shield",
        "title": "Enterprise Security",
        "description": "Bank-grade encryption with HIPAA compliance built-in"
      },
      {
        "icon": "BarChart3",
        "title": "Real-Time Analytics",
        "description": "Live dashboard with predictive insights and KPI tracking"
      },
      {
        "icon": "Users",
        "title": "Multi-Tenant Architecture",
        "description": "Scalable infrastructure supporting unlimited organizations"
      },
      {
        "icon": "Zap",
        "title": "API-First Platform",
        "description": "Seamless integration with existing healthcare systems"
      },
      {
        "icon": "Database",
        "title": "Cloud Infrastructure",
        "description": "99.9% uptime with automatic scaling and backup"
      },
      {
        "icon": "Lock",
        "title": "Access Control",
        "description": "Granular permissions with role-based authentication"
      }
    ],
    "mobile_demo": {
      "title": "Admin Portal",
      "subtitle": "Secure Healthcare Management",
      "features": ["Touch ID / Face ID Authentication", "Real-time Dashboard", "Secure Login", "Mobile-first Design"]
    }
  }'::jsonb
WHERE section_key = 'mobile_showcase';