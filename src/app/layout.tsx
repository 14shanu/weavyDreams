import "./globals.css";
import { ReactNode } from "react";
import { getTheme } from "@/lib/api/theme";
import { themeToCssVars } from "@/lib/theme";
import PageShell from "@/ui/layout/PageShell";
import { generateOrganizationSchema } from "@/lib/utils/schema";
import { Metadata, Viewport } from "next";
import { ExperienceProvider } from "@/contexts/ExperienceContext";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "Weaving Dreams - Professional Event Planning Services",
    template: "%s | Weaving Dreams",
  },
  description: "Professional event planning and management services. From concept to execution, we bring your vision to life.",
  keywords: ["event planning", "wedding planning", "corporate events", "event management", "party planning"],
  authors: [{ name: "Weaving Dreams" }],
  creator: "Weaving Dreams",
  metadataBase: new URL("https://weavingdreams.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://weavingdreams.com",
    siteName: "Weaving Dreams",
    title: "Weaving Dreams - Professional Event Planning Services",
    description: "Professional event planning and management services. From concept to execution, we bring your vision to life.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weaving Dreams - Professional Event Planning Services",
    description: "Professional event planning and management services. From concept to execution, we bring your vision to life.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const theme = await getTheme();
  const style = themeToCssVars(theme);

  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" style={style}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-[var(--color-bg)] text-[var(--color-text)]">
        <AuthProvider>
          <ExperienceProvider>
            <PageShell>{children}</PageShell>
          </ExperienceProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
