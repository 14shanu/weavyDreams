import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import blogData from '@/data/blog.json';

export const metadata: Metadata = {
  title: 'Blog | Event Planning Tips & Trends | Weaving Dreams',
  description: 'Expert event planning advice, wedding tips, and latest trends. Learn from professional event planners.',
  keywords: ['event planning blog', 'wedding tips', 'event trends', 'party planning advice'],
  openGraph: {
    title: 'Event Planning Blog | Weaving Dreams',
    description: 'Expert tips and trends for unforgettable events',
    type: 'website',
  }
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Event Planning Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Expert insights, tips, and trends to help you create unforgettable events
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <Link
              href="/blog"
              className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              All Posts
            </Link>
            {blogData.categories.map(category => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.posts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-56 bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    {post.featured && (
                      <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {blogData.categories.find(c => c.id === post.category)?.name}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-purple-600 font-medium flex items-center gap-2">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
