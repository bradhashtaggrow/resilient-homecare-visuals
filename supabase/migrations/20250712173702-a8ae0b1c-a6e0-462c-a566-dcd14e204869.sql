-- Update Care at Home page tabs with the correct copy
UPDATE website_content 
SET content_data = '{
  "tabs": [
    {
      "id": "acute-care",
      "title": "Acute Care", 
      "subtitle": "Work with leading hospitals",
      "description": "Get access to a consistent stream of patient referrals. Support care delivery for inpatient at home and outpatient at home services. Simplified workflows and credentialing through our platform. We pay you per visit so no need to worry about administrative burden.",
      "icon_name": "Heart",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "post-acute",
      "title": "Post-Acute Care",
      "subtitle": "Consistent patient referrals", 
      "description": "Work with leading hospitals. Get access to a consistent stream of patient referrals. Support care delivery for inpatient at home and outpatient at home services. Simplified workflows and credentialing through our platform. We pay you per visit so no need to worry about administrative burden.",
      "icon_name": "Activity",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "chronic-care",
      "title": "Chronic Care",
      "subtitle": "Simplified workflows and credentialing",
      "description": "Work with leading hospitals. Get access to a consistent stream of patient referrals. Support care delivery for inpatient at home and outpatient at home services. Simplified workflows and credentialing through our platform. We pay you per visit so no need to worry about administrative burden.",
      "icon_name": "Shield",
      "color": "blue", 
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}'
WHERE section_key = 'care_at_home_mobile';