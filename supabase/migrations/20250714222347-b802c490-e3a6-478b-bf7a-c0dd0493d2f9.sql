-- Add image URLs to the existing features in about_why_choose section
UPDATE public.website_content 
SET content_data = jsonb_set(
  content_data,
  '{features}',
  jsonb_build_array(
    jsonb_build_object(
      'title', 'RAIN-Powered AI Infrastructure',
      'subtitle', 'RAIN-Powered AI Infrastructure',
      'description', 'Reducing inefficiencies in care management through smart automation.',
      'icon', 'Brain',
      'image_url', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ),
    jsonb_build_object(
      'title', 'Fully Integrated With Hospital Systems',
      'subtitle', 'Fully Integrated With Hospital Systems', 
      'description', 'Seamless connection to EHRs, scheduling, and billing workflows.',
      'icon', 'Hospital',
      'image_url', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ),
    jsonb_build_object(
      'title', 'Flexible Workforce Model',
      'subtitle', 'Flexible Workforce Model',
      'description', 'On-demand contract clinicians that expand hospital capacity without adding full-time costs.',
      'icon', 'Users',
      'image_url', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    )
  )
)
WHERE section_key = 'about_why_choose';