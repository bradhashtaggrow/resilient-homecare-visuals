import React, { useRef, useEffect } from 'react';
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

interface EditPostModalProps {
  post: BlogPost;
  editedPost: Partial<BlogPost>;
  setEditedPost: (post: Partial<BlogPost>) => void;
  onSave: () => void;
  onCancel: () => void;
  triggerRef: HTMLButtonElement | null;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  post,
  editedPost,
  setEditedPost,
  onSave,
  onCancel,
  triggerRef
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef && modalRef.current) {
      const triggerRect = triggerRef.getBoundingClientRect();
      const modal = modalRef.current;
      
      // Position the modal near the trigger button
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      // Center horizontally on screen, position vertically near the trigger
      modal.style.position = 'fixed';
      modal.style.left = '50%';
      modal.style.transform = 'translateX(-50%)';
      modal.style.top = `${Math.min(triggerRect.bottom + 10, window.innerHeight - 600)}px`;
      modal.style.zIndex = '1000';
    }
  }, [triggerRef]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div ref={modalRef} className="fixed z-50">
        <Card className="border-orange-200 bg-white shadow-2xl w-[800px] max-h-[80vh] overflow-auto">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-orange-900">Edit Blog Post</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-orange-700">Title</Label>
                <Input
                  value={editedPost.title || ''}
                  onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                  placeholder="Blog post title"
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
              <div>
                <Label className="text-orange-700">Author</Label>
                <Input
                  value={editedPost.author || ''}
                  onChange={(e) => setEditedPost({...editedPost, author: e.target.value})}
                  placeholder="Author name"
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            <ImageUpload
              currentImageUrl={editedPost.featured_image_url || ''}
              onImageUploaded={(url) => setEditedPost({...editedPost, featured_image_url: url})}
              onImageRemoved={() => setEditedPost({...editedPost, featured_image_url: ''})}
            />

            <div>
              <Label className="text-orange-700">Excerpt</Label>
              <Textarea
                value={editedPost.excerpt || ''}
                onChange={(e) => setEditedPost({...editedPost, excerpt: e.target.value})}
                placeholder="Brief excerpt or summary"
                rows={2}
                className="border-orange-200 focus:border-orange-400"
              />
            </div>

            <div>
              <Label className="text-orange-700">Content</Label>
              <Textarea
                value={editedPost.content || ''}
                onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
                placeholder="Blog post content..."
                rows={8}
                className="border-orange-200 focus:border-orange-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-orange-700">Category</Label>
                <Select 
                  value={editedPost.category || 'healthcare'} 
                  onValueChange={(value) => setEditedPost({...editedPost, category: value})}
                >
                  <SelectTrigger className="border-orange-200">
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
                <Label className="text-orange-700">Slug</Label>
                <Input
                  value={editedPost.slug || ''}
                  onChange={(e) => setEditedPost({...editedPost, slug: e.target.value})}
                  placeholder="url-friendly-slug"
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
              <div>
                <Label className="text-orange-700">Tags</Label>
                <Input
                  value={editedPost.tags?.join(', ') || ''}
                  onChange={(e) => setEditedPost({...editedPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                  placeholder="tag1, tag2, tag3"
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={editedPost.is_published || false}
                  onCheckedChange={(checked) => setEditedPost({...editedPost, is_published: checked as boolean})}
                />
                <Label htmlFor="published" className="text-orange-700">Published</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={editedPost.is_featured || false}
                  onCheckedChange={(checked) => setEditedPost({...editedPost, is_featured: checked as boolean})}
                />
                <Label htmlFor="featured" className="text-orange-700">Featured</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                onClick={onSave}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditPostModal;