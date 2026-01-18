import { ThemeConfig } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getTheme(): Promise<ThemeConfig> {
  const url = BASE + "/api/theme";

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch theme");
  }

  return res.json();
}