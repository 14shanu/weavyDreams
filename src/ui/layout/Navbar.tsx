"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavigationConfig } from "@/lib/types/navigation";
import { getNavigation } from "@/lib/api/navigation";

export default function Navbar() {
  const [nav, setNav] = useState<NavigationConfig | null>(null);

  useEffect(() => {
    async function loadNav() {
      const config = await getNavigation();
      setNav(config);
    }
    loadNav();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 border-b border-white/10 backdrop-blur">
      <nav className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3 py-3 px-4 sm:py-4">
        <div className="text-base sm:text-lg font-semibold tracking-wide">
          {nav?.brand?.href ? (
            <Link href={nav.brand.href}>{nav.brand.label}</Link>
          ) : (
            nav?.brand?.label || "WEAVY DREAMS"
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-[var(--color-text)]/80">
          {(nav?.links || []).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
