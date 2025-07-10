import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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

interface ViewPostDropdownProps {
  post: BlogPost;
  children: React.ReactNode;
}

const ViewPostDropdown: React.FC<ViewPostDropdownProps> = ({ post, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Perfect center positioning for view modal
    const modalWidth = 800;
    const modalHeight = 600;
    
    const left = (viewport.width - modalWidth) / 2;
    const top = (viewport.height - modalHeight) / 2;

    setDropdownStyle({
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      width: `${modalWidth}px`,
      height: `${modalHeight}px`,
      zIndex: 9999,
    });
  };

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle}>
        {children}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 9998 }}
            onClick={handleClose}
          />

          {/* View Modal */}
          <div
            className="bg-white rounded-lg shadow-lg border overflow-hidden"
            style={dropdownStyle}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-900">View Post</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-600">
                    By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>

                {/* Featured Image */}
                {post.featured_image_url && (
                  <div className="mb-4">
                    <img 
                      src={post.featured_image_url} 
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {/* Excerpt */}
                {post.excerpt && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-700 mb-2">Excerpt</h5>
                    <p className="text-gray-600 italic">{post.excerpt}</p>
                  </div>
                )}

                {/* Content */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Content</h5>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {post.content}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2 text-gray-600">{post.category || 'None'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Source:</span>
                      <span className="ml-2 text-gray-600 capitalize">{post.source.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className="ml-2 text-gray-600">
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Featured:</span>
                      <span className="ml-2 text-gray-600">
                        {post.is_featured ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3">
                      <span className="font-medium text-gray-700">Tags:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ViewPostDropdown;