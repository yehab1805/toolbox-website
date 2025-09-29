import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json({ 
      message: 'API is working',
      postsCount: posts.length,
      posts: posts.map(p => ({ title: p.title, slug: p.slug }))
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ error: 'Test failed', details: error }, { status: 500 });
  }
}
