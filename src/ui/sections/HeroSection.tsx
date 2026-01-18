import Image from "next/image";
import { HeroSectionConfig } from "@/lib/types";

export default function HeroSection(props: HeroSectionConfig) {
  const { heading, subheading, backgroundImage, cta } = props;

  return (
    <section className="relative h-[60vh] min-h-[420px] sm:h-[70vh] sm:min-h-[480px] text-center flex items-center justify-center">
      <Image
        src={backgroundImage}
        alt={heading}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold font-[var(--font-heading)] tracking-wide text-white">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-2xl text-white/90">
            {subheading}
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-text-dark)] text-xs sm:text-sm font-medium shadow-lg hover:bg-[var(--color-primary-dark)] transition"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
