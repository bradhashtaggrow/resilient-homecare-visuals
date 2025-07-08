-- Create default content for clinicians page sections
INSERT INTO public.website_content (section_key, title, subtitle, description, button_text, button_url, is_active, content_data)
VALUES 
  (
    'clinicians_hero',
    'Enabling',
    'seamless referrals',
    'Transform healthcare delivery with our comprehensive referral platform designed for clinicians and healthcare agencies.',
    'Learn More',
    '#services',
    true,
    '{}'
  ),
  (
    'clinicians_services',
    'Clinicians',
    'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home.',
    'Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
    'Get Started',
    '/contact',
    true,
    '{
      "tabs": [
        {
          "id": "work-with-hospitals",
          "title": "Work with leading hospitals",
          "subtitle": "Partner Network",
          "description": "Connect with top-tier hospitals and health systems to expand your referral network and provide comprehensive care solutions.",
          "icon_name": "Building2",
          "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
          "id": "patient-referrals",
          "title": "Get access to a consistent stream of patient referrals",
          "subtitle": "Referral Pipeline",
          "description": "Receive qualified patient referrals directly through our platform, ensuring a steady flow of patients who need your specialized care.",
          "icon_name": "Users",
          "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
          "id": "care-delivery",
          "title": "Support care delivery for inpatient at home and outpatient at home services",
          "subtitle": "Comprehensive Care",
          "description": "Deliver both inpatient and outpatient services in the comfort of patients homes with our integrated care management platform.",
          "icon_name": "Heart",
          "image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
          "id": "simplified-workflows",
          "title": "Simplified workflows and credentialing through our platform",
          "subtitle": "Streamlined Process",
          "description": "Enjoy simplified administrative processes with automated workflows and streamlined credentialing that saves time and reduces complexity.",
          "icon_name": "CheckCircle",
          "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
          "id": "payment-model",
          "title": "We pay you per visit so no need to worry about administrative burden",
          "subtitle": "Simple Billing",
          "description": "Focus on patient care while we handle the administrative complexities. Get paid per visit with transparent, straightforward billing.",
          "icon_name": "Zap",
          "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        }
      ]
    }'
  ),
  (
    'clinicians_footer',
    'Join 500+ Healthcare Organizations',
    'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.',
    null,
    'Contact Us',
    '/contact',
    true,
    '{}'
  )
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  button_text = EXCLUDED.button_text,
  button_url = EXCLUDED.button_url,
  content_data = EXCLUDED.content_data;