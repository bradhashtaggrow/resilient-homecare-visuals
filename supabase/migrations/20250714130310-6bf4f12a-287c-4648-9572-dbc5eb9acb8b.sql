-- Restore Care At Home and Patients page content that was cleared during database restore

-- Insert Care At Home mobile content with tabs
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('care_at_home_mobile', 'Care Services', 'Comprehensive Healthcare Solutions', 'Our platform connects healthcare professionals to deliver exceptional care in the comfort of patients homes.', true, '{
  "tabs": [
    {
      "id": "acute-care",
      "title": "Acute Care",
      "subtitle": "Immediate Medical Response",
      "description": "Rapid deployment of skilled clinicians for urgent medical situations requiring immediate attention and specialized care protocols.",
      "icon_name": "Activity",
      "color": "red",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "post-acute",
      "title": "Post-Acute Care",
      "subtitle": "Recovery & Rehabilitation",
      "description": "Comprehensive recovery programs designed to support patients transitioning from hospital to home with ongoing medical supervision.",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "chronic-care",
      "title": "Chronic Care",
      "subtitle": "Long-term Health Management",
      "description": "Ongoing support and monitoring for patients with chronic conditions, ensuring consistent care delivery and health optimization.",
      "icon_name": "Shield",
      "color": "green",
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}');

-- Insert Patients mobile content with tabs
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('patients_mobile', 'Patient-Centered Care', 'Comfort and Quality at Home', 'Experience healthcare that prioritizes your comfort, family involvement, and personalized treatment plans.', true, '{
  "tabs": [
    {
      "id": "comfort-care",
      "title": "Comfort Care",
      "subtitle": "Healing in Familiar Surroundings",
      "description": "Receive medical care in the comfort of your own home, surrounded by family and familiar environment that promotes faster healing.",
      "icon_name": "Heart",
      "color": "pink",
      "image_url": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "family-centered",
      "title": "Family-Centered",
      "subtitle": "Involving Your Loved Ones",
      "description": "Healthcare that includes your family in the care process, ensuring support systems are maintained and strengthened throughout treatment.",
      "icon_name": "Users",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "personalized",
      "title": "Personalized Care",
      "subtitle": "Tailored Treatment Plans",
      "description": "Customized healthcare solutions designed specifically for your unique needs, medical history, and personal preferences.",
      "icon_name": "CheckCircle",
      "color": "purple",
      "image_url": "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}');

-- Insert hero content section
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('patients_hero', 'Exceptional Care', 'In the Comfort of Home', 'Experience personalized healthcare delivered with compassion and expertise, right where you feel most comfortable.', true);

-- Insert clinicians mobile content with tabs
INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('clinicians_mobile', 'Join Our Network', 'Connect with Leading Healthcare Organizations', 'Partner with us to expand your practice and deliver exceptional patient care through our innovative platform.', true, '{
  "tabs": [
    {
      "id": "flexibility",
      "title": "Flexible Scheduling",
      "subtitle": "Work on Your Terms",
      "description": "Choose assignments that fit your schedule and expertise, with the flexibility to maintain work-life balance while advancing your career.",
      "icon_name": "Zap",
      "color": "orange",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "support",
      "title": "Clinical Support",
      "subtitle": "24/7 Professional Backup",
      "description": "Access to comprehensive clinical support, consultation services, and emergency backup to ensure you never feel alone in patient care.",
      "icon_name": "Shield",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "growth",
      "title": "Career Growth",
      "subtitle": "Professional Development",
      "description": "Opportunities for continuing education, specialization training, and career advancement within our expanding network of healthcare partners.",
      "icon_name": "Activity",
      "color": "green",
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}');