
-- Insert Patients hero content
INSERT INTO website_content (section_key, title, description, is_active) 
VALUES (
  'patients_hero',
  'Patient-centered',
  'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  updated_at = now();

-- Insert Patients mobile tabs content
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active)
VALUES (
  'patients_mobile',
  'How We Transform Care',
  'Discover our comprehensive approach to delivering exceptional healthcare experiences at home',
  'Every step designed for you.',
  '{
    "tabs": [
      {
        "id": "hospitals-partnership",
        "title": "Work with leading hospitals",
        "subtitle": "Partnership Excellence",
        "description": "Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.",
        "color": "blue",
        "icon_name": "Building2",
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "patient-referrals",
        "title": "Get access to a consistent stream of patient referrals",
        "subtitle": "Steady Patient Flow",
        "description": "Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.",
        "color": "green",
        "icon_name": "Users",
        "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "care-delivery",
        "title": "Support care delivery for hospital-at-home and outpatient services",
        "subtitle": "Comprehensive Home Care",
        "description": "Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.",
        "color": "purple",
        "icon_name": "Heart",
        "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "simplified-workflows",
        "title": "Simplified workflows and credentialing through our platform",
        "subtitle": "Streamlined Operations",
        "description": "Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.",
        "color": "orange",
        "icon_name": "Shield",
        "image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "payment-structure",
        "title": "We pay you per visit so no need to worry about administrative burden",
        "subtitle": "Simple Payment Model",
        "description": "Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.",
        "color": "teal",
        "icon_name": "CheckCircle",
        "image_url": "https://images.unsplash.com/photo-1551601651-2a8555f1c796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      }
    ]
  }'::jsonb,
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  updated_at = now();
