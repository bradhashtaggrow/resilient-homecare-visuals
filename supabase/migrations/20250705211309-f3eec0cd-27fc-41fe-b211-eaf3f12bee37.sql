-- Update Hero Section with complete content
UPDATE website_content 
SET description = 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.'
WHERE section_key = 'hero';

-- Update Value Proposition Section with complete content
UPDATE website_content 
SET 
  description = 'Transform healthcare delivery with our comprehensive platform that extends your hospital''s reach while maintaining your brand, data ownership, and patient relationships.',
  content_data = '{
    "value_props": [
      {
        "title": "Expand Care Anywhere.",
        "subtitle": "Improve Outcomes.",
        "subtitle2": "Capture Revenue.",
        "description": "Resilient partners with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue."
      },
      {
        "title": "You Keep the Brand.",
        "subtitle": "The Data.",
        "subtitle2": "The Relationship.",
        "description": "You Keep the Brand. The Data. The Relationship. We operate behind the scenes—white-labeled under your hospital''s brand and integrated into your workflows."
      },
      {
        "title": "Extend Your Hospital.",
        "subtitle": "Power Your Value-Based",
        "subtitle2": "Future.",
        "description": "Launch service lines beyond your four walls with Resilient—and get in the game for value-based care and risk-based contracts without the overhead."
      }
    ]
  }'::jsonb
WHERE section_key = 'value_proposition';

-- Update Services Section with complete content
UPDATE website_content 
SET 
  description = 'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.',
  content_data = '{
    "services": [
      {
        "id": "outpatient-pt",
        "icon": "Activity",
        "title": "Outpatient PT Anywhere",
        "subtitle": "Home-Based Therapy & Recovery",
        "description": "Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.",
        "benefits": [
          {"text": "Generate new outpatient therapy revenue", "icon": "TrendingUp"},
          {"text": "Reduce costly post-acute placements", "icon": "Shield"},
          {"text": "Improve patient outcomes with early intervention", "icon": "Target"},
          {"text": "Prepare for value-based care programs", "icon": "Award"}
        ],
        "color": "blue",
        "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "primary-care",
        "icon": "Heart",
        "title": "Primary Care at Home",
        "subtitle": "Transitional & Rural Care Extension",
        "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
        "benefits": [
          {"text": "Extend transitional care management for high-risk patients", "icon": "Users"},
          {"text": "Expand rural health clinic reach into underserved areas", "icon": "MapPin"},
          {"text": "Reduce readmissions with targeted follow-up visits", "icon": "CheckCircle"}
        ],
        "color": "red",
        "patient_image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "hospital-at-home",
        "icon": "Building2",
        "title": "Acute Hospital-at-Home",
        "subtitle": "CMS-Compliant Inpatient Care at Home",
        "description": "Full implementation support for hospital-level care delivery in the home environment.",
        "benefits": [
          {"text": "Complete workflow design & policy development", "icon": "Zap"},
          {"text": "Staff training & education programs", "icon": "Users"},
          {"text": "Medicare waiver submission support", "icon": "Clock"}
        ],
        "note": "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
        "color": "cyan",
        "patient_image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      }
    ]
  }'::jsonb
WHERE section_key = 'services';

-- Update Stats Section with complete research content
UPDATE website_content 
SET description = 'Evidence-based outcomes from hospital-at-home care delivery backed by leading medical journals and research institutions.',
  content_data = '{
    "stats": [
      {
        "value": "38%",
        "label": "Cost Savings",
        "description": "A study published in JAMA Internal Medicine found that hospital-at-home care reduced costs by 38% compared to traditional inpatient care.",
        "source": "JAMA Internal Medicine"
      },
      {
        "value": "70%",
        "label": "Reduction in Readmissions",
        "description": "A study published in JAMA Internal Medicine reported a 70% reduction in 30-day readmission rates among hospital-at-home patients compared to traditional inpatient care.",
        "source": "30-day readmissions"
      },
      {
        "value": "91%",
        "label": "Patient Preference",
        "description": "A survey published in the Annals of Internal Medicine found that 91% of patients who received hospital-level care at home would choose this option again for similar medical conditions.",
        "source": "Annals of Internal Medicine"
      },
      {
        "value": "95%",
        "label": "Less Stress",
        "description": "A study published in BMJ Open Quality reported that 95% of patients felt less stressed receiving care at home compared to inpatient hospital care.",
        "source": "BMJ Open Quality"
      }
    ]
  }'::jsonb
WHERE section_key = 'stats';