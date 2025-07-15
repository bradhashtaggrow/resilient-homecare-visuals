-- Create the 3 tab design content for Care at Home page

INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('care_at_home_mobile', 'Care Services at Home', 'Choose Your Care Option', 'Our comprehensive platform delivers three distinct levels of care, each designed to meet specific patient needs while maintaining the highest standards of medical excellence.', true, '{
  "tabs": [
    {
      "id": "outpatient-pt",
      "title": "Outpatient PT Anywhere",
      "subtitle": "Home-Based Therapy & Recovery",
      "description": "Hospital-branded physical therapy delivered directly to patients homes with full technology integration. Generate new outpatient therapy revenue while reducing costly post-acute placements.",
      "icon_name": "Activity",
      "image_url": "/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png"
    },
    {
      "id": "primary-care",
      "title": "Primary Care at Home", 
      "subtitle": "Transitional & Rural Care Extension",
      "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services. Extend transitional care management for high-risk patients and expand rural health clinic reach.",
      "icon_name": "Heart",
      "image_url": "/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png"
    },
    {
      "id": "hospital-at-home",
      "title": "Acute Hospital-at-Home",
      "subtitle": "CMS-Compliant Inpatient Care at Home", 
      "description": "Full implementation support for hospital-level care delivery in the home environment. Complete workflow design, staff training, and Medicare waiver submission support. CMS waiver extended through September 2025.",
      "icon_name": "Building2",
      "image_url": "/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png"
    }
  ]
}')
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle, 
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();