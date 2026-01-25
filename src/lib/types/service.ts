export interface Service {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  pricing: {
    basePrice: number;
    unit: string;
  };
}

export interface ServicesData {
  services: Service[];
}
