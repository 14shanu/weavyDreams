import { MetadataRoute } from 'next';
import { getEvents } from '@/lib/api/events';
import { getServices } from '@/lib/api/services';
import { getPackages } from '@/lib/api/packages';
import blogData from '@/data/blog.json';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://weavingdreams.com';
  
  const eventsData = await getEvents();
  const servicesData = await getServices();
  const packagesData = await getPackages();

  const staticRoutes = [
    '',
    '/events',
    '/services',
    '/packages',
    '/quiz',
    '/portfolio',
    '/about',
    '/contact',
    '/cart',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const eventRoutes = eventsData.eventTypes.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = servicesData.services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const packageRoutes = packagesData.packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogData.posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogCategoryRoutes = blogData.categories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...eventRoutes,
    ...serviceRoutes,
    ...packageRoutes,
    ...blogRoutes,
    ...blogCategoryRoutes,
  ];
}
