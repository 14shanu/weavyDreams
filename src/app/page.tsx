import { Metadata } from 'next';
import { getPageContent } from "@/lib/api/content";
import { renderSection } from "@/ui/sections/renderSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("home");
  
  if (!page.seo) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: page.seo.openGraph ? {
      title: page.seo.openGraph.title,
      description: page.seo.openGraph.description,
      images: [page.seo.openGraph.image],
      type: page.seo.openGraph.type as 'website',
    } : undefined,
    twitter: page.seo.twitter ? {
      card: page.seo.twitter.card as 'summary_large_image',
      title: page.seo.twitter.title,
      description: page.seo.twitter.description,
      images: [page.seo.twitter.image],
    } : undefined,
  };
}

export default async function HomePage() {
  const page = await getPageContent("home");

  return (
    <>
      {page.sections.map((section) => (
        <div id={section.id} key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </>
  );
}
