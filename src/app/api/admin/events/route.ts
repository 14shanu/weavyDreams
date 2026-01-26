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
    const updatedEvent = await request.json();
    const data = await readJSONFile<any>('events.json');
    
    const index = data.eventTypes.findIndex((e: any) => e.id === updatedEvent.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    data.eventTypes[index] = updatedEvent;
    await writeJSONFile('events.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
