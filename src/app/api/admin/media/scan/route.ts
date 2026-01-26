import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { scanForMissingFiles } from '@/lib/admin/media-scanner';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const files = await scanForMissingFiles();
    const missing = files.filter(f => !f.exists);
    
    return NextResponse.json({
      totalFiles: files.length,
      existingFiles: files.filter(f => f.exists).length,
      missingFiles: missing.length,
      missing,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scan files' }, { status: 500 });
  }
}
