-- Update Care at Home page to have 5 separate tabs, each representing one key point
UPDATE website_content 
SET content_data = '{
  "tabs": [
    {
      "id": "leading-hospitals",
      "title": "Leading Hospitals", 
      "subtitle": "Work with leading hospitals",
      "description": "Partner with top-tier healthcare institutions to deliver exceptional patient care at home. Our network includes leading hospitals that trust our platform for their home-based care programs.",
      "icon_name": "Building2",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "patient-referrals",
      "title": "Patient Referrals",
      "subtitle": "Get access to a consistent stream of patient referrals", 
      "description": "Enjoy a steady flow of patient referrals through our established hospital partnerships. Our platform ensures you have consistent work opportunities.",
      "icon_name": "Users",
      "color": "blue",
      "image_url": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "care-delivery",
      "title": "Care Delivery Support",
      "subtitle": "Support care delivery for inpatient at home and outpatient at home services",
      "description": "Comprehensive support for both inpatient and outpatient home care services. Our platform provides all the tools and resources you need for successful care delivery.",
      "icon_name": "Heart",
      "color": "blue", 
      "image_url": "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "simplified-workflows",
      "title": "Simplified Workflows",
      "subtitle": "Simplified workflows and credentialing through our platform",
      "description": "Streamlined processes and easy credentialing make it simple to get started and focus on patient care rather than administrative tasks.",
      "icon_name": "Zap",
      "color": "blue", 
      "image_url": "https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      "id": "per-visit-payment",
      "title": "Per-Visit Payment",
      "subtitle": "We pay you per visit so no need to worry about administrative burden",
      "description": "Simple per-visit payment structure eliminates administrative hassles. Focus on providing quality care while we handle the billing and payment processing.",
      "icon_name": "CheckCircle",
      "color": "blue", 
      "image_url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ]
}'
WHERE section_key = 'care_at_home_mobile';