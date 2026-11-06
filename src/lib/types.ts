export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: "HealthTech" | "EdTech" | "Fintech";
  services: string[];
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  approach: string;
  results: { value: string; label: string }[];
  year: number;
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
  name: string;
  price: string;
  cadence?: string;
  delivery: string;
  description: string;
  includes: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}
