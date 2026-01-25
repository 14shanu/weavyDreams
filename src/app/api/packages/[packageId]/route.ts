import { NextResponse } from 'next/server';
import { getPackageBySlug } from '@/lib/api/packages';
import { getServices } from '@/lib/api/services';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ packageId: string }> }
) {
  const { packageId } = await params;
  const pkg = await getPackageBySlug(packageId);

  if (!pkg) {
    return NextResponse.json({ error: 'Package not found' }, { status: 404 });
  }

  const { services } = await getServices();
  const includedServices = services.filter((s) => pkg.services.includes(s.id));

  return NextResponse.json({ package: pkg, includedServices });
}
