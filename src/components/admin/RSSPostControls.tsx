import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Save } from 'lucide-react';

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
  source: string;
}

interface RSSPostControlsProps {
  children: React.ReactNode;
  post: BlogPost;
  onSave: (postId: string, updates: Partial<BlogPost>) => void;
}

const RSSPostControls: React.FC<RSSPostControlsProps> = ({ children, post, onSave }) => {
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
      const dropdownWidth = 600; // Smaller width for RSS controls
      
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
      category: post.category,
      tags: post.tags,
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
              width: '600px',
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
            
            <CardHeader className="pb-3 pr-12">
              <CardTitle className="text-orange-900 text-lg sm:text-xl">RSS Post Settings</CardTitle>
              <p className="text-sm text-gray-600">Manage publication and categorization for imported RSS content</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Read-only content preview */}
              <div className="bg-gray-50 p-3 rounded border">
                <h4 className="font-medium text-gray-900 mb-2">Content Preview (Read-only)</h4>
                <p className="text-sm font-medium text-gray-800">{post.title}</p>
                <p className="text-xs text-gray-600 mt-1">By {post.author}</p>
                {post.excerpt && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">{post.excerpt}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-orange-700 text-sm">Category</Label>
                  <Select 
                    value={editedPost.category || post.category || 'healthcare'} 
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
                  <Label className="text-orange-700 text-sm">Tags</Label>
                  <Input
                    value={editedPost.tags?.join(', ') || post.tags?.join(', ') || ''}
                    onChange={(e) => setEditedPost({...editedPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                    placeholder="tag1, tag2, tag3"
                    className="border-orange-200 focus:border-orange-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`rss-published-${post.id}`}
                    checked={editedPost.is_published !== undefined ? editedPost.is_published : post.is_published}
                    onCheckedChange={(checked) => setEditedPost({...editedPost, is_published: checked as boolean})}
                  />
                  <Label htmlFor={`rss-published-${post.id}`} className="text-orange-700 text-sm">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`rss-featured-${post.id}`}
                    checked={editedPost.is_featured !== undefined ? editedPost.is_featured : post.is_featured}
                    onCheckedChange={(checked) => setEditedPost({...editedPost, is_featured: checked as boolean})}
                  />
                  <Label htmlFor={`rss-featured-${post.id}`} className="text-orange-700 text-sm">Featured</Label>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Note:</strong> This is RSS imported content. Title and content are preserved from the original source and cannot be edited to maintain feed integrity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                <Button 
                  onClick={handleSave}
                  className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
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

export default RSSPostControls;