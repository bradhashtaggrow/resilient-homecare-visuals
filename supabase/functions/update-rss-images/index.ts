import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  console.log('Update RSS images function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting to update RSS post images...');

    // Get all RSS posts that need image updates (either no image or broken image)
    const { data: postsWithoutImages, error: fetchError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, content, excerpt, featured_image_url, rss_feed_id')
      .eq('source', 'rss')
      .or('featured_image_url.is.null,featured_image_url.eq.');

    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Found ${postsWithoutImages?.length || 0} RSS posts without images`);

    let updatedCount = 0;

    if (postsWithoutImages && postsWithoutImages.length > 0) {
      for (const post of postsWithoutImages) {
        try {
          console.log(`Processing post: "${post.title}"`);
          
          // Get the RSS feed URL to re-fetch and extract images
          const { data: rssFeed } = await supabaseClient
            .from('rss_feeds')
            .select('url')
            .eq('id', post.rss_feed_id)
            .single();
            
          if (!rssFeed) {
            console.log(`No RSS feed found for post: ${post.title}`);
            continue;
          }
          
          // Re-fetch the RSS feed to get the original content with images
          let extractedImage = await extractImageFromRSSFeed(rssFeed.url, post.title);

          if (extractedImage) {
            // Clean up the URL if needed
            extractedImage = cleanImageUrl(extractedImage);
            
            console.log(`Using image for post "${post.title}": ${extractedImage}`);

            // Update the post with the extracted image
            const { error: updateError } = await supabaseClient
              .from('blog_posts')
              .update({ featured_image_url: extractedImage })
              .eq('id', post.id);

            if (!updateError) {
              updatedCount++;
              console.log(`✅ Updated post "${post.title}" with image`);
            } else {
              console.error(`❌ Error updating post "${post.title}":`, updateError);
            }
          } else {
            console.log(`❌ No image found for post "${post.title}"`);
          }
        } catch (postError) {
          console.error(`Error processing post "${post.title}":`, postError);
        }
      }
    }

    console.log(`Successfully updated ${updatedCount} posts with images`);

    return new Response(JSON.stringify({ 
      success: true,
      totalProcessed: postsWithoutImages?.length || 0,
      updatedCount,
      message: `Successfully added images to ${updatedCount} RSS posts`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in update-rss-images function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractImageFromContent(content: string): string | null {
  if (!content) return null;
  
  // Try to extract image URL from img tags (most common)
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
  const imgMatch = content.match(imgRegex);
  if (imgMatch) {
    return imgMatch[1];
  }
  
  // Try to extract from media:content attributes
  const mediaRegex = /url=["']([^"']*\.(jpg|jpeg|png|gif|webp|bmp|svg)[^"']*)["']/i;
  const mediaMatch = content.match(mediaRegex);
  if (mediaMatch) {
    return mediaMatch[1];
  }
  
  // Try to extract from figure tags
  const figureRegex = /<figure[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/figure>/i;
  const figureMatch = content.match(figureRegex);
  if (figureMatch) {
    return figureMatch[1];
  }

  // Try to extract from background-image CSS
  const bgImageRegex = /background-image:\s*url\(["']?([^"')]+)["']?\)/i;
  const bgImageMatch = content.match(bgImageRegex);
  if (bgImageMatch) {
    return bgImageMatch[1];
  }

  // Try to extract any URL that looks like an image
  const urlImageRegex = /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|webp|bmp)/i;
  const urlImageMatch = content.match(urlImageRegex);
  if (urlImageMatch) {
    return urlImageMatch[0];
  }
  
  return null;
}

async function extractImageFromRSSFeed(feedUrl: string, postTitle: string): Promise<string | null> {
  try {
    console.log(`Fetching RSS feed: ${feedUrl}`);
    
    // Ensure URL has proper protocol
    if (!feedUrl.startsWith('http://') && !feedUrl.startsWith('https://')) {
      feedUrl = 'https://' + feedUrl;
    }
    
    const response = await fetch(feedUrl);
    if (!response.ok) {
      console.error(`Failed to fetch RSS feed: ${response.status}`);
      return null;
    }
    
    const rssText = await response.text();
    
    // Find the specific RSS item that matches our post title
    const itemMatches = rssText.match(/<item[^>]*>[\s\S]*?<\/item>/gi);
    if (!itemMatches) return null;
    
    for (const itemXml of itemMatches) {
      const title = extractXMLContent(itemXml, 'title');
      
      // Check if this is the item we're looking for
      if (title && title.trim() === postTitle.trim()) {
        console.log(`Found matching RSS item for: ${postTitle}`);
        
        // First, try to get the article URL and fetch the actual page
        const articleUrl = extractXMLContent(itemXml, 'link') || extractXMLContent(itemXml, 'guid');
        
        if (articleUrl) {
          console.log(`Fetching article page: ${articleUrl}`);
          const pageImageUrl = await extractImageFromArticlePage(articleUrl);
          if (pageImageUrl) {
            console.log(`Found cover image from article page: ${pageImageUrl}`);
            return pageImageUrl;
          }
        }
        
        // Fallback: Extract image from RSS item directly
        let imageUrl = 
          // Try media namespace tags first
          extractMediaContentUrl(itemXml) ||
          extractMediaThumbnailUrl(itemXml) ||
          // Try enclosure tags
          extractImageFromEnclosure(itemXml) ||
          // Try content and description
          extractImageFromContent(extractXMLContent(itemXml, 'content:encoded') || '') ||
          extractImageFromContent(extractXMLContent(itemXml, 'description') || '') ||
          // Try other common RSS image elements
          extractXMLContent(itemXml, 'image') ||
          extractXMLContent(itemXml, 'thumbnail');
        
        if (imageUrl) {
          console.log(`Extracted image from RSS: ${imageUrl}`);
          return imageUrl;
        }
      }
    }
    
    console.log(`No image found in RSS for: ${postTitle}`);
    return null;
  } catch (error) {
    console.error(`Error extracting image from RSS feed:`, error);
    return null;
  }
}

async function extractImageFromArticlePage(url: string): Promise<string | null> {
  try {
    console.log(`Fetching article page: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Image Extractor/1.0)'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch article page: ${response.status}`);
      return null;
    }
    
    const html = await response.text();
    
    // Try to extract cover/featured image from common meta tags and selectors
    const imageSelectors = [
      // Open Graph image
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
      
      // Twitter card image
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i,
      
      // Article featured image
      /<meta[^>]+name=["']article:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']article:image["'][^>]*>/i,
      
      // Common featured image selectors
      /<img[^>]+class=["'][^"']*featured[^"']*["'][^>]+src=["']([^"']+)["'][^>]*>/i,
      /<img[^>]+class=["'][^"']*hero[^"']*["'][^>]+src=["']([^"']+)["'][^>]*>/i,
      /<img[^>]+class=["'][^"']*cover[^"']*["'][^>]+src=["']([^"']+)["'][^>]*>/i,
      
      // First image in article content
      /<article[^>]*>[\s\S]*?<img[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/article>/i,
      
      // General first large image
      /<img[^>]+src=["']([^"']+)["'][^>]*>/i
    ];
    
    for (const regex of imageSelectors) {
      const match = html.match(regex);
      if (match && match[1]) {
        let imageUrl = match[1];
        
        // Convert relative URLs to absolute
        if (imageUrl.startsWith('//')) {
          imageUrl = 'https:' + imageUrl;
        } else if (imageUrl.startsWith('/')) {
          const baseUrl = new URL(url);
          imageUrl = baseUrl.origin + imageUrl;
        } else if (!imageUrl.startsWith('http')) {
          const baseUrl = new URL(url);
          imageUrl = baseUrl.origin + '/' + imageUrl;
        }
        
        // Validate it looks like an image URL
        if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?|$)/i.test(imageUrl)) {
          console.log(`Found cover image: ${imageUrl}`);
          return imageUrl;
        }
      }
    }
    
    console.log(`No cover image found in article page: ${url}`);
    return null;
  } catch (error) {
    console.error(`Error fetching article page:`, error);
    return null;
  }
}

function extractXMLContent(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function extractImageFromEnclosure(xml: string): string | null {
  // Extract from enclosure tag (commonly used for images in RSS)
  const enclosureRegex = /<enclosure[^>]+url=["']([^"']*\.(jpg|jpeg|png|gif|webp|bmp)[^"']*)["'][^>]*>/i;
  const enclosureMatch = xml.match(enclosureRegex);
  if (enclosureMatch) {
    return enclosureMatch[1];
  }
  
  // Extract from media:content url attribute
  const mediaContentRegex = /<media:content[^>]+url=["']([^"']*\.(jpg|jpeg|png|gif|webp|bmp)[^"']*)["'][^>]*>/i;
  const mediaContentMatch = xml.match(mediaContentRegex);
  if (mediaContentMatch) {
    return mediaContentMatch[1];
  }
  
  return null;
}

function extractMediaContentUrl(xml: string): string | null {
  // Try different variations of media:content
  const patterns = [
    /<media:content[^>]+url=["']([^"']+)["'][^>]*>/i,
    /<media:content[^>]*url=["']([^"']+)["'][^>]*\/>/i,
    /<media:content[^>]*>[\s\S]*?url=["']([^"']+)["'][\s\S]*?<\/media:content>/i
  ];
  
  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match && match[1]) {
      console.log(`Found media:content URL: ${match[1]}`);
      return match[1];
    }
  }
  return null;
}

function extractMediaThumbnailUrl(xml: string): string | null {
  // Try different variations of media:thumbnail
  const patterns = [
    /<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/i,
    /<media:thumbnail[^>]*url=["']([^"']+)["'][^>]*\/>/i
  ];
  
  for (const pattern of patterns) {
    const match = xml.match(pattern);
    if (match && match[1]) {
      console.log(`Found media:thumbnail URL: ${match[1]}`);
      return match[1];
    }
  }
  return null;
}

function cleanImageUrl(url: string): string {
  // Remove any HTML entities
  url = url.replace(/&amp;/g, '&')
           .replace(/&lt;/g, '<')
           .replace(/&gt;/g, '>')
           .replace(/&quot;/g, '"')
           .replace(/&#39;/g, "'");
  
  // Remove any trailing parameters that might interfere
  url = url.split('?')[0];
  
  // Ensure it's a proper URL
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  return url.trim();
}