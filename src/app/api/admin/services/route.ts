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
    const updatedService = await request.json();
    const data = await readJSONFile<any>('services.json');
    
    const index = data.services.findIndex((s: any) => s.id === updatedService.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    data.services[index] = updatedService;
    await writeJSONFile('services.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}
