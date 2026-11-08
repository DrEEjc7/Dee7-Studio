/**
 * Converts every Sanity-hosted image the site uses into small AVIF files.
 *
 * Why: Sanity's image CDN cannot serve AVIF, and it serves originals at full
 * size (one is a 3.7 MB PNG). This step downloads each original once, resizes
 * it to a few widths and writes AVIF into public/img/. Templates then serve
 * them through <picture>, with the Sanity URL as a fallback for old browsers.
 *
 * Output:
 *   public/img/<assetId>-<width>-<version>.avif   (gitignored, regenerated)
 *   src/data/images.generated.json                (gitignored, url -> variants)
 *   .cache/sanity-images/                         (gitignored, original downloads)
 *
 * Runs automatically before `astro build` (see package.json). Re-runs are fast:
 * existing outputs are reused. Bump VERSION when QUALITY or WIDTHS change.
 */
import { createClient } from "@sanity/client";
import sharp from "sharp";
import {
  existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const VERSION = "v1";
const QUALITY = 42; // visually near-identical to the source on UI screenshots
const EFFORT = 9; // slowest, smallest
const WIDTHS = [480, 800, 1200, 1600];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/img");
const cacheDir = path.join(root, ".cache/sanity-images");
const manifestPath = path.join(root, "src/data/images.generated.json");

const envFile = path.join(root, ".env");
const fileEnv = existsSync(envFile)
  ? Object.fromEntries(
      readFileSync(envFile, "utf8")
        .split("\n")
        .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
        .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
    )
  : {};
const env = { ...fileEnv, ...process.env };

mkdirSync(outDir, { recursive: true });
mkdirSync(cacheDir, { recursive: true });
mkdirSync(path.dirname(manifestPath), { recursive: true });

if (!env.PUBLIC_SANITY_PROJECT_ID) {
  console.warn("[images] No Sanity project configured, skipping.");
  writeFileSync(manifestPath, "{}\n");
  process.exit(0);
}

const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-11-01",
  useCdn: false,
  ...(env.SANITY_API_TOKEN ? { token: env.SANITY_API_TOKEN } : {}),
});

// Every image URL referenced by published content.
const docs = await client.fetch(`*[_type in ["post", "project"] && defined(slug.current)]{
  "heroImage": heroImage.asset->url,
  "image": image.asset->url,
  body[]{ _type == "image" => { "url": asset->url } }
}`);
const urls = [...new Set(JSON.stringify(docs).match(/https:\/\/cdn\.sanity\.io\/images\/[^"\\]+/g) ?? [])];
console.log(`[images] ${urls.length} Sanity images referenced`);

// Settings changed? Wipe outputs so nothing stale is served.
const stampPath = path.join(outDir, ".settings");
const stamp = `${VERSION}|${QUALITY}|${EFFORT}|${WIDTHS.join(",")}`;
if (!existsSync(stampPath) || readFileSync(stampPath, "utf8") !== stamp) {
  for (const f of readdirSync(outDir)) rmSync(path.join(outDir, f), { force: true });
  writeFileSync(stampPath, stamp);
}

const assetKey = (url) => path.basename(new URL(url).pathname).replace(/\.[a-z]+$/i, "");

async function original(url) {
  const file = path.join(cacheDir, path.basename(new URL(url).pathname));
  if (!existsSync(file)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

async function process1(url) {
  const key = assetKey(url);
  const file = await original(url);
  const meta = await sharp(file).metadata();
  // Widths at or below the original, never upscaled; the original width itself
  // is included when it is smaller than the largest step.
  const widths = [...new Set([...WIDTHS.filter((w) => w < meta.width), Math.min(meta.width, WIDTHS.at(-1))])].sort((a, b) => a - b);
  const variants = [];
  for (const w of widths) {
    const name = `${key}-${w}-${VERSION}.avif`;
    const dest = path.join(outDir, name);
    if (!existsSync(dest)) {
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .avif({ quality: QUALITY, effort: EFFORT, chromaSubsampling: "4:2:0" })
        .toFile(dest);
    }
    variants.push([w, name]);
  }
  return [url, { w: meta.width, h: meta.height, variants }];
}

// Small pool: AVIF effort 9 is CPU heavy.
const manifest = {};
const queue = [...urls];
const workers = Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const url = queue.shift();
    try {
      const [k, v] = await process1(url);
      manifest[k] = v;
    } catch (error) {
      console.warn(`[images] skipped ${url}: ${error.message}`);
    }
  }
});
await Promise.all(workers);

// Drop outputs no longer referenced.
const keep = new Set(Object.values(manifest).flatMap((m) => m.variants.map(([, n]) => n)));
keep.add(".settings");
for (const f of readdirSync(outDir)) if (!keep.has(f)) rmSync(path.join(outDir, f), { force: true });

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(manifestPath, JSON.stringify(sorted) + "\n");
console.log(`[images] wrote ${keep.size - 1} AVIF files, manifest for ${Object.keys(sorted).length} images`);
