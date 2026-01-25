import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import blogData from '@/data/blog.json';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    title: `${categoryName} | Blog | Weaving Dreams`,
    description: `Browse our ${categoryName.toLowerCase()} articles and tips.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = blogData.posts.filter((post) => post.category === category);

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <main className="min-h-screen pt-20">
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mb-8">{categoryName}</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h2 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
