-- Update clinicians content with the provided copy
UPDATE website_content 
SET 
  title = 'Enabling seamless referrals',
  subtitle = 'Clinicians',
  description = 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
  content_data = jsonb_build_object(
    'tabs', jsonb_build_array(
      jsonb_build_object(
        'id', 'work-with-hospitals',
        'title', 'Work with leading',
        'subtitle', 'hospitals',
        'description', 'Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.',
        'icon_name', 'Building2',
        'image_url', null,
        'display_order', 1
      ),
      jsonb_build_object(
        'id', 'patient-referrals',
        'title', 'Get access to a consistent stream of',
        'subtitle', 'patient referrals',
        'description', 'Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.',
        'icon_name', 'Users',
        'image_url', null,
        'display_order', 2
      ),
      jsonb_build_object(
        'id', 'care-delivery',
        'title', 'Support care delivery for inpatient at home and',
        'subtitle', 'outpatient at home services',
        'description', 'Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.',
        'icon_name', 'Heart',
        'image_url', null,
        'display_order', 3
      ),
      jsonb_build_object(
        'id', 'simplified-workflows',
        'title', 'Simplified workflows and credentialing',
        'subtitle', 'through our platform',
        'description', 'Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.',
        'icon_name', 'Zap',
        'image_url', null,
        'display_order', 4
      ),
      jsonb_build_object(
        'id', 'payment-model',
        'title', 'We pay you per visit so no need to worry',
        'subtitle', 'about administrative burden',
        'description', 'Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.',
        'icon_name', 'CheckCircle',
        'image_url', null,
        'display_order', 5
      )
    )
  )
WHERE section_key = 'clinicians_mobile';