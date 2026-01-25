import { ServicesData } from "@/lib/types/service";
import { promises as fs } from "fs";
import path from "path";

export async function getServices(): Promise<ServicesData> {
  const filePath = path.join(process.cwd(), "src/data/services.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getServiceBySlug(slug: string) {
  const data = await getServices();
  return data.services.find(service => service.slug === slug);
}
