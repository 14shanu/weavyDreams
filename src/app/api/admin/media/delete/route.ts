import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { filePath } = await request.json();
    
    if (!filePath || !filePath.startsWith('/images/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'public', filePath);
    await unlink(fullPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
