export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  highlight: string; // honest descriptor: "Award winner", "4 languages", "E-commerce" …
  summary: string;
  url?: string; // live site
  featured?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  body: string[]; // paragraphs — swapped for Portable Text once Sanity is wired
  featured?: boolean;
}

export interface Offer {
  slug: string;
  name: string;
  problem: string; // problem-first header used on the home page
  forWho: string;
  timeline: string;
  fromPrice: string; // shown on the offer page only, never on home
  description: string;
  deliverables: string[];
  steps: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  cta: string;
  featured?: boolean;
}
