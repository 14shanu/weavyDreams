import { readJSONFile } from '@/lib/admin/file-system';
import { notFound } from 'next/navigation';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function PackageEditPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { packageId } = await params;
  const data = await readJSONFile<any>('packages.json');
  const pkg = data.packages.find((p: any) => p.id === packageId);

  if (!pkg) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Package</h1>
        <p className="text-gray-600">{pkg.name}</p>
      </div>

      <FormEngine
        data={pkg}
        apiEndpoint="/api/admin/packages"
        redirectTo="/admin/packages"
      />
    </div>
  );
}
