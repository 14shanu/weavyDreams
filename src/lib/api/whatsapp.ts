import config from "@/data/whatsapp-config.json";

export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  countryCode: string;
  defaultMessage: string;
  pageSpecificMessages: Record<string, string>;
  hiddenPages: string[];
  position: string;
  showOnMobileOnly: boolean;
}

export async function getWhatsAppConfig(): Promise<WhatsAppConfig> {
  return config as WhatsAppConfig;
}
