import { ContactSectionConfig } from "@/lib/types";
import ContactForm from "@/ui/forms/ContactForm";

export default function ContactSection({
  title,
  description,
}: ContactSectionConfig) {
  return (
    <section className="bg-[var(--color-bg-alt)] py-10 sm:py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-[var(--font-heading)] text-[var(--color-text-dark)] mb-3 sm:mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-center text-xs sm:text-sm text-[var(--color-text-dark)]/80 mb-6 sm:mb-8">
            {description}
          </p>
        )}

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start md:items-stretch justify-between">
          <div className="flex-1 text-sm sm:text-base text-[var(--color-text-dark)]/80 space-y-2 sm:space-y-3">
            <p>
              Phone:{" "}
              <span className="font-medium text-[var(--color-text-dark)]">
                +61 2 8093 3806
              </span>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@youreventcompany.com"
                className="text-[var(--color-primary)] hover:underline"
              >
                info@youreventcompany.com
              </a>
            </p>
            <p>Address: 123 Event Street, Sydney, Australia</p>
          </div>

          <div className="flex-1 w-full">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
