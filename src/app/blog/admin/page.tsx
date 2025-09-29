'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Save, Plus, X, Edit, Trash2, Eye } from 'lucide-react';
import { BlogPost } from '@/types/blog';

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: 'ToolBox Team',
    excerpt: '',
    content: '',
    tags: [] as string[],
    coverImage: '',
    published: true
  });
  const [newTag, setNewTag] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Load posts from API
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blog');
      if (response.ok) {
        const posts = await response.json();
        setPosts(posts);
        console.log('Loaded posts:', posts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const slug = editingPost?.slug || generateSlug(formData.title);
    const post: BlogPost = {
      slug,
      title: formData.title,
      date: editingPost?.date || new Date().toISOString(),
      author: formData.author,
      tags: formData.tags,
      excerpt: formData.excerpt,
      coverImage: formData.coverImage,
      content: formData.content,
      readingTime: calculateReadingTime(formData.content),
      published: formData.published
    };

    try {
      setLoading(true);
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        alert('Post saved successfully!');
        await loadPosts(); // Reload posts
        resetForm();
      } else {
        const error = await response.json();
        alert('Error saving post: ' + error.error);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      coverImage: post.coverImage || '',
      published: post.published
    });
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        setLoading(true);
        const response = await fetch(`/api/blog?slug=${slug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Post deleted successfully!');
          await loadPosts(); // Reload posts
        } else {
          const error = await response.json();
          alert('Error deleting post: ' + error.error);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: 'ToolBox Team',
      excerpt: '',
      content: '',
      tags: [],
      coverImage: '',
      published: true
    });
    setEditingPost(null);
    setIsPreviewMode(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog Admin</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="h-5 w-5" />
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreviewMode(!isPreviewMode)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isPreviewMode ? 'Edit' : 'Preview'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetForm}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Post
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isPreviewMode ? (
                  <>
                    {/* Title */}
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter post title..."
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <Label htmlFor="author">Author *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="Author name..."
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Brief description of the post..."
                        rows={3}
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <Label>Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        />
                        <Button onClick={handleAddTag} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => handleRemoveTag(tag)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                      <Label htmlFor="coverImage">Cover Image URL</Label>
                      <Input
                        id="coverImage"
                        value={formData.coverImage}
                        onChange={(e) => handleInputChange('coverImage', e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange('published', checked)}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>

                    {/* Content */}
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        placeholder="Write your post content..."
                        rows={10}
                        className="font-mono text-sm"
                      />
                    </div>

                    {/* Save Button */}
                    <Button 
                      onClick={handleSave} 
                      className="w-full" 
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Create Post')}
                    </Button>
                  </>
                ) : (
                  /* Preview Mode */
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">{formData.title || 'Untitled'}</h2>
                    <p className="text-muted-foreground">{formData.excerpt || 'No excerpt provided'}</p>
                    {formData.coverImage && (
                      <img 
                        src={formData.coverImage} 
                        alt="Cover" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap">{formData.content || 'No content yet...'}</pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Existing Posts</CardTitle>
                <CardDescription>
                  Manage your published and draft posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : posts.length > 0 ? (
                  <div className="space-y-3">
                    {posts.map((post) => (
                      <div key={post.slug} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {post.published ? 'Published' : 'Draft'} • {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(post.slug)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No posts yet. Create your first post!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
