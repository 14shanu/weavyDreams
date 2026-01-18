#!/usr/bin/env bash

set -e

echo "Creating folders..."

mkdir -p src/{config/schema,data/pages,lib/{api,theme,utils,types},ui/{layout,sections,elements},styles}
mkdir -p public/images

echo "Creating JSON data files..."

# theme.json
cat << 'EOF' > src/data/theme.json
{
  "name": "default",
  "colors": {
    "background": "#0b1724",
    "backgroundAlt": "#ffffff",
    "primary": "#7fb3ff",
    "primaryDark": "#436aa3",
    "text": "#f9fafb",
    "textDark": "#111827",
    "accent": "#f97316"
  },
  "fonts": {
    "heading": "'Playfair Display', serif",
    "body": "'Inter', sans-serif"
  },
  "radius": {
    "button": "9999px",
    "card": "16px"
  }
}
EOF

# home.json
cat << 'EOF' > src/data/pages/home.json
{
  "slug": "home",
  "seo": {
    "title": "Showman Events – From Conception to Execution",
    "description": "Event production company bringing ideas to life, from concept to execution."
  },
  "sections": [
    {
      "type": "hero",
      "id": "hero",
      "heading": "From Conceptional to Execution",
      "subheading": "From Nothing to Something",
      "backgroundImage": "/images/hero.jpg",
      "cta": {
        "label": "Enquiry Now",
        "href": "#contact"
      }
    }
  ]
}
EOF

echo "Creating TypeScript type definitions..."

# theme.ts
cat << 'EOF' > src/lib/types/theme.ts
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
EOF

# content.ts
cat << 'EOF' > src/lib/types/content.ts
export type HeroSectionConfig = {
  type: "hero";
  id: string;
  heading: string;
  subheading?: string;
  backgroundImage: string;
  cta?: {
    label: string;
    href: string;
  };
};

export type SectionConfig = HeroSectionConfig;

export interface PageConfig {
  slug: string;
  seo?: {
    title?: string;
    description?: string;
  };
  sections: SectionConfig[];
}
EOF

# index.ts (types barrel)
cat << 'EOF' > src/lib/types/index.ts
export * from "./theme";
export * from "./content";
EOF

echo "Creating API helper files..."

# lib/api/theme.ts
cat << 'EOF' > src/lib/api/theme.ts
import { ThemeConfig } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getTheme(): Promise<ThemeConfig> {
  const res = await fetch(\`\${BASE}/api/theme\`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch theme");
  return res.json();
}
EOF

# lib/api/content.ts
cat << 'EOF' > src/lib/api/content.ts
import { PageConfig } from "@/lib/types";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function getPageContent(slug: string): Promise<PageConfig> {
  const res = await fetch(\`\${BASE}/api/content/\${slug}\`, { cache: "no-store" });
  if (!res.ok) throw new Error(\`Failed to fetch page: \${slug}\`);
  return res.json();
}
EOF

echo "Creating theme utilities..."

# lib/theme/index.ts
cat << 'EOF' > src/lib/theme/index.ts
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
EOF

# lib/theme/tokens.ts (placeholder)
cat << 'EOF' > src/lib/theme/tokens.ts
// Reserved for additional theme token helpers in future.
export {};
EOF

# lib/utils/logger.ts (simple helper)
cat << 'EOF' > src/lib/utils/logger.ts
export function logError(error: unknown, context?: string) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[Error]" + (context ? \` \${context}\` : ""), error);
  }
}
EOF

echo "Creating mock API routes..."

mkdir -p src/app/api/theme src/app/api/content/[page]

# api/theme
cat << 'EOF' > src/app/api/theme/route.ts
import { NextResponse } from "next/server";
import theme from "@/data/theme.json";

export async function GET() {
  return NextResponse.json(theme);
}
EOF

# api/content/[page]
cat << 'EOF' > src/app/api/content/[page]/route.ts
import { NextResponse } from "next/server";
import home from "@/data/pages/home.json";

const pages: Record<string, any> = {
  home
};

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  const page = pages[params.page];
  if (!page) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(page);
}
EOF

echo "Creating UI components..."

# PageShell
cat << 'EOF' > src/ui/layout/PageShell.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
EOF

# Navbar
cat << 'EOF' > src/ui/layout/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 border-b border-white/10">
      <nav className="mx-auto max-w-6xl flex items-center justify-between py-4 px-4">
        <div className="text-lg font-semibold tracking-wide">
          SHOWMAN
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="#hero">Home</Link>
          <Link href="#our-work">Our Work</Link>
          <Link href="#what-we-do">What We Do</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
EOF

# Footer
cat << 'EOF' > src/ui/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-white/10 py-6 mt-8">
      <div className="mx-auto max-w-6xl px-4 text-xs text-[var(--color-text)]/70 flex justify-between">
        <span>© {new Date().getFullYear()} Showman. All rights reserved.</span>
        <span>Built on a configurable Next.js template.</span>
      </div>
    </footer>
  );
}
EOF

# Elements/Button.tsx
cat << 'EOF' > src/ui/elements/Button.tsx
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: PropsWithChildren<Props>) {
  const base =
    "inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full transition";
  const variants: Record<string, string> = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-text-dark)] hover:bg-[var(--color-primary-dark)]",
    secondary:
      "border border-white/40 text-[var(--color-text)] hover:bg-white/10"
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
EOF

# Elements/Heading.tsx
cat << 'EOF' > src/ui/elements/Heading.tsx
import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
};

export default function Heading({ level = 1, children, className }: Props) {
  const Tag = \`h\${level}\` as keyof JSX.IntrinsicElements;
  const base =
    "font-[var(--font-heading)] text-[var(--color-text)] tracking-wide";
  const sizes: Record<number, string> = {
    1: "text-3xl md:text-5xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl"
  };

  return <Tag className={clsx(base, sizes[level], className)}>{children}</Tag>;
}
EOF

# HeroSection
cat << 'EOF' > src/ui/sections/HeroSection.tsx
import Image from "next/image";
import { HeroSectionConfig } from "@/lib/types";

export default function HeroSection(props: HeroSectionConfig) {
  const { heading, subheading, backgroundImage, cta } = props;

  return (
    <section className="relative h-[70vh] min-h-[480px] text-center flex items-center justify-center">
      <Image
        src={backgroundImage}
        alt={heading}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-3xl md:text-5xl font-semibold font-[var(--font-heading)] tracking-wide text-white">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-4 text-lg md:text-2xl text-white/90">
            {subheading}
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex mt-8 px-8 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-text-dark)] text-sm font-medium shadow-lg hover:bg-[var(--color-primary-dark)] transition"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
EOF

# renderSection
cat << 'EOF' > src/ui/sections/renderSection.tsx
import HeroSection from "./HeroSection";
import { SectionConfig } from "@/lib/types";

export function renderSection(section: SectionConfig) {
  switch (section.type) {
    case "hero":
      return <HeroSection {...section} />;
    default:
      return null;
  }
}
EOF

echo "Updating app/page.tsx and app/layout.tsx..."

# app/page.tsx
cat << 'EOF' > src/app/page.tsx
import { getPageContent } from "@/lib/api/content";
import { renderSection } from "@/ui/sections/renderSection";

export default async function HomePage() {
  const page = await getPageContent("home");

  return (
    <>
      {page.sections.map((section) => (
        <div id={section.id} key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </>
  );
}
EOF

# app/layout.tsx
cat << 'EOF' > src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { getTheme } from "@/lib/api/theme";
import { themeToCssVars } from "@/lib/theme";
import PageShell from "@/ui/layout/PageShell";

export const metadata = {
  title: "Showman Site",
  description: "Scalable JSON-driven event website"
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const theme = await getTheme();
  const style = themeToCssVars(theme);

  return (
    <html lang="en" style={style}>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)]">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
EOF

echo "Done. Now run: npm install clsx && npm run dev"
echo "Remember to add a hero image at public/images/hero.jpg"