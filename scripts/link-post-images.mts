/**
 * One-off: set `href` on blog post image blocks whose caption already names
 * the tool/company it's a screenshot of (a lot of these were literal "🔗 Name"
 * placeholder captions that never got turned into a real link). Patches each
 * image block by its _key, so it never touches caption text or ordering.
 *
 * Run: node --experimental-strip-types scripts/link-post-images.mts [--apply]
 * Without --apply, prints what would change and does nothing.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-11-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const APPLY = process.argv.includes("--apply");

// slug -> { imageBlockKey -> href }
const PATCHES: Record<string, Record<string, string>> = {
  "top-10-website-builders-dee7-studio-picks": {
    "285d9ee9262b": "https://www.wix.com",
    "604309bc000c": "https://www.squarespace.com",
    "4976926111a4": "https://webflow.com",
    "4850b076d773": "https://wordpress.org",
    "d12cca74937e": "https://www.shopify.com",
    "2af962ad7e37": "https://www.framer.com",
    ca8a7cadaee4: "https://carrd.co",
    "1624f7a59b06": "https://www.duda.co",
    "16cb65f11e62": "https://www.hostinger.com/website-builder",
    f5970c639234: "https://elementor.com",
  },
  "top-10-course-hosting-platforms": {
    "0c8c86209d91": "https://kajabi.com",
    e546bf4fd82d: "https://www.thinkific.com",
    "3c5ff5b2dfd7": "https://www.skool.com",
    b3f28d133d91: "https://www.gohighlevel.com",
    a985a7dc877d: "https://www.learnworlds.com",
    d0017843bba4: "https://teachable.com",
    "23335b057ba1": "https://www.podia.com",
    "378c23e9048b": "https://www.udemy.com",
    "366cb6d1ef89": "https://www.coursera.org",
    "3fc89324c29e": "https://www.openlearning.com",
  },
  "harness-the-power-of-white-space-elevate-your-web-design": {
    b1ae82c4bf55: "https://www.google.com",
    a6143121c7d6: "https://www.apple.com",
    "64fdac370b71": "https://www.dropbox.com",
  },
  "the-3-second-rule-of-web-design": {
    "933a311263bd": "https://www.apple.com",
    "2f1a76af978c": "https://www.airbnb.com",
    "4a7c76207d65": "https://www.dropbox.com",
  },
  "typography-the-voice-of-your-design": {
    "86d236dd7de6": "https://medium.com",
    "35b73e16b41a": "https://www.airbnb.com",
    "963e0a3fe7ed": "https://www.nytimes.com",
  },
  "design-systems-enhancing-consistency-and-efficiency": {
    aa4d12a6324b: "https://airtable.com",
    // 37e51f7c4293 "Dee7 Studio's Simple Design System" is their own example, no external link.
  },
  "mastering-brand-design-unveil-your-brands-true-essence": {
    // e9208f9153ee "What is branding? (source)" — no specific source named in the text, skipped.
    "5c922e295c94": "https://creative.starbucks.com", // "Learn more." follows the Starbucks paragraph
    bd68a86b3403: "https://www.uber.com",
    "54a86b961194": "https://www.youtube.com",
    "9438729ee860": "https://dropbox.design",
    "0b82a6c00027": "https://www.netflix.com",
    "7963bcdf7d7a": "https://slack.com/media-kit",
    "0d78efa20939": "https://www.zendesk.com",
    "906a6c4aedaa": "https://www.audi.com",
    "5873407cea19": "https://spotify.design",
    "3f7bf8fa3c05": "https://about.instagram.com",
  },
  "design-and-develop-your-website-with-carrd-a-comprehensive-guide": {
    // 36914e9fda49 "Andrej The Freelancer" and 0ab74a8bb724 are not confidently
    // attributable to a specific, verifiable URL — skipped rather than guessed.
    "34941bb3ac94": "https://www.figma.com",
    "2b2a6a1fefee": "https://carrd.co",
  },
  "top-12-websites-for-unmatched-web-design-inspiration-and-creativity": {
    "597f843afe7b": "https://www.siteinspire.com",
    "631fceea4c77": "https://www.awwwards.com",
    a52a98e769e1: "https://www.lapa.ninja",
    "831b03b00f0f": "https://bestwebsite.gallery",
    "7c79b7054727": "https://www.behance.net",
    "517292167881": "https://www.designspiration.com",
    "473767f189a2": "https://dribbble.com",
    "6dc8d52c394f": "https://webflow.com/made-in-webflow",
    "6e38b1ade70b": "https://www.flowbase.co",
    "0d11e1cae06c": "https://brutalistwebsites.com",
  },
  "top-carrd-designed-websites": {
    // e4e59ed5be44 NewsletterOS, 559728793e3f Plaand, and 3b1242f420d4 Abstract
    // didn't resolve to a confidently-correct, verifiable official domain — skipped.
    c741a204621b: "https://bettersheets.co",
    "8db2f664bb31": "https://reallygoodquestions.co",
  },
};

let totalApplied = 0;
let tx = client.transaction();
let patchedDocs = 0;

for (const [slug, keyToHref] of Object.entries(PATCHES)) {
  const doc = await client.fetch<{ _id: string; body: any[] } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ _id, body }`,
    { slug }
  );
  if (!doc) {
    console.log(`SKIP ${slug}: post not found`);
    continue;
  }

  const sets: Record<string, string> = {};
  for (const block of doc.body ?? []) {
    if (block._type !== "image") continue;
    const href = keyToHref[block._key];
    if (!href) continue;
    sets[`body[_key=="${block._key}"].href`] = href;
  }

  const found = Object.keys(sets).length;
  const expected = Object.keys(keyToHref).length;
  console.log(`${slug}: ${found}/${expected} image blocks matched`);
  if (found !== expected) {
    const missing = Object.keys(keyToHref).filter(
      (k) => !(doc.body ?? []).some((b: any) => b._key === k)
    );
    if (missing.length) console.log(`  missing keys: ${missing.join(", ")}`);
  }

  totalApplied += found;
  if (APPLY && found > 0) {
    tx = tx.patch(doc._id, (p) => p.set(sets));
    patchedDocs++;
  }
}

console.log(`\nTotal: ${totalApplied} image links across ${Object.keys(PATCHES).length} posts.`);

if (APPLY) {
  if (patchedDocs === 0) {
    console.log("Nothing to commit.");
  } else {
    const result = await tx.commit();
    console.log(`Committed ${result.results.length} patches.`);
  }
} else {
  console.log("Dry run only. Re-run with --apply to write these changes to Sanity.");
}
