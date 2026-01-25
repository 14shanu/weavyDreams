export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  relatedLinks: {
    label: string;
    href: string;
  }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogConfig {
  posts: BlogPost[];
  categories: BlogCategory[];
}
