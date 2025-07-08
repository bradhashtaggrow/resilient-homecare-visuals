-- Restore care at home page content to match current codebase

-- Delete any existing care at home content first
DELETE FROM website_content WHERE section_key LIKE 'care_at_home%';

-- Section 1: Hero (What is Resilient Community?)
INSERT INTO website_content (section_key, title, subtitle, description, background_video_url, is_active) 
VALUES ('care_at_home_hero', 'What is Resilient Community?', 'Connecting Healthcare Professionals', 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.', 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4', true);

-- Section 2: The Future of Care - Mobile/Tabs Section
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active) 
VALUES ('care_at_home_mobile', 'The Future of Care', 'Experience healthcare like never before', 'Every interaction reimagined.', jsonb_build_object(
  'tabs', jsonb_build_array(
    jsonb_build_object(
      'id', 'partner-with',
      'title', 'Partner with',
      'subtitle', 'Leading Hospitals',
      'description', 'Connect with top-tier healthcare institutions to deliver exceptional patient care.',
      'icon_name', 'Building2',
      'image_url', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 1
    ),
    jsonb_build_object(
      'id', 'consistent-patient',
      'title', 'Consistent Patient',
      'subtitle', 'Care Experience',
      'description', 'Ensure seamless continuity of care across all patient touchpoints.',
      'icon_name', 'Users',
      'image_url', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 2
    ),
    jsonb_build_object(
      'id', 'complete-home',
      'title', 'Complete Home',
      'subtitle', 'Healthcare Solutions',
      'description', 'Comprehensive healthcare services delivered directly to patients'' homes.',
      'icon_name', 'Heart',
      'image_url', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 3
    ),
    jsonb_build_object(
      'id', 'streamlined-platform',
      'title', 'Streamlined Platform',
      'subtitle', 'Technology Integration',
      'description', 'Advanced platform technology that simplifies healthcare delivery.',
      'icon_name', 'Zap',
      'image_url', 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 4
    ),
    jsonb_build_object(
      'id', 'simple-per-visit',
      'title', 'Simple Per-Visit',
      'subtitle', 'Billing Model',
      'description', 'Transparent and straightforward per-visit billing for healthcare services.',
      'icon_name', 'CheckCircle',
      'image_url', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
      'display_order', 5
    )
  )
), true);

-- Section 3: Value Proposition Section
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, background_image_url, is_active) 
VALUES ('care_at_home_value_prop', 'Partner with Leading Hospitals', 'Hospital Network Excellence', 'Connect with top healthcare institutions to expand your reach and impact through our comprehensive network of trusted hospital partners.', 'Experience Now', '/request-demo', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', true);

-- Section 4: Stats section 
INSERT INTO website_content (section_key, title, subtitle, description, content_data, is_active) 
VALUES ('care_at_home_stats', 'Healthcare Excellence Metrics', 'Proven Results', 'Our commitment to quality care delivery is reflected in our outstanding performance metrics.', '{"stats": [{"label": "Response Time", "value": "< 2min"}, {"label": "Satisfaction", "value": "99.8%"}, {"label": "Availability", "value": "24/7"}]}', true);

-- Section 5: Footer
INSERT INTO website_content (section_key, title, subtitle, description, button_text, button_url, is_active) 
VALUES ('care_at_home_footer', 'Join 500+ Healthcare Organizations', 'Leading hospitals, health systems, and care providers trust Resilient Healthcare to deliver exceptional patient outcomes and operational excellence.', null, 'Request Demo', '/request-demo', true);