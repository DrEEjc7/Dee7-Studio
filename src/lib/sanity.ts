/**
 * Sanity client: activates automatically once env vars are set.
 *
 * .env (and the Cloudflare build environment) carry:
 *   PUBLIC_SANITY_PROJECT_ID=jfj1yvz8
 *   PUBLIC_SANITY_DATASET=production
 *   SANITY_API_TOKEN=...   (server/build-side only)
 */
import { createClient, type SanityClient } from "@sanity/client";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? "production";
const token = import.meta.env.SANITY_API_TOKEN;

export const sanityEnabled = Boolean(projectId);

export const sanity: SanityClient | null = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-11-01",
      useCdn: false, // fresh content at build time; the site itself is static
      ...(token ? { token } : {}),
    })
  : null;

export const queries = {
  offers: `*[_type == "offer" && defined(slug.current)] | order(order asc) {
    "slug": slug.current, name, problem, forWho, timeline, fromPrice,
    description, deliverables, steps[]{title, text}, faq[]{q, a}, cta, featured
  }`,
  projects: `*[_type == "project" && defined(slug.current)] | order(order asc) {
    "slug": slug.current, title, client, industry, services, highlight,
    summary, url, "image": image.asset->url, featured,
    body[]{ ..., _type == "image" => { "url": asset->url } }
  }`,
  posts: `*[_type == "post" && defined(slug.current)] {
    "slug": slug.current, title, seoTitle, excerpt, category,
    "date": coalesce(date, publishedAt),
    "readingTime": coalesce(readingTime, readTime),
    "heroImage": heroImage.asset->url,
    featured,
    body[]{ ..., _type == "image" => { "url": asset->url } }
  } | order(date desc)`,
};
