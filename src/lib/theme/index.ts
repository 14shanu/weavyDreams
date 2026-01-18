import { ThemeConfig } from "@/lib/types";

export function themeToCssVars(theme: ThemeConfig): React.CSSProperties {
  return {
    "--color-bg": theme.colors.background,
    "--color-bg-alt": theme.colors.backgroundAlt,
    "--color-primary": theme.colors.primary,
    "--color-primary-dark": theme.colors.primaryDark,
    "--color-text": theme.colors.text,
    "--color-text-dark": theme.colors.textDark,
    "--color-accent": theme.colors.accent,
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
    "--radius-button": theme.radius.button,
    "--radius-card": theme.radius.card
  } as React.CSSProperties;
}
