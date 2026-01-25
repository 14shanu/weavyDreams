import Image from "next/image";
import { HeroSectionConfig } from "@/lib/types";

export default function HeroSection(props: HeroSectionConfig) {
  const { heading, subheading, backgroundImage, cta } = props;

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
      <Image
        src={backgroundImage}
        alt={heading}
        fill
        className="object-cover opacity-30"
        priority
      />
      <div className="relative z-10 max-w-5xl px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {heading}
        </h1>
        {subheading && (
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-10 font-light">
            {subheading}
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex px-10 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:-translate-y-1"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
