"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SkipToContent from "@/ui/components/SkipToContent";
import ExperienceControl from "@/components/ExperienceControl";
import PageTransition from "@/components/PageTransition";

export default function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      {/* <ExperienceControl /> */}
    </div>
  );
}
