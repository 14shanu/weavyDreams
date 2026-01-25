import type { SiteConfig } from '@/lib/types/site-config';

export function convertPrice(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  config: SiteConfig
): number {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = config.pricing.currencies[fromCurrency]?.rate || 1;
  const toRate = config.pricing.currencies[toCurrency]?.rate || 1;

  // Convert to base currency first, then to target currency
  const baseAmount = amount / fromRate;
  return baseAmount * toRate;
}

export function formatPrice(
  amount: number,
  currency: string,
  config: SiteConfig
): string {
  const currencyInfo = config.pricing.currencies[currency];
  if (!currencyInfo) return `${amount}`;

  const symbol = currencyInfo.symbol;
  const locale = currencyInfo.locale;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));

  return `${symbol}${formatted}`;
}

export function detectUserCurrency(config: SiteConfig): string {
  if (!config.pricing.autoDetect) {
    return config.pricing.fallbackCurrency;
  }

  // Try to detect from browser locale
  const locale = navigator.language || 'en-IN';
  const countryCode = locale.split('-')[1]?.toUpperCase();

  if (!countryCode) return config.pricing.fallbackCurrency;

  // Find currency for this country
  for (const [currency, info] of Object.entries(config.pricing.currencies)) {
    if (info.countries.includes(countryCode)) {
      return currency;
    }
  }

  return config.pricing.fallbackCurrency;
}
