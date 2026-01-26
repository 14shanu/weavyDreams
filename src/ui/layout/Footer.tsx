"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavigationConfig, FooterConfig } from "@/lib/types/navigation";
import { getNavigation } from "@/lib/api/navigation";
import siteConfig from '@/data/site-config.json';
import SocialIcon from '@/ui/icons/SocialIcon';

export default function Footer() {
  const [footer, setFooter] = useState<FooterConfig | null>(null);
  const { contact, social } = siteConfig;

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
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-between mb-8">
            {footer.columns.filter(col => col.title !== 'Social').map((col) => (
              <div key={col.title} className="text-xs sm:text-sm">
                <h4 className="text-[var(--color-text)] mb-2 font-medium">
                  {col.title}
                </h4>
                <ul className="space-y-1 text-[var(--color-text)]/70">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-[var(--color-text)] transition-colors"
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

        {/* Get In Touch Section */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <h3 className="text-[var(--color-text)] text-lg font-semibold mb-6">Get In Touch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--color-text)]/70 mb-1 text-xs">Email</p>
                <a href={`mailto:${contact.email}`} className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--color-text)]/70 mb-1 text-xs">Phone</p>
                <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors">
                  {contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[var(--color-text)]/70 mb-1 text-xs">Address</p>
                <p className="text-[var(--color-text)]">{contact.address}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {Object.entries(social).map(([platform, data]) => (
              <a 
                key={platform}
                href={(data as any).url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all group"
                title={platform}
              >
                <span className="group-hover:scale-110 transition-transform">
                  <SocialIcon icon={(data as any).icon} />
                </span>
              </a>
            ))}
          </div>
        </div>

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
