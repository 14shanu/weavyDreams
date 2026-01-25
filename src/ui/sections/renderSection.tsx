import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import EventTypesSection from "./EventTypesSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import PortfolioSection from "./PortfolioSection";
import CTASection from "./CTASection";
import BlogSection from "@/components/BlogSection";
import { SectionConfig } from "@/lib/types";

export function renderSection(section: SectionConfig) {
  switch (section.type) {
    case "hero":
      return <HeroSection {...section} />;
    case "eventTypes":
      return <EventTypesSection />;
    case "services":
      return <ServicesSection />;
    case "about":
      return <AboutSection {...section} />;
    case "portfolio":
      return <PortfolioSection {...section} />;
    case "contact":
      return <ContactSection {...section} />;
    case "blog":
      return <BlogSection />;
    case "cta":
      return <CTASection {...section} />;
    default:
      return null;
  }
}
