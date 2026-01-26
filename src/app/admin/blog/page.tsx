import { readJSONFile } from '@/lib/admin/file-system';
import Link from 'next/link';

export default async function BlogAdminPage() {
  const data = await readJSONFile<any>('blog.json');
  const posts = data.posts;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post: any) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="text-sm text-gray-500">{post.excerpt}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.publishedAt}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/blog/${post.id}`}
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
