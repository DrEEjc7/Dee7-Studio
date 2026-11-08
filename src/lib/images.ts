/**
 * Image helpers. scripts/optimize-images.mjs turns every Sanity image into
 * small AVIF files and records them in images.generated.json. Templates serve
 * those through <picture>, and keep the Sanity URL as the fallback <img>.
 */
type Entry = { w: number; h: number; variants: [number, string][] };

const files = import.meta.glob<Record<string, Entry>>("../data/images.generated.json", {
  eager: true,
  import: "default",
});
const manifest: Record<string, Entry> = Object.values(files)[0] ?? {};

const isSanity = (url: string) => url.startsWith("https://cdn.sanity.io/images/");

/** AVIF srcset for an image, or null when it was not optimized. */
export function avif(url: string | undefined, sizes: string) {
  if (!url) return null;
  const entry = manifest[url];
  if (!entry?.variants.length) return null;
  return {
    srcset: entry.variants.map(([w, name]) => `/img/${name} ${w}w`).join(", "),
    sizes,
  };
}

/** Fallback <img src> for browsers without AVIF: resized, modern format via Sanity. */
export function fallback(url: string, width = 1200) {
  return isSanity(url) ? `${url}?w=${width}&auto=format&q=70` : url;
}

/** Social cards and structured data need JPEG: link scrapers do not read AVIF. */
export function socialImage(url: string | undefined) {
  if (!url) return undefined;
  return isSanity(url) ? `${url}?w=1200&h=630&fit=crop&fm=jpg&q=75` : url;
}
