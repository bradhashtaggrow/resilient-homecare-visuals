import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  content?: string;
  featured_image_url?: string;
}

const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async (req) => {
  console.log('RSS fetch function called with method:', req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { feedId } = body;

    if (!feedId) {
      console.error('No feedId provided');
      return new Response(JSON.stringify({ error: 'Feed ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the RSS feed details
    const { data: feed, error: feedError } = await supabaseClient
      .from('rss_feeds')
      .select('*')
      .eq('id', feedId)
      .single();

    if (feedError || !feed) {
      return new Response(JSON.stringify({ error: 'RSS feed not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ensure URL has proper protocol
    let feedUrl = feed.url;
    if (!feedUrl.startsWith('http://') && !feedUrl.startsWith('https://')) {
      feedUrl = 'https://' + feedUrl;
      console.log('Added https:// protocol to URL:', feedUrl);
    }
    
    console.log('Fetching RSS from URL:', feedUrl);
    
    // Fetch RSS content
    const rssResponse = await fetch(feedUrl);
    console.log('RSS response status:', rssResponse.status);
    
    if (!rssResponse.ok) {
      console.error(`Failed to fetch RSS feed: ${rssResponse.status} ${rssResponse.statusText}`);
      return new Response(JSON.stringify({ 
        error: `Failed to fetch RSS feed: ${rssResponse.status} ${rssResponse.statusText}`,
        url: feed.url 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rssText = await rssResponse.text();
    
    // Parse RSS XML
    const items = parseRSSFeed(rssText);
    
    let newPostsCount = 0;

    // Process each RSS item
    for (const item of items) {
      try {
        // Check if post already exists by title
        const { data: existingPost } = await supabaseClient
          .from('blog_posts')
          .select('id')
          .eq('title', item.title)
          .limit(1);

        if (existingPost && existingPost.length > 0) {
          continue; // Skip if post already exists
        }

        // Generate slug from title
        const slug = generateSlug(item.title);

        // Create blog post
        const { error: insertError } = await supabaseClient
          .from('blog_posts')
          .insert([{
            title: item.title.substring(0, 200), // Truncate if too long
            content: item.content || item.description,
            excerpt: item.description?.substring(0, 160) || null,
            author: feed.name,
            slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
            category: 'healthcare',
            tags: ['rss', 'news'],
            source: 'rss',
            rss_feed_id: feedId,
            featured_image_url: item.featured_image_url || null,
            is_published: false,
            is_featured: false,
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString()
          }]);

        if (!insertError) {
          newPostsCount++;
        }
      } catch (itemError) {
        console.error('Error processing RSS item:', itemError);
        // Continue with next item
      }
    }

    // Update feed's last_fetched_at
    await supabaseClient
      .from('rss_feeds')
      .update({ last_fetched_at: new Date().toISOString() })
      .eq('id', feedId);

    return new Response(JSON.stringify({ 
      count: newPostsCount,
      total: items.length,
      message: `Successfully imported ${newPostsCount} new posts from ${items.length} RSS items`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-rss-posts function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: error.toString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function parseRSSFeed(xmlText: string): RSSItem[] {
  const items: RSSItem[] = [];
  
  try {
    // Simple XML parsing for RSS items
    const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi);
    
    if (!itemMatches) return items;

    for (const itemXml of itemMatches) {
      try {
        const title = extractXMLContent(itemXml, 'title') || 'Untitled';
        const description = extractXMLContent(itemXml, 'description') || '';
        const link = extractXMLContent(itemXml, 'link') || '';
        const pubDate = extractXMLContent(itemXml, 'pubDate') || new Date().toISOString();
        const content = extractXMLContent(itemXml, 'content:encoded') || 
                       extractXMLContent(itemXml, 'content') || 
                       description;

        // Extract featured image from various RSS elements with improved logic
        const featuredImage = extractXMLContent(itemXml, 'media:content') ||
                              extractXMLContent(itemXml, 'media:thumbnail') ||
                              extractXMLContent(itemXml, 'enclosure') ||
                              extractXMLContent(itemXml, 'image') ||
                              extractXMLContent(itemXml, 'media:group') ||
                              extractImageFromContent(content) ||
                              extractImageFromContent(description) ||
                              extractImageFromMeta(itemXml) ||
                              null;

        // Clean up HTML tags from description and content
        const cleanDescription = cleanHTML(description);
        const cleanContent = cleanHTML(content);

        items.push({
          title: cleanHTML(title),
          description: cleanDescription,
          link,
          pubDate,
          content: cleanContent,
          featured_image_url: featuredImage
        });
      } catch (itemError) {
        console.error('Error parsing RSS item:', itemError);
      }
    }
  } catch (parseError) {
    console.error('Error parsing RSS feed:', parseError);
  }

  return items;
}

function extractXMLContent(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

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
  
  return null;
}

function extractImageFromMeta(xml: string): string | null {
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
  
  // Extract from media:thumbnail url attribute
  const mediaThumbnailRegex = /<media:thumbnail[^>]+url=["']([^"']*\.(jpg|jpeg|png|gif|webp|bmp)[^"']*)["'][^>]*>/i;
  const mediaThumbnailMatch = xml.match(mediaThumbnailRegex);
  if (mediaThumbnailMatch) {
    return mediaThumbnailMatch[1];
  }
  
  // Extract from image tag
  const imageRegex = /<image[^>]*>[\s\S]*?<url>([^<]*\.(jpg|jpeg|png|gif|webp|bmp)[^<]*)<\/url>[\s\S]*?<\/image>/i;
  const imageMatch = xml.match(imageRegex);
  if (imageMatch) {
    return imageMatch[1];
  }
  
  return null;
}

function cleanHTML(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50); // Limit length
}