-- Populate service_benefits table with the correct data
INSERT INTO service_benefits (service_id, benefit_text, icon_name, display_order) VALUES

-- Benefits for Outpatient PT Anywhere service
((SELECT id FROM services WHERE title = 'Outpatient PT Anywhere'), 'Generate new outpatient therapy revenue', 'TrendingUp', 1),
((SELECT id FROM services WHERE title = 'Outpatient PT Anywhere'), 'Reduce costly post-acute placements', 'Shield', 2),
((SELECT id FROM services WHERE title = 'Outpatient PT Anywhere'), 'Improve patient outcomes with early intervention', 'Target', 3),
((SELECT id FROM services WHERE title = 'Outpatient PT Anywhere'), 'Prepare for value-based care programs', 'Award', 4),

-- Benefits for Primary Care at Home service  
((SELECT id FROM services WHERE title = 'Primary Care at Home'), 'Extend transitional care management for high-risk patients', 'Users', 1),
((SELECT id FROM services WHERE title = 'Primary Care at Home'), 'Expand rural health clinic reach into underserved areas', 'MapPin', 2),
((SELECT id FROM services WHERE title = 'Primary Care at Home'), 'Reduce readmissions with targeted follow-up visits', 'CheckCircle', 3),

-- Benefits for Acute Hospital-at-Home service
((SELECT id FROM services WHERE title = 'Acute Hospital-at-Home'), 'Complete workflow design & policy development', 'Zap', 1),
((SELECT id FROM services WHERE title = 'Acute Hospital-at-Home'), 'Staff training & education programs', 'Users', 2),
((SELECT id FROM services WHERE title = 'Acute Hospital-at-Home'), 'Medicare waiver submission support', 'Clock', 3);