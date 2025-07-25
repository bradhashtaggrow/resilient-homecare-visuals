import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ViewPostDropdown from './ViewPostDropdown';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from './ImageUpload';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Sparkles,
  Rss,
  Save,
  X,
  RefreshCw,
  Calendar,
  User,
  Tag,
  Globe,
  Wifi,
  WifiOff,
  Star
 } from 'lucide-react';
import BlogEditDropdown from './BlogEditDropdown';
import RSSPostControls from './RSSPostControls';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string;
  slug: string;
  featured_image_url: string | null;
  tags: string[] | null;
  category: string | null;
  source: 'manual' | 'ai_generated' | 'rss';
  rss_feed_id: string | null;
  is_published: boolean;
  is_featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface RSSFeed {
  id: string;
  name: string;
  url: string;
  description: string | null;
  last_fetched_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [rssFeeds, setRssFeeds] = useState<RSSFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  
  // Debug logging for edit state
  console.log('BlogManager component rendered');
  const [editingFeed, setEditingFeed] = useState<string | null>(null);
  const [fetchingFeeds, setFetchingFeeds] = useState<Set<string>>(new Set());
  const [editFeedData, setEditFeedData] = useState<Partial<RSSFeed>>({});
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    author: 'Resilient Healthcare',
    category: 'healthcare',
    tags: [],
    is_published: false,
    is_featured: false
  });
  const [newFeed, setNewFeed] = useState<Partial<RSSFeed>>({
    name: '',
    url: '',
    description: '',
    is_active: true
  });
  const [activeTab, setActiveTab] = useState('posts');
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBlogPosts();
    loadRssFeeds();
    setupRealtimeSubscription();
  }, []);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('blog-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'blog_posts'
      }, () => {
        loadBlogPosts();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'rss_feeds'
      }, () => {
        loadRssFeeds();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const loadBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts((data || []) as BlogPost[]);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast({
        title: "Error loading blog posts",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    }
  };

  const loadRssFeeds = async () => {
    try {
      const { data, error } = await supabase
        .from('rss_feeds')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRssFeeds(data || []);
    } catch (error) {
      console.error('Error loading RSS feeds:', error);
      toast({
        title: "Error loading RSS feeds",
        description: "Failed to load RSS feeds",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const savePost = async () => {
    try {
      if (!newPost.title || !newPost.content) {
        toast({
          title: "Missing required fields",
          description: "Title and content are required",
          variant: "destructive"
        });
        return;
      }

      const slug = generateSlug(newPost.title);
      const postData = {
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt || null,
        author: newPost.author || 'Resilient Healthcare',
        slug,
        category: newPost.category || 'healthcare',
        tags: newPost.tags || [],
        source: newPost.source || 'manual',
        is_published: newPost.is_published || false,
        is_featured: newPost.is_featured || false,
        published_at: newPost.is_published ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) throw error;

      toast({
        title: "Blog post created",
        description: "Blog post has been created successfully",
      });

      setNewPost({
        title: '',
        content: '',
        excerpt: '',
        author: 'Resilient Healthcare',
        category: 'healthcare',
        tags: [],
        is_published: false,
        is_featured: false
      });
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error saving blog post",
        description: "Failed to save blog post",
        variant: "destructive"
      });
    }
  };

  const handlePostSave = async (postId: string, updates: Partial<BlogPost>) => {
    try {
      const post = blogPosts.find(p => p.id === postId);
      if (!post) return;

      let postUpdates;

      if (post.source === 'rss') {
        // For RSS posts, only update metadata fields
        postUpdates = {
          category: updates.category || post.category,
          tags: updates.tags || post.tags,
          is_published: updates.is_published !== undefined ? updates.is_published : post.is_published,
          is_featured: updates.is_featured !== undefined ? updates.is_featured : post.is_featured,
          updated_at: new Date().toISOString()
        };
      } else {
        // For manual posts, validate and update all fields
        if (!updates.title || !updates.content) {
          toast({
            title: "Missing required fields",
            description: "Title and content are required",
            variant: "destructive"
          });
          return;
        }

        const slug = generateSlug(updates.title);
        postUpdates = {
          title: updates.title,
          content: updates.content,
          excerpt: updates.excerpt || null,
          author: updates.author || 'Resilient Healthcare',
          slug,
          category: updates.category || 'healthcare',
          tags: updates.tags || [],
          featured_image_url: updates.featured_image_url || null,
          is_published: updates.is_published || false,
          is_featured: updates.is_featured || false,
          updated_at: new Date().toISOString()
        };
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(postUpdates)
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post updated",
        description: post.source === 'rss' ? "RSS post settings updated successfully" : "Blog post updated successfully",
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast({
        title: "Error updating post",
        description: "Failed to update blog post",
        variant: "destructive"
      });
    }
  };


  const saveFeed = async () => {
    try {
      if (!newFeed.name || !newFeed.url) {
        toast({
          title: "Missing required fields",
          description: "Name and URL are required",
          variant: "destructive"
        });
        return;
      }

      const feedData = {
        name: newFeed.name!,
        url: newFeed.url!,
        description: newFeed.description || null,
        is_active: newFeed.is_active || true
      };

      const { error } = await supabase
        .from('rss_feeds')
        .insert([feedData]);

      if (error) throw error;

      toast({
        title: "RSS feed added",
        description: "RSS feed has been added successfully",
      });

      setNewFeed({
        name: '',
        url: '',
        description: '',
        is_active: true
      });
    } catch (error) {
      console.error('Error saving RSS feed:', error);
      toast({
        title: "Error saving RSS feed",
        description: "Failed to save RSS feed",
        variant: "destructive"
      });
    }
  };

  const fetchRSSPosts = async (feedId: string) => {
    try {
      // Add to fetching feeds set
      setFetchingFeeds(prev => new Set(prev).add(feedId));
      console.log('Invoking RSS fetch function with feedId:', feedId);
      
      const { data, error } = await supabase.functions.invoke('fetch-rss-posts', {
        body: { feedId }
      });

      console.log('RSS function response:', { data, error });

      if (error) {
        console.error('RSS function error:', error);
        // Try to get more detailed error info from the response
        let errorMessage = 'Unknown error occurred';
        if (error.message?.includes('non-2xx status code')) {
          errorMessage = 'The RSS feed URL appears to be invalid or unreachable. Please check the URL and try again.';
        } else {
          errorMessage = error.message || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      toast({
        title: "RSS posts imported",
        description: `${data?.count || 0} new posts imported and ready for review. Check the RSS Posts tab to approve them for publishing.`,
      });
    } catch (error) {
      console.error('Error fetching RSS posts:', error);
      let errorMessage = "Failed to fetch posts from RSS feed";
      
      if (error.message?.includes('non-2xx status code')) {
        errorMessage = 'The RSS feed URL appears to be invalid or unreachable. Please verify the URL points to a valid RSS feed.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error fetching RSS posts", 
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      // Remove from fetching feeds set
      setFetchingFeeds(prev => {
        const newSet = new Set(prev);
        newSet.delete(feedId);
        return newSet;
      });
    }
  };

  const deleteFeed = async (feedId: string) => {
    try {
      const { error } = await supabase
        .from('rss_feeds')
        .delete()
        .eq('id', feedId);

      if (error) throw error;

      toast({
        title: "RSS feed deleted",
        description: "RSS feed has been deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting RSS feed:', error);
      toast({
        title: "Error deleting RSS feed",
        description: "Failed to delete RSS feed",
        variant: "destructive"
      });
    }
  };

  const updateFeedStatus = async (feedId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('rss_feeds')
        .update({ is_active: isActive })
        .eq('id', feedId);

      if (error) throw error;

      toast({
        title: "RSS feed updated",
        description: `RSS feed ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      console.error('Error updating RSS feed:', error);
      toast({
        title: "Error updating RSS feed",
        description: "Failed to update RSS feed status",
        variant: "destructive"
      });
    }
  };

  const saveEditedFeed = async (feedId: string, updatedFeed: Partial<RSSFeed>) => {
    try {
      const { error } = await supabase
        .from('rss_feeds')
        .update({
          name: updatedFeed.name,
          url: updatedFeed.url,
          description: updatedFeed.description,
          updated_at: new Date().toISOString()
        })
        .eq('id', feedId);

      if (error) throw error;

      toast({
        title: "RSS feed updated",
        description: "RSS feed has been updated successfully",
      });

      setEditingFeed(null);
    } catch (error) {
      console.error('Error updating RSS feed:', error);
      toast({
        title: "Error updating RSS feed",
        description: "Failed to update RSS feed",
        variant: "destructive"
      });
    }
  };

  const updateExistingRSSImages = async () => {
    console.log('🚀 UPDATE IMAGES BUTTON CLICKED!');
    try {
      setIsFetching(true);
      console.log('Starting RSS image update process...');
      
      // Check if we have any RSS posts
      const rssPosts = blogPosts.filter(p => p.source === 'rss');
      
      console.log(`Found ${rssPosts.length} RSS posts total`);
      
      if (rssPosts.length === 0) {
        toast({
          title: "No RSS posts found",
          description: "There are no RSS posts to update images for.",
        });
        return;
      }
      
      console.log('Invoking update RSS images function...');
      
      const { data, error } = await supabase.functions.invoke('update-rss-images', {
        body: {}
      });

      console.log('Update RSS images response:', { data, error });

      if (error) {
        console.error('Update RSS images function error:', error);
        throw new Error(error.message || 'Unknown error occurred');
      }
      
      toast({
        title: "RSS images updated",
        description: `Successfully processed ${data?.totalProcessed || 0} posts and added images to ${data?.updatedCount || 0} of them.`,
      });

      // Reload blog posts to show updated images
      await loadBlogPosts();
    } catch (error) {
      console.error('Error updating RSS images:', error);
      toast({
        title: "Error updating RSS images", 
        description: error.message || "Failed to update existing RSS post images",
        variant: "destructive"
      });
    } finally {
      setIsFetching(false);
    }
  };

  const togglePostStatus = async (postId: string, field: 'is_published' | 'is_featured') => {
    try {
      const post = blogPosts.find(p => p.id === postId);
      if (!post) return;

      const updates: any = { [field]: !post[field] };
      if (field === 'is_published' && !post.is_published) {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post updated",
        description: `Post ${field === 'is_published' ? 'publication' : 'featured'} status updated`,
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Error updating post",
        description: "Failed to update post status",
        variant: "destructive"
      });
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: "Post deleted",
        description: "Blog post has been deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        title: "Error deleting post",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-1 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-2">Blog Management</h2>
          <p className="text-lg text-black">Manage blog posts, AI generation, and RSS feeds</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="grid grid-cols-4 w-full min-w-[300px]">
            <TabsTrigger value="posts" className="text-xs sm:text-sm px-2 sm:px-4">Posts</TabsTrigger>
            <TabsTrigger value="rss-posts" className="text-xs sm:text-sm px-2 sm:px-4">RSS</TabsTrigger>
            <TabsTrigger value="create" className="text-xs sm:text-sm px-2 sm:px-4">Create</TabsTrigger>
            <TabsTrigger value="rss" className="text-xs sm:text-sm px-2 sm:px-4">Feeds</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Published Posts ({blogPosts.filter(p => p.is_published && p.source !== 'rss').length})</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Badge variant="secondary" className="text-xs">{blogPosts.filter(p => p.source !== 'rss').length} Total</Badge>
              <Badge variant="secondary" className="text-xs">{blogPosts.filter(p => p.is_featured && p.source !== 'rss').length} Featured</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {blogPosts.filter(post => post.source !== 'rss').map((post) => (
              <Card key={post.id} className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30 pointer-events-auto">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-black text-sm sm:text-base line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="text-black text-xs sm:text-sm">
                        By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                      <Badge variant={post.source === 'ai_generated' ? 'default' : post.source === 'rss' ? 'secondary' : 'outline'} className="text-xs">
                        {post.source === 'ai_generated' && <Sparkles className="h-3 w-3 mr-1" />}
                        {post.source === 'rss' && <Rss className="h-3 w-3 mr-1" />}
                        {post.source.replace('_', ' ')}
                      </Badge>
                      {post.is_featured && <Badge className="bg-yellow-500 text-xs">Featured</Badge>}
                      {post.is_published ? (
                        <Badge className="bg-green-500 text-xs"><Eye className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />Published</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs"><EyeOff className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />Draft</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                 <CardContent className="pt-0">
                   {post.featured_image_url && (
                     <div className="mb-4">
                       <img 
                         src={post.featured_image_url} 
                         alt={post.title}
                         className="w-full h-24 sm:h-32 object-cover rounded-lg border"
                       />
                     </div>
                   )}
                   <p className="text-black mb-4 line-clamp-2 text-sm sm:text-base">{post.excerpt}</p>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {post.tags && post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{post.tags.length - 2}</Badge>
                      )}
                    </div>
                     <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1"
                          style={{ pointerEvents: 'auto' }}>
                        <BlogEditDropdown post={post} onSave={handlePostSave}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </BlogEditDropdown>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePostStatus(post.id, 'is_featured')}
                        className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 flex-shrink-0"
                        title={post.is_featured ? 'Remove from featured' : 'Mark as featured'}
                      >
                        <Star className={`h-3 w-3 sm:h-4 sm:w-4 ${post.is_featured ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePostStatus(post.id, 'is_published')}
                        className={`${post.is_published ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'} flex-shrink-0`}
                        title={post.is_published ? 'Unpublish post' : 'Publish post'}
                      >
                        {post.is_published ? <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Eye className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                        title="Delete post"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </TabsContent>

        <TabsContent value="rss-posts" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">RSS Imported Posts ({blogPosts.filter(p => p.source === 'rss').length})</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={updateExistingRSSImages}
                disabled={isFetching}
                className="bg-gradient-to-r from-primary to-primary-light text-white hover:from-primary/90 hover:to-primary-light/90 text-xs sm:text-sm"
                title="Add missing images to existing RSS posts"
              >
                {isFetching ? (
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin mr-1 sm:mr-2" />
                ) : (
                  <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                )}
                Update Images
              </Button>
              <Badge variant="secondary" className="text-xs">{blogPosts.filter(p => p.source === 'rss' && p.is_published).length} Published</Badge>
              <Badge variant="secondary" className="text-xs">{blogPosts.filter(p => p.source === 'rss' && !p.is_published).length} Drafts</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {blogPosts.filter(p => p.source === 'rss').map((post) => (
              <Card key={post.id} className="border-orange-100 bg-gradient-to-br from-white to-orange-50/30">
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-black text-sm sm:text-base line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="text-black text-xs sm:text-sm">
                        By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Rss className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        RSS
                      </Badge>
                      {post.is_featured && <Badge className="bg-yellow-500 text-xs">Featured</Badge>}
                      {post.is_published ? (
                        <Badge className="bg-green-500 text-xs"><Eye className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />Published</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs"><EyeOff className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />Draft</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                 <CardContent className="pt-0">
                   {post.featured_image_url && (
                     <div className="mb-4">
                       <img 
                         src={post.featured_image_url} 
                         alt={post.title}
                         className="w-full h-24 sm:h-32 object-cover rounded-lg border"
                       />
                     </div>
                   )}
                   <p className="text-black mb-4 line-clamp-3 text-sm sm:text-base">{post.excerpt}</p>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {post.tags && post.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{post.tags.length - 2}</Badge>
                      )}
                    </div>
                     <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1" style={{ pointerEvents: 'auto' }}>
                      <ViewPostDropdown post={post}>
                        <Button
                          variant="outline"
                          size="sm"
                           className="border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                          title="View post content"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </ViewPostDropdown>
                        <RSSPostControls post={post} onSave={handlePostSave}>
                          <Button
                            variant="outline"
                            size="sm"
                             className="border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                            title="Edit post settings"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </RSSPostControls>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePostStatus(post.id, 'is_published')}
                        className={`${post.is_published ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'} flex-shrink-0`}
                        title={post.is_published ? 'Remove from website' : 'Approve and publish to website'}
                      >
                        {post.is_published ? <X className="h-3 w-3 sm:h-4 sm:w-4" /> : <Globe className="h-3 w-3 sm:h-4 sm:w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                        title="Delete post permanently"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {blogPosts.filter(p => p.source === 'rss').length === 0 && (
            <Card className="border-gray-200 bg-gray-50">
              <CardContent className="text-center py-8">
                <Rss className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-black mb-2">No RSS posts yet</h3>
                <p className="text-black mb-4 text-sm sm:text-base">
                  Import posts from RSS feeds to see them here. You can then publish them to your website.
                </p>
                <Button 
                  onClick={() => setActiveTab('rss')}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Rss className="h-4 w-4 mr-2" />
                  Manage RSS Feeds
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="create" className="space-y-4 sm:space-y-6">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent text-lg sm:text-xl">Create Blog Post</CardTitle>
              <CardDescription className="text-black text-sm sm:text-base">
                Create and publish new blog content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-black text-sm sm:text-base">Title</Label>
                  <Input
                    value={newPost.title || ''}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Blog post title"
                    className="border-primary focus:border-primary text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-black text-sm sm:text-base">Author</Label>
                  <Input
                    value={newPost.author || ''}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    placeholder="Author name"
                    className="border-primary focus:border-primary text-sm sm:text-base"
                  />
                </div>
              </div>

                <ImageUpload
                  currentImageUrl={newPost.featured_image_url || ''}
                  onImageUploaded={(url) => setNewPost({...newPost, featured_image_url: url})}
                  onImageRemoved={() => setNewPost({...newPost, featured_image_url: ''})}
                />

                <div>
                  <Label className="text-black text-sm sm:text-base">Excerpt</Label>
                  <Textarea
                    value={newPost.excerpt || ''}
                    onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                    placeholder="Brief excerpt or summary"
                    rows={2}
                    className="border-primary focus:border-primary text-sm sm:text-base"
                  />
                </div>

              <div>
                <Label className="text-black text-sm sm:text-base">Content</Label>
                <Textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Blog post content..."
                  rows={8}
                  className="border-primary focus:border-primary text-sm sm:text-base"
                />
              </div>

              <div>
                <Label className="text-black text-sm sm:text-base">Tags</Label>
                <Input
                  placeholder="healthcare, AI, innovation"
                  value={newPost.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tagsString = e.target.value;
                    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                    setNewPost({...newPost, tags: tagsArray});
                  }}
                  className="border-primary focus:border-primary text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-black text-sm sm:text-base">Category</Label>
                  <Select 
                    value={newPost.category || 'healthcare'} 
                    onValueChange={(value) => setNewPost({...newPost, category: value})}
                  >
                    <SelectTrigger className="border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="ai">AI & Technology</SelectItem>
                      <SelectItem value="innovation">Innovation</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={newPost.is_published || false}
                    onCheckedChange={(checked) => setNewPost({...newPost, is_published: checked})}
                  />
                  <Label htmlFor="published" className="text-black text-sm sm:text-base">Publish immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={newPost.is_featured || false}
                    onCheckedChange={(checked) => setNewPost({...newPost, is_featured: checked})}
                  />
                  <Label htmlFor="featured" className="text-black text-sm sm:text-base">Featured post</Label>
                </div>
              </div>

              <Button 
                onClick={savePost} 
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Blog Post
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rss" className="space-y-4 sm:space-y-6">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent text-lg sm:text-xl">Add RSS Feed</CardTitle>
              <CardDescription className="text-black text-sm sm:text-base">
                Add healthcare and tech RSS feeds to automatically import content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-black text-sm sm:text-base">Feed Name</Label>
                  <Input
                    value={newFeed.name || ''}
                    onChange={(e) => setNewFeed({...newFeed, name: e.target.value})}
                    placeholder="Healthcare News RSS"
                    className="border-primary focus:border-primary text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label className="text-black text-sm sm:text-base">RSS URL</Label>
                  <Input
                    value={newFeed.url || ''}
                    onChange={(e) => setNewFeed({...newFeed, url: e.target.value})}
                    placeholder="https://example.com/rss"
                    className="border-primary focus:border-primary text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <Label className="text-black text-sm sm:text-base">Description</Label>
                <Textarea
                  value={newFeed.description || ''}
                  onChange={(e) => setNewFeed({...newFeed, description: e.target.value})}
                  placeholder="Description of the RSS feed"
                  rows={2}
                  className="border-primary focus:border-primary text-sm sm:text-base"
                />
              </div>

              <Button 
                onClick={saveFeed} 
                className="bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add RSS Feed
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">RSS Feeds ({rssFeeds.length})</h3>
            {rssFeeds.map((feed) => (
              <Card key={feed.id} className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
                <CardContent className="pt-6">
                  {editingFeed === feed.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-black text-sm sm:text-base">Feed Name</Label>
                          <Input
                            value={editFeedData.name || feed.name}
                            onChange={(e) => setEditFeedData({...editFeedData, name: e.target.value})}
                            placeholder="Healthcare News RSS"
                            className="border-primary focus:border-primary text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <Label className="text-black text-sm sm:text-base">RSS URL</Label>
                          <Input
                            value={editFeedData.url || feed.url}
                            onChange={(e) => setEditFeedData({...editFeedData, url: e.target.value})}
                            placeholder="https://example.com/rss"
                            className="border-primary focus:border-primary text-sm sm:text-base"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-black text-sm sm:text-base">Description</Label>
                        <Textarea
                          value={editFeedData.description !== undefined ? editFeedData.description : (feed.description || '')}
                          onChange={(e) => setEditFeedData({...editFeedData, description: e.target.value})}
                          placeholder="Description of the RSS feed"
                          rows={2}
                          className="border-primary focus:border-primary text-sm sm:text-base"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <Button
                          onClick={() => saveEditedFeed(feed.id, editFeedData)}
                          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90 w-full sm:w-auto"
                        >
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingFeed(null);
                            setEditFeedData({});
                          }}
                          className="border-black text-black hover:bg-gray-50 w-full sm:w-auto"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-medium text-black line-clamp-1">{feed.name}</h4>
                        <p className="text-xs sm:text-sm text-black break-all line-clamp-1">{feed.url}</p>
                        {feed.description && (
                          <p className="text-xs sm:text-sm text-black mt-1 line-clamp-2">{feed.description}</p>
                        )}
                        {feed.last_fetched_at && (
                          <p className="text-xs text-black mt-2">
                            Last fetched: {new Date(feed.last_fetched_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFeedStatus(feed.id, !feed.is_active)}
                          className={`${feed.is_active ? 'border-primary text-primary hover:bg-primary/10' : 'border-primary text-primary hover:bg-primary/10'} flex-shrink-0`}
                          title={feed.is_active ? 'Deactivate feed' : 'Activate feed'}
                        >
                          {feed.is_active ? <WifiOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Wifi className="h-3 w-3 sm:h-4 sm:w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingFeed(feed.id);
                            setEditFeedData({
                              name: feed.name,
                              url: feed.url,
                              description: feed.description
                            });
                          }}
                          className="border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                          title="Edit feed"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fetchRSSPosts(feed.id)}
                          disabled={fetchingFeeds.has(feed.id)}
                          className="border-primary text-primary hover:bg-primary/10 flex-shrink-0"
                          title="Fetch new posts"
                        >
                          {fetchingFeeds.has(feed.id) ? (
                            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                          ) : (
                            <Rss className="h-3 w-3 sm:h-4 sm:w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteFeed(feed.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50 flex-shrink-0"
                          title="Delete feed"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Post Modal - Replace old modal with new component */}
    </div>
  );
};

export default BlogManager;
