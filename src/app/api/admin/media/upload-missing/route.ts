import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const targetPath = formData.get('targetPath') as string;
    
    if (!file || !targetPath) {
      return NextResponse.json({ error: 'Missing file or target path' }, { status: 400 });
    }

    // Extract expected filename and extension from target path
    const pathParts = targetPath.split('/');
    const expectedFilename = pathParts.pop() || '';
    const expectedExt = expectedFilename.split('.').pop()?.toLowerCase();
    
    // Get uploaded file extension
    const uploadedExt = file.name.split('.').pop()?.toLowerCase();
    
    // Validate extension matches
    if (uploadedExt !== expectedExt) {
      return NextResponse.json({ 
        error: `Expected .${expectedExt} file but got .${uploadedExt}` 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create full directory path
    const directory = path.join(process.cwd(), 'public', ...pathParts);
    await mkdir(directory, { recursive: true });

    // Save with exact expected filename
    const filePath = path.join(directory, expectedFilename);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: targetPath,
      name: expectedFilename,
      size: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
