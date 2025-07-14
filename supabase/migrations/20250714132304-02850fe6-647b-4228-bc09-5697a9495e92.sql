-- Update service_lines content with the correct copy from the website

UPDATE website_content 
SET content_data = '{
  "services": [
    {
      "id": "outpatient-pt",
      "title": "Outpatient PT Anywhere",
      "subtitle": "Home-Based Therapy & Recovery",
      "description": "Hospital-branded physical therapy delivered directly to patients homes with full technology integration.",
      "icon_name": "Activity",
      "color": "blue",
      "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Generate new outpatient therapy revenue", "icon": "TrendingUp"},
        {"text": "Reduce costly post-acute placements", "icon": "DollarSign"},
        {"text": "Improve patient outcomes with early intervention", "icon": "Target"},
        {"text": "Prepare for value-based care programs", "icon": "Shield"}
      ]
    },
    {
      "id": "primary-care",
      "title": "Primary Care at Home",
      "subtitle": "Transitional & Rural Care Extension",
      "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      "icon_name": "Heart",
      "color": "green",
      "patient_image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Extend transitional care management for high-risk patients", "icon": "Users"},
        {"text": "Expand rural health clinic reach into underserved areas", "icon": "MapPin"},
        {"text": "Reduce readmissions with targeted follow-up visits", "icon": "CheckCircle"}
      ]
    },
    {
      "id": "acute-hospital",
      "title": "Acute Hospital-at-Home",
      "subtitle": "CMS-Compliant Inpatient Care at Home",
      "description": "Full implementation support for hospital-level care delivery in the home environment.",
      "icon_name": "Shield",
      "color": "red",
      "patient_image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Complete workflow design & policy development", "icon": "FileText"},
        {"text": "Staff training & education programs", "icon": "GraduationCap"},
        {"text": "Medicare waiver submission support", "icon": "Award"},
        {"text": "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.", "icon": "Calendar"}
      ]
    }
  ]
}'
WHERE section_key = 'service_lines';