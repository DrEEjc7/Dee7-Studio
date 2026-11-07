/**
 * One-off: turn tool/website mentions and cross-references in blog post
 * bodies into real links (internal /blog/<slug> links and external links
 * to the tool/company's own site).
 *
 * Reads link candidates produced by review agents (see /tmp .../chunks/links-*.json,
 * shape: [{ slug, links: [{ text, type: "internal"|"external", target }] }])
 * and applies them to each post's Portable Text body in Sanity.
 *
 * Usage:
 *   node --experimental-strip-types scripts/add-blog-links.mts <candidates.json> [--apply]
 * Without --apply, runs as a dry run and only prints a report.
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

interface Candidate {
  text: string;
  type: "internal" | "external";
  target: string;
}
interface PostCandidates {
  slug: string;
  links: Candidate[];
}

const candidatesPath = process.argv[2];
const APPLY = process.argv.includes("--apply");
if (!candidatesPath) {
  console.error("Usage: node --experimental-strip-types scripts/add-blog-links.mts <candidates.json> [--apply]");
  process.exit(1);
}

const allPostCandidates: PostCandidates[] = JSON.parse(readFileSync(candidatesPath, "utf8"));

const HEADING_STYLES = new Set(["h1", "h2", "h3", "h4"]);
const key = () => Math.random().toString(36).slice(2, 12);

const DECORATOR_MARKS = new Set(["strong", "em", "code", "underline", "strike-through"]);

/** True if `markDefs` already has a link to `href` on any span in `block`'s siblings
 * across the whole body (used to detect "this reference is already linked, just with
 * a different/shorter anchor than we guessed"). */
function bodyAlreadyLinksTo(body: any[], href: string): boolean {
  for (const block of body) {
    for (const def of block.markDefs ?? []) {
      if (def._type === "link" && def.href === href) return true;
    }
  }
  return false;
}

/** Find the first span in `body` containing `text`, whose marks (if any) are pure
 * decorators (bold/italic/etc, never an existing link), and split it in place to
 * carry a new link mark alongside any such decorators. Mutates `body`. Returns the
 * markDef key on success, or null if no eligible span was found. */
function applyLink(body: any[], text: string, href: string): string | null {
  const markKey = `link-${key()}`;
  for (const block of body) {
    if (block._type !== "block" || !Array.isArray(block.children)) continue;
    if (block.style && HEADING_STYLES.has(block.style)) continue;

    const children: any[] = block.children;
    for (let i = 0; i < children.length; i++) {
      const span = children[i];
      if (span._type !== "span" || typeof span.text !== "string") continue;
      const existingMarks: string[] = span.marks ?? [];
      if (!existingMarks.every((m) => DECORATOR_MARKS.has(m))) continue; // skip if already linked or has an unknown mark
      const idx = span.text.indexOf(text);
      if (idx === -1) continue;

      const parts: any[] = [];
      if (idx > 0) {
        parts.push({ _type: "span", _key: key(), text: span.text.slice(0, idx), marks: [...existingMarks] });
      }
      parts.push({ _type: "span", _key: key(), text, marks: [...existingMarks, markKey] });
      if (idx + text.length < span.text.length) {
        parts.push({ _type: "span", _key: key(), text: span.text.slice(idx + text.length), marks: [...existingMarks] });
      }

      children.splice(i, 1, ...parts);
      block.markDefs = Array.isArray(block.markDefs) ? block.markDefs : [];
      block.markDefs.push({ _key: markKey, _type: "link", href });
      return markKey;
    }
  }
  return null;
}

const allSlugs = new Set<string>(
  (
    await client.fetch<string[]>(
      `*[_type == "post" && defined(slug.current)].slug.current`
    )
  ).filter(Boolean)
);

type Report = {
  slug: string;
  applied: { text: string; href: string }[];
  skipped: { text: string; target: string; reason: string }[];
};
const reports: Report[] = [];

let tx = client.transaction();
let patchCount = 0;

for (const post of allPostCandidates) {
  if (!post.links?.length) continue;
  const doc = await client.fetch<{ _id: string; body: any[] } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ _id, body }`,
    { slug: post.slug }
  );
  if (!doc) {
    reports.push({
      slug: post.slug,
      applied: [],
      skipped: post.links.map((l) => ({ text: l.text, target: l.target, reason: "post not found" })),
    });
    continue;
  }

  const body = JSON.parse(JSON.stringify(doc.body ?? []));
  const report: Report = { slug: post.slug, applied: [], skipped: [] };

  for (const link of post.links) {
    let href: string;
    if (link.type === "internal") {
      if (link.target === post.slug) {
        report.skipped.push({ text: link.text, target: link.target, reason: "self-link" });
        continue;
      }
      if (!allSlugs.has(link.target)) {
        report.skipped.push({ text: link.text, target: link.target, reason: "unknown internal slug" });
        continue;
      }
      href = `/blog/${link.target}`;
    } else {
      if (!/^https?:\/\//.test(link.target)) {
        report.skipped.push({ text: link.text, target: link.target, reason: "not a valid absolute URL" });
        continue;
      }
      href = link.target;
    }

    if (bodyAlreadyLinksTo(body, href)) {
      report.skipped.push({ text: link.text, target: link.target, reason: "already linked elsewhere in this post" });
      continue;
    }

    const applied = applyLink(body, link.text, href);
    if (applied) {
      report.applied.push({ text: link.text, href });
    } else {
      report.skipped.push({ text: link.text, target: link.target, reason: "text not found as a linkable span" });
    }
  }

  reports.push(report);

  if (APPLY && report.applied.length > 0) {
    tx = tx.patch(doc._id, (p) => p.set({ body }));
    patchCount++;
  }
}

// ---- report ----
let totalApplied = 0;
let totalSkipped = 0;
for (const r of reports) {
  totalApplied += r.applied.length;
  totalSkipped += r.skipped.length;
  if (r.applied.length || r.skipped.length) {
    console.log(`\n${r.slug}`);
    for (const a of r.applied) console.log(`  + "${a.text}" -> ${a.href}`);
    for (const s of r.skipped) console.log(`  - SKIP "${s.text}" -> ${s.target} (${s.reason})`);
  }
}
console.log(`\n\nTOTAL: ${totalApplied} applied, ${totalSkipped} skipped across ${reports.length} posts.`);

if (APPLY) {
  if (patchCount === 0) {
    console.log("Nothing to commit.");
  } else {
    const result = await tx.commit();
    console.log(`Committed ${result.results.length} patches.`);
  }
} else {
  console.log("\nDry run only. Re-run with --apply to write these changes to Sanity.");
}
