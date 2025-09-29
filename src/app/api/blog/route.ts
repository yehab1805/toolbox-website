import { NextRequest, NextResponse } from 'next/server';
import { saveBlogPost, deleteBlogPost, getAllBlogPostPreviews } from '@/lib/blog-storage';
import { BlogPost } from '@/types/blog';
import { revalidatePath } from 'next/cache';

// GET - Get all blog posts
export async function GET() {
  try {
    const posts = getAllBlogPostPreviews();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const post: BlogPost = await request.json();
    console.log('Received post data:', post);
    
    // Validate required fields
    if (!post.title || !post.content || !post.author) {
      return NextResponse.json(
        { error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    console.log('Attempting to save post...');
    const success = saveBlogPost(post);
    console.log('Save result:', success);
    
    if (success) {
      // Revalidate the blog pages to show new content
      revalidatePath('/blog');
      revalidatePath('/blog/admin');
      return NextResponse.json({ message: 'Post saved successfully', post });
    } else {
      return NextResponse.json(
        { error: 'Failed to save post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const success = deleteBlogPost(slug);
    
    if (success) {
      // Revalidate the blog pages to show updated content
      revalidatePath('/blog');
      revalidatePath('/blog/admin');
      return NextResponse.json({ message: 'Post deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
