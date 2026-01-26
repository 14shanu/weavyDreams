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
    const updatedPackage = await request.json();
    const data = await readJSONFile<any>('packages.json');
    
    const index = data.packages.findIndex((p: any) => p.id === updatedPackage.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    data.packages[index] = updatedPackage;
    await writeJSONFile('packages.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}
