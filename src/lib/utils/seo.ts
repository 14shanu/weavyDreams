import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = [],
  image = '/images/og-default.jpg',
  url = 'https://weavingdreams.com',
  type = 'website',
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = `${title} | Weaving Dreams`;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Weaving Dreams' }],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Weaving Dreams',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url,
    },
  };
}
