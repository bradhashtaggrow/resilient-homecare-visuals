-- Insert or update health systems features content
INSERT INTO public.website_content (
  section_key,
  title,
  subtitle,
  content_data,
  is_active
) VALUES (
  'health_systems_features',
  'Platform Features',
  'Comprehensive Technology Suite for Modern Healthcare',
  jsonb_build_object(
    'features', ARRAY[
      'AI-powered patient-clinician matching for optimal care coordination.',
      'Real-time monitoring and analytics dashboard for operational insights.',
      'Seamless integration with existing EMR and healthcare management systems.',
      'Automated scheduling, billing, and compliance management tools.'
    ],
    'image_url', 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ),
  true
) ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content_data = EXCLUDED.content_data,
  is_active = EXCLUDED.is_active,
  updated_at = now();