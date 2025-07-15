-- Restore all missing CMS pages content from the dropdown menu

INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES

-- Clinicians page sections
('clinicians_hero', 'Join the Future of Healthcare', 'Meaningful Work, Advanced Technology', 'Be part of a team that is transforming patient care by bringing hospital-level services directly to patients homes.', true, '{}'),

('clinicians_benefits', 'Why Choose Resilient', 'Professional Growth & Impact', 'Join a team of dedicated healthcare professionals making a real difference in patient outcomes.', true, '{
  "benefits": [
    {
      "title": "Flexible Scheduling",
      "description": "Work-life balance with flexible scheduling options that fit your lifestyle",
      "icon": "Clock"
    },
    {
      "title": "Advanced Technology",
      "description": "State-of-the-art medical technology and digital health platforms",
      "icon": "Smartphone"
    },
    {
      "title": "Competitive Compensation",
      "description": "Industry-leading compensation packages with comprehensive benefits",
      "icon": "DollarSign"
    },
    {
      "title": "Professional Development",
      "description": "Ongoing training and career advancement opportunities",
      "icon": "GraduationCap"
    }
  ]
}'),

('clinicians_footer', 'Join the Future of Healthcare', 'Be part of the team transforming patient care', 'Ready to make a meaningful impact in healthcare? Join our network of dedicated clinicians delivering exceptional care in the home setting.', true, '{}'),

-- Patients page sections
('patients_hero', 'Hospital-Quality Care at Home', 'Receive Expert Medical Care in Comfort', 'Experience the same high-quality medical care you would receive in a hospital, delivered safely and conveniently in your own home.', true, '{}'),

('patients_services', 'Our Patient Services', 'Comprehensive Home Healthcare', 'We provide a full range of medical services designed to meet your healthcare needs in the comfort of your home.', true, '{
  "services": [
    {
      "title": "Recovery & Rehabilitation",
      "description": "Physical therapy and rehabilitation services to help you recover faster",
      "icon": "Activity"
    },
    {
      "title": "Chronic Care Management",
      "description": "Ongoing support for managing chronic conditions at home",
      "icon": "Heart"
    },
    {
      "title": "Post-Surgical Care",
      "description": "Expert care and monitoring following surgical procedures",
      "icon": "Shield"
    },
    {
      "title": "Medication Management",
      "description": "Safe medication administration and monitoring",
      "icon": "Pill"
    }
  ]
}'),

-- News page sections
('news_hero', 'Healthcare News & Insights', 'Stay Informed', 'Keep up with the latest developments in home healthcare, industry trends, and Resilient Healthcare updates.', true, '{}'),

-- About Us page sections
('about_hero', 'About Resilient Healthcare', 'Transforming Healthcare Delivery', 'We are dedicated to revolutionizing healthcare by bringing hospital-level care directly to patients homes, improving outcomes while reducing costs.', true, '{}'),

('about_mission', 'Our Mission', 'Better Care, Better Outcomes', 'To transform healthcare delivery by providing hospital-level care in the comfort and safety of patients homes, improving outcomes while reducing costs for hospitals and patients alike.', true, '{}'),

('about_values', 'Our Core Values', 'What Drives Us', 'Our values guide everything we do and define how we serve our patients, partners, and communities.', true, '{
  "values": [
    {
      "title": "Patient-Centered Care",
      "description": "Every decision we make is focused on improving patient outcomes and experience",
      "icon": "Heart"
    },
    {
      "title": "Clinical Excellence", 
      "description": "We maintain the highest standards of medical care and safety",
      "icon": "Award"
    },
    {
      "title": "Innovation",
      "description": "We leverage technology and innovation to continuously improve care delivery",
      "icon": "Lightbulb"
    },
    {
      "title": "Integrity",
      "description": "We operate with transparency, honesty, and ethical practices",
      "icon": "Shield"
    }
  ]
}'),

-- Contact page sections
('contact_hero', 'Contact Resilient Healthcare', 'Get in Touch', 'Ready to learn how we can help transform your healthcare delivery? Contact our team to discuss your needs.', true, '{}'),

('contact_info', 'Contact Information', '', '', true, '{
  "contact": {
    "address": "Dallas, TX",
    "phone": "+1 888-874-0852",
    "email": "info@resilienthc.com"
  },
  "hours": {
    "title": "Business Hours",
    "schedule": [
      {"day": "Monday - Friday", "hours": "8:00 AM - 6:00 PM CST"},
      {"day": "Saturday", "hours": "9:00 AM - 2:00 PM CST"},
      {"day": "Sunday", "hours": "Closed"}
    ]
  }
}'),

-- Privacy Policy page
('privacy_policy', 'Privacy Policy', 'Your Privacy Matters', 'This Privacy Policy describes how Resilient Healthcare collects, uses, and protects your personal information when you use our services.', true, '{
  "last_updated": "2024-01-15",
  "sections": [
    {
      "title": "Information We Collect",
      "content": "We collect information you provide directly to us, such as when you create an account, request services, or contact us for support."
    },
    {
      "title": "How We Use Your Information", 
      "content": "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."
    },
    {
      "title": "Information Sharing",
      "content": "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."
    }
  ]
}'),

-- Terms of Service page
('terms_of_service', 'Terms of Service', 'Terms & Conditions', 'These Terms of Service govern your use of Resilient Healthcare services and constitute a binding agreement between you and Resilient Healthcare.', true, '{
  "last_updated": "2024-01-15",
  "sections": [
    {
      "title": "Acceptance of Terms",
      "content": "By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations."
    },
    {
      "title": "Service Description",
      "content": "Resilient Healthcare provides technology-enabled healthcare services delivered in partnership with healthcare providers."
    },
    {
      "title": "User Responsibilities",
      "content": "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
    }
  ]
}'),

-- HIPAA Compliance page
('hipaa_compliance', 'HIPAA Compliance', 'Protecting Your Health Information', 'Resilient Healthcare is committed to protecting your health information and maintaining full compliance with HIPAA regulations.', true, '{
  "compliance_areas": [
    {
      "title": "Privacy Rule Compliance",
      "description": "We strictly adhere to HIPAA Privacy Rule requirements for protecting health information",
      "icon": "Lock"
    },
    {
      "title": "Security Safeguards",
      "description": "Advanced technical, physical, and administrative safeguards protect your data",
      "icon": "Shield"
    },
    {
      "title": "Breach Notification",
      "description": "Comprehensive breach notification procedures in compliance with HIPAA requirements",
      "icon": "AlertTriangle"
    },
    {
      "title": "Business Associate Agreements",
      "description": "All third-party vendors sign HIPAA-compliant business associate agreements",
      "icon": "FileText"
    }
  ]
}'),

-- Data Security page
('data_security', 'Data Security', 'Enterprise-Grade Protection', 'Your data security is our top priority. We employ multiple layers of protection to ensure your information remains safe and secure.', true, '{
  "security_measures": [
    {
      "title": "Encryption",
      "description": "End-to-end encryption for data in transit and at rest using industry-standard protocols",
      "icon": "Key"
    },
    {
      "title": "Access Controls",
      "description": "Multi-factor authentication and role-based access controls limit data access",
      "icon": "UserCheck"
    },
    {
      "title": "Regular Audits",
      "description": "Continuous security monitoring and regular third-party security audits",
      "icon": "Search"
    },
    {
      "title": "Compliance Certifications",
      "description": "SOC 2 Type II, HIPAA, and other industry compliance certifications",
      "icon": "Award"
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