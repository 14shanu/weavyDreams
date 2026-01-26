export type HeroSectionConfig = {
  type: "hero";
  id: string;
  heading: string;
  subheading?: string;
  backgroundImage: string;
  cta?: {
    label: string;
    href: string;
  };
};

export type WorkItem = {
  label: string;
  image: string;
  slug: string;
};

export type WorkSectionConfig = {
  type: "workGrid";
  id: string;
  title: string;
  items: WorkItem[];
};
export type WhatWeDoSectionConfig = {
  type: "whatWeDo";
  id: string;
  title: string;
  body: string[];          // paragraphs
  image: string;
};

export type ContactSectionConfig = {
  type: "contact";
  id: string;
  title: string;
  description?: string;
};

export type EventTypesSectionConfig = {
  type: "eventTypes";
  id: string;
};

export type ServicesSectionConfig = {
  type: "services";
  id: string;
};

export type AboutSectionConfig = {
  type: "about";
  id: string;
  title: string;
  body: string[];
  image: string;
};

export type PortfolioSectionConfig = {
  type: "portfolio";
  id: string;
  title: string;
  items: WorkItem[];
};

export type CTASectionConfig = {
  type: "cta";
  id: string;
  title: string;
  description: string;
};

export type BlogSectionConfig = {
  type: "blog";
  id: string;
};

export type SectionConfig = HeroSectionConfig | WorkSectionConfig | WhatWeDoSectionConfig | ContactSectionConfig | EventTypesSectionConfig | ServicesSectionConfig | AboutSectionConfig | PortfolioSectionConfig | CTASectionConfig | BlogSectionConfig

export interface PageConfig {
  slug: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    openGraph?: {
      title: string;
      description: string;
      image: string;
      type: string;
    };
    twitter?: {
      card: string;
      title: string;
      description: string;
      image: string;
    };
  };
  sections: SectionConfig[];
}



