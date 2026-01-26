import { NextResponse } from 'next/server';
import { getServices } from '@/lib/api/services';

export async function GET() {
  const data = await getServices();
  return NextResponse.json(data);
}
