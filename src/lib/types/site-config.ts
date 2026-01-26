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
    [key: string]: {
      url: string;
      icon: string;
    };
  };
  experience: {
    enabled: boolean;
    defaultIntensity: 'off' | 'low' | 'medium' | 'high';
    respectReducedMotion: boolean;
    allowUserControl: boolean;
    persistPreferences: boolean;
    effects: {
      animations: boolean;
      particles: boolean;
      sounds: boolean;
      customCursors: boolean;
      backgroundEffects: boolean;
    };
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
