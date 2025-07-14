-- Restore missing CMS pages: News, About Us, Contact Us and other missing content

-- Insert News page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('news_hero', 'Latest Healthcare News', 'Stay Informed', 'Get the latest updates on healthcare innovation, industry trends, and company announcements.', true, '{}'),

('news_featured', 'Featured Stories', 'Top Healthcare News', 'Discover the most important developments in healthcare technology and patient care.', true, '{
  "featured_posts": [
    {
      "title": "The Future of Home Healthcare Technology",
      "excerpt": "Exploring how emerging technologies are transforming patient care delivery in home settings.",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "date": "2024-01-15",
      "category": "Technology"
    },
    {
      "title": "Improving Patient Outcomes Through Remote Monitoring",
      "excerpt": "Research shows significant improvements in patient outcomes with continuous remote monitoring systems.",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "date": "2024-01-10",
      "category": "Research"
    }
  ]
}');

-- Insert About Us page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('about_mission', 'Our Mission', 'Transforming Healthcare Delivery', 'We are dedicated to revolutionizing healthcare by bringing hospital-quality care directly to patients homes through innovative technology and expert clinical teams.', true, '{}'),

('about_vision', 'Our Vision', 'The Future of Healthcare', 'To create a world where high-quality healthcare is accessible, comfortable, and convenient for every patient, regardless of their location or circumstances.', true, '{}'),

('about_team', 'Leadership Team', 'Meet Our Experts', 'Our experienced leadership team combines decades of healthcare expertise with innovative technology vision.', true, '{
  "team_members": [
    {
      "name": "Dr. Sarah Johnson, MD",
      "title": "Chief Executive Officer & Co-Founder",
      "bio": "Former Chief Medical Officer with 20+ years experience in healthcare innovation, digital transformation, and clinical excellence. Board-certified in Internal Medicine.",
      "image_url": "https://images.unsplash.com/photo-1559209172-2bf17d48ad8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#",
      "credentials": "MD, MBA, FACP"
    },
    {
      "name": "Michael Chen",
      "title": "Chief Technology Officer & Co-Founder",
      "bio": "Technology leader with expertise in healthcare systems, data security, HIPAA compliance, and scalable platform architecture. Former Microsoft Healthcare division.",
      "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#",
      "credentials": "MS Computer Science, CISSP"
    },
    {
      "name": "Dr. Emily Rodriguez, RN",
      "title": "Chief Nursing Officer",
      "bio": "Registered Nurse with 15+ years in home healthcare, care coordination, and clinical quality improvement. Expert in patient safety protocols.",
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#",
      "credentials": "RN, BSN, MSN"
    },
    {
      "name": "David Park",
      "title": "Chief Financial Officer",
      "bio": "Healthcare finance executive with experience in value-based care models, revenue cycle management, and strategic partnerships with health systems.",
      "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#",
      "credentials": "CPA, MBA"
    }
  ]
}'),

('about_story', 'Our Story', 'How We Started', 'Founded in 2020 by a team of healthcare professionals and technology experts, Resilient Healthcare emerged from a shared vision to transform how medical care is delivered.', true, '{
  "story_timeline": [
    {
      "year": "2020",
      "title": "Company Founded",
      "description": "Resilient Healthcare was founded with the mission to bring hospital-quality care to patients homes."
    },
    {
      "year": "2021",
      "title": "First Partnerships",
      "description": "Established partnerships with leading regional hospitals to pilot home-based care programs."
    },
    {
      "year": "2022",
      "title": "Platform Launch",
      "description": "Launched our comprehensive care coordination platform with real-time monitoring capabilities."
    },
    {
      "year": "2023",
      "title": "Rapid Expansion",
      "description": "Expanded to serve 100+ healthcare organizations across multiple states."
    },
    {
      "year": "2024",
      "title": "Innovation Leader",
      "description": "Recognized as a leader in home healthcare technology with 500+ partner organizations."
    }
  ]
}'),

('about_values_detailed', 'Core Values', 'What Drives Everything We Do', 'Our values guide every decision we make and every interaction we have with patients, partners, and team members.', true, '{
  "values": [
    {
      "title": "Patient First",
      "description": "Every decision we make prioritizes patient safety, comfort, and outcomes above all else.",
      "icon": "Heart"
    },
    {
      "title": "Clinical Excellence",
      "description": "We maintain the highest standards of clinical care and continuously improve our practices.",
      "icon": "Award"
    },
    {
      "title": "Innovation",
      "description": "We embrace new technologies and methodologies that improve patient care and outcomes.",
      "icon": "Lightbulb"
    },
    {
      "title": "Integrity",
      "description": "We operate with complete transparency, honesty, and ethical standards in all our interactions.",
      "icon": "Shield"
    },
    {
      "title": "Collaboration",
      "description": "We work together with healthcare partners, families, and communities to achieve the best outcomes.",
      "icon": "Users"
    },
    {
      "title": "Compassion",
      "description": "We approach every patient and family with empathy, understanding, and genuine care.",
      "icon": "HandHeart"
    }
  ]
}');

-- Insert Contact Us page content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('contact_hero', 'Get in Touch', 'Ready to Transform Healthcare?', 'Contact our team to learn how Resilient Healthcare can help your organization deliver exceptional patient care at home.', true, '{}'),

('contact_info', 'Contact Information', 'Multiple Ways to Reach Us', 'Choose the best way to connect with our team based on your needs and preferences.', true, '{
  "contact_methods": [
    {
      "type": "General Inquiries",
      "email": "info@resilienthealthcare.com",
      "phone": "1-800-RESILIENT",
      "description": "For general questions about our services and platform."
    },
    {
      "type": "Partnership Opportunities", 
      "email": "partnerships@resilienthealthcare.com",
      "phone": "1-800-PARTNER",
      "description": "For hospitals and health systems interested in partnering with us."
    },
    {
      "type": "Clinical Support",
      "email": "clinical@resilienthealthcare.com", 
      "phone": "1-800-CLINICAL",
      "description": "24/7 support for clinicians and care teams."
    },
    {
      "type": "Technical Support",
      "email": "support@resilienthealthcare.com",
      "phone": "1-800-SUPPORT", 
      "description": "Platform and technical assistance for users."
    }
  ],
  "office_locations": [
    {
      "name": "Corporate Headquarters",
      "address": "123 Healthcare Way, Suite 100",
      "city": "San Francisco, CA 94102", 
      "phone": "(555) 123-4567",
      "type": "headquarters"
    },
    {
      "name": "Clinical Operations Center",
      "address": "456 Medical Plaza Drive",
      "city": "Austin, TX 78701",
      "phone": "(555) 234-5678", 
      "type": "operations"
    },
    {
      "name": "East Coast Office",
      "address": "789 Innovation Boulevard",
      "city": "Boston, MA 02101",
      "phone": "(555) 345-6789",
      "type": "regional"
    }
  ]
}'),

('contact_form', 'Send Us a Message', 'Get Started Today', 'Fill out the form below and our team will get back to you within 24 hours to discuss your specific needs.', true, '{
  "form_fields": [
    {
      "name": "inquiry_type",
      "label": "Type of Inquiry",
      "type": "select",
      "required": true,
      "options": [
        "General Information",
        "Partnership Opportunity", 
        "Clinical Support",
        "Technical Support",
        "Demo Request",
        "Other"
      ]
    }
  ]
}');

-- Insert additional missing content sections
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('data_security_hero', 'Data Security & Privacy', 'HIPAA Compliant Platform', 'Your patient data security is our top priority. Learn about our comprehensive security measures and compliance standards.', true, '{}'),

('data_security_compliance', 'Compliance Standards', 'Meeting Healthcare Requirements', 'We maintain the highest standards of data protection and regulatory compliance in healthcare.', true, '{
  "certifications": [
    {
      "name": "HIPAA Compliance",
      "description": "Full compliance with Health Insurance Portability and Accountability Act requirements.",
      "icon": "Shield"
    },
    {
      "name": "SOC 2 Type II",
      "description": "Annual security audits ensuring proper controls for customer data protection.",
      "icon": "Award"
    },
    {
      "name": "HITRUST CSF",
      "description": "HITRUST Common Security Framework certification for healthcare information protection.",
      "icon": "Lock"
    }
  ]
}'),

('hipaa_compliance_hero', 'HIPAA Compliance', 'Protecting Patient Privacy', 'Our platform is designed from the ground up to meet and exceed HIPAA requirements for patient data protection.', true, '{}'),

('terms_hero', 'Terms of Service', 'Platform Usage Agreement', 'Please review our terms of service carefully before using the Resilient Healthcare platform.', true, '{}'),

('privacy_hero', 'Privacy Policy', 'Your Privacy Matters', 'Learn how we collect, use, and protect your personal and health information in compliance with all applicable laws.', true, '{}'),

('demo_request_hero', 'Request a Demo', 'See Our Platform in Action', 'Schedule a personalized demonstration of our healthcare platform and discover how it can transform your organization.', true, '{}');

-- Add RSS feed for news content
INSERT INTO rss_feeds (name, url, description, is_active) VALUES
('Healthcare Innovation News', 'https://feeds.example.com/healthcare-news', 'Latest healthcare technology and innovation news', true),
('Medical Research Updates', 'https://feeds.example.com/medical-research', 'Recent medical research and clinical studies', true);