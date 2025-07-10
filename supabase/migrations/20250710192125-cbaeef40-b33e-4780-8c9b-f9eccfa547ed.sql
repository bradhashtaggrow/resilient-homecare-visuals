-- Insert three test lead notifications to test real-time functionality
INSERT INTO public.notifications (
  type,
  title,
  message,
  source_table,
  source_id,
  metadata
) VALUES 
(
  'lead',
  'New Demo Request',
  'A new demo request has been submitted by John Smith from TechCorp Healthcare',
  'leads',
  gen_random_uuid(),
  jsonb_build_object(
    'lead_id', gen_random_uuid(),
    'company', 'TechCorp Healthcare',
    'email', 'john.smith@techcorp.com',
    'demo_type', 'virtual',
    'form_source', 'website'
  )
),
(
  'lead',
  'New Demo Request',
  'A new demo request has been submitted by Sarah Johnson from Metro Medical Center',
  'leads',
  gen_random_uuid(),
  jsonb_build_object(
    'lead_id', gen_random_uuid(),
    'company', 'Metro Medical Center',
    'email', 'sarah.johnson@metromedical.com',
    'demo_type', 'in-person',
    'form_source', 'website'
  )
),
(
  'lead',
  'New Demo Request',
  'A new demo request has been submitted by Michael Davis from Regional Hospital Network',
  'leads',
  gen_random_uuid(),
  jsonb_build_object(
    'lead_id', gen_random_uuid(),
    'company', 'Regional Hospital Network',
    'email', 'michael.davis@regionalhospital.com',
    'demo_type', 'virtual',
    'form_source', 'website'
  )
);