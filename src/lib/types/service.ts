import { MediaGalleryConfig } from '../media';

export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  media?: MediaGalleryConfig;
  features: string[];
  pricing: {
    basePrice: number;
    unit: string;
  };
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

export interface ServicesData {
  services: Service[];
}
