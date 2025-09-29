import { BlogPost } from '@/types/blog';

// Calculate reading time (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
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

// Client-side blog post creation
export function createBlogPost(data: {
  title: string;
  author: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
  content: string;
  published: boolean;
}): BlogPost {
  const slug = generateSlug(data.title);
  const date = new Date().toISOString();
  const readingTime = calculateReadingTime(data.content);

  return {
    slug,
    title: data.title,
    date,
    author: data.author,
    tags: data.tags,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    content: data.content,
    readingTime,
    published: data.published
  };
}

// Validate blog post data
export function validateBlogPost(data: {
  title: string;
  content: string;
  author: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title.trim()) {
    errors.push('Title is required');
  }

  if (!data.content.trim()) {
    errors.push('Content is required');
  }

  if (!data.author.trim()) {
    errors.push('Author is required');
  }

  if (data.title.length > 100) {
    errors.push('Title is too long (max 100 characters)');
  }

  if (data.content.length < 50) {
    errors.push('Content is too short (min 50 characters)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get reading time text
export function getReadingTimeText(minutes: number): string {
  if (minutes === 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}
