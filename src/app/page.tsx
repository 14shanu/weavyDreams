import { getPageContent } from "@/lib/api/content";
import { renderSection } from "@/ui/sections/renderSection";

export default async function HomePage() {
  const page = await getPageContent("home");

  return (
    <>
      {page.sections.map((section) => (
        <div id={section.id} key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </>
  );
}
