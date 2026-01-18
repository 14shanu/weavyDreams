import { PageConfig } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getPageContent(slug: string): Promise<PageConfig> {
  const url = BASE + "/api/content/" + slug;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch page: " + slug);
  }

  return res.json();
}