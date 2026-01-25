export interface EventType {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  featured: boolean;
  packages: string[];
  services: string[];
  seo: {
    title: string;
    description: string;
  };
}

export interface EventsData {
  eventTypes: EventType[];
}