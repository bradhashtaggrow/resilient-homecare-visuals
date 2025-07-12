-- Add the missing content sections that the Care at Home and Patients pages are looking for

-- Care at Home page is looking for 'care_at_home_mobile' 
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data) VALUES
('care_at_home_mobile', 'The Future of Care', 'Experience healthcare like never before', 'Every interaction reimagined.', null, null, true, '{
  "tabs": [
    {
      "id": "acute-care",
      "title": "Acute Care", 
      "subtitle": "Hospital-level care at home",
      "description": "Advanced monitoring and treatment delivered in the comfort of your home",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "post-acute",
      "title": "Post-Acute Care",
      "subtitle": "Recovery and rehabilitation", 
      "description": "Comprehensive rehabilitation services to help you recover faster at home",
      "icon_name": "Activity",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "chronic-care",
      "title": "Chronic Care",
      "subtitle": "Ongoing condition management",
      "description": "Long-term care management for complex medical conditions",
      "icon_name": "Shield",
      "color": "blue", 
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}');

-- Patients page is looking for 'patients_mobile' for tabs
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data) VALUES
('patients_mobile', 'Patient Services', 'Comprehensive care at home', 'Tailored healthcare services delivered to your home', null, null, true, '{
  "tabs": [
    {
      "id": "comfort-care",
      "title": "Comfort Care",
      "subtitle": "Recovery in familiar surroundings", 
      "description": "Receive hospital-quality care in the comfort and privacy of your own home",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "family-centered",
      "title": "Family-Centered",
      "subtitle": "Your loved ones nearby",
      "description": "Keep your family close during your recovery with our home-based care approach",
      "icon_name": "Users", 
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "personalized",
      "title": "Personalized Care",
      "subtitle": "Tailored to your needs",
      "description": "Customized treatment plans designed specifically for your condition and lifestyle", 
      "icon_name": "CheckCircle",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}');