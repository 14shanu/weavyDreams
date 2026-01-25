import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Tag, ArrowRight, ExternalLink } from 'lucide-react';
import blogData from '@/data/blog.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogData.posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.posts.find(p => p.slug === slug);
  
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
      images: [post.image],
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogData.posts.find(p => p.slug === slug);
  
  if (!post) notFound();

  const category = blogData.categories.find(c => c.id === post.category);
  const relatedPosts = blogData.posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen pt-20">
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
          >
            ← Back to Blog
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {category?.name}
              </span>
              <span>By {post.author}</span>
            </div>

            <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
            <p className="text-xl text-gray-600">{post.excerpt}</p>
          </div>

          <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p>{post.content}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {post.relatedLinks.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-4">Explore Our Services</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {post.relatedLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold mb-8">Related Articles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
