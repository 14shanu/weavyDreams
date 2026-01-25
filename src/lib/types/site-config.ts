// Site Configuration Types
export interface SiteConfig {
  site: {
    name: string;
    tagline: string;
    description: string;
    region?: string;
  };
  localization: {
    default: LocalizationSettings;
    autoDetect: boolean;
  };
  pricing: PricingConfig;
  features: {
    quiz: boolean;
    cart: boolean;
    portfolio: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface LocalizationSettings {
  country: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  timezone: string;
  dateFormat: string;
  phoneFormat: string;
}

export interface PricingConfig {
  displayMode: 'hidden' | 'exact' | 'range' | 'request';
  baseCurrency: string;
  autoDetect: boolean;
  fallbackCurrency: string;
  currencies: Record<string, CurrencyInfo>;
}

export interface CurrencyInfo {
  symbol: string;
  rate: number;
  locale: string;
  countries: string[];
}
