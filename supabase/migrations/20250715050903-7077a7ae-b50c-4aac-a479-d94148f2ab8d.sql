-- Restore all missing CMS website content sections

-- Insert all the missing website content sections
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES

-- Value Proposition section
('value_proposition', 'We Manage The Work.', 'You Own The Program.', 'Our comprehensive approach delivers measurable outcomes for hospitals, patients, and communities.', true, '{}'),

-- Stats section  
('stats', 'Healthcare Statistics', '', '', true, '{
  "stats": [
    {
      "value": "38%",
      "label": "Healthcare Organizations", 
      "description": "Leading hospitals and health systems trust our platform",
      "source": "Healthcare Organizations"
    },
    {
      "value": "70%",
      "label": "Patient Satisfaction",
      "description": "Patients prefer care delivered at home", 
      "source": "Patient Satisfaction"
    },
    {
      "value": "91%",
      "label": "Cost Reduction",
      "description": "Average savings compared to traditional care models",
      "source": "Cost Reduction"
    },
    {
      "value": "95%", 
      "label": "Support Available",
      "description": "Round-the-clock clinical and technical support",
      "source": "Support Available"
    }
  ]
}'),

-- Mobile showcase section
('mobile_showcase', 'Take Control From Anywhere', 'Mobile-First Platform', 'Our intuitive mobile platform puts the power of healthcare management in your hands, enabling seamless care coordination from any location.', true, '{}'),

-- Lead generation section
('lead_gen', 'Ready to Transform Your Healthcare Delivery?', 'Get Started Today', 'Contact us to learn how our hospital-at-home platform can revolutionize patient care in your organization.', true, '{}'),

-- Admin dashboard section
('admin_dashboard', 'Take Full Control Of Your Business 2', 'Comprehensive Management Tools', 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.', true, '{
  "cta_headline": "Ready to Transform Your Healthcare Operations?",
  "cta_description": "Join forward-thinking healthcare organizations who have already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration."
}'),

-- Founder section
('founder', 'From Our Founder', '', 'Dad''s in the hospital, again...
That call became all too familiar.

Over the last four years of my dad''s life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn''t return home at all.

As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.

I built this company because families—and hospitals—deserve better.

At Resilient, we partner with hospitals to extend their care into the home. Whether it''s primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families. We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere.

Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both.

We are Resilient. And so are you.', true, '{
  "founder_image": "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png"
}'),

-- Footer section
('footer', 'Resilient Healthcare', '', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true, '{
  "logo": {
    "url": "/lovable-uploads/968ec75e-f823-449b-a633-9ca2ec166c66.png",
    "alt": "Resilient Healthcare Logo"
  },
  "links": [
    {
      "title": "Company", 
      "items": [
        {"name": "About Us", "url": "/about"},
        {"name": "Contact", "url": "/contact"},
        {"name": "News", "url": "/news"}
      ]
    },
    {
      "title": "Services",
      "items": [
        {"name": "Care at Home", "url": "/care-at-home"},
        {"name": "For Clinicians", "url": "/clinicians"},
        {"name": "For Patients", "url": "/patients"}
      ]
    },
    {
      "title": "Legal",
      "items": [
        {"name": "Privacy Policy", "url": "/privacy-policy"},
        {"name": "Terms of Service", "url": "/terms-of-service"},
        {"name": "HIPAA Compliance", "url": "/hipaa-compliance"}
      ]
    }
  ],
  "social": [
    {"name": "LinkedIn", "url": "#", "icon": "Linkedin"},
    {"name": "Twitter", "url": "#", "icon": "Twitter"}
  ],
  "contact": {
    "address": "Dallas, TX",
    "phone": "+1 888-874-0852",
    "email": "info@resilienthc.com"
  },
  "copyright": "© 2024 Resilient Healthcare. All rights reserved."
}')

ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- Restore value proposition features
INSERT INTO value_proposition_features (title, subtitle, subtitle2, description, icon_name, display_order) VALUES
('Expand Care Anywhere.', 'Improve Outcomes.', 'Capture Revenue.', 'Resilient partners with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', 'Target', 1),
('You Keep the Brand.', 'The Data.', 'The Relationship.', 'You Keep the Brand. The Data. The Relationship. We operate behind the scenes—white-labeled under your hospital''s brand and integrated into your workflows.', 'Building2', 2),
('Extend Your Hospital.', 'Power Your Value-Based', 'Future.', 'Launch service lines beyond your four walls with Resilient—and get in the game for value-based care and risk-based contracts without the overhead.', 'TrendingUp', 3)
ON CONFLICT DO NOTHING;

-- Update value proposition content with features data
UPDATE website_content 
SET content_data = (
  SELECT jsonb_build_object(
    'features', 
    jsonb_agg(
      jsonb_build_object(
        'title', title,
        'subtitle', subtitle,
        'subtitle2', subtitle2,
        'description', description,
        'icon', icon_name
      ) ORDER BY display_order
    )
  )
  FROM value_proposition_features
)
WHERE section_key = 'value_proposition';