/**
 * One-time seed: pushes the sample content into the Sanity project.
 * Idempotent: documents are matched by slug and skipped when present.
 *
 * Run: node scripts/migrate-to-sanity.mjs
 * Needs .env with PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN.
 */
import { createClient } from "@sanity/client";
import { createReadStream, readFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env parser (no extra deps)
const env = Object.fromEntries(
  readFileSync(path.join(root, ".env"), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);

const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID,
  dataset: env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-11-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

const { offers, projects, posts } = await import(
  path.join(root, "scripts/.sample-data.mjs")
);

async function exists(type, slug) {
  const id = await client.fetch(
    `*[_type == $type && slug.current == $slug][0]._id`,
    { type, slug }
  );
  return Boolean(id);
}

async function uploadImage(relPath) {
  const abs = path.join(root, "public", relPath.replace(/^\//, ""));
  if (!existsSync(abs)) return null;
  const asset = await client.assets.upload("image", createReadStream(abs), {
    filename: path.basename(abs),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// Offers
for (const [i, o] of offers.entries()) {
  if (await exists("offer", o.slug)) {
    console.log(`offer ${o.slug}: exists, skipped`);
    continue;
  }
  await client.create({
    _type: "offer",
    name: o.name,
    slug: { _type: "slug", current: o.slug },
    problem: o.problem,
    forWho: o.forWho,
    timeline: o.timeline,
    fromPrice: o.fromPrice,
    description: o.description,
    deliverables: o.deliverables,
    steps: o.steps.map((s) => ({ _type: "step", _key: key(), ...s })),
    faq: o.faq.map((f) => ({ _type: "faqItem", _key: key(), ...f })),
    cta: o.cta,
    featured: Boolean(o.featured),
    order: (i + 1) * 10,
  });
  console.log(`offer ${o.slug}: created`);
}

// Projects (with image upload)
for (const [i, p] of projects.entries()) {
  if (await exists("project", p.slug)) {
    console.log(`project ${p.slug}: exists, skipped`);
    continue;
  }
  const image = p.image ? await uploadImage(p.image) : null;
  await client.create({
    _type: "project",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    client: p.client,
    industry: p.industry,
    services: p.services,
    highlight: p.highlight,
    summary: p.summary,
    ...(p.url ? { url: p.url } : {}),
    ...(image ? { image } : {}),
    featured: Boolean(p.featured),
    order: (i + 1) * 10,
  });
  console.log(`project ${p.slug}: created${image ? " with image" : ""}`);
}

// Posts (paragraphs -> Portable Text blocks)
for (const post of posts) {
  if (await exists("post", post.slug)) {
    console.log(`post ${post.slug}: exists, skipped`);
    continue;
  }
  await client.create({
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readingTime: post.readingTime,
    featured: Boolean(post.featured),
    body: post.body.map((paragraph) => ({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: paragraph, marks: [] }],
    })),
  });
  console.log(`post ${post.slug}: created`);
}

console.log("Migration complete.");
