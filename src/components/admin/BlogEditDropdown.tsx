import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save } from 'lucide-react';
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

interface BlogEditDropdownProps {
  children: React.ReactNode;
  post: BlogPost;
  onSave: (postId: string, updates: Partial<BlogPost>) => void;
}

const BlogEditDropdown: React.FC<BlogEditDropdownProps> = ({ children, post, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<Partial<BlogPost>>({});
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Position dropdown to the right of the button, or center if not enough space
      const windowWidth = window.innerWidth;
      const dropdownWidth = 800; // Expected dropdown width
      
      let left = rect.right + scrollLeft + 10; // 10px gap from button
      
      // If dropdown would go off screen, position it to the left of the button
      if (left + dropdownWidth > windowWidth) {
        left = rect.left + scrollLeft - dropdownWidth - 10;
      }
      
      // If still off screen, center it
      if (left < 0) {
        left = (windowWidth - dropdownWidth) / 2;
      }
      
      setPosition({
        top: rect.top + scrollTop,
        left: left
      });
    }
    
    setIsOpen(true);
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

  const handleClose = () => {
    setIsOpen(false);
    setEditedPost({});
  };

  const handleSave = () => {
    onSave(post.id, editedPost);
    setIsOpen(false);
    setEditedPost({});
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div ref={triggerRef} onClick={handleOpen}>
        {children}
      </div>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleBackdropClick}
          />
          
          {/* Dropdown positioned relative to trigger */}
          <div 
            className="fixed z-50"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              maxHeight: '80vh',
              width: '800px',
              maxWidth: 'calc(100vw - 20px)'
            }}
          >
            <Card className="border-orange-200 bg-white shadow-2xl overflow-auto max-h-[80vh]">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center z-10 transition-all duration-200"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>
            
            <CardHeader className="pb-2 sm:pb-3 pr-12">
              <CardTitle className="text-orange-900 text-lg sm:text-xl">Edit Blog Post</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
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

              <ImageUpload
                currentImageUrl={editedPost.featured_image_url || ''}
                onImageUploaded={(url) => setEditedPost({...editedPost, featured_image_url: url})}
                onImageRemoved={() => setEditedPost({...editedPost, featured_image_url: ''})}
              />

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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
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
                  onClick={handleClose}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default BlogEditDropdown;