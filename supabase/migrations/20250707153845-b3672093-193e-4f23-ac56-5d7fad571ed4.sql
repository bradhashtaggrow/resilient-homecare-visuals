-- Update the care_at_home_mobile section to include 5 tabs data structure
UPDATE website_content 
SET content_data = jsonb_build_object(
  'tabs', jsonb_build_array(
    jsonb_build_object(
      'id', 'partner-with',
      'title', 'Partner with',
      'subtitle', 'Leading Hospitals',
      'description', 'Connect with top-tier healthcare institutions to deliver exceptional patient care.',
      'icon_name', 'Building2',
      'image_url', null,
      'display_order', 1
    ),
    jsonb_build_object(
      'id', 'consistent-patient',
      'title', 'Consistent Patient',
      'subtitle', 'Care Experience',
      'description', 'Ensure seamless continuity of care across all patient touchpoints.',
      'icon_name', 'Users',
      'image_url', null,
      'display_order', 2
    ),
    jsonb_build_object(
      'id', 'complete-home',
      'title', 'Complete Home',
      'subtitle', 'Healthcare Solutions',
      'description', 'Comprehensive healthcare services delivered directly to patients'' homes.',
      'icon_name', 'Heart',
      'image_url', null,
      'display_order', 3
    ),
    jsonb_build_object(
      'id', 'streamlined-platform',
      'title', 'Streamlined Platform',
      'subtitle', 'Technology Integration',
      'description', 'Advanced platform technology that simplifies healthcare delivery.',
      'icon_name', 'Zap',
      'image_url', null,
      'display_order', 4
    ),
    jsonb_build_object(
      'id', 'simple-per-visit',
      'title', 'Simple Per-Visit',
      'subtitle', 'Billing Model',
      'description', 'Transparent and straightforward per-visit billing for healthcare services.',
      'icon_name', 'CheckCircle',
      'image_url', null,
      'display_order', 5
    )
  )
)
WHERE section_key = 'care_at_home_mobile';