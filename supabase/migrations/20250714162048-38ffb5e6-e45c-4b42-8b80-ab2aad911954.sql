UPDATE website_content 
SET content_data = jsonb_build_object(
  'stats', jsonb_build_array(
    jsonb_build_object(
      'value', '38%',
      'label', 'Healthcare Organizations', 
      'description', 'Leading hospitals and health systems trust our platform',
      'source', 'Healthcare Organizations'
    ),
    jsonb_build_object(
      'value', '70%',
      'label', 'Patient Satisfaction',
      'description', 'Patients prefer care delivered at home', 
      'source', 'Patient Satisfaction'
    ),
    jsonb_build_object(
      'value', '91%',
      'label', 'Cost Reduction',
      'description', 'Average savings compared to traditional care models',
      'source', 'Cost Reduction'
    ),
    jsonb_build_object(
      'value', '95%', 
      'label', 'Support Available',
      'description', 'Round-the-clock clinical and technical support',
      'source', 'Support Available'
    )
  )
),
updated_at = now()
WHERE section_key = 'stats' AND is_active = true;