import { readJSONFile } from '@/lib/admin/file-system';
import Link from 'next/link';

export default async function SEOAdminPage() {
  const services = await readJSONFile<any>('services.json');
  const events = await readJSONFile<any>('events.json');
  const packages = await readJSONFile<any>('packages.json');
  const blog = await readJSONFile<any>('blog.json');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Manager</h1>
        <p className="text-gray-600">Manage SEO settings across your site</p>
      </div>

      <div className="space-y-6">
        {/* Services SEO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Services SEO</h2>
          <div className="space-y-2">
            {services.services.map((service: any) => (
              <div key={service.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-500">
                <div>
                  <div className="font-medium text-gray-900">{service.name}</div>
                  <div className="text-sm text-gray-500">{service.seo?.title || 'No SEO title set'}</div>
                </div>
                <Link
                  href={`/admin/services/${service.id}`}
                  className="text-purple-600 hover:text-purple-900 font-medium"
                >
                  Edit SEO
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Events SEO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Events SEO</h2>
          <div className="space-y-2">
            {events.eventTypes.map((event: any) => (
              <div key={event.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-500">
                <div>
                  <div className="font-medium text-gray-900">{event.name}</div>
                  <div className="text-sm text-gray-500">{event.seo?.title || 'No SEO title set'}</div>
                </div>
                <Link
                  href={`/admin/events/${event.id}`}
                  className="text-purple-600 hover:text-purple-900 font-medium"
                >
                  Edit SEO
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Packages SEO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Packages SEO</h2>
          <div className="space-y-2">
            {packages.packages.slice(0, 5).map((pkg: any) => (
              <div key={pkg.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-500">
                <div>
                  <div className="font-medium text-gray-900">{pkg.name}</div>
                  <div className="text-sm text-gray-500">{pkg.seo?.title || 'No SEO title set'}</div>
                </div>
                <Link
                  href={`/admin/packages/${pkg.id}`}
                  className="text-purple-600 hover:text-purple-900 font-medium"
                >
                  Edit SEO
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Blog SEO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Blog Posts SEO</h2>
          <div className="space-y-2">
            {blog.posts.slice(0, 5).map((post: any) => (
              <div key={post.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-500">
                <div>
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500">{post.seo?.title || 'No SEO title set'}</div>
                </div>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="text-purple-600 hover:text-purple-900 font-medium"
                >
                  Edit SEO
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
