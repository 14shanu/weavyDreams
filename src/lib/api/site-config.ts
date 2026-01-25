import { SiteConfig } from "@/lib/types/site-config";
import { promises as fs } from "fs";
import path from "path";

export async function getSiteConfig(): Promise<SiteConfig> {
  const region = process.env.REGION || "default";
  const configPath = region === "default" 
    ? path.join(process.cwd(), "src/data/site-config.json")
    : path.join(process.cwd(), `src/data/site-config.${region}.json`);

  try {
    const fileContents = await fs.readFile(configPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    // Fallback to default config
    const defaultPath = path.join(process.cwd(), "src/data/site-config.json");
    const fileContents = await fs.readFile(defaultPath, "utf8");
    return JSON.parse(fileContents);
  }
}
