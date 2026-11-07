/**
 * Site-wide constants. One place for IDs and identity so layouts, schema
 * markup and the privacy page never drift apart.
 */
export const SITE = {
  name: "Dee7 Studio",
  url: "https://dee7studio.com",
  email: "hello@dee7studio.com",
  tagline: "Websites that explain your offer and get visitors to act.",
  description:
    "Dee7 Studio plans, writes, designs and builds websites that explain your offer clearly. 10+ years, 2,000+ projects, Certified Webflow Partner.",
  /** Google Tag Manager container (loads GA4 and everything else) */
  gtmId: import.meta.env.PUBLIC_GTM_ID ?? "GTM-WBCGMJWF",
  /** GA4 measurement ID. Documented here; the tag itself lives in GTM. */
  ga4Id: "G-2REN69B87R",
  /** Default social card, 1200x630 */
  ogImage: "/og-default.png",
} as const;

/** Absolute URL for a site path. */
export const abs = (path = "/") => new URL(path, SITE.url).href;

/**
 * Keep meta descriptions inside what Google shows (about 160 characters).
 * Cuts at a sentence end when one fits, otherwise at a word boundary.
 */
export function trimDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max);
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("? "), window.lastIndexOf("! "));
  if (sentenceEnd > 80) return window.slice(0, sentenceEnd + 1);
  const space = window.lastIndexOf(" ", max - 1);
  return window.slice(0, space > 80 ? space : max - 1).replace(/[\s,;:.-]+$/, "") + "…";
}
