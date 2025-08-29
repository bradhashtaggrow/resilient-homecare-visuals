-- Insert default feature cards for health systems benefits section
INSERT INTO public.website_content (section_key, title, subtitle, description, button_text, button_url, content_data, is_active)
VALUES (
  'health_systems_benefits',
  'For Health Systems', 
  'Scale Home-Based Care Without Compromising Quality',
  'Transform your healthcare delivery with our comprehensive platform.',
  'Learn More',
  '/about',
  '{
    "feature_cards": [
      {
        "id": "1",
        "title": "Expand Patient Capacity", 
        "description": "Increase capacity by 40-60% with efficient home-based care delivery.",
        "icon": "Users"
      },
      {
        "id": "2",
        "title": "Reduce Operational Costs",
        "description": "Lower costs while improving patient satisfaction and outcomes.", 
        "icon": "TrendingUp"
      },
      {
        "id": "3", 
        "title": "Seamless Integration",
        "description": "Integrate with existing workflows and technology infrastructure.",
        "icon": "Shield"
      },
      {
        "id": "4",
        "title": "On-Demand Workforce", 
        "description": "Access clinical workforce to meet fluctuating care demands.",
        "icon": "Clock"
      }
    ],
    "image_url": "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }',
  true
)
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle, 
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  content_data = EXCLUDED.content_data;