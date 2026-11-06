/**
 * Sanity client — activates automatically once env vars are set.
 *
 * Set in .env (and in Cloudflare Workers env for production):
 *   PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
 *   PUBLIC_SANITY_DATASET=production
 */
import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";

export const sanityEnabled = Boolean(projectId);

export const sanity: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-11-01",
      useCdn: true,
    })
  : null;

export const queries = {
  projects: `*[_type == "project"] | order(year desc) {
    "slug": slug.current, title, client, industry, services, metric, metricLabel,
    summary, challenge, approach, results, year, featured
  }`,
  posts: `*[_type == "post"] | order(date desc) {
    "slug": slug.current, title, excerpt, category, date, readingTime, featured
  }`,
};
