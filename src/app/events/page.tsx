import eventsData from "@/data/events.json";
import { EventsData } from "@/lib/types";
import EventsExplorerSection from "@/ui/sections/EventsExplorerSection";

const typedData = eventsData as EventsData;

export const metadata = {
  title: "Event Categories & Products | Weaving Dreams",
  description:
    "Explore event types, categories and products to tailor your next event with Weaving Dreams.",
};

export default function EventsPage() {
  // For now we import JSON directly for SSR; explorer will manage state on client.
  return <EventsExplorerSection data={typedData} />;
}
