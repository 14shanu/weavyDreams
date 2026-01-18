import Image from "next/image";
import { WhatWeDoSectionConfig } from "@/lib/types";

export default function WhatWeDoSection({
  title,
  body,
  image,
}: WhatWeDoSectionConfig) {
  return (
    <section className="bg-[var(--color-bg)] py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-[var(--font-heading)] text-white mb-6 sm:mb-10">
          {title}
        </h2>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 items-start">
          <div className="order-2 md:order-1 text-sm sm:text-base leading-relaxed text-[var(--color-text)]/80 space-y-3 sm:space-y-4">
            {body.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          <div className="order-1 md:order-2 relative w-full max-w-md mx-auto aspect-[4/3]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-lg sm:rounded-xl shadow-lg"
              sizes="(min-width: 768px) 40vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
