import { readJSONFile } from '@/lib/admin/file-system';
import Link from 'next/link';

export default async function PackagesAdminPage() {
  const data = await readJSONFile<any>('packages.json');
  const packages = data.packages;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Packages</h1>
          <p className="text-gray-600">Manage your package offerings</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {packages.map((pkg: any) => (
              <tr key={pkg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{pkg.name}</div>
                  <div className="text-sm text-gray-500">{pkg.tagline}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{pkg.tier}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{pkg.eventType}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/packages/${pkg.id}`}
                    prefetch={true}
                    className="text-purple-600 hover:text-purple-900 font-medium"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
