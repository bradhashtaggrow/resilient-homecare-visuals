import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!openAIApiKey) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are a healthcare technology expert and content writer. Create high-quality, engaging blog posts about healthcare innovation, AI in medicine, digital health, and related topics. 

Requirements:
- Write comprehensive, informative content that is both accessible and authoritative
- Focus on healthcare technology, AI applications in medicine, digital health solutions, telemedicine, healthcare data analytics, or health system innovations
- Include relevant healthcare terminology while keeping it understandable
- Structure content with clear sections and compelling narratives
- Ensure factual accuracy and cite general industry trends
- Make content SEO-friendly and engaging for healthcare professionals

Format your response as a JSON object with:
- title: A compelling headline (max 80 characters)
- excerpt: A brief summary (max 160 characters) 
- content: Full blog post content (800-1500 words, markdown formatted)
- tags: Array of 3-5 relevant tags

Write about current healthcare technology trends, innovations, case studies, or industry insights.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    try {
      // Try to parse as JSON first
      const parsedContent = JSON.parse(content);
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      // If not JSON, create structured response
      const lines = content.split('\n');
      const title = lines.find(line => line.includes('Title:') || line.includes('#'))?.replace(/^#*\s*Title:\s*/i, '').replace(/^#\s*/, '') || 'Healthcare Technology Insights';
      
      return new Response(JSON.stringify({
        title: title.substring(0, 80),
        excerpt: `Exploring ${title.toLowerCase()} and its impact on modern healthcare delivery.`.substring(0, 160),
        content: content,
        tags: ['healthcare', 'technology', 'ai', 'innovation']
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in generate-blog-post function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});