-- First, delete all existing website content to clean up stock content
DELETE FROM website_content;

-- Insert proper homepage sections with real content
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, background_video_url, content_data, is_active) VALUES 

-- Hero Section
('hero', 'The Future of Healthcare', '', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', 'Request Demo', '/request-demo', 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', '{}', true),

-- Services Section
('services', 'Fully Streamlined, Uncompromisingly Simple', '', 'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.', NULL, NULL, NULL, '{
  "services": [
    {
      "id": "outpatient-pt",
      "title": "Outpatient PT Anywhere",
      "subtitle": "Home-Based Therapy & Recovery",
      "description": "Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.",
      "icon": "Activity",
      "color": "blue",
      "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"icon": "TrendingUp", "text": "Generate new outpatient therapy revenue"},
        {"icon": "Shield", "text": "Reduce costly post-acute placements"},
        {"icon": "Target", "text": "Improve patient outcomes with early intervention"},
        {"icon": "Award", "text": "Prepare for value-based care programs"}
      ]
    },
    {
      "id": "primary-care",
      "title": "Primary Care at Home", 
      "subtitle": "Transitional & Rural Care Extension",
      "description": "Physician and advanced practice providers delivering seamless care transitions and rural health services.",
      "icon": "Heart",
      "color": "red",
      "patient_image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"icon": "Users", "text": "Extend transitional care management for high-risk patients"},
        {"icon": "MapPin", "text": "Expand rural health clinic reach into underserved areas"}, 
        {"icon": "CheckCircle", "text": "Reduce readmissions with targeted follow-up visits"}
      ]
    },
    {
      "id": "hospital-at-home",
      "title": "Acute Hospital-at-Home",
      "subtitle": "CMS-Compliant Inpatient Care at Home", 
      "description": "Full implementation support for hospital-level care delivery in the home environment.",
      "icon": "Building2",
      "color": "cyan",
      "patient_image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "note": "CMS waiver extended through September 2025. We help hospitals prepare for future program versions.",
      "benefits": [
        {"icon": "Zap", "text": "Complete workflow design & policy development"},
        {"icon": "Users", "text": "Staff training & education programs"},
        {"icon": "Clock", "text": "Medicare waiver submission support"}
      ]
    }
  ]
}', true),

-- Mobile Showcase Section  
('mobile', 'The Future of Care', 'Experience healthcare like never before', 'Every interaction reimagined.', NULL, NULL, NULL, '{
  "tabs": [
    {
      "id": "partner-with",
      "title": "Partner with",
      "subtitle": "Leading Hospitals",
      "description": "Connect with top-tier healthcare institutions to deliver exceptional patient care.",
      "icon_name": "Building2",
      "display_order": 1,
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "consistent-patient", 
      "title": "Consistent Patient",
      "subtitle": "Care Experience",
      "description": "Ensure seamless continuity of care across all patient touchpoints.",
      "icon_name": "Users",
      "display_order": 2,
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "complete-home",
      "title": "Complete Home",
      "subtitle": "Healthcare Solutions", 
      "description": "Comprehensive healthcare services delivered directly to patients'' homes.",
      "icon_name": "Heart",
      "display_order": 3,
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "streamlined-platform",
      "title": "Streamlined Platform", 
      "subtitle": "Technology Integration",
      "description": "Advanced platform technology that simplifies healthcare delivery.",
      "icon_name": "Zap",
      "display_order": 4,
      "image_url": "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "simple-per-visit",
      "title": "Simple Per-Visit",
      "subtitle": "Billing Model",
      "description": "Transparent and straightforward per-visit billing for healthcare services.",
      "icon_name": "CheckCircle", 
      "display_order": 5,
      "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}', true),

-- Value Proposition Section
('value_proposition', 'We Manage The Work', 'So hospitals can focus on patient care', 'Our comprehensive platform handles every aspect of home-based care delivery, from clinician matching to billing and compliance.', NULL, NULL, NULL, '{}', true),

-- Admin Dashboard/Laptop Section  
('admin_dashboard', 'Intelligent Care Coordination', 'RAIN-powered platform that orchestrates every aspect of care delivery', 'Advanced analytics, real-time monitoring, and seamless integration with hospital systems ensure optimal patient outcomes and operational efficiency.', NULL, NULL, NULL, '{}', true),

-- Founder Section
('founder', 'Founder''s Story', 'from Dr. Jackleen Samuel, PT, DPT | Founder & CEO', 'Personal journey and mission behind Resilient Healthcare from our founder who experienced the healthcare system''s challenges firsthand.', 'Learn More', '#', NULL, '{
  "founder_image": "/lovable-uploads/0e13c6b2-1822-4376-ae28-4c9ed2e5f0c7.png",
  "quote": "Dad''s in the hospital, again...",
  "quote_subtitle": "That call became all too familiar.",
  "story": ["Over the last four years of my dad''s life, he cycled through hospitals, rehab centers, and specialists. After his first stroke at 61, things never really stabilized. His chronic conditions—diabetes, hypertension, high cholesterol—were poorly managed, and each hospital stay left him weaker than before. Eventually, he couldn''t return home at all.", "As a physical therapist, I knew the system was broken—but as a daughter, I lived it. We were constantly exhausted, worried, and navigating a healthcare system that felt more fragmented and reactive than healing.", "I built this company because families—and hospitals—deserve better. At Resilient, we partner with hospitals to extend their care into the home. Whether it''s primary care, rehab, or hospital-level services, we bring the team to the patient—without burning out clinicians or placing the burden on families.", "We built the infrastructure, technology, and clinical support so hospitals can deliver exceptional care anywhere. Because patients want to stay home. Clinicians want to do what they were trained to do—without drowning in paperwork or unsustainable workloads. And hospitals need a better way to serve them both."],
  "achievements": [
    {"title": "PT, DPT", "subtitle": "Physical Therapist", "icon": "BookOpen"},
    {"title": "Founder", "subtitle": "& CEO", "icon": "Users"},
    {"title": "Healthcare", "subtitle": "Innovation Leader", "icon": "Award"}
  ],
  "closing": "We are Resilient. And so are you."
}', true),

-- Stats Section - What Does The Research Say
('stats', 'What Does The Research Say?', '', 'Evidence-based outcomes from hospital-at-home care delivery backed by leading medical journals and research institutions.', 'View Research', '#', NULL, '{
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
}', true),

-- Lead Generation Section - Join 500+ Hospitals
('lead_generation', 'Join 500+ Healthcare Organizations', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', 'Request Demo', '/request-demo', NULL, '{}', true),

-- Footer Section
('footer', 'Resilient Healthcare', 'Extending care beyond the hospital', 'Contact us to learn how our hospital-at-home platform can revolutionize patient care in your organization.', 'Contact Us', '#contact', NULL, '{}', true);