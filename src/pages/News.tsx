
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Calendar, User, ArrowRight, Loader, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';

type BlogPost = Tables<'blog_posts'>;

interface HeroContent {
  title: string;
  highlightedText: string;
  backgroundVideoUrl: string;
}

interface ContentSectionData {
  title: string;
  description: string;
}

const News = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Latest Healthcare",
    highlightedText: "News",
    backgroundVideoUrl: '' // Start empty, only show database video
  });
  const [contentSection, setContentSection] = useState<ContentSectionData>({
    title: "News",
    description: "Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare."
  });

  useEffect(() => {
    loadBlogPosts();
    loadHeroContent();
    setupRealtimeSubscription();
  }, []);

  const loadHeroContent = async () => {
    try {
      const { data: heroData, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section_key', 'news_hero')
        .eq('is_active', true)
        .maybeSingle();

      if (heroData) {
        console.log('Loaded news hero content:', heroData);
        const newHeroContent = {
          title: "Latest Healthcare", // Keep hardcoded title
          highlightedText: "News", // Keep hardcoded highlighted text
          backgroundVideoUrl: heroData.background_video_url || '' // Only use database for video
        };
        console.log('Setting new news hero content:', newHeroContent);
        setHeroContent(newHeroContent);
        setContentSection({
          title: "News",
          description: heroData.description || "Stay informed with the latest developments in healthcare innovation, research breakthroughs, and community health initiatives from Resilient Healthcare."
        });
      } else {
        console.log('No news hero content found');
      }
    } catch (error) {
      console.error('Error loading news hero content:', error);
    }
  };

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
      .channel('news-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts',
        filter: 'is_published=eq.true'
      }, () => {
        loadBlogPosts();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.news_hero'
      }, () => {
        loadHeroContent();
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

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-white font-apple overflow-x-hidden">
      <Navigation />
      
      <HeroSection 
        title={heroContent.title}
        highlightedText={heroContent.highlightedText}
        backgroundVideoUrl={heroContent.backgroundVideoUrl}
      />

      <ContentSection 
        title={contentSection.title}
        description={contentSection.description}
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
                <article key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.featured_image_url || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      alt={post.title}
                      className="w-full h-40 sm:h-48 object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/80 to-[#1565C0]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  </div>
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
                    
                    <Button 
                      variant="gradient" 
                      onClick={() => handleReadMore(post)}
                      className="inline-flex items-center text-sm sm:text-base"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <LeadGenSection />

      <Footer />

      {/* Custom Modal that allows background scrolling */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b flex-shrink-0">
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight pr-8">
                  {selectedPost?.title}
                </h2>
                
                {selectedPost && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{formatDate(selectedPost.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>{selectedPost.author}</span>
                    </div>
                    {selectedPost.category && (
                      <span className="bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {selectedPost.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseModal}
                className="shrink-0 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedPost && (
                <div className="space-y-6">
                  {selectedPost.featured_image_url && (
                    <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                      <img 
                        src={selectedPost.featured_image_url} 
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  {selectedPost.excerpt && (
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border-l-4 border-primary">
                      <p className="text-lg text-gray-700 font-medium italic leading-relaxed">
                        {selectedPost.excerpt}
                      </p>
                    </div>
                  )}
                  
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                    />
                  </div>
                  
                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="pt-6 border-t">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
