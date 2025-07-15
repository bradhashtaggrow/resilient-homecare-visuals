INSERT INTO public.website_content (
  section_key,
  title,
  subtitle, 
  description,
  content_data,
  is_active
) VALUES (
  'home_service_lines',
  'Fully Streamlined, Uncompromisingly Simple',
  'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.',
  'Our comprehensive service lines provide hospitals with streamlined solutions to extend care delivery into the home environment.',
  '{
    "services": [
      {
        "id": "outpatient-pt",
        "title": "Outpatient PT Anywhere",
        "subtitle": "Home-Based Therapy & Recovery",
        "description": "Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.",
        "icon_name": "Activity",
        "benefits": [
          "Generate new outpatient therapy revenue",
          "Reduce costly post-acute placements", 
          "Improve patient outcomes with early intervention",
          "Prepare for value-based care programs"
        ],
        "image_url": "/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png"
      },
      {
        "id": "primary-care",
        "title": "Primary Care at Home", 
        "subtitle": "Transitional & Rural Care Extension",
        "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
        "icon_name": "Heart",
        "benefits": [
          "Extend transitional care management for high-risk patients",
          "Expand rural health clinic reach into underserved areas",
          "Reduce readmissions with targeted follow-up visits"
        ],
        "image_url": "/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png"
      },
      {
        "id": "hospital-at-home",
        "title": "Acute Hospital-at-Home",
        "subtitle": "CMS-Compliant Inpatient Care at Home", 
        "description": "Full implementation support for hospital-level care delivery in the home environment.",
        "icon_name": "Building2",
        "benefits": [
          "Complete workflow design & policy development",
          "Staff training & education programs",
          "Medicare waiver submission support"
        ],
        "note": "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
        "image_url": "/lovable-uploads/5a772b80-d2b2-4229-9e36-55d6ed4eb178.png"
      }
    ]
  }'::jsonb,
  true
)