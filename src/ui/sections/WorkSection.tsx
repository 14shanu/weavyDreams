import Image from "next/image";
import { WorkSectionConfig } from "@/lib/types";

export default function WorkSection({ title, items }: WorkSectionConfig) {
  return (
    <section className="bg-[var(--color-bg-alt)] py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-[var(--font-heading)] text-[var(--color-text-dark)] mb-6 sm:mb-10">
          {title}
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="relative group overflow-hidden rounded-lg sm:rounded-xl shadow-md cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-white uppercase text-center px-2">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
