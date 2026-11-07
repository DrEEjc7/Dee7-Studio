import type { PTBlock } from "./portableText";

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  highlight: string; // honest descriptor: "Award winner", "4 languages", "E-commerce" …
  summary: string;
  url?: string; // live site
  image?: string; // screenshot under /public/work
  featured?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  seoTitle?: string; // optional override for the browser tab / search results
  excerpt: string;
  category: string;
  date: string; // ISO
  readingTime: string;
  heroImage?: string; // Sanity asset URL
  body: PTBlock[]; // Portable Text from Sanity
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
