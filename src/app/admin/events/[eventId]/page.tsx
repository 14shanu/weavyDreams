import { readJSONFile } from '@/lib/admin/file-system';
import { notFound } from 'next/navigation';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function EventEditPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const data = await readJSONFile<any>('events.json');
  const event = data.eventTypes.find((e: any) => e.id === eventId);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Event Type</h1>
        <p className="text-gray-600">{event.name}</p>
      </div>

      <FormEngine
        data={event}
        apiEndpoint="/api/admin/events"
        redirectTo="/admin/events"
      />
    </div>
  );
}
