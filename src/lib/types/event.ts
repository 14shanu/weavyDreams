export interface EventLink {
    label: string;
    href: string;
}

export interface ProductSEO {
    title?: string;
    description?: string;
}

export interface Product {
    id: string;                 // "corporate-djs"
    name: string;               // "Corporate DJs"
    slug: string;               // "corporate-djs" -> /products/corporate-djs
    shortDescription?: string;
    description?: string;
    image?: string;
    gallery?: string[];
    tags?: string[];
    seo?: ProductSEO;
}

export interface Category {
    id: string;                 // "entertainment"
    name: string;               // "Entertainment"
    slug: string;               // "entertainment"
    description?: string;
    products: Product[];
}

export interface EventTypeSEO {
    title?: string;
    description?: string;
}

export interface EventType {
    id: string;                 // "corporate"
    name: string;               // "Corporate"
    slug: string;               // "corporate-events" -> /events/corporate-events
    description?: string;
    heroImage?: string;
    helpfulLinks?: EventLink[];
    categories: Category[];
    seo?: EventTypeSEO;
}

export interface EventsData {
    eventTypes: EventType[];
}