"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavigationConfig } from "@/lib/types/navigation";
import { getNavigation } from "@/lib/api/navigation";
import { useCartStore } from "@/lib/stores/cartStore";

export default function Navbar() {
  const [nav, setNav] = useState<NavigationConfig | null>(null);
  const itemCount = useCartStore((state) => state.getItemCount());

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
            nav?.brand?.label || "WEAVING DREAMS"
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-[var(--color-text)]/80">
            {(nav?.links || []).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Cart Button */}
          {/* <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-text-dark)] text-xs font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-[var(--color-accent)] text-white rounded-full">
                {itemCount}
              </span>
            )}
          </Link> */}
        </div>
      </nav>
    </header>
  );
}
