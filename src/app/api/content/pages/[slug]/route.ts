import { NextRequest, NextResponse } from 'next/server';
import { readPageJSON } from '@/lib/admin/file-system';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await readPageJSON(`${slug}.json`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
}
