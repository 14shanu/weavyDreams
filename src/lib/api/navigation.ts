import nav from "@/data/navigation.json";
import { NavigationConfig } from "@/lib/types/navigation";

export async function getNavigation(): Promise<NavigationConfig> {
    // later you can replace this with a real API call
    return nav as NavigationConfig;
}