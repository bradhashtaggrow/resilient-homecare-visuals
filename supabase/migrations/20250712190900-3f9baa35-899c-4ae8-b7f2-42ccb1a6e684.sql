
-- Delete existing individual clinicians sections
DELETE FROM website_content WHERE section_key IN (
  'clinicians_hospitals',
  'clinicians_referrals', 
  'clinicians_delivery',
  'clinicians_workflows',
  'clinicians_payment',
  'clinicians_join'
);

-- Update the main clinicians section to include all tabs data
UPDATE website_content 
SET content_data = '{
  "tabs": [
    {
      "id": "work-with-hospitals",
      "title": "Work with leading hospitals",
      "subtitle": "Partnership Excellence", 
      "description": "Partner with top healthcare institutions to expand your reach and impact through our comprehensive network.",
      "icon_name": "Building2",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "steady-patient-flow",
      "title": "Get access to a consistent stream of patient referrals",
      "subtitle": "Steady Patient Flow",
      "description": "Receive steady patient referrals through our integrated network of healthcare partners and streamlined referral system.",
      "icon_name": "Users",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "comprehensive-home-care", 
      "title": "Support care delivery for inpatient at home and outpatient at home services",
      "subtitle": "Comprehensive Home Care",
      "description": "Comprehensive support for both inpatient and outpatient care delivery in home settings with full clinical oversight.",
      "icon_name": "Heart",
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "streamlined-operations",
      "title": "Simplified workflows and credentialing through our platform", 
      "subtitle": "Streamlined Operations",
      "description": "Streamlined processes that reduce administrative complexity, save time, and ensure compliance with healthcare standards.",
      "icon_name": "Zap",
      "image_url": "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "simple-payment-model",
      "title": "We pay you per visit so no need to worry about administrative burden",
      "subtitle": "Simple Payment Model", 
      "description": "Simple per-visit payment structure that eliminates administrative hassles and ensures fair, transparent compensation.",
      "icon_name": "CheckCircle",
      "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}'::jsonb,
title = 'The Future of Care',
subtitle = 'Experience healthcare like never before', 
description = 'Every interaction reimagined.'
WHERE section_key = 'clinicians_hero';

-- Rename the section key to be more descriptive
UPDATE website_content 
SET section_key = 'clinicians_mobile' 
WHERE section_key = 'clinicians_hero';
