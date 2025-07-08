-- Create clinicians page sections for admin CMS
-- Section 1: Hero Section
INSERT INTO website_content (section_key, title, subtitle, description, background_video_url, is_active) 
VALUES ('clinicians_hero', 'Enabling', 'seamless referrals', NULL, 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', true);

-- Section 2: Content Section  
INSERT INTO website_content (section_key, title, subtitle, description, is_active) 
VALUES ('clinicians_content', 'Clinicians', NULL, 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.', true);

-- Section 3: Services/Tabs Section with 5 services
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active) 
VALUES ('clinicians_services', 'The Future of Care', 'Experience healthcare like never before', 'Every interaction reimagined.', jsonb_build_object(
  'tabs', jsonb_build_array(
    jsonb_build_object(
      'id', 'hospitals-partnership',
      'title', 'Work with leading hospitals',
      'subtitle', 'Partnership Excellence', 
      'description', 'Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.',
      'icon_name', 'Building2',
      'color', 'blue',
      'patient_image_url', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 1
    ),
    jsonb_build_object(
      'id', 'patient-referrals',
      'title', 'Get access to a consistent stream of patient referrals',
      'subtitle', 'Steady Patient Flow',
      'description', 'Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.',
      'icon_name', 'Users', 
      'color', 'green',
      'patient_image_url', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 2
    ),
    jsonb_build_object(
      'id', 'care-delivery',
      'title', 'Support care delivery for inpatient at home and outpatient at home services',
      'subtitle', 'Comprehensive Home Care',
      'description', 'Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.',
      'icon_name', 'Heart',
      'color', 'purple', 
      'patient_image_url', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 3
    ),
    jsonb_build_object(
      'id', 'simplified-workflows',
      'title', 'Simplified workflows and credentialing through our platform',
      'subtitle', 'Streamlined Operations',
      'description', 'Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.',
      'icon_name', 'Shield',
      'color', 'orange',
      'patient_image_url', 'https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 4
    ),
    jsonb_build_object(
      'id', 'payment-structure',
      'title', 'We pay you per visit so no need to worry about administrative burden',
      'subtitle', 'Simple Payment Model',
      'description', 'Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.',
      'icon_name', 'CheckCircle',
      'color', 'teal',
      'patient_image_url', 'https://images.unsplash.com/photo-1551601651-2a8555f1c796?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 5
    )
  )
), true);

-- Section 4: Footer/Lead Gen Section
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active) 
VALUES ('clinicians_footer', 'Join 500+ Healthcare Organizations', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', NULL, 'Request Demo', '/request-demo', true);