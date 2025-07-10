import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  WifiOff
} from 'lucide-react';

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
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [editingFeed, setEditingFeed] = useState<string | null>(null);
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
      setIsFetching(true);
      
      const response = await fetch('https://iwgtwzpygoyohocbgqgm.supabase.co/functions/v1/fetch-rss-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3Z3R3enB5Z295b2hvY2JncWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NTM4OTksImV4cCI6MjA2NzEyOTg5OX0.qAe2WDhB0K3r71mKwAFBXL9_gc2sPn8XwgM6mAS9iyI`
        },
        body: JSON.stringify({ feedId })
      });

      if (!response.ok) throw new Error('Failed to fetch RSS posts');
      
      const { count } = await response.json();
      
      toast({
        title: "RSS posts fetched",
        description: `${count} new posts imported from RSS feed`,
      });
    } catch (error) {
      console.error('Error fetching RSS posts:', error);
      toast({
        title: "Error fetching RSS posts",
        description: "Failed to fetch posts from RSS feed",
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Blog Management
          </h2>
          <p className="text-blue-600">Manage blog posts, AI generation, and RSS feeds</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200">
            <Wifi className="h-4 w-4 mr-2" />
            Real-time sync active
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="rss">RSS Feeds</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Published Posts ({blogPosts.filter(p => p.is_published).length})</h3>
            <div className="flex gap-2">
              <Badge variant="secondary">{blogPosts.length} Total</Badge>
              <Badge variant="secondary">{blogPosts.filter(p => p.is_featured).length} Featured</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-blue-900">{post.title}</CardTitle>
                      <CardDescription className="text-blue-600">
                        By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.source === 'ai_generated' ? 'default' : post.source === 'rss' ? 'secondary' : 'outline'}>
                        {post.source === 'ai_generated' && <Sparkles className="h-3 w-3 mr-1" />}
                        {post.source === 'rss' && <Rss className="h-3 w-3 mr-1" />}
                        {post.source.replace('_', ' ')}
                      </Badge>
                      {post.is_featured && <Badge className="bg-yellow-500">Featured</Badge>}
                      {post.is_published ? (
                        <Badge className="bg-green-500"><Eye className="h-3 w-3 mr-1" />Published</Badge>
                      ) : (
                        <Badge variant="outline"><EyeOff className="h-3 w-3 mr-1" />Draft</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.tags && post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePostStatus(post.id, 'is_featured')}
                        className="border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                      >
                        {post.is_featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePostStatus(post.id, 'is_published')}
                        className={post.is_published ? 'border-red-200 text-red-600 hover:bg-red-50' : 'border-green-200 text-green-600 hover:bg-green-50'}
                      >
                        {post.is_published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <CardTitle className="text-blue-900">Create Blog Post</CardTitle>
              <CardDescription className="text-blue-600">
                Create and publish new blog content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-700">Title</Label>
                  <Input
                    value={newPost.title || ''}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    placeholder="Blog post title"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Label className="text-blue-700">Author</Label>
                  <Input
                    value={newPost.author || ''}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    placeholder="Author name"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-blue-700">Excerpt</Label>
                <Textarea
                  value={newPost.excerpt || ''}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  placeholder="Brief excerpt or summary"
                  rows={2}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div>
                <Label className="text-blue-700">Content</Label>
                <Textarea
                  value={newPost.content || ''}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Blog post content..."
                  rows={10}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-blue-700">Category</Label>
                  <Select 
                    value={newPost.category || 'healthcare'} 
                    onValueChange={(value) => setNewPost({...newPost, category: value})}
                  >
                    <SelectTrigger className="border-blue-200">
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
                  <Label htmlFor="published" className="text-blue-700">Publish immediately</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={newPost.is_featured || false}
                    onCheckedChange={(checked) => setNewPost({...newPost, is_featured: checked})}
                  />
                  <Label htmlFor="featured" className="text-blue-700">Featured post</Label>
                </div>
              </div>

              <Button 
                onClick={savePost} 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Blog Post
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rss" className="space-y-6">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <CardTitle className="text-blue-900">Add RSS Feed</CardTitle>
              <CardDescription className="text-blue-600">
                Add healthcare and tech RSS feeds to automatically import content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-blue-700">Feed Name</Label>
                  <Input
                    value={newFeed.name || ''}
                    onChange={(e) => setNewFeed({...newFeed, name: e.target.value})}
                    placeholder="Healthcare News RSS"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Label className="text-blue-700">RSS URL</Label>
                  <Input
                    value={newFeed.url || ''}
                    onChange={(e) => setNewFeed({...newFeed, url: e.target.value})}
                    placeholder="https://example.com/rss"
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-blue-700">Description</Label>
                <Textarea
                  value={newFeed.description || ''}
                  onChange={(e) => setNewFeed({...newFeed, description: e.target.value})}
                  placeholder="Description of the RSS feed"
                  rows={2}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>

              <Button 
                onClick={saveFeed} 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add RSS Feed
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">RSS Feeds ({rssFeeds.length})</h3>
            {rssFeeds.map((feed) => (
              <Card key={feed.id} className="border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-medium text-blue-900">{feed.name}</h4>
                      <p className="text-sm text-blue-600">{feed.url}</p>
                      {feed.description && (
                        <p className="text-sm text-gray-600 mt-1">{feed.description}</p>
                      )}
                      {feed.last_fetched_at && (
                        <p className="text-xs text-gray-500 mt-2">
                          Last fetched: {new Date(feed.last_fetched_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={feed.is_active ? 'default' : 'secondary'}>
                        {feed.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchRSSPosts(feed.id)}
                        disabled={isFetching}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        {isFetching ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Rss className="h-4 w-4" />
                        )}
                        Fetch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogManager;