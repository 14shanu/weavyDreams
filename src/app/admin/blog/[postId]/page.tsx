import { readJSONFile } from '@/lib/admin/file-system';
import { notFound } from 'next/navigation';
import { FormEngine } from '@/components/admin/FormEngine';

export default async function BlogEditPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const data = await readJSONFile<any>('blog.json');
  const post = data.posts.find((p: any) => p.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Blog Post</h1>
        <p className="text-gray-600">{post.title}</p>
      </div>

      <FormEngine
        data={post}
        apiEndpoint="/api/admin/blog"
        redirectTo="/admin/blog"
      />
    </div>
  );
}
