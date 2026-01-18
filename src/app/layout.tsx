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
