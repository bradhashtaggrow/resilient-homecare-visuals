-- Delete the stock value prop section for care at home
DELETE FROM website_content WHERE section_key = 'care_at_home_value_prop';

-- Update care at home sections to proper order: lead_gen (header) then mobile (future of care)
UPDATE website_content 
SET 
  title = 'What is Resilient Community?',
  subtitle = 'Connecting Healthcare Professionals', 
  description = 'We connect clinicians and healthcare agencies with hospitals to deliver patient-centered care at home. Our platform enables seamless referrals for hospital-at-home programs and outpatient care at home, ensuring patients receive top-quality care where they are most comfortable.',
  button_text = 'Learn More',
  button_url = '/contact',
  background_image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
WHERE section_key = 'care_at_home_lead_gen';

UPDATE website_content 
SET 
  title = 'The Future of Care',
  subtitle = 'Experience healthcare like never before',
  description = 'Every interaction reimagined.',
  background_image_url = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
WHERE section_key = 'care_at_home_mobile';

-- Add footer section for care at home
INSERT INTO website_content (section_key, title, subtitle, description, is_active) 
VALUES ('care_at_home_footer', 'Ready to Transform Care?', 'Join thousands of healthcare professionals', 'Contact us today to learn how our platform can improve patient outcomes and streamline care delivery.', true);

-- Delete stock value prop sections for all other pages and update with proper content
DELETE FROM website_content WHERE section_key LIKE '%_value_prop';

-- Update About Us sections
UPDATE website_content SET 
  title = 'Transforming Healthcare Through Innovation',
  subtitle = 'Our Mission',
  description = 'We are dedicated to revolutionizing healthcare delivery through innovative technology solutions that connect healthcare professionals and improve patient outcomes.',
  button_text = 'Learn About Us',
  button_url = '/about',
  background_image_url = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
WHERE section_key = 'about_lead_gen';

UPDATE website_content SET 
  title = 'Technology That Connects',
  subtitle = 'Bridging Healthcare Gaps',
  description = 'Our platform seamlessly connects hospitals, clinicians, and patients for coordinated care delivery.',
  background_image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475'
WHERE section_key = 'about_mobile';

-- Update Clinicians sections  
UPDATE website_content SET 
  title = 'Empowering Healthcare Professionals',
  subtitle = 'Advanced Tools for Modern Clinicians',
  description = 'Streamline your workflow with our comprehensive suite of clinical tools designed to enhance patient care and improve outcomes.',
  button_text = 'Get Started',
  button_url = '/request-demo',
  background_image_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
WHERE section_key = 'clinicians_lead_gen';

UPDATE website_content SET 
  title = 'Advanced Clinical Tools',
  subtitle = 'Everything You Need in One Platform',
  description = 'From patient management to clinical decision support, our platform provides all the tools you need for efficient care delivery.',
  background_image_url = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
WHERE section_key = 'clinicians_mobile';

-- Update Patients sections
UPDATE website_content SET 
  title = 'Your Health, Your Way',
  subtitle = 'Personalized Healthcare at Your Fingertips',
  description = 'Take control of your health journey with our patient-centered platform designed for convenience and better outcomes.',
  button_text = 'Get Started',
  button_url = '/request-demo',
  background_image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
WHERE section_key = 'patients_lead_gen';

UPDATE website_content SET 
  title = 'Stay Connected',
  subtitle = 'Your Care Team is Always Available',
  description = 'Secure messaging, appointment scheduling, and 24/7 access to your health information.',
  background_image_url = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
WHERE section_key = 'patients_mobile';

-- Update News sections
UPDATE website_content SET 
  title = 'Healthcare News & Insights',
  subtitle = 'Stay Informed with Industry Updates',
  description = 'Get the latest news, insights, and developments in healthcare technology and innovation.',
  background_image_url = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
WHERE section_key = 'news_lead_gen';

UPDATE website_content SET 
  title = 'Digital Health Revolution',
  subtitle = 'The Future is Here',
  description = 'Discover how technology is transforming healthcare delivery and improving patient experiences.',
  background_image_url = 'https://images.unsplash.com/photo-1518770660439-4636190af475'
WHERE section_key = 'news_mobile';

-- Update Contact sections
UPDATE website_content SET 
  title = 'Get in Touch',
  subtitle = 'Ready to Transform Your Healthcare Experience?',
  description = 'Contact our team to learn more about our solutions and how we can help improve your healthcare delivery.',
  button_text = 'Send Message',
  background_image_url = 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
WHERE section_key = 'contact_lead_gen';

UPDATE website_content SET 
  title = 'Multiple Ways to Connect',
  subtitle = 'Choose What Works Best for You',
  description = 'Phone, email, or schedule a demo - we are here to help you get started.',
  background_image_url = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
WHERE section_key = 'contact_mobile';