
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, Image, Video, File, Trash2, Copy, ExternalLink } from 'lucide-react';

interface MediaFile {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size?: number;
  url: string;
  alt_text?: string;
  created_at: string;
}

const MediaLibrary = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMediaFiles();
  }, []);

  const loadMediaFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMediaFiles(data);
    } catch (error) {
      console.error('Error loading media files:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Save file info to database
      const { data: dbData, error: dbError } = await supabase
        .from('media_library')
        .insert([{
          filename: fileName,
          original_name: selectedFile.name,
          file_type: selectedFile.type,
          file_size: selectedFile.size,
          url: publicUrl,
          alt_text: ''
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      if (dbData) {
        setMediaFiles([dbData, ...mediaFiles]);
      }

      toast({
        title: "File uploaded successfully",
        description: "Your file is now available in the media library",
      });

      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: string, filename: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filename]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      setMediaFiles(mediaFiles.filter(file => file.id !== fileId));

      toast({
        title: "File deleted",
        description: "File has been removed from media library",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete file",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "File URL has been copied to clipboard",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-5 w-5" />;
    if (fileType.startsWith('video/')) return <Video className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const isImage = (fileType: string) => fileType.startsWith('image/');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          {mediaFiles.length} files
        </Badge>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Media
          </CardTitle>
          <CardDescription>Upload images, videos, and other media files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Select File</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileSelect}
              accept="image/*,video/*,.pdf,.doc,.docx"
            />
          </div>
          
          {selectedFile && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getFileIcon(selectedFile.type)}
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaFiles.map((file) => (
          <Card key={file.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {isImage(file.file_type) ? (
                <img
                  src={file.url}
                  alt={file.alt_text || file.original_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getFileIcon(file.file_type)}
                </div>
              )}
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h4 className="font-medium truncate">{file.original_name}</h4>
                <p className="text-sm text-gray-600">{formatFileSize(file.file_size)}</p>
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {file.file_type.split('/')[0]}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {new Date(file.created_at).toLocaleDateString()}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(file.url)}
                  className="flex-1"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy URL
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(file.id, file.filename)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>

              <div className="pt-2 border-t">
                <Label htmlFor={`alt-${file.id}`} className="text-xs">Alt Text:</Label>
                <Input
                  id={`alt-${file.id}`}
                  value={file.alt_text || ''}
                  placeholder="Add alt text..."
                  className="text-xs h-8 mt-1"
                  onChange={(e) => {
                    // Update alt text in database
                    supabase
                      .from('media_library')
                      .update({ alt_text: e.target.value })
                      .eq('id', file.id)
                      .then(() => {
                        setMediaFiles(mediaFiles.map(f => 
                          f.id === file.id ? { ...f, alt_text: e.target.value } : f
                        ));
                      });
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mediaFiles.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No media files</h3>
            <p className="text-gray-600">Upload your first media file to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaLibrary;
