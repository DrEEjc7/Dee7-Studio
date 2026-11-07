/**
 * One-off: sync the November 2026 offer changes into Sanity.
 * Patches Landing Page Sprint, Website Project and Monthly Partner,
 * and creates the AI Automation & Agentic Workflows offer.
 *
 * Run: node --experimental-strip-types scripts/update-offers.mts
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { offers } from "../src/data/sample.ts";

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

const ids: Record<string, string> = {
  "landing-page-sprint": "23FL0pplxlZ9sBJdUDBkYi",
  "website-project": "i6iC7v5Eiu6o2RKfDtMTOK",
  "monthly-partner": "i6iC7v5Eiu6o2RKfDtMTS8",
};

const key = () => Math.random().toString(36).slice(2, 12);

function fields(slug: string) {
  const o = offers.find((x) => x.slug === slug);
  if (!o) throw new Error(`offer ${slug} not found in sample data`);
  return {
    name: o.name,
    problem: o.problem,
    forWho: o.forWho,
    timeline: o.timeline,
    fromPrice: o.fromPrice,
    description: o.description,
    deliverables: o.deliverables,
    steps: o.steps.map((s) => ({ _type: "step", _key: key(), ...s })),
    faq: o.faq.map((f) => ({ _type: "faqItem", _key: key(), ...f })),
    cta: o.cta,
  };
}

let tx = client.transaction();
for (const [slug, id] of Object.entries(ids)) {
  tx = tx.patch(id, (p) => p.set(fields(slug)));
}
tx = tx.createIfNotExists({
  _id: "offer-ai-automation",
  _type: "offer",
  slug: { _type: "slug", current: "ai-automation" },
  order: 35,
  featured: false,
  ...fields("ai-automation"),
});

const result = await tx.commit();
console.log(
  "Done:",
  result.results.map((r) => `${r.id} ${r.operation}`).join(", ")
);
