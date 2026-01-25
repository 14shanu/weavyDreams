import { PackagesData } from "@/lib/types/package";
import { promises as fs } from "fs";
import path from "path";

export async function getPackages(): Promise<PackagesData> {
  const filePath = path.join(process.cwd(), "src/data/packages.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getPackageBySlug(slug: string) {
  const data = await getPackages();
  return data.packages.find(pkg => pkg.slug === slug);
}

export async function getPackagesByEventType(eventType: string) {
  const data = await getPackages();
  return data.packages.filter(pkg => pkg.eventType === eventType);
}

export async function getPackagesByTier(tier: 'essential' | 'premium' | 'luxury') {
  const data = await getPackages();
  return data.packages.filter(pkg => pkg.tier === tier);
}
