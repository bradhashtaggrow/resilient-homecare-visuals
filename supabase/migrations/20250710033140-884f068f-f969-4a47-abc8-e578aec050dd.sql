-- Remove unwanted patient sections that are no longer used
DELETE FROM website_content 
WHERE section_key IN (
  'patients_content',
  'patients_patient_tabs', 
  'patients_services',
  'patients_features',
  'patients_support',
  'patients_footer'
) AND section_key != 'patients_hero' AND section_key != 'patients_mobile';