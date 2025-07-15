-- Restore Care at Home page CMS content sections

INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES

-- Care at Home Hero section
('care_at_home_hero', 'Hospital-Level Care. At Home.', 'Advanced Medical Services in the Comfort of Home', 'We partner with hospitals to deliver comprehensive medical care directly to patients homes, combining clinical excellence with the comfort and convenience of home-based treatment.', true, '{}'),

-- Care at Home Features section
('care_at_home_features', 'Comprehensive Care Services', 'Full Spectrum Medical Support', 'Our platform enables hospitals to extend their clinical capabilities into the home environment with complete support and integration.', true, '{
  "features": [
    {
      "title": "24/7 Clinical Support",
      "description": "Round-the-clock medical supervision and emergency response capabilities",
      "icon": "Heart"
    },
    {
      "title": "Advanced Monitoring",
      "description": "Real-time patient monitoring with clinical-grade medical devices",
      "icon": "Activity"
    },
    {
      "title": "Seamless Integration",
      "description": "Full integration with hospital EHR systems and workflows",
      "icon": "Network"
    },
    {
      "title": "Family Support",
      "description": "Comprehensive education and support for family caregivers",
      "icon": "Users"
    }
  ]
}'),

-- Care at Home Benefits section
('care_at_home_benefits', 'Why Choose Home-Based Care', 'Better Outcomes, Lower Costs', 'Home-based care delivers superior patient outcomes while reducing healthcare costs and improving quality of life.', true, '{
  "benefits": [
    {
      "title": "Improved Patient Outcomes",
      "description": "Studies show faster recovery times and reduced complications when patients receive care at home",
      "icon": "TrendingUp"
    },
    {
      "title": "Reduced Healthcare Costs",
      "description": "Significant cost savings compared to traditional hospital and facility-based care",
      "icon": "DollarSign"
    },
    {
      "title": "Enhanced Quality of Life",
      "description": "Patients remain in familiar surroundings with family support and comfort",
      "icon": "Home"
    },
    {
      "title": "Lower Infection Risk",
      "description": "Reduced exposure to hospital-acquired infections and complications",
      "icon": "Shield"
    }
  ]
}'),

-- Care at Home Process section
('care_at_home_process', 'How It Works', 'Simple, Streamlined Care Process', 'Our proven process ensures seamless transition from hospital to home with continuous medical supervision.', true, '{
  "steps": [
    {
      "step": "1",
      "title": "Initial Assessment",
      "description": "Comprehensive medical evaluation to determine home care eligibility and needs"
    },
    {
      "step": "2", 
      "title": "Care Plan Development",
      "description": "Customized treatment plan developed by hospital medical team"
    },
    {
      "step": "3",
      "title": "Home Setup",
      "description": "Professional installation of medical equipment and safety systems"
    },
    {
      "step": "4",
      "title": "Ongoing Care",
      "description": "24/7 monitoring with regular visits from medical professionals"
    }
  ]
}'),

-- Care at Home CTA/Footer section
('care_at_home_footer', 'Ready to Transform Healthcare Delivery?', 'Partner with us to extend your clinical excellence into the home', 'Contact us today to learn how our technology platform can help you deliver better patient outcomes while capturing new revenue opportunities.', true, '{}')

ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();