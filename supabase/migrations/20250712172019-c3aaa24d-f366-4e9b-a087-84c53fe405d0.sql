-- Add video thumbnails and background videos to existing sections
UPDATE website_content SET 
  background_video_url = 'https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4'
WHERE section_key = 'hero';

UPDATE website_content SET 
  background_video_url = 'https://videos.pexels.com/video-files/6749050/6749050-uhd_2560_1440_25fps.mp4'
WHERE section_key = 'mobile';

UPDATE website_content SET 
  background_video_url = 'https://videos.pexels.com/video-files/3196830/3196830-uhd_2560_1440_25fps.mp4'
WHERE section_key = 'admin_dashboard';

-- Add mobile content data with proper tab structure
UPDATE website_content SET 
  content_data = '{
    "tabs": [
      {
        "id": "partner-with",
        "title": "Partner with",
        "subtitle": "Leading Hospitals",
        "description": "Connect with top-tier healthcare institutions to deliver exceptional patient care.",
        "icon_name": "Building2",
        "display_order": 1,
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "consistent-patient",
        "title": "Consistent Patient",
        "subtitle": "Care Experience", 
        "description": "Ensure seamless continuity of care across all patient touchpoints.",
        "icon_name": "Users",
        "display_order": 2,
        "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "complete-home",
        "title": "Complete Home",
        "subtitle": "Healthcare Solutions",
        "description": "Comprehensive healthcare services delivered directly to patients homes.",
        "icon_name": "Heart", 
        "display_order": 3,
        "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "streamlined-platform",
        "title": "Streamlined Platform",
        "subtitle": "Technology Integration",
        "description": "Advanced platform technology that simplifies healthcare delivery.",
        "icon_name": "Zap",
        "display_order": 4,
        "image_url": "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      },
      {
        "id": "simple-per-visit",
        "title": "Simple Per-Visit", 
        "subtitle": "Billing Model",
        "description": "Transparent and straightforward per-visit billing for healthcare services.",
        "icon_name": "CheckCircle",
        "display_order": 5,
        "image_url": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
      }
    ]
  }'
WHERE section_key = 'mobile';

-- Add admin dashboard content data with CTA information
UPDATE website_content SET 
  content_data = '{
    "cta_headline": "Ready to Transform Your Healthcare Operations?",
    "cta_description": "Join forward-thinking healthcare organizations who have already revolutionized their operations. See our comprehensive platform in action with a personalized demonstration.",
    "features": [
      "Real-time analytics dashboard",
      "AI-powered patient insights", 
      "Seamless hospital integration",
      "Compliance monitoring tools"
    ]
  }'
WHERE section_key = 'admin_dashboard';

-- Enable realtime for website_content table
ALTER TABLE public.website_content REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.website_content;