import { NextResponse } from 'next/server';
import { getServiceBySlug } from '@/lib/api/services';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ serviceId: string }> }
) {
  const { serviceId } = await params;
  const service = await getServiceBySlug(serviceId);

  if (!service) {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 });
  }

  return NextResponse.json(service);
}
