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

    // Get all RSS posts without featured images
    const { data: postsWithoutImages, error: fetchError } = await supabaseClient
      .from('blog_posts')
      .select('id, title, content, excerpt, featured_image_url')
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
    const placeholderImages = [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop'
    ];

    if (postsWithoutImages && postsWithoutImages.length > 0) {
      for (let i = 0; i < postsWithoutImages.length; i++) {
        const post = postsWithoutImages[i];
        try {
          console.log(`Processing post: "${post.title}"`);
          console.log(`Post content preview: ${post.content?.substring(0, 200)}...`);
          console.log(`Post excerpt preview: ${post.excerpt?.substring(0, 100)}...`);

          // Try multiple extraction methods
          let extractedImage = 
            extractImageFromContent(post.content) ||
            extractImageFromContent(post.excerpt || '') ||
            await extractImageFromTitle(post.title) ||
            placeholderImages[i % placeholderImages.length]; // Fallback to healthcare placeholder

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

async function extractImageFromTitle(title: string): Promise<string | null> {
  // Generate healthcare-related images based on keywords in title
  const healthcareKeywords = {
    'medication': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    'adherence': 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop', 
    'patient': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
    'healthcare': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    'pediatric': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    'digital': 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=600&fit=crop',
    'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    'pharmaceutical': 'https://images.unsplash.com/photo-1559757175-5965834c18d7?w=800&h=600&fit=crop',
    'value-based': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    'care': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop'
  };

  const titleLower = title.toLowerCase();
  
  for (const [keyword, imageUrl] of Object.entries(healthcareKeywords)) {
    if (titleLower.includes(keyword)) {
      console.log(`Found keyword "${keyword}" in title, using themed image`);
      return imageUrl;
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