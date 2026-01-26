import { PageConfig } from "@/lib/types";

export async function getPageContent(slug: string): Promise<PageConfig> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/content/${slug}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch page: " + slug);
  }

  return res.json();
}