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
  slug?: string;
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

export type SectionConfig = HeroSectionConfig | WorkSectionConfig | WhatWeDoSectionConfig | ContactSectionConfig

export interface PageConfig {
  slug: string;
  seo?: {
    title?: string;
    description?: string;
  };
  sections: SectionConfig[];
}



