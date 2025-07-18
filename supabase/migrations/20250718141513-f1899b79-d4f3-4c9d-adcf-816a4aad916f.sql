-- Fix malformed featured_image_url values in blog_posts
-- Extract proper image URLs from media:text CDATA sections

UPDATE blog_posts 
SET featured_image_url = 
  CASE 
    WHEN featured_image_url LIKE '<media:text%' THEN 
      -- Extract image URL from CDATA section
      REGEXP_REPLACE(
        REGEXP_REPLACE(featured_image_url, '.*<img[^>]+src=[''"]([^''"]+)[''"][^>]*>.*', '\1'),
        '\?.*', '?p=original'
      )
    ELSE featured_image_url
  END
WHERE source = 'rss' 
  AND featured_image_url IS NOT NULL 
  AND featured_image_url LIKE '<media:text%';