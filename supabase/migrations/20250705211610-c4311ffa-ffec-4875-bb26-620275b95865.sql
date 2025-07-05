-- Update Admin Dashboard with correct copy from the component
UPDATE website_content 
SET 
  title = 'Take Full Control Of Your Business. Anywhere. Any place.',
  subtitle = '',
  description = 'Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.',
  button_text = 'Request Demo',
  button_url = '#',
  content_data = '{
    "main_headline": "Take Full Control Of Your Business.",
    "main_subheadline": "Anywhere. Any place.",
    "main_description": "Next-generation management tools with AI-powered insights that give administrators unprecedented visibility and control.",
    "cta_headline": "Ready to Transform Your Healthcare Operations?",
    "cta_description": "Join forward-thinking healthcare organizations who have already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration.",
    "features": [
      {
        "title": "AI-Powered Insights",
        "description": "Advanced analytics and predictive modeling"
      },
      {
        "title": "Real-Time Dashboard",
        "description": "Live monitoring and control capabilities"
      },
      {
        "title": "Enterprise Security",
        "description": "Military-grade security and compliance"
      },
      {
        "title": "Mobile Access",
        "description": "Full functionality on any device"
      }
    ]
  }'::jsonb
WHERE section_key = 'admin_dashboard';