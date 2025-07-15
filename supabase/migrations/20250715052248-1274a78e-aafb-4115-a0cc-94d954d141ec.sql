-- Create the 3 tab design content for Patients page

INSERT INTO website_content (section_key, title, subtitle, description, is_active, content_data) VALUES
('patients_mobile', 'Patient Care Services', 'Choose Your Recovery Path', 'Experience personalized healthcare designed around your needs. Our three comprehensive care options ensure you receive the right level of support for your unique situation.', true, '{
  "tabs": [
    {
      "id": "recovery-rehab",
      "title": "Recovery & Rehabilitation",
      "subtitle": "Physical Therapy at Home",
      "description": "Professional physical therapy and rehabilitation services delivered in the comfort of your home. Recover faster with personalized treatment plans, advanced equipment, and one-on-one care from licensed therapists.",
      "icon_name": "Activity",
      "color": "blue",
      "image_url": "/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png"
    },
    {
      "id": "chronic-care",
      "title": "Chronic Care Management", 
      "subtitle": "Ongoing Health Support",
      "description": "Comprehensive management of chronic conditions with regular monitoring, medication management, and lifestyle support. Stay healthy at home with coordinated care from your healthcare team.",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png"
    },
    {
      "id": "hospital-level",
      "title": "Hospital-Level Care",
      "subtitle": "Advanced Medical Care at Home", 
      "description": "Receive the same quality medical care you would get in a hospital, delivered safely in your home. 24/7 monitoring, advanced treatments, and immediate access to your medical team when you need it most.",
      "icon_name": "Shield",
      "color": "blue",
      "image_url": "/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png"
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