import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rename } from 'fs/promises';
import path from 'path';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { oldPath, newName } = await request.json();
    
    if (!oldPath || !oldPath.startsWith('/images/') || !newName) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const oldFullPath = path.join(process.cwd(), 'public', oldPath);
    const directory = path.dirname(oldFullPath);
    const newFullPath = path.join(directory, newName);
    
    await rename(oldFullPath, newFullPath);

    const newPublicPath = oldPath.replace(path.basename(oldPath), newName);

    return NextResponse.json({ 
      success: true,
      newPath: newPublicPath 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to rename file' }, { status: 500 });
  }
}
