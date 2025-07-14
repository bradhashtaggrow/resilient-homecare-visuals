-- Update the services section content with the correct data structure
UPDATE website_content 
SET 
  title = 'Fully Streamlined, Uncompromisingly Simple',
  subtitle = '',
  description = 'Three core service lines designed to extend your hospital''s reach and improve patient outcomes.',
  content_data = jsonb_build_object(
    'services', jsonb_build_array(
      jsonb_build_object(
        'id', 'outpatient-pt',
        'icon', 'Activity',
        'title', 'Outpatient PT Anywhere',
        'subtitle', 'Home-Based Therapy & Recovery',
        'description', 'Hospital-branded physical therapy delivered directly to patients'' homes with full technology integration.',
        'benefits', jsonb_build_array(
          jsonb_build_object('text', 'Generate new outpatient therapy revenue', 'icon', 'TrendingUp'),
          jsonb_build_object('text', 'Reduce costly post-acute placements', 'icon', 'Shield'),
          jsonb_build_object('text', 'Improve patient outcomes with early intervention', 'icon', 'Target'),
          jsonb_build_object('text', 'Prepare for value-based care programs', 'icon', 'Award')
        ),
        'color', 'blue',
        'patient_image_url', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
      ),
      jsonb_build_object(
        'id', 'primary-care',
        'icon', 'Heart',
        'title', 'Primary Care at Home',
        'subtitle', 'Transitional & Rural Care Extension',
        'description', 'Physician and advanced practice providers delivering seamless care transitions and rural health services.',
        'benefits', jsonb_build_array(
          jsonb_build_object('text', 'Extend transitional care management for high-risk patients', 'icon', 'Users'),
          jsonb_build_object('text', 'Expand rural health clinic reach into underserved areas', 'icon', 'MapPin'),
          jsonb_build_object('text', 'Reduce readmissions with targeted follow-up visits', 'icon', 'CheckCircle')
        ),
        'color', 'red',
        'patient_image_url', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
      ),
      jsonb_build_object(
        'id', 'hospital-at-home',
        'icon', 'Building2',
        'title', 'Acute Hospital-at-Home',
        'subtitle', 'CMS-Compliant Inpatient Care at Home',
        'description', 'Full implementation support for hospital-level care delivery in the home environment.',
        'benefits', jsonb_build_array(
          jsonb_build_object('text', 'Complete workflow design & policy development', 'icon', 'Zap'),
          jsonb_build_object('text', 'Staff training & education programs', 'icon', 'Users'),
          jsonb_build_object('text', 'Medicare waiver submission support', 'icon', 'Clock')
        ),
        'note', 'CMS waiver extended through September 2025. We help hospitals prepare for future program versions.',
        'color', 'cyan',
        'patient_image_url', 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
      )
    )
  )
WHERE section_key = 'service_lines';