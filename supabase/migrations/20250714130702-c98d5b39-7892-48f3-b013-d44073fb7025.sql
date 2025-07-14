-- Restore all missing CMS content for the healthcare website

-- Insert lead generation content
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active) VALUES
('lead_generation', 'Ready to Transform Healthcare Delivery?', 'Join Leading Organizations', 'Partner with us to deliver exceptional patient care at home while improving outcomes and reducing costs.', 'Request Demo', '/request-demo', true);

-- Insert mobile showcase content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('mobile_showcase', 'Advanced Healthcare Technology', 'Seamless Integration', 'Our platform provides healthcare professionals with cutting-edge tools for delivering care at home.', true, '{
  "features": [
    {
      "title": "Real-time Monitoring",
      "description": "24/7 patient monitoring with instant alerts and notifications",
      "icon": "Activity"
    },
    {
      "title": "Secure Communication",
      "description": "HIPAA-compliant messaging and video consultations",
      "icon": "Shield"
    },
    {
      "title": "Care Coordination",
      "description": "Streamlined workflows for multi-disciplinary care teams",
      "icon": "Users"
    }
  ]
}');

-- Insert service lines content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('service_lines', 'Our Service Lines', 'Comprehensive Care Solutions', 'We offer a full spectrum of healthcare services delivered in the comfort of patients homes.', true, '{
  "services": [
    {
      "id": "acute-care",
      "title": "Acute Care",
      "subtitle": "Immediate Response",
      "description": "Rapid deployment of skilled clinicians for urgent medical situations requiring specialized care.",
      "icon_name": "Activity",
      "color": "red",
      "patient_image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "24/7 emergency response", "icon": "Clock"},
        {"text": "Specialized medical equipment", "icon": "Heart"},
        {"text": "Expert clinical staff", "icon": "Users"}
      ]
    },
    {
      "id": "chronic-care",
      "title": "Chronic Care Management",
      "subtitle": "Long-term Support",
      "description": "Ongoing monitoring and management for patients with chronic conditions.",
      "icon_name": "Heart",
      "color": "blue",
      "patient_image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Personalized care plans", "icon": "CheckCircle"},
        {"text": "Regular health monitoring", "icon": "Activity"},
        {"text": "Medication management", "icon": "Shield"}
      ]
    },
    {
      "id": "post-acute",
      "title": "Post-Acute Recovery",
      "subtitle": "Rehabilitation at Home",
      "description": "Comprehensive recovery programs for patients transitioning from hospital care.",
      "icon_name": "Shield",
      "color": "green",
      "patient_image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
      "benefits": [
        {"text": "Faster recovery times", "icon": "Zap"},
        {"text": "Family involvement", "icon": "Users"},
        {"text": "Comfortable environment", "icon": "Heart"}
      ]
    }
  ]
}');

-- Insert stats content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('stats', 'Proven Results', 'Making a Difference in Healthcare', 'Our platform delivers measurable improvements in patient outcomes and operational efficiency.', true, '{
  "stats": [
    {
      "number": "500+",
      "label": "Healthcare Organizations",
      "description": "Leading hospitals and health systems trust our platform"
    },
    {
      "number": "98%",
      "label": "Patient Satisfaction",
      "description": "Patients prefer care delivered at home"
    },
    {
      "number": "30%",
      "label": "Cost Reduction",
      "description": "Average savings compared to traditional care models"
    },
    {
      "number": "24/7",
      "label": "Support Available",
      "description": "Round-the-clock clinical and technical support"
    }
  ]
}');

-- Insert founder content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('founder', 'Meet Our Leadership', 'Pioneering Healthcare Innovation', 'Our experienced team is dedicated to transforming healthcare delivery through innovative technology solutions.', true, '{
  "founders": [
    {
      "name": "Dr. Sarah Johnson",
      "title": "Chief Executive Officer",
      "bio": "Former Chief Medical Officer with 20+ years experience in healthcare innovation and digital transformation.",
      "image_url": "https://images.unsplash.com/photo-1559209172-2bf17d48ad8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#"
    },
    {
      "name": "Michael Chen",
      "title": "Chief Technology Officer",
      "bio": "Technology leader with expertise in healthcare systems, data security, and scalable platform architecture.",
      "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      "linkedin": "#"
    }
  ]
}');

-- Insert admin dashboard content
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('admin_dashboard', 'Admin Dashboard Preview', 'Comprehensive Management Tools', 'Get a preview of our powerful administrative interface designed for healthcare operations.', true, '{
  "features": [
    {
      "title": "Analytics Dashboard",
      "description": "Real-time insights into patient care metrics and operational performance",
      "icon": "BarChart"
    },
    {
      "title": "Care Coordination",
      "description": "Streamline communication between care teams and manage patient assignments",
      "icon": "Users"
    },
    {
      "title": "Quality Metrics",
      "description": "Track and improve care quality with comprehensive reporting tools",
      "icon": "TrendingUp"
    }
  ]
}');

-- Insert about page content sections
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('about_hero', 'About Resilient Healthcare', 'Transforming Care Delivery', 'We are dedicated to revolutionizing healthcare by bringing hospital-quality care directly to patients homes through innovative technology and expert clinical teams.', true),

('why_resilient', 'Why Choose Resilient?', 'The Future of Healthcare', 'Our platform combines cutting-edge technology with clinical expertise to deliver superior patient outcomes while reducing costs and improving satisfaction.', true),

('hospital_benefits', 'Benefits for Hospitals', 'Expand Your Reach', 'Partner with us to extend your clinical services beyond hospital walls, capturing new revenue streams while improving patient satisfaction and outcomes.', true),

('clinician_benefits', 'Benefits for Clinicians', 'Advance Your Career', 'Join our network of healthcare professionals and enjoy flexible scheduling, competitive compensation, and the satisfaction of delivering personalized patient care.', true),

('values', 'Our Values', 'What Drives Us', 'We are committed to excellence, innovation, and putting patients first in everything we do.', true);

-- Insert value proposition features
INSERT INTO value_proposition_features (title, subtitle, subtitle2, description, icon_name, display_order) VALUES
('Patient-Centered Care', 'Comfort at Home', 'Faster Recovery', 'Deliver personalized healthcare in the familiar environment of the patients home, leading to improved outcomes and higher satisfaction rates.', 'Heart', 1),

('Clinical Excellence', 'Expert Care Teams', 'Proven Results', 'Our network of board-certified clinicians provides hospital-quality care with the convenience and comfort of home-based treatment.', 'Award', 2),

('Technology Integration', 'Seamless Workflows', 'Real-time Data', 'Advanced technology platform that integrates with existing hospital systems, providing real-time monitoring and seamless care coordination.', 'Smartphone', 3),

('Cost Effectiveness', 'Reduced Expenses', 'Better Margins', 'Significant cost savings compared to traditional care models while maintaining or improving quality outcomes and patient satisfaction.', 'DollarSign', 4);

-- Insert services data
INSERT INTO services (title, subtitle, description, icon_name, color, display_order, patient_image_url) VALUES
('Acute Care at Home', 'Immediate Medical Response', 'Rapid deployment of skilled clinicians for urgent medical situations requiring immediate attention and specialized care protocols in the comfort of home.', 'Activity', 'red', 1, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'),

('Chronic Care Management', 'Long-term Health Support', 'Comprehensive ongoing care for patients with chronic conditions, providing consistent monitoring, medication management, and lifestyle support.', 'Heart', 'blue', 2, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'),

('Post-Acute Recovery', 'Rehabilitation at Home', 'Structured recovery programs for patients transitioning from hospital to home, ensuring continued progress and preventing readmissions.', 'Shield', 'green', 3, 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'),

('Preventive Care', 'Wellness Programs', 'Proactive health management to prevent illness and maintain optimal health through regular monitoring and lifestyle guidance.', 'CheckCircle', 'purple', 4, 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80');

-- Insert service benefits
INSERT INTO service_benefits (service_id, benefit_text, icon_name, display_order) 
SELECT s.id, b.benefit_text, b.icon_name, b.display_order
FROM services s
CROSS JOIN (
  VALUES 
    ('24/7 Emergency Response', 'Clock', 1),
    ('Specialized Medical Equipment', 'Heart', 2),
    ('Expert Clinical Staff', 'Users', 3),
    ('Family Involvement', 'Home', 4),
    ('Personalized Care Plans', 'FileText', 5),
    ('Regular Health Monitoring', 'Activity', 6)
) AS b(benefit_text, icon_name, display_order);

-- Enable realtime for website_content table
ALTER TABLE public.website_content REPLICA IDENTITY DEFAULT;