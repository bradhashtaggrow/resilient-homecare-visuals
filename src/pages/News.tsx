
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Calendar, User, ArrowRight, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type BlogPost = Tables<'blog_posts'>;

const News = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
    setupRealtimeSubscription();
  }, []);

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('news-blog-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts',
        filter: 'is_published=eq.true'
      }, () => {
        loadBlogPosts();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Healthcare"
        highlightedText="News & Updates"
      />

      <ContentSection 
        title="News"
        description="Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare."
      />

      {/* News Articles Grid */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Latest News</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="h-8 w-8 animate-spin text-[#4285F4]" />
              <span className="ml-2 text-gray-600">Loading latest news...</span>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">No news articles available at the moment.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={post.featured_image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <span className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white px-2 sm:px-3 py-1 rounded-full font-medium self-start">
                        {post.category || 'Healthcare'}
                      </span>
                      <div className="flex items-center gap-1 text-[#4285F4]">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">{formatDate(post.published_at)}</span>
                        <span className="sm:hidden">{formatDate(post.published_at)?.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#4285F4]">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 hover:bg-gradient-to-r hover:from-[#4285F4] hover:to-[#1565C0] hover:bg-clip-text hover:text-transparent cursor-pointer line-clamp-2 transition-all duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <button className="bg-gradient-to-r from-[#4285F4] to-[#1565C0] text-white font-semibold hover:from-[#5a95f5] hover:to-[#2576d1] inline-flex items-center text-sm sm:text-base px-4 py-2 rounded-lg transition-all duration-200">
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default News;
