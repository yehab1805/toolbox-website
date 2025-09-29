import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostPreview, BlogPostFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Calculate reading time (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter(name => name.endsWith('.md') || name.endsWith('.mdx'))
      .map(name => name.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading blog posts directory:', error);
    return [];
  }
}

// Get blog post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = data as BlogPostFrontmatter;
    
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      author: frontmatter.author,
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt,
      coverImage: frontmatter.coverImage,
      content,
      readingTime: calculateReadingTime(content),
      published: frontmatter.published !== false
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts (published only)
export function getAllPosts(): BlogPostPreview[] {
  try {
    const slugs = getAllPostSlugs();
    const posts = slugs
      .map(slug => getPostBySlug(slug))
      .filter((post): post is BlogPost => post !== null && post.published)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        tags: post.tags,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        readingTime: post.readingTime || calculateReadingTime(post.content)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    return [];
  }
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPostPreview[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

// Get all unique tags
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

// Save blog post (for admin interface)
export function saveBlogPost(post: BlogPost): boolean {
  try {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }
    
    // Escape special characters in frontmatter
    const escapeYaml = (str: string) => {
      return str.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    };
    
    const frontmatter = `---
title: "${escapeYaml(post.title)}"
date: "${post.date}"
author: "${escapeYaml(post.author)}"
tags: [${post.tags.map(tag => `"${escapeYaml(tag)}"`).join(', ')}]
excerpt: "${escapeYaml(post.excerpt)}"
${post.coverImage ? `coverImage: "${escapeYaml(post.coverImage)}"` : ''}
published: ${post.published}
---

${post.content}`;

    const filePath = path.join(postsDirectory, `${post.slug}.md`);
    console.log('Saving to file:', filePath);
    fs.writeFileSync(filePath, frontmatter, 'utf8');
    console.log('File saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving blog post:', error);
    return false;
  }
}

// Delete blog post
export function deleteBlogPost(slug: string): boolean {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return false;
  }
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
