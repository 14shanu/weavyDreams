import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readJSONFile, writeJSONFile } from '@/lib/admin/file-system';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedPost = await request.json();
    const data = await readJSONFile<any>('blog.json');
    
    const index = data.posts.findIndex((p: any) => p.id === updatedPost.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts[index] = updatedPost;
    await writeJSONFile('blog.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
