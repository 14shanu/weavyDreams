import { EventsData } from "@/lib/types";

export async function getEvents(): Promise<EventsData> {
    const res = await fetch("/api/events", { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch events");
    }

    return res.json();
}