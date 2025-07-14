-- Add images to For Hospitals section
UPDATE public.website_content 
SET content_data = jsonb_set(
  content_data,
  '{image_url}',
  '"https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
)
WHERE section_key = 'about_for_hospitals';

-- Add images to For Clinicians section  
UPDATE public.website_content 
SET content_data = jsonb_set(
  content_data,
  '{image_url}',
  '"https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"'
)
WHERE section_key = 'about_for_clinicians';