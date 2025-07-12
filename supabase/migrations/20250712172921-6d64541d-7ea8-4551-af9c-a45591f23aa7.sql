-- Restore missing page content for Care at Home, Patients, and Clinicians pages
-- Add back the content these pages need to function properly

-- Care at Home page content
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data) VALUES
('care_at_home', 'Hospital-Level Care at Home', 'Bringing advanced medical care directly to patients', 'Our comprehensive home-based care platform enables hospitals to deliver acute and post-acute services in the comfort of patients'' homes, improving outcomes while reducing costs.', 'Learn More', '/contact', true, '{
  "benefits": [
    {"icon": "Heart", "title": "Improved Patient Outcomes", "description": "Studies show 30% better recovery rates with home-based care"},
    {"icon": "DollarSign", "title": "Cost Reduction", "description": "Up to 40% reduction in care delivery costs"},
    {"icon": "Clock", "title": "Faster Recovery", "description": "Patients recover 25% faster in familiar environments"},
    {"icon": "Shield", "title": "Reduced Infections", "description": "Lower risk of hospital-acquired infections"}
  ],
  "services": [
    {"name": "Acute Care", "description": "Hospital-level monitoring and treatment at home"},
    {"name": "Post-Acute Care", "description": "Comprehensive rehabilitation and recovery services"},
    {"name": "Chronic Care Management", "description": "Ongoing management of complex conditions"},
    {"name": "Palliative Care", "description": "Comfort-focused care for serious illnesses"}
  ]
}');

-- Patients page content  
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data) VALUES
('patients_hero', 'Care That Comes to You', 'Experience the future of healthcare in the comfort of your home', 'Receive hospital-quality care at home with our advanced technology and expert medical team. Better outcomes, faster recovery, and the comfort of being home.', 'Find Care Near You', '/contact', true, '{}'),
('patients_benefits', 'Why Choose Home-Based Care?', 'The advantages of receiving care at home', 'Home-based care offers numerous benefits over traditional hospital stays, from better comfort to improved outcomes.', null, null, true, '{
  "benefits": [
    {"icon": "Home", "title": "Comfort of Home", "description": "Recover in your familiar environment with family nearby"},
    {"icon": "TrendingUp", "title": "Better Outcomes", "description": "Clinical studies show improved recovery rates at home"},
    {"icon": "Clock", "title": "Flexible Scheduling", "description": "Care delivered when you need it, on your schedule"},
    {"icon": "Users", "title": "Family Involvement", "description": "Your loved ones can be part of your care journey"}
  ]
}');

-- Clinicians page content
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data) VALUES
('clinicians_tabs', 'Join Our Clinical Team', 'Make a difference in patients'' lives while advancing your career', 'Work with cutting-edge technology and a supportive team to deliver exceptional care in patients'' homes.', 'Apply Now', '/contact', true, '{
  "tabs": [
    {
      "id": "physicians",
      "title": "Physicians", 
      "content": {
        "title": "Lead the Future of Medicine",
        "description": "Join our team of physicians delivering hospital-quality care in patients'' homes.",
        "benefits": [
          "Competitive compensation with performance bonuses",
          "Flexible scheduling and work-life balance", 
          "Advanced technology and clinical support",
          "Meaningful patient relationships"
        ],
        "requirements": [
          "Board certification in relevant specialty",
          "Valid medical license",
          "2+ years clinical experience",
          "Commitment to patient-centered care"
        ]
      }
    },
    {
      "id": "nurses",
      "title": "Nurses",
      "content": {
        "title": "Transform Patient Care",
        "description": "Experience nursing the way it was meant to be - focused on patient care, not paperwork.",
        "benefits": [
          "Higher compensation than hospital settings",
          "Autonomy in patient care decisions",
          "Advanced clinical training opportunities", 
          "Technology that reduces documentation burden"
        ],
        "requirements": [
          "BSN or ADN with active RN license",
          "2+ years acute care experience",
          "Strong assessment and critical thinking skills",
          "Passion for patient advocacy"
        ]
      }
    },
    {
      "id": "therapists", 
      "title": "Therapists",
      "content": {
        "title": "Optimize Recovery Outcomes",
        "description": "Help patients achieve their best possible outcomes in the comfort of their own homes.",
        "benefits": [
          "Comprehensive benefits package",
          "Professional development support",
          "State-of-the-art equipment and tools",
          "Collaborative care team environment"
        ],
        "requirements": [
          "Licensed PT, OT, or SLP",
          "Home health experience preferred",
          "Strong communication skills",
          "Reliable transportation"
        ]
      }
    }
  ]
}');