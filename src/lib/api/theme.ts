import { ThemeConfig } from "@/lib/types";

export async function getTheme(): Promise<ThemeConfig> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/theme`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch theme");
  }

  return res.json();
}