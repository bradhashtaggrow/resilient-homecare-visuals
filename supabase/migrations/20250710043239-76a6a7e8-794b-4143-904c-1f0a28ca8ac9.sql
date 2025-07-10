-- Delete all old contact-related sections
DELETE FROM website_content WHERE section_key IN (
  'contact', 
  'contact_us', 
  'contact_info', 
  'contact_form',
  'contact_services',
  'contact_lead_generation',
  'navigation'
);

-- Ensure the get_in_touch section exists with correct data
INSERT INTO website_content (section_key, title, subtitle, description, content_data) 
VALUES (
  'get_in_touch',
  'Get in Touch',
  'Contact Us', 
  'Ready to transform your healthcare delivery? Connect with our team to learn how Resilient Healthcare can help you expand your services, improve patient outcomes, and capture new revenue opportunities.',
  '{
    "contact_info": {
      "headquarters": "📍 Resilient Healthcare Headquarters",
      "phone": {
        "label": "📞 Call",
        "number": "(732) 429-2102"
      },
      "email": {
        "label": "✉️ Email", 
        "address": "jackleen@resilienthc.org"
      }
    },
    "form": {
      "title": "Send us a Message",
      "fields": {
        "name": {
          "label": "Full Name *",
          "placeholder": "Your full name",
          "required": true
        },
        "phone": {
          "label": "Phone Number",
          "placeholder": "Your phone number", 
          "required": false
        },
        "email": {
          "label": "Email Address *",
          "placeholder": "your.email@example.com",
          "required": true
        },
        "subject": {
          "label": "Subject *",
          "placeholder": "What is this regarding?",
          "required": true
        },
        "message": {
          "label": "Message *",
          "placeholder": "Please provide details about your inquiry...",
          "required": true
        }
      },
      "button_text": "Send Message"
    },
    "cta": {
      "title": "Join 500+ Healthcare Organizations",
      "description": "Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.",
      "button_text": "Request Demo"
    }
  }'
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  content_data = EXCLUDED.content_data,
  updated_at = now();