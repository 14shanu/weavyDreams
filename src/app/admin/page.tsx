import { readJSONFile } from '@/lib/admin/file-system';

export default async function AdminDashboard() {
  const services = await readJSONFile<any>('services.json');
  const events = await readJSONFile<any>('events.json');
  const packages = await readJSONFile<any>('packages.json');
  const blog = await readJSONFile<any>('blog.json');

  const stats = [
    { label: 'Services', value: services.services.length, icon: '🎯', color: 'bg-blue-500' },
    { label: 'Event Types', value: events.eventTypes.length, icon: '🎉', color: 'bg-purple-500' },
    { label: 'Packages', value: packages.packages.length, icon: '📦', color: 'bg-green-500' },
    { label: 'Blog Posts', value: blog.posts.length, icon: '📝', color: 'bg-orange-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white text-2xl p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin/services" className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
              <div className="font-semibold text-gray-900">Manage Services</div>
              <div className="text-sm text-gray-600">Edit service offerings and details</div>
            </a>
            <a href="/admin/events" className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
              <div className="font-semibold text-gray-900">Manage Events</div>
              <div className="text-sm text-gray-600">Update event types and packages</div>
            </a>
            <a href="/admin/blog" className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors">
              <div className="font-semibold text-gray-900">Create Blog Post</div>
              <div className="text-sm text-gray-600">Write and publish new content</div>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Data Storage</span>
              <span className="font-semibold text-gray-900">JSON Files</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-semibold text-gray-900">Just now</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-green-600">✓ All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
