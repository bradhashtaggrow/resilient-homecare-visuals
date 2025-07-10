import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Save, Eye, Star } from 'lucide-react';
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
  editedPost: Partial<BlogPost>;
  setEditedPost: (post: Partial<BlogPost>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  editedPost,
  setEditedPost,
  onSave,
  onCancel
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      style={{ paddingTop: '120px' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center z-10 transition-all duration-200"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-3xl">
          <h2 className="text-xl font-bold">Edit Blog Post</h2>
          <p className="text-orange-100">Make changes to your blog post content</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Preview */}
          {editedPost.featured_image_url && (
            <div className="bg-gray-50 p-4 rounded-lg border">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current Featured Image</label>
              <img 
                src={editedPost.featured_image_url} 
                alt={editedPost.title || 'Featured image'}
                className="w-full max-w-md h-48 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}

          {/* Image Upload */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <label className="text-sm font-medium text-blue-700 mb-2 block">Featured Image</label>
            <ImageUpload
              currentImageUrl={editedPost.featured_image_url || ''}
              onImageUploaded={(url) => setEditedPost({...editedPost, featured_image_url: url})}
              onImageRemoved={() => setEditedPost({...editedPost, featured_image_url: ''})}
            />
          </div>

          {/* Basic Info */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Title *</label>
                <Input
                  value={editedPost.title || ''}
                  onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
                  placeholder="Enter blog post title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Author</label>
                <Input
                  value={editedPost.author || ''}
                  onChange={(e) => setEditedPost({...editedPost, author: e.target.value})}
                  placeholder="Author name"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Content</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Excerpt</label>
                <Textarea
                  value={editedPost.excerpt || ''}
                  onChange={(e) => setEditedPost({...editedPost, excerpt: e.target.value})}
                  placeholder="Brief description"
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Content *</label>
                <Textarea
                  value={editedPost.content || ''}
                  onChange={(e) => setEditedPost({...editedPost, content: e.target.value})}
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="mt-1 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select 
                  value={editedPost.category || 'healthcare'}
                  onChange={(e) => setEditedPost({...editedPost, category: e.target.value})}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="healthcare">Healthcare</option>
                  <option value="ai">AI & Technology</option>
                  <option value="telemedicine">Telemedicine</option>
                  <option value="news">News</option>
                  <option value="insights">Insights</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">URL Slug</label>
                <Input
                  value={editedPost.slug || ''}
                  onChange={(e) => setEditedPost({...editedPost, slug: e.target.value})}
                  placeholder="url-friendly-slug"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Tags</label>
                <Input
                  value={editedPost.tags?.join(', ') || ''}
                  onChange={(e) => setEditedPost({...editedPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                  placeholder="tag1, tag2, tag3"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 p-4 bg-white rounded-lg border">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={editedPost.is_published || false}
                  onCheckedChange={(checked) => setEditedPost({...editedPost, is_published: checked as boolean})}
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700 flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-green-600" />
                  Published
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={editedPost.is_featured || false}
                  onCheckedChange={(checked) => setEditedPost({...editedPost, is_featured: checked as boolean})}
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  Featured
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;