export interface ThemeColors {
  background: string;
  backgroundAlt: string;
  primary: string;
  primaryDark: string;
  text: string;
  textDark: string;
  accent: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface ThemeRadius {
  button: string;
  card: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  radius: ThemeRadius;
}
