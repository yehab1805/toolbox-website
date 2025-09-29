export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  content: string;
  readingTime?: number;
  published: boolean;
}

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  published: boolean;
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  readingTime: number;
}
