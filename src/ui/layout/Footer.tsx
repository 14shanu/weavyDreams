"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavigationConfig, FooterConfig } from "@/lib/types/navigation";
import { getNavigation } from "@/lib/api/navigation";

export default function Footer() {
  const [footer, setFooter] = useState<FooterConfig | null>(null);

  useEffect(() => {
    async function loadNav() {
      const nav: NavigationConfig = await getNavigation();
      setFooter(nav.footer ?? null);
    }
    loadNav();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bg)] border-t border-white/10 mt-8">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Columns */}
        {footer?.columns && footer.columns.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between mb-6">
            {footer.columns.map((col) => (
              <div key={col.title} className="text-xs sm:text-sm">
                <h4 className="text-[var(--color-text)] mb-2 font-medium">
                  {col.title}
                </h4>
                <ul className="space-y-1 text-[var(--color-text)]/70">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-[var(--color-text)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs text-[var(--color-text)]/70">
          <span>
            © {year}{" "}
            {footer?.copyrightLabel ?? "WEAVY DREAMS. All rights reserved."}
          </span>
          <span>{footer?.rightText ?? ""}</span>
        </div>
      </div>
    </footer>
  );
}
