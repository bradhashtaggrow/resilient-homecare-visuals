import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save, Edit } from 'lucide-react';
import ImageUpload from './ImageUpload';

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
  is_published: boolean;
  is_featured: boolean;
}

interface InlineEditFormProps {
  post: BlogPost;
  onSave: (postId: string, updates: Partial<BlogPost>) => void;
}

const InlineEditForm: React.FC<InlineEditFormProps> = ({ post, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<Partial<BlogPost>>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditedPost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      tags: post.tags,
      featured_image_url: post.featured_image_url,
      is_published: post.is_published,
      is_featured: post.is_featured
    });
  };

  const handleSave = () => {
    onSave(post.id, editedPost);
    setIsEditing(false);
    setEditedPost({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost({});
  };

  if (!isEditing) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleEdit}
        className="border-blue-200 text-blue-600 hover:bg-blue-50"
      >
        <Edit className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center p-2 sm:p-4 overflow-y-auto">
      <Card className="border-orange-200 bg-white shadow-2xl w-full max-w-4xl mx-2 sm:mx-4 my-4 sm:my-8">
        <CardHeader className="pb-2 sm:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-orange-900 text-lg sm:text-xl">Edit Blog Post</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label className="text-orange-700 text-sm">Title</Label>
              <Input
                value={editedPost.title || ''}
                onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                placeholder="Blog post title"
                className="border-orange-200 focus:border-orange-400 text-sm"
              />
            </div>
            <div>
              <Label className="text-orange-700 text-sm">Author</Label>
              <Input
                value={editedPost.author || ''}
                onChange={(e) => setEditedPost({...editedPost, author: e.target.value})}
                placeholder="Author name"
                className="border-orange-200 focus:border-orange-400 text-sm"
              />
            </div>
          </div>

          <div className="block sm:hidden">
            <ImageUpload
              currentImageUrl={editedPost.featured_image_url || ''}
              onImageUploaded={(url) => setEditedPost({...editedPost, featured_image_url: url})}
              onImageRemoved={() => setEditedPost({...editedPost, featured_image_url: ''})}
            />
          </div>

          <div className="hidden sm:block">
            <ImageUpload
              currentImageUrl={editedPost.featured_image_url || ''}
              onImageUploaded={(url) => setEditedPost({...editedPost, featured_image_url: url})}
              onImageRemoved={() => setEditedPost({...editedPost, featured_image_url: ''})}
            />
          </div>

          <div>
            <Label className="text-orange-700 text-sm">Excerpt</Label>
            <Textarea
              value={editedPost.excerpt || ''}
              onChange={(e) => setEditedPost({...editedPost, excerpt: e.target.value})}
              placeholder="Brief excerpt or summary"
              rows={2}
              className="border-orange-200 focus:border-orange-400 text-sm resize-none"
            />
          </div>

          <div>
            <Label className="text-orange-700 text-sm">Content</Label>
            <Textarea
              value={editedPost.content || ''}
              onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
              placeholder="Blog post content..."
              rows={6}
              className="border-orange-200 focus:border-orange-400 text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label className="text-orange-700 text-sm">Category</Label>
              <Select 
                value={editedPost.category || 'healthcare'} 
                onValueChange={(value) => setEditedPost({...editedPost, category: value})}
              >
                <SelectTrigger className="border-orange-200 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="ai">AI & Technology</SelectItem>
                  <SelectItem value="telemedicine">Telemedicine</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="insights">Insights</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-orange-700 text-sm">Slug</Label>
              <Input
                value={editedPost.slug || ''}
                onChange={(e) => setEditedPost({...editedPost, slug: e.target.value})}
                placeholder="url-friendly-slug"
                className="border-orange-200 focus:border-orange-400 text-sm"
              />
            </div>
            <div>
              <Label className="text-orange-700 text-sm">Tags</Label>
              <Input
                value={editedPost.tags?.join(', ') || ''}
                onChange={(e) => setEditedPost({...editedPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                placeholder="tag1, tag2, tag3"
                className="border-orange-200 focus:border-orange-400 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`published-${post.id}`}
                checked={editedPost.is_published || false}
                onCheckedChange={(checked) => setEditedPost({...editedPost, is_published: checked as boolean})}
              />
              <Label htmlFor={`published-${post.id}`} className="text-orange-700 text-sm">Published</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`featured-${post.id}`}
                checked={editedPost.is_featured || false}
                onCheckedChange={(checked) => setEditedPost({...editedPost, is_featured: checked as boolean})}
              />
              <Label htmlFor={`featured-${post.id}`} className="text-orange-700 text-sm">Featured</Label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button 
              onClick={handleSave}
              className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InlineEditForm;