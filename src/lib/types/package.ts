import { MediaGalleryConfig } from '../media';

export interface Package {
  id: string;
  name: string;
  slug: string;
  eventType: string;
  tier: 'essential' | 'premium' | 'luxury';
  tagline: string;
  description: string;
  price: number;
  guestCount: string;
  image: string;
  media?: MediaGalleryConfig;
  services: string[];
  features: string[];
}

export interface PackagesData {
  packages: Package[];
}
