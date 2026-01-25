import { EventsData } from '@/lib/types/event';
import { promises as fs } from 'fs';
import path from 'path';

export async function getEvents(): Promise<EventsData> {
  const filePath = path.join(process.cwd(), 'src/data/events.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function getEventBySlug(slug: string) {
  const data = await getEvents();
  return data.eventTypes.find((event) => event.slug === slug);
}
