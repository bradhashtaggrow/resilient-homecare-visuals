-- Restore database to match reverted codebase at commit 4fd0434
-- This migration resets the database to a clean state matching the restored code

-- Clear all website content to reset to basic state
DELETE FROM website_content;

-- Reset website_content to match the restored codebase with original service content
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('hero', 'The Future of Healthcare', 'Advanced Technology Solutions', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true),
('services', 'Fully Streamlined, Uncompromisingly Simple', '', 'We offer a full spectrum of healthcare services delivered in the comfort of patients homes.', true);

-- Clear and reset services table with the original three services
DELETE FROM services;
DELETE FROM service_benefits;

-- Insert the original three services with proper content
INSERT INTO services (id, title, subtitle, description, color, icon_name, display_order, patient_image_url) VALUES
(gen_random_uuid(), 'Outpatient PT Anywhere', 'Home-Based Therapy & Recovery', 'Hospital-branded physical therapy delivered directly to patients homes with full technology integration.', 'blue', 'Activity', 1, '/lovable-uploads/30c729f3-ad9e-4d48-aabf-36d2418d944a.png'),
(gen_random_uuid(), 'Primary Care at Home', 'Transitional & Rural Care Extension', 'Physician and advanced practice providers delivering seamless care transitions and rural health services.', 'green', 'Heart', 2, '/lovable-uploads/3c85c886-dd68-494f-8a0e-b370d90eee48.png'),
(gen_random_uuid(), 'Acute Hospital-at-Home', 'CMS-Compliant Inpatient Care at Home', 'Full implementation support for hospital-level care delivery in the home environment.', 'purple', 'Hospital', 3, '/lovable-uploads/4b3af59c-60f1-4308-9e3b-e840a22af320.png');

-- Insert service benefits for each service
WITH service_ids AS (
  SELECT id, title, display_order as service_order FROM services
)
INSERT INTO service_benefits (service_id, benefit_text, icon_name, display_order)
SELECT 
  s.id,
  CASE 
    WHEN s.title = 'Outpatient PT Anywhere' THEN 
      CASE b.benefit_order
        WHEN 1 THEN 'Generate new outpatient therapy revenue'
        WHEN 2 THEN 'Reduce costly post-acute placements'
        WHEN 3 THEN 'Improve patient outcomes with early intervention'
        WHEN 4 THEN 'Prepare for value-based care programs'
      END
    WHEN s.title = 'Primary Care at Home' THEN
      CASE b.benefit_order
        WHEN 1 THEN 'Extend transitional care management for high-risk patients'
        WHEN 2 THEN 'Expand rural health clinic reach into underserved areas'
        WHEN 3 THEN 'Reduce readmissions with targeted follow-up visits'
      END
    WHEN s.title = 'Acute Hospital-at-Home' THEN
      CASE b.benefit_order
        WHEN 1 THEN 'Complete workflow design & policy development'
        WHEN 2 THEN 'Staff training & education programs'
        WHEN 3 THEN 'Medicare waiver submission support'
        WHEN 4 THEN 'CMS waiver extended through September 2025. We help hospitals prepare for future program versions.'
      END
  END,
  'CheckCircle',
  b.benefit_order
FROM service_ids s
CROSS JOIN (
  SELECT 1 as benefit_order UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
  SELECT 4 WHERE EXISTS (SELECT 1 FROM service_ids WHERE title IN ('Outpatient PT Anywhere', 'Acute Hospital-at-Home'))
) b
WHERE CASE 
  WHEN s.title = 'Outpatient PT Anywhere' THEN b.benefit_order <= 4
  WHEN s.title = 'Primary Care at Home' THEN b.benefit_order <= 3
  WHEN s.title = 'Acute Hospital-at-Home' THEN b.benefit_order <= 4
  ELSE false
END;

-- Reset any problematic RSS post data
UPDATE blog_posts 
SET 
  is_published = false,
  published_at = null,
  featured_image_url = null
WHERE source = 'rss';

-- Reset RSS feed fetch timestamps
UPDATE rss_feeds 
SET last_fetched_at = null;

-- Clean up any orphaned blog post data
DELETE FROM blog_posts 
WHERE source = 'rss' 
  AND (title = '' OR title IS NULL OR content = '' OR content IS NULL);

-- Clean up any problematic notifications
DELETE FROM public.notifications 
WHERE type = 'lead' 
AND message LIKE '%demo request has been submitted by%';

-- Ensure realtime functionality is properly configured
ALTER TABLE public.website_content REPLICA IDENTITY DEFAULT;