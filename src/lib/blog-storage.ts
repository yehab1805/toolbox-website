import fs from 'fs';
import path from 'path';
import { BlogPost, BlogPostPreview } from '@/types/blog';

const dataDirectory = path.join(process.cwd(), 'data');
const blogsFilePath = path.join(dataDirectory, 'blogs.json');

// Ensure data directory exists
function ensureDataDirectory() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }
}

// Read all blog posts from JSON file
export function getAllBlogPosts(): BlogPost[] {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(blogsFilePath)) {
      return [];
    }
    
    const data = fs.readFileSync(blogsFilePath, 'utf8');
    const posts = JSON.parse(data);
    return posts.filter((post: BlogPost) => post.published !== false);
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

// Get all blog posts for preview (without full content)
export function getAllBlogPostPreviews(): BlogPostPreview[] {
  const posts = getAllBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    author: post.author,
    tags: post.tags,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    readingTime: post.readingTime
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Save blog post to JSON file
export function saveBlogPost(post: BlogPost): boolean {
  try {
    ensureDataDirectory();
    
    const posts = getAllBlogPosts();
    const existingIndex = posts.findIndex(p => p.slug === post.slug);
    
    if (existingIndex >= 0) {
      // Update existing post
      posts[existingIndex] = post;
    } else {
      // Add new post
      posts.push(post);
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    fs.writeFileSync(blogsFilePath, JSON.stringify(posts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
}

// Delete blog post
export function deleteBlogPost(slug: string): boolean {
  try {
    const posts = getAllBlogPosts();
    const filteredPosts = posts.filter(post => post.slug !== slug);
    
    fs.writeFileSync(blogsFilePath, JSON.stringify(filteredPosts, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Get all unique tags
export function getAllBlogTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Get posts by tag
export function getBlogPostsByTag(tag: string): BlogPostPreview[] {
  const posts = getAllBlogPostPreviews();
  return posts.filter(post => post.tags.includes(tag));
}
