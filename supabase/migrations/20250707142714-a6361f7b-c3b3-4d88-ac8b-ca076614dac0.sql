-- Update care at home sections with the correct content
UPDATE website_content 
SET 
  title = 'What is Resilient Community?',
  subtitle = 'Connecting Healthcare Professionals',
  description = 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
  button_text = 'Learn More',
  button_url = '/contact'
WHERE section_key = 'care_at_home_lead_gen';

UPDATE website_content 
SET 
  title = 'The Future of Care',
  subtitle = 'Experience healthcare like never before',
  description = 'Every interaction reimagined.',
  button_text = null,
  button_url = null
WHERE section_key = 'care_at_home_mobile';

-- Update the value prop section to be more relevant
UPDATE website_content 
SET 
  title = 'Seamless Care Coordination',
  subtitle = 'Hospital-Quality Care at Home',
  description = 'Our comprehensive platform bridges the gap between hospitals and home care, ensuring continuity of care and optimal patient outcomes in the comfort of home.',
  button_text = null,
  button_url = null
WHERE section_key = 'care_at_home_value_prop';