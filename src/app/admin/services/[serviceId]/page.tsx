import { readJSONFile } from '@/lib/admin/file-system';
import { notFound } from 'next/navigation';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function ServiceEditPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const data = await readJSONFile<any>('services.json');
  const service = data.services.find((s: any) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Service</h1>
        <p className="text-gray-600">{service.name}</p>
      </div>

      <FormEngine
        data={service}
        apiEndpoint="/api/admin/services"
        redirectTo="/admin/services"
      />
    </div>
  );
}
