import { MediaGalleryConfig } from '../media';

export interface EventType {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  media?: MediaGalleryConfig;
  icon: string;
  featured: boolean;
  packages: string[];
  services: string[];
  experience?: {
    enabled: boolean;
    theme: string;
    effects: {
      [key: string]: boolean;
    };
    colors: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    openGraph: {
      title: string;
      description: string;
      image: string;
      type: string;
    };
    twitter: {
      card: string;
      title: string;
      description: string;
      image: string;
    };
  };
}

export interface EventsData {
  eventTypes: EventType[];
}