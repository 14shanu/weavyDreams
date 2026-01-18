import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import WhatWeDoSection from "./WhatWeDoSection";
import WorkSection from "./WorkSection";
import { SectionConfig } from "@/lib/types";

export function renderSection(section: SectionConfig) {
  switch (section.type) {
    case "hero":
      return <HeroSection {...section} />;
    case "workGrid":
      return <WorkSection {...section} />;
    case "whatWeDo":
      return <WhatWeDoSection {...section} />;
    case "contact":
      return <ContactSection {...section} />;
    default:
      return null;
  }
}
