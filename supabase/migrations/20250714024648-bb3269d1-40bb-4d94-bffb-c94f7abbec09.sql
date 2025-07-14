-- Reset database to match restore point 6e3dac0
-- Clean up website_content and reset to basic state

-- Clear all existing website content
DELETE FROM website_content;

-- Insert only essential hero content for the restored codebase
INSERT INTO website_content (section_key, title, subtitle, description, is_active) VALUES
('hero', 'The Future of Healthcare', 'Transforming Patient Care', 'We partner with hospitals to extend clinical services into the home—improving outcomes, reducing costs, and capturing new revenue.', true);

-- Clean up any service-related data that might not match the restored code
DELETE FROM services WHERE title NOT IN ('Remote Patient Monitoring', 'Hospital at Home', 'Virtual Care');
DELETE FROM service_benefits;

-- Reset any complex content data structures
UPDATE website_content SET content_data = '{}' WHERE content_data IS NOT NULL;

-- Clean up test notifications and system activity related to features that were removed
DELETE FROM notifications WHERE type = 'lead' AND message LIKE '%demo request%';
DELETE FROM system_activity WHERE activity_type IN ('content_update', 'service_update');